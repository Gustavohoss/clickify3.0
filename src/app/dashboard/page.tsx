
'use client';

import { BarChart, BookUser, BrainCircuit, DollarSign, Milestone, Settings, ShoppingBag, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis } from 'recharts';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

const chartData = [
  { month: 'Jan', desktop: 0 },
  { month: 'Feb', desktop: 0 },
  { month: 'Mar', desktop: 0 },
  { month: 'Apr', desktop: 0 },
  { month: 'May', desktop: 0 },
  { month: 'Jun', desktop: 0 },
];

const chartConfig = {
  desktop: {
    label: 'Progresso',
    color: 'hsl(var(--primary))',
  },
};

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const funnelsQuery = useMemoFirebase(
    () =>
      user && firestore
        ? query(collection(firestore, 'funnels'), where('userId', '==', user.uid))
        : null,
    [firestore, user]
  );

  const { data: funnels } = useCollection(funnelsQuery);
  const funnelCount = funnels?.length || 0;

  const memberAreasQuery = useMemoFirebase(
    () =>
      user && firestore
        ? query(collection(firestore, 'memberAreas'), where('userId', '==', user.uid))
        : null,
    [firestore, user]
  );

  const { data: memberAreas } = useCollection(memberAreasQuery);
  const memberAreasCount = memberAreas?.length || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Seu progresso no Clickify 🚀
        </h1>
        <p className="mt-2 text-muted-foreground">
          Continue avançando — cada clique te aproxima do seu lançamento!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$0,00</div>
            <p className="text-xs text-muted-foreground">Conecte sua plataforma para ver seus ganhos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Criados</CardTitle>
            <BrainCircuit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Nenhum produto criado ainda.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funis Ativos</CardTitle>
            <Milestone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{funnelCount}</div>
            <p className="text-xs text-muted-foreground">
              {funnelCount === 0 ? 'Nenhum funil ativo no momento.' : `${funnelCount} funis criados.`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Áreas de Membros</CardTitle>
            <BookUser className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memberAreasCount}</div>
            <p className="text-xs text-muted-foreground">
              {memberAreasCount === 0 ? 'Nenhuma área de membros criada.' : `${memberAreasCount} áreas criadas.`}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Evolução Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <RechartsBarChart accessibilityLayer data={chartData}>
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            </RechartsBarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
