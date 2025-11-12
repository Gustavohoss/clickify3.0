'use client';

import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  if (isUserLoading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return null; 
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-4xl p-8 space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>Bem-vindo, {user.email}!</p>
        <Button onClick={handleLogout}>Sair</Button>
      </div>
    </div>
  );
}
