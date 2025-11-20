'use client';

import { useUser, useAuth, useFirestore, useDoc, doc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Zap } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '../ui/sheet';
import { Sidebar } from './sidebar';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';


type UserData = {
    planId: 'mensal' | 'vitalicio' | '';
};

export function Topbar() {
  const { user } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  
  const userDocRef = useMemoFirebase(() => (user && firestore ? doc(firestore, 'users', user.uid) : null), [firestore, user]);
  const { data: userData } = useDoc<UserData>(userDocRef);


  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  const userInitial = user?.email?.charAt(0).toUpperCase() || 'U';
  
  const planText = {
    'mensal': 'Plano Mensal',
    'vitalicio': 'Plano Vitalício',
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Navegação principal do painel</SheetDescription>
                </SheetHeader>
                <Sidebar className="flex h-full" />
            </SheetContent>
        </Sheet>
        <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-muted-foreground">
            Olá, {user?.displayName || user?.email?.split('@')[0] || 'Usuário'} 👋
            </h1>
            {userData?.planId && (
                 <Badge variant={userData.planId === 'vitalicio' ? 'default' : 'secondary'}>
                    {planText[userData.planId as keyof typeof planText]}
                </Badge>
            )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.photoURL || ''} alt="User Avatar" />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.displayName || 'Usuário'}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
