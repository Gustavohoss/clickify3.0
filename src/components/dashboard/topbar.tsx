
'use client';

import { useState, useEffect } from 'react';
import { useUser, useAuth, useFirestore, useDoc, doc, useMemoFirebase, useCollection } from '@/firebase';
import { updateDoc, collection, query, orderBy, Timestamp } from 'firebase/firestore';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Menu, Bell } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '../ui/sheet';
import { Sidebar } from './sidebar';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ScrollArea } from '../ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';


type UserData = {
    planId: 'mensal' | 'vitalicio' | '';
    firstName: string;
    lastName: string;
    email: string;
    lastNotificationCheck?: Timestamp;
};

type Notification = {
    id: string;
    title: string;
    description: string;
    createdAt: Timestamp;
    url?: string;
};

export function Topbar() {
  const { user } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const userDocRef = useMemoFirebase(() => (user && firestore ? doc(firestore, 'users', user.uid) : null), [firestore, user]);
  const { data: userData, mutate } = useDoc<UserData>(userDocRef);

  const notificationsQuery = useMemoFirebase(() => (firestore ? query(collection(firestore, 'notifications'), orderBy('createdAt', 'desc')) : null), [firestore]);
  const { data: notifications } = useCollection<Notification>(notificationsQuery);

  const [hasUnread, setHasUnread] = useState(false);
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
    }
  }, [userData]);

  useEffect(() => {
    if (notifications && notifications.length > 0 && userData) {
      const lastCheck = userData.lastNotificationCheck?.toDate();
      const latestNotification = notifications[0].createdAt.toDate();
      if (!lastCheck || latestNotification > lastCheck) {
        setHasUnread(true);
      }
    }
  }, [notifications, userData]);

  const handleNotificationsOpen = async () => {
    if (hasUnread && userDocRef) {
      try {
        await updateDoc(userDocRef, {
          lastNotificationCheck: new Date(),
        });
        setHasUnread(false);
      } catch (error) {
        console.error("Error updating last notification check:", error);
      }
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };
  
  const handleNameChange = async () => {
    if (!user || !firestore || !firstName.trim()) {
        toast({ variant: 'destructive', title: 'Erro', description: 'O nome é obrigatório.' });
        return;
    }
    setIsSaving(true);
    try {
        const userRef = doc(firestore, 'users', user.uid);
        await updateDoc(userRef, {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
        });
        toast({ title: 'Sucesso!', description: 'Seu nome foi atualizado.' });
        mutate(); // Re-fetch user data to update UI
        setIsNameDialogOpen(false);
    } catch (error) {
        toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível atualizar o nome.' });
        console.error(error);
    } finally {
        setIsSaving(false);
    }
  };

  const userInitial = userData?.firstName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U';
  
  const planText = {
    'mensal': 'Plano Mensal',
    'vitalicio': 'Plano Vitalício',
  }

  const displayName = userData ? `${userData.firstName} ${userData.lastName}`.trim() : user?.email?.split('@')[0] || 'Usuário';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-4 sm:px-6">
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
            Olá, {displayName} 👋
            </h1>
            {userData?.planId && (
                 <Badge variant={userData.planId === 'vitalicio' ? 'default' : 'secondary'}>
                    {planText[userData.planId as keyof typeof planText]}
                </Badge>
            )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Popover onOpenChange={(open) => open && handleNotificationsOpen()}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {hasUnread && <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
                <div className="flex items-center justify-between p-2 border-b">
                    <h4 className="font-medium text-sm">Notificações</h4>
                </div>
                <ScrollArea className="h-96">
                    <div className="p-2 space-y-2">
                        {notifications && notifications.length > 0 ? (
                            notifications.map(notification => (
                                <div key={notification.id} className="p-2 rounded-md hover:bg-accent">
                                    <p className="font-semibold text-sm">{notification.title}</p>
                                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {formatDistanceToNow(notification.createdAt.toDate(), { addSuffix: true, locale: ptBR })}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-center text-muted-foreground p-4">Nenhuma notificação nova.</p>
                        )}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>

        <Dialog open={isNameDialogOpen} onOpenChange={setIsNameDialogOpen}>
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
                    <p className="text-sm font-medium leading-none">{displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                    {userData?.email}
                    </p>
                </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Alterar Nome</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Alterar Nome</DialogTitle>
                    <DialogDescription>
                        Atualize seu nome e sobrenome aqui.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="firstName" className="text-right">Nome</Label>
                        <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lastName" className="text-right">Sobrenome</Label>
                        <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsNameDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={handleNameChange} disabled={isSaving}>
                        {isSaving ? 'Salvando...' : 'Salvar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
