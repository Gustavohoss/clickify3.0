
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Copy, Gift, Milestone, Eye, ExternalLink } from 'lucide-react';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, doc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { staticShowcaseFunnels, type ShowcaseFunnelItem } from '@/lib/showcase-funnels-data';
import Link from 'next/link';
import { TypebotPublicViewer } from '@/components/editor/TypebotPublicViewer';
import { QuizPublicViewer } from '@/components/editor/QuizPublicViewer';


export default function VitrineFunisPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const [isCloneDialogOpen, setIsCloneDialogOpen] = useState(false);
  const [funnelToClone, setFunnelToClone] = useState<ShowcaseFunnelItem | null>(null);
  const [isCloning, setIsCloning] = useState(false);
  const [previewFunnel, setPreviewFunnel] = useState<ShowcaseFunnelItem | null>(null);

  // This still fetches dynamic funnels from your DB
  const showcaseFunnelsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'showcaseFunnels') : null),
    [firestore]
  );
  const { data: dynamicShowcaseFunnels, isLoading } = useCollection<ShowcaseFunnelItem>(showcaseFunnelsQuery);

  // Combine static and dynamic funnels for display
  const [allFunnels, setAllFunnels] = useState<ShowcaseFunnelItem[]>(staticShowcaseFunnels);

  useEffect(() => {
    if (dynamicShowcaseFunnels) {
      const combined = [...staticShowcaseFunnels];
      const staticIds = new Set(staticShowcaseFunnels.map(p => p.id));
      dynamicShowcaseFunnels.forEach(df => {
        if (!staticIds.has(df.id)) {
          combined.push(df);
        }
      });
      setAllFunnels(combined);
    }
  }, [dynamicShowcaseFunnels]);


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
        let originalFunnelData;

        // **THE FIX IS HERE**
        // Check if the funnel to clone is one of our static, independent models
        const staticFunnel = staticShowcaseFunnels.find(f => f.id === funnelToClone.id);

        if (staticFunnel && staticFunnel.funnelData) {
            // If it's a static funnel, use its embedded data directly
            originalFunnelData = staticFunnel.funnelData;
        } else {
            // Otherwise, fetch it from the 'funnels' collection (for user-shared funnels)
            const originalFunnelRef = doc(firestore, 'funnels', funnelToClone.id);
            const originalFunnelSnap = await getDoc(originalFunnelRef);
            
            if (!originalFunnelSnap.exists()) {
                 toast({ variant: 'destructive', title: 'Erro ao clonar', description: 'O modelo de funil original não foi encontrado. Pode ter sido excluído.' });
                 setIsCloning(false);
                 return;
            }
            originalFunnelData = originalFunnelSnap.data();
        }

        const newFunnelName = `${originalFunnelData.name} (Clonado)`;
        
        const newFunnelData = {
            ...originalFunnelData,
            name: newFunnelName,
            slug: generateSlug(newFunnelName),
            userId: user.uid, // Assign to the current user
            isPublished: false, // Start as a draft
            createdAt: serverTimestamp(),
        };

        const funnelsCol = collection(firestore, 'funnels');
        const newFunnelDoc = await addDoc(funnelsCol, newFunnelData);
        
        toast({ title: 'Funil Clonado!', description: 'O novo funil foi adicionado à sua lista em "Meus Funis".' });
        router.push(`/editor/${newFunnelDoc.id}`);

    } catch (error) {
        console.error('Error cloning funnel: ', error);
        toast({ variant: 'destructive', title: 'Erro ao clonar', description: 'Ocorreu um problema inesperado. Tente novamente.' });
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

  const openPreviewDialog = (funnel: ShowcaseFunnelItem) => {
    setPreviewFunnel(funnel);
  };

  const closePreviewDialog = () => {
    setPreviewFunnel(null);
  };

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

      {!isLoading && allFunnels && allFunnels.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allFunnels.map((funnel) => (
            <Card key={funnel.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="relative w-full h-48 bg-muted">
                <Image src={funnel.imageUrl} alt={funnel.name} layout="fill" objectFit="cover" />
                 <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full capitalize">{funnel.type}</div>
              </div>
              <CardHeader>
                <CardTitle>{funnel.name}</CardTitle>
                <CardDescription>{funnel.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto grid grid-cols-2 gap-2">
                 <Button variant="outline" onClick={() => openPreviewDialog(funnel)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Funil
                </Button>
                <Button className="w-full" onClick={() => openCloneDialog(funnel)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Clonar
                </Button>
                 {funnel.exampleUrl && (
                  <Button asChild className="col-span-2">
                    <Link href={funnel.exampleUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver exemplo de conteúdo
                    </Link>
                  </Button>
                )}
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
                        Isto criará uma cópia editável deste funil na sua conta. Tem certeza que deseja continuar?
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
        
         <Dialog open={!!previewFunnel} onOpenChange={(open) => !open && closePreviewDialog()}>
          <DialogContent className="max-w-4xl w-full h-[90vh] p-0 bg-gray-900 border-gray-700">
            <DialogHeader className="sr-only">
              <DialogTitle>Pré-visualização: {previewFunnel?.name}</DialogTitle>
            </DialogHeader>
            <div className="w-full h-full">
              {previewFunnel?.type === 'typebot' && <TypebotPublicViewer funnelId={previewFunnel.id} />}
              {previewFunnel?.type === 'quiz' && <QuizPublicViewer funnel={previewFunnel.funnelData} />}
            </div>
          </DialogContent>
        </Dialog>
    </div>
  );
}
