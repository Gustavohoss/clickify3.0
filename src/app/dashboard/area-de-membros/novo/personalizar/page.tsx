'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Upload, Users, BookCopy, Settings, CheckCircle, Folder } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/landing/logo';

type MemberArea = {
  name: string;
  description: string;
}

export default function PersonalizarWorkspacePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const firestore = useFirestore();
  const { toast } = useToast();
  const areaId = searchParams.get('id');

  const areaRef = areaId ? doc(firestore, 'memberAreas', areaId) : null;
  const { data: areaData, isLoading } = useDoc<MemberArea>(areaRef);

  const [isFinishing, setIsFinishing] = useState(false);

  const handleContinue = async () => {
    setIsFinishing(true);
    // Here you would typically save the logo/customization settings
    toast({
      title: 'Workspace Personalizado!',
      description: 'Sua área de membros está quase pronta.',
    });
    // For now, just navigate to the main members area page
    router.push('/dashboard/area-de-membros');
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-background text-foreground">
      <header className="flex w-full max-w-5xl items-center justify-between p-6">
        <Logo />
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          Voltar ao painel
        </Button>
      </header>
      <main className="w-full max-w-2xl flex-1 px-4 py-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Personalizar workspace
          </h1>
          <p className="text-muted-foreground">
            Adicione um logo e veja como ficará seu workspace.
          </p>
        </div>

        <div className="my-8 space-y-4">
          <div className="flex items-center gap-2">
            <Progress value={67} className="flex-1" />
            <span className="text-sm text-muted-foreground">67% concluído</span>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <div className="flex items-center gap-2 text-primary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </span>
              <span>Básico</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </span>
              <span>Aparência</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border">
                3
              </span>
              <span>Conteúdo</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              <h3 className="text-base font-semibold">Logo do workspace</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Adicione um logo personalizado para seu workspace (opcional).
            </p>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10">
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted/50 mx-auto">
                    <div className="h-8 w-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-md" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold">Como ficará seu workspace</h3>
            <Card className="bg-card/50 p-6 relative">
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>Pronto para criar</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Folder className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">
                    {isLoading ? 'Carregando...' : areaData?.name || 'Nome do Curso'}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {isLoading ? '...' : areaData?.description || 'Olá esse e meu curso'}
                  </p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <Card className="p-4 text-center bg-muted/20">
                  <Users className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-2 text-sm font-semibold">Membros</p>
                  <p className="text-xs text-muted-foreground">Gerencie sua equipe</p>
                </Card>
                <Card className="p-4 text-center bg-muted/20">
                  <BookCopy className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-2 text-sm font-semibold">Cursos</p>
                  <p className="text-xs text-muted-foreground">Crie conteúdo</p>
                </Card>
                <Card className="p-4 text-center bg-muted/20">
                  <Settings className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-2 text-sm font-semibold">Configurações</p>
                  <p className="text-xs text-muted-foreground">Personalize tudo</p>
                </Card>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-12 flex justify-between">
          <Button variant="ghost" onClick={() => router.back()}>Voltar</Button>
          <Button onClick={handleContinue} disabled={isFinishing}>
            {isFinishing ? 'Finalizando...' : 'Continuar'}
          </Button>
        </div>
      </main>
    </div>
  );
}
