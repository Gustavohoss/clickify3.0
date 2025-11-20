
'use client';

import { BarChart, BookUser, BrainCircuit, DollarSign, Milestone, Settings, ShoppingBag, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart as RechartsAreaChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useCollection, useFirestore, useUser, useMemoFirebase, useDoc, doc } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

const chartData = [
    { date: '19 out', revenue: 0 },
    { date: '22 out', revenue: 0 },
    { date: '25 out', revenue: 0 },
    { date: '28 out', revenue: 0 },
    { date: '31 out', revenue: 0 },
    { date: '03 nov', revenue: 0 },
    { date: '06 nov', revenue: 0 },
    { date: '09 nov', revenue: 0 },
    { date: '12 nov', revenue: 0 },
    { date: '15 nov', revenue: 0 },
    { date: '18 nov', revenue: 0 },
];

const chartConfig = {
  revenue: {
    label: 'Receita',
    color: 'hsl(var(--primary))',
  },
};

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user && firestore ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userData } = useDoc(userDocRef);

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

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(balance);
  }

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

      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData ? formatBalance(userData.balance) : 'R$0,00'}</div>
            <p className="text-xs text-muted-foreground">{userData ? 'Faturamento total da sua conta.' : 'Conecte sua plataforma para ver seus ganhos.'}</p>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>R$ 0,00</CardTitle>
          <CardDescription>Receita líquida</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <RechartsAreaChart accessibilityLayer data={chartData}>
               <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `R$ ${value}`}
                hide
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent 
                    indicator="dot"
                    formatter={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value as number)}
                />}
              />
              <Area dataKey="revenue" type="monotone" fill="url(#colorRevenue)" stroke="var(--color-revenue)" stackId="a" />
            </RechartsAreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
