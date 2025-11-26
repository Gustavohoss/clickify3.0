'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Gift, Milestone } from 'lucide-react';
import { useFirestore, useUser } from '@/firebase';
import { collection, doc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type FunnelShowcaseItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: 'typebot' | 'quiz';
};

const staticFunnels: FunnelShowcaseItem[] = [
  {
    id: 'f-vsl-1',
    name: 'Funil de VSL Simples',
    description: 'Um funil clássico de página de vendas com vídeo (VSL) para converter visitantes em clientes com uma oferta direta.',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/s1p5mxazmnll2d9g0n6n9hpy?v=1764121516149',
    type: 'quiz',
  },
  {
    id: 'f-quiz-1',
    name: 'Funil de Quiz para Lead',
    description: 'Qualifique seus leads de forma interativa e divertida, segmentando seu público para ofertas futuras.',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/qgy0v8i2gxidvyk2p1z7075n?v=1764121518047',
    type: 'quiz',
  },
  {
    id: 'f-typebot-1',
    name: 'Funil com Typebot',
    description: 'Use o poder de um chatbot para engajar visitantes, capturar leads e direcioná-los para a compra de forma conversacional.',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/g8g9lq5e5k7axc63740w1c3n?v=1764121520110',
    type: 'typebot',
  },
];

export default function VitrineFunisPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const [isCloneDialogOpen, setIsCloneDialogOpen] = useState(false);
  const [funnelToClone, setFunnelToClone] = useState<FunnelShowcaseItem | null>(null);
  const [isCloning, setIsCloning] = useState(false);

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
        // This is a placeholder for getting the actual funnel data.
        // In a real scenario, you'd fetch the full funnel data from a 'template_funnels' collection.
        const originalFunnelData = {
            name: funnelToClone.name,
            type: funnelToClone.type,
            steps: funnelToClone.type === 'typebot' ? [] : [{ id: Date.now(), name: 'Etapa 1', components: [] }],
            isPublished: false,
        };

        const newFunnelName = `${originalFunnelData.name} (Clonado)`;
        
        const newFunnelData = {
            ...originalFunnelData,
            name: newFunnelName,
            slug: generateSlug(newFunnelName),
            userId: user.uid,
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

  const openCloneDialog = (funnel: FunnelShowcaseItem) => {
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {staticFunnels.map((funnel) => (
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
      
      {!staticFunnels || staticFunnels.length === 0 && (
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
