'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Logo } from '@/components/landing/logo';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type MemberArea = {
  name: string;
  description: string;
};

export default function ConfirmacaoWorkspacePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const firestore = useFirestore();
  const { toast } = useToast();
  const areaId = searchParams.get('id');

  const [isCreating, setIsCreating] = useState(false);

  const areaRef = useMemoFirebase(
    () => (areaId && firestore ? doc(firestore, 'memberAreas', areaId) : null),
    [firestore, areaId]
  );

  const { data: areaData, isLoading } = useDoc<MemberArea>(areaRef);

  const handleCreateWorkspace = () => {
    setIsCreating(true);
    // Here you would perform the final creation logic.
    // For now, we'll just show a toast and redirect.
    toast({
      title: 'Workspace Criado com Sucesso!',
      description: 'Seu novo espaço está pronto para ser explorado.',
    });
    router.push(`/dashboard/area-de-membros/editor/${areaId}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-background text-foreground">
      <header className="flex w-full max-w-5xl items-center justify-start p-6">
        <Logo />
      </header>
      <main className="w-full max-w-2xl flex-1 px-4 py-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Workspace criado com sucesso!
          </h1>
          <p className="text-muted-foreground">Seu workspace está pronto para uso.</p>
        </div>

        <div className="my-8 space-y-4">
          <div className="flex items-center gap-2">
            <Progress value={100} className="flex-1" />
            <span className="text-sm text-muted-foreground">100% concluído</span>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <div className="flex items-center gap-2 text-primary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">1</span>
              <span>Básico</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">2</span>
              <span>Aparência</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">3</span>
              <span>Conteúdo</span>
            </div>
          </div>
        </div>
        
        <div className="text-center my-12 space-y-4">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-500/10 border-2 border-green-500 text-green-500">
                <CheckCircle className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold">Tudo pronto!</h2>
            <p className="text-muted-foreground">
              Seu workspace <span className="font-bold text-foreground">{areaData?.name || ''}</span> está configurado e pronto para ser criado.
            </p>
        </div>

        <Card className="bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-6">
             <Sparkles className="h-5 w-5 text-primary" />
             <h3 className="font-semibold text-lg">Resumo da configuração</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Nome do workspace</span>
                <span className="font-semibold text-foreground">{isLoading ? 'Carregando...' : areaData?.name}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Descrição</span>
                <span className="font-semibold text-foreground">{isLoading ? '...' : areaData?.description}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Sua função</span>
                <span className="font-semibold text-foreground text-green-400">Proprietário</span>
            </div>
          </div>
        </Card>

        <div className="mt-12 flex justify-between">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Button onClick={handleCreateWorkspace} disabled={isCreating}>
            {isCreating ? 'Criando...' : 'Criar workspace'}
          </Button>
        </div>
      </main>
    </div>
  );
}
