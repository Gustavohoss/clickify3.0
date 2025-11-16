'use client';

import { Settings, BookOpen, Store, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Logo } from '@/components/landing/logo';
import { useDoc, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

type MemberArea = {
  name: string;
};

export default function WorkspaceEditorPage() {
  const router = useRouter();
  const { areaId } = useParams() as { areaId: string };
  const { user } = useUser();
  const firestore = useFirestore();

  const areaRef = useMemoFirebase(
    () => (areaId && firestore ? doc(firestore, 'memberAreas', areaId) : null),
    [firestore, areaId]
  );
  const { data: areaData, isLoading } = useDoc<MemberArea>(areaRef);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="flex w-full items-center justify-between p-6">
        <Logo />
        <Avatar>
          <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Bem-vindo ao seu Workspace
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Siga os passos abaixo para deixar tudo pronto rapidamente.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="flex flex-col items-center justify-center p-6 text-center bg-card/50">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Configurar Workspace</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Ajuste nome, logo e preferências.
              </p>
              <Button variant="outline" className="w-full">
                Abrir configurações
              </Button>
            </Card>

            <Card className="flex flex-col items-center justify-center p-6 text-center bg-card/50">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Criar primeiro curso</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Adicione módulos e aulas em minutos.
              </p>
              <Button variant="outline" className="w-full">
                Criar curso
              </Button>
            </Card>

            <Card className="flex flex-col items-center justify-center p-6 text-center bg-card/50">
              <div className="flex items-center gap-3 mb-4">
                <Store className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Criar vitrine</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Monte a página de apresentação dos cursos.
              </p>
              <Button variant="outline" className="w-full">
                Criar vitrine
              </Button>
            </Card>
          </div>
          
          <p className="mt-12 text-sm text-muted-foreground flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4" /> Você pode voltar a este guia quando quiser.
          </p>
        </div>
      </main>

      <footer className="w-full p-6 border-t border-border/50">
         <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-6">
            <Logo />
             <div className="flex gap-4">
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                    Termos de Uso
                </Link>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                    Política de Privacidade
                </Link>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                    Suporte
                </Link>
             </div>
           </div>
           <div className="flex items-center gap-4">
             <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {areaData?.name || 'LaunchMe'}. Todos os direitos reservados.</p>
           </div>
        </div>
      </footer>
    </div>
  );
}
