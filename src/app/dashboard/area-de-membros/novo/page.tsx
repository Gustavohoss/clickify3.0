'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { File, Sparkles } from 'lucide-react';

export default function NovaAreaDeMembrosPage() {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState('');
  const [description, setDescription] = useState('');

  const handleContinue = () => {
    // Lógica para salvar e ir para a próxima etapa
    console.log({ workspaceName, description });
    // router.push('/dashboard/area-de-membros/novo/passo-2');
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-background text-foreground">
      <header className="flex w-full max-w-5xl items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 7L12 12L22 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 22V12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-semibold">LaunchMe Members</span>
        </div>
      </header>
      <main className="w-full max-w-2xl flex-1 px-4 py-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Informações básicas
          </h1>
          <p className="text-muted-foreground">
            Forneça informações básicas sobre o seu workspace.
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
                Nome do workspace
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
            <p className="text-xs text-muted-foreground text-right">
              {workspaceName.length}/32 caracteres
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <Label htmlFor="description" className="text-base font-semibold">
                Descrição
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Uma breve descrição do propósito do seu workspace (opcional).
            </p>
            <Textarea
              id="description"
              placeholder="Descreva o propósito deste workspace"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              className="min-h-[120px]"
            />
             <p className="text-xs text-muted-foreground text-right">
              {description.length}/500 caracteres
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-end">
            <Button onClick={handleContinue}>Continuar</Button>
        </div>
      </main>
    </div>
  );
}
