
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, FileText, HelpCircle } from 'lucide-react';
import { useAuth, useFirestore, useUser, useCollection, useDoc, doc as firebaseDoc, useMemoFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, where } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

type FunnelType = 'typebot' | 'quiz';

const funnelTypes = [
  {
    icon: <Bot className="h-8 w-8" />,
    title: 'Typebot',
    description: 'Engaje seu público com um chatbot interativo para capturar leads.',
    type: 'typebot' as FunnelType,
  },
  {
    icon: <HelpCircle className="h-8 w-8" />,
    title: 'Quiz',
    description: 'Qualifique seus leads com um quiz divertido e personalizado.',
    type: 'quiz' as FunnelType,
  },
];

const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s-]+/g, '-');
};

type UserData = {
  planId: 'mensal' | 'vitalicio' | '';
};

export default function NovoFunilPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  
  const [selectedFunnel, setSelectedFunnel] = useState<FunnelType | null>(null);
  const [funnelName, setFunnelName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const userDocRef = useMemoFirebase(() => (user ? firebaseDoc(firestore, 'users', user.uid) : null), [firestore, user]);
  const { data: userData } = useDoc<UserData>(userDocRef);

  const funnelsQuery = useMemoFirebase(
    () => (user ? query(collection(firestore, 'funnels'), where('userId', '==', user.uid)) : null),
    [firestore, user]
  );
  const { data: userFunnels } = useCollection(funnelsQuery);

  const handleFunnelSelect = (funnelType: FunnelType) => {
    if (!userData || !userData.planId) {
      toast({
        variant: 'destructive',
        title: 'Plano não definido',
        description: 'Você precisa ter um plano ativo para criar um funil.',
      });
      return;
    }

    const funnelsOfType = userFunnels?.filter(f => f.type === funnelType).length || 0;
    const { planId } = userData;
    
    if (planId === 'mensal' && funnelsOfType >= 1) {
       toast({
        variant: 'destructive',
        title: 'Limite Atingido',
        description: `Você já criou o máximo de 1 funil do tipo "${funnelType}" para o plano mensal.`,
      });
      return;
    }

    if (planId === 'vitalicio' && funnelsOfType >= 5) {
       toast({
        variant: 'destructive',
        title: 'Limite Atingido',
        description: `Você já criou o máximo de 5 funis do tipo "${funnelType}" para o plano vitalício.`,
      });
      return;
    }

    setSelectedFunnel(funnelType);
    setIsDialogOpen(true);
  };

  const handleCreateFunnel = async () => {
    if (!funnelName.trim() || !selectedFunnel || !user || !firestore) {
      toast({ variant: 'destructive', title: 'Erro', description: 'O nome do funil é obrigatório.' });
      return;
    }
    setIsCreating(true);
    try {
      const funnelsCol = collection(firestore, 'funnels');
      const newFunnelDoc = await addDoc(funnelsCol, {
        name: funnelName.trim(),
        slug: generateSlug(funnelName),
        type: selectedFunnel,
        userId: user.uid,
        createdAt: serverTimestamp(),
        steps: selectedFunnel === 'typebot' ? [] : [
          {
            id: Date.now(),
            name: 'Etapa 1',
            components: [],
          },
        ],
      });
      router.push(`/editor/${newFunnelDoc.id}`);
    } catch (error) {
      console.error('Error creating funnel: ', error);
      toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível criar o funil.' });
      setIsCreating(false);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedFunnel(null);
    setFunnelName('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Qual tipo de funil você quer criar?
        </h1>
        <p className="mt-2 text-muted-foreground">
          Escolha um modelo para começar a construir sua máquina de vendas.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {funnelTypes.map((funnel) => (
          <button
            onClick={() => handleFunnelSelect(funnel.type)}
            key={funnel.title}
            className="block text-left"
          >
            <Card className="group h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:border-primary">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {funnel.icon}
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">{funnel.title}</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  {funnel.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </button>
        ))}
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dê um nome ao seu funil</AlertDialogTitle>
            <AlertDialogDescription>
              Este nome ajudará você a identificar seu funil mais tarde.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              placeholder="Ex: Funil de Lançamento"
              value={funnelName}
              onChange={(e) => setFunnelName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFunnel()}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDialog}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleCreateFunnel} asChild>
              <Button disabled={!funnelName.trim() || isCreating}>
                {isCreating ? 'Criando...' : 'Criar Funil'}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
