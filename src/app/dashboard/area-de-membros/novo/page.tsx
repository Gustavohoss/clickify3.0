'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { File, Sparkles, BookCopy, Folder, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function NovaAreaDeMembrosPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();

  const [workspaceName, setWorkspaceName] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const type = searchParams.get('type') || 'common';

  const handleContinue = async () => {
    if (!workspaceName.trim() || !user) {
      toast({
        variant: 'destructive',
        title: 'Nome é obrigatório',
        description: 'Por favor, dê um nome para sua área de membros.',
      });
      return;
    }

    setIsCreating(true);
    try {
      const memberAreasCol = collection(firestore, 'memberAreas');
      const newAreaDoc = await addDoc(memberAreasCol, {
        name: workspaceName.trim(),
        description: description.trim(),
        type: type,
        slug: generateSlug(workspaceName),
        userId: user.uid,
        createdAt: serverTimestamp(),
        modules: [],
      });
      
      toast({
        title: 'Área de Membros Criada!',
        description: 'Agora você pode começar a adicionar conteúdo.',
      });
      
      // router.push(`/dashboard/area-de-membros/editor/${newAreaDoc.id}`);
       router.push(`/dashboard/area-de-membros`);

    } catch (error) {
      console.error('Error creating member area: ', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao criar',
        description: 'Não foi possível criar a área de membros. Tente novamente.',
      });
      setIsCreating(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s-]+/g, '-');
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-background text-foreground">
      <header className="flex w-full max-w-5xl items-center justify-between p-6">
         <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      </header>
      <main className="w-full max-w-2xl flex-1 px-4 py-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Informações básicas
          </h1>
          <p className="text-muted-foreground">
            Forneça informações básicas sobre sua área de membros.
          </p>
        </div>

        <div className="my-8 space-y-4">
          <Progress value={33} className="w-full" />
          <div className="flex justify-between text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </span>
              <span>Básico</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border">
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
              <File className="h-5 w-5" />
              <Label htmlFor="workspaceName" className="text-base font-semibold">
                Nome da área de membros
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Este será o nome exibido para você e seus membros.
            </p>
            <Input
              id="workspaceName"
              placeholder="Plataforma de Membros"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              maxLength={32}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span className="text-green-400">seudominio.com/{generateSlug(workspaceName)}</span>
              <span>{workspaceName.length}/32 caracteres</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <Label htmlFor="description" className="text-base font-semibold">
                Descrição
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Uma breve descrição do propósito da sua área de membros (opcional).
            </p>
            <Textarea
              id="description"
              placeholder="Descreva o propósito deste espaço"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              className="min-h-[120px]"
            />
             <p className="text-xs text-muted-foreground text-right">
              {description.length}/500 caracteres
            </p>
          </div>

          <div className="space-y-4">
             <div className="flex items-center gap-2">
              <BookCopy className="h-5 w-5" />
              <h3 className="text-base font-semibold">
                Preview
              </h3>
            </div>
            <Card className="bg-card/50 p-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Folder className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <h4 className={cn("font-bold text-lg", !workspaceName && 'text-muted-foreground/50')}>
                            {workspaceName || 'Nome do Curso'}
                        </h4>
                        <p className={cn("mt-1 text-sm text-muted-foreground", !description && 'italic text-muted-foreground/50')}>
                            {description || 'Uma breve descrição sobre o que seus membros encontrarão aqui.'}
                        </p>
                        <p className="mt-4 text-xs text-green-400">
                          seudominio.com/{generateSlug(workspaceName)}
                        </p>
                    </div>
                </div>
            </Card>
          </div>
        </div>

        <div className="mt-12 flex justify-end">
            <Button onClick={handleContinue} disabled={isCreating}>
                {isCreating ? 'Criando...' : 'Continuar'}
            </Button>
        </div>
      </main>
    </div>
  );
}
