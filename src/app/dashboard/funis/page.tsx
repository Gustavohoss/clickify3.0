
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { PlusCircle, Milestone, MoreVertical, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, query, where, doc, deleteDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';


export default function FunisPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [funnelToDelete, setFunnelToDelete] = useState<string | null>(null);

  const funnelsQuery = useMemoFirebase(
    () =>
      user && firestore
        ? query(collection(firestore, 'funnels'), where('userId', '==', user.uid))
        : null,
    [firestore, user]
  );

  const { data: funnels, isLoading } = useCollection(funnelsQuery);

  const openDeleteDialog = (funnelId: string) => {
    setFunnelToDelete(funnelId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteFunnel = async () => {
    if (!funnelToDelete || !firestore) return;

    try {
      const funnelRef = doc(firestore, 'funnels', funnelToDelete);
      await deleteDoc(funnelRef);
      toast({
        title: 'Funil excluído!',
        description: 'Seu funil foi removido com sucesso.',
      });
    } catch (error) {
      console.error("Error deleting funnel: ", error);
      toast({
        variant: 'destructive',
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir o funil. Tente novamente.',
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setFunnelToDelete(null);
    }
  };


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Meus Funis de Vendas 🚀
          </h1>
          <p className="mt-2 text-muted-foreground">
            Crie, personalize e publique seus funis para converter visitantes em clientes.
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/dashboard/funis/novo">
            <PlusCircle className="mr-2 h-5 w-5" />
            Criar Novo Funil
          </Link>
        </Button>
      </div>

      {isLoading && <p>Carregando funis...</p>}

      {!isLoading && funnels && funnels.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {funnels.map((funnel) => (
             <Card key={funnel.id} className="group relative flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/editor/${funnel.id}`)}>
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className="text-destructive"
                            onClick={(e) => {
                                e.stopPropagation();
                                openDeleteDialog(funnel.id);
                            }}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

              <Link href={`/editor/${funnel.id}`} className="flex-grow flex flex-col">
                <CardHeader>
                  <CardTitle>{funnel.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span>{funnel.type}</span>
                    <span className="text-gray-500">•</span>
                    {funnel.isPublished ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Publicado</Badge>
                    ) : (
                        <Badge variant="secondary">Rascunho</Badge>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    Etapas: {funnel.steps?.length || 0}
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        !isLoading && (
            <Card className="flex flex-col items-center justify-center py-20 border-dashed">
            <div className="text-center">
                <div className="flex justify-center mb-4">
                <Milestone className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Nenhum funil por aqui ainda</h3>
                <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
                Comece a construir sua máquina de vendas. Crie seu primeiro funil e veja a mágica acontecer.
                </p>
                <Button asChild>
                <Link href="/dashboard/funis/novo">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Criar Primeiro Funil
                </Link>
                </Button>
            </div>
            </Card>
        )
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente seu funil e todos os dados associados a ele.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteFunnel}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
