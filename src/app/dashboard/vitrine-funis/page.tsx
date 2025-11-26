
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Copy, Gift, Milestone } from 'lucide-react';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, doc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type ShowcaseFunnelItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: 'typebot' | 'quiz';
};

export default function VitrineFunisPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const [isCloneDialogOpen, setIsCloneDialogOpen] = useState(false);
  const [funnelToClone, setFunnelToClone] = useState<ShowcaseFunnelItem | null>(null);
  const [isCloning, setIsCloning] = useState(false);

  const showcaseFunnelsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'showcaseFunnels') : null),
    [firestore]
  );
  const { data: showcaseFunnels, isLoading } = useCollection<ShowcaseFunnelItem>(showcaseFunnelsQuery);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s-]+/g, '-');
  };

  const handleCloneFunnel = async () => {
    if (!funnelToClone || !user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível selecionar o funil para clonagem.',
      });
      return;
    }
    setIsCloning(true);
    try {
        const originalFunnelRef = doc(firestore, 'funnels', funnelToClone.id);
        const originalFunnelSnap = await getDoc(originalFunnelRef);
        
        if (!originalFunnelSnap.exists()) {
             toast({ variant: 'destructive', title: 'Erro', description: 'O modelo de funil original não foi encontrado.' });
             setIsCloning(false);
             return;
        }

        const originalFunnelData = originalFunnelSnap.data();
        const newFunnelName = `${originalFunnelData.name} (Clonado)`;
        
        const newFunnelData = {
            ...originalFunnelData,
            name: newFunnelName,
            slug: generateSlug(newFunnelName),
            userId: user.uid,
            isPublished: false,
            createdAt: serverTimestamp(),
        };

        const funnelsCol = collection(firestore, 'funnels');
        const newFunnelDoc = await addDoc(funnelsCol, newFunnelData);
        
        toast({ title: 'Funil Clonado!', description: 'O novo funil foi adicionado à sua lista.' });
        router.push(`/editor/${newFunnelDoc.id}`);

    } catch (error) {
        console.error('Error cloning funnel: ', error);
        toast({ variant: 'destructive', title: 'Erro ao clonar', description: 'Não foi possível clonar o funil.' });
    } finally {
        setIsCloning(false);
        setIsCloneDialogOpen(false);
        setFunnelToClone(null);
    }
  }

  const openCloneDialog = (funnel: ShowcaseFunnelItem) => {
    setFunnelToClone(funnel);
    setIsCloneDialogOpen(true);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Vitrine de Funis
        </h1>
        <p className="mt-2 text-muted-foreground">
          Clone funis prontos para usar com apenas um clique e comece a vender.
        </p>
      </div>

      {isLoading && <p>Carregando vitrine...</p>}

      {!isLoading && showcaseFunnels && showcaseFunnels.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {showcaseFunnels.map((funnel) => (
            <Card key={funnel.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="relative w-full h-48 bg-muted">
                <Image src={funnel.imageUrl} alt={funnel.name} layout="fill" objectFit="cover" />
              </div>
              <CardHeader>
                <CardTitle>{funnel.name}</CardTitle>
                <CardDescription>{funnel.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button className="w-full" onClick={() => openCloneDialog(funnel)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Clonar Funil
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : !isLoading && (
        <Card className="flex flex-col items-center justify-center py-20 border-dashed">
            <div className="text-center">
                <div className="flex justify-center mb-4">
                    <Milestone className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Nenhum funil na vitrine</h3>
                <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
                    Volte em breve! Novos funis para clonagem são adicionados regularmente.
                </p>
            </div>
        </Card>
      )}

       <Dialog open={isCloneDialogOpen} onOpenChange={setIsCloneDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Clonar Funil: {funnelToClone?.name}</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja clonar este funil para sua conta?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsCloneDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={handleCloneFunnel} disabled={isCloning}>
                        {isCloning ? 'Clonando...' : 'Sim, clonar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
