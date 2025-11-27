
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Webhook, PlusCircle, Copy, Trash2, Info } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirestore, useUser, useDoc, useMemoFirebase } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, query, where, updateDoc, setDoc } from 'firebase/firestore';
import { Alert, AlertDescription } from '@/components/ui/alert';

type Gateway = {
  id: string;
  name: string;
  webhookUrl: string;
  userId: string;
};

export default function ConfiguracoesPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGatewayName, setNewGatewayName] = useState('');
  
  const userDocRef = useMemoFirebase(() => (user ? doc(firestore, 'users', user.uid) : null), [user, firestore]);
  const { data: userData } = useDoc(userDocRef);

  const webhooksQuery = useMemoFirebase(
    () =>
      user && firestore
        ? query(collection(firestore, 'users', user.uid, 'webhooks'))
        : null,
    [firestore, user]
  );
  
  const { data: gateways, isLoading } = useCollection<Gateway>(webhooksQuery);

  const handleAddGateway = async () => {
    if (newGatewayName.trim() && user && firestore) {
      try {
        const webhooksCol = collection(firestore, 'users', user.uid, 'webhooks');
        
        const newWebhookRef = doc(webhooksCol);
        const newId = newWebhookRef.id;

        const newWebhookUrl = `${window.location.origin}/api/webhook/${user.uid}/${newId}`;
        
        await setDoc(newWebhookRef, {
          id: newId,
          name: newGatewayName.trim(),
          webhookUrl: newWebhookUrl,
          userId: user.uid,
        });
        
        setIsDialogOpen(false);
        setNewGatewayName('');
        toast({
          title: "Webhook Criado!",
          description: "Seu novo webhook está pronto para ser usado.",
        });

      } catch (error) {
        console.error("Error adding webhook: ", error);
        toast({
          variant: "destructive",
          title: "Erro ao criar webhook",
          description: "Não foi possível salvar o webhook. Tente novamente.",
        });
      }
    }
  };
  
  const handleDeleteGateway = async (gatewayId: string) => {
    if (!user || !firestore) return;
    try {
        const gatewayRef = doc(firestore, 'users', user.uid, 'webhooks', gatewayId);
        await deleteDoc(gatewayRef);
        toast({
            title: "Webhook excluído!",
            description: "O webhook foi removido com sucesso.",
        });
    } catch(error) {
        console.error("Error deleting webhook:", error);
        toast({
            variant: "destructive",
            title: "Erro ao excluir",
            description: "Não foi possível remover o webhook.",
        });
    }
  }

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copiada!",
      description: "A URL do webhook foi copiada para sua área de transferência.",
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Configurações
        </h1>
        <p className="mt-2 text-muted-foreground">
          Gerencie as integrações e configurações da sua conta.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-6 w-6" />
                Webhooks de Pagamento
              </CardTitle>
              <CardDescription>
                Conecte seus gateways de pagamento para automatizar o fluxo de dados.
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Webhook
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Gateway</DialogTitle>
                  <DialogDescription>
                    Insira o nome do seu gateway de pagamento (ex: Hotmart, Kiwify).
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="gateway-name">Nome do Gateway</Label>
                    <Input
                      id="gateway-name"
                      placeholder="Ex: Hotmart"
                      value={newGatewayName}
                      onChange={(e) => setNewGatewayName(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={handleAddGateway}>Salvar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <Alert className="bg-blue-900/50 border-blue-800 text-blue-300">
                <Info className="h-4 w-4 text-blue-400" />
                <AlertDescription>
                    Sim, quando uma venda for feita no gateway de pagamento, nosso webhook receberá a informação e o saldo da sua conta será atualizado automaticamente.
                </AlertDescription>
            </Alert>
          <div className="grid gap-6 md:grid-cols-2">
            {isLoading ? (
                <p>Carregando webhooks...</p>
            ) : gateways && gateways.length > 0 ? (
                gateways.map((gateway) => (
                <Card key={gateway.id} className="flex flex-col">
                    <CardHeader>
                    <CardTitle>{gateway.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                    <div className="mt-4">
                        <Label htmlFor={`${gateway.name}-webhook`} className="text-xs text-muted-foreground">URL do Webhook para colar no seu gateway</Label>
                        <div className="flex items-center gap-2 mt-1">
                        <Input id={`${gateway.name}-webhook`} value={gateway.webhookUrl} readOnly />
                        <Button variant="ghost" size="icon" onClick={() => handleCopy(gateway.webhookUrl)}>
                            <Copy className="h-4 w-4" />
                        </Button>
                        </div>
                    </div>
                    </CardContent>
                    <CardFooter>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteGateway(gateway.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                    </Button>
                    </CardFooter>
                </Card>
                ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-700 rounded-lg">
                    <Webhook className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-center text-muted-foreground">Nenhum webhook configurado ainda.</p>
                    <p className="text-sm text-center text-muted-foreground">Adicione um para começar a sincronizar suas vendas.</p>
                </div>
            )}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
