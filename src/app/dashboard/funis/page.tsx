'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Milestone } from 'lucide-react';
import Link from 'next/link';

// Placeholder data for existing funnels
const funnels: any[] = [
  // { id: 1, name: 'Funil de E-book Grátis', type: 'Página de Captura', status: 'Ativo' },
  // { id: 2, name: 'Quiz: Qual seu perfil de investidor?', type: 'Quiz', status: 'Inativo' },
];

export default function FunisPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Meus Funis de Vendas 🚀
          </h1>
          <p className="mt-2 text-muted-foreground">
            Crie, personalize e publique seus funis para converter visitantes em clientes.
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/dashboard/funis/novo">
            <PlusCircle className="mr-2 h-5 w-5" />
            Criar Novo Funil
          </Link>
        </Button>
      </div>

      {funnels.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {funnels.map((funnel) => (
            <Card key={funnel.id}>
              <CardHeader>
                <CardTitle>{funnel.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Tipo: {funnel.type}</p>
                <p>Status: {funnel.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center py-20 border-dashed">
          <div className="text-center">
            <div className="flex justify-center mb-4">
               <Milestone className="h-16 w-16 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Nenhum funil por aqui ainda</h3>
            <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
              Comece a construir sua máquina de vendas. Crie seu primeiro funil e veja a mágica acontecer.
            </p>
            <Button asChild>
               <Link href="/dashboard/funis/novo">
                <PlusCircle className="mr-2 h-5 w-5" />
                Criar Primeiro Funil
              </Link>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
