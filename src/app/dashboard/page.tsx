
'use client';

import { useState, useEffect, useMemo } from 'react';
import { BarChart, BookUser, BrainCircuit, DollarSign, Milestone, Settings, ShoppingBag, Users, Zap, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart as RechartsAreaChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy, startAt } from 'firebase/firestore';
import { subDays, format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Earning = {
  date: string; // YYYY-MM-DD
  amount: number;
};

const chartConfig = {
  revenue: {
    label: 'Receita',
    color: 'hsl(var(--primary))',
  },
};

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  
  const [chartData, setChartData] = useState<{ date: string; revenue: number }[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const thirtyDaysAgo = useMemo(() => subDays(new Date(), 30), []);

  const earningsQuery = useMemoFirebase(
    () =>
      user && firestore
        ? query(
            collection(firestore, 'users', user.uid, 'earnings'),
            orderBy('date', 'desc'),
            where('date', '>=', format(thirtyDaysAgo, 'yyyy-MM-dd'))
          )
        : null,
    [firestore, user, thirtyDaysAgo]
  );
  const { data: earningsData } = useCollection<Earning>(earningsQuery);

  const salesQuery = useMemoFirebase(
    () => (user && firestore ? query(collection(firestore, 'users', user.uid, 'sales'), where('status', '==', 'pending')) : null),
    [firestore, user]
  );
  const { data: pendingSales } = useCollection(salesQuery);
  const pendingRevenue = pendingSales?.reduce((sum, sale) => sum + sale.price, 0) || 0;

  useEffect(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), i);
      return {
        fullDate: format(date, 'yyyy-MM-dd'),
        displayDate: format(date, 'dd MMM', { locale: ptBR }),
      };
    }).reverse();

    const newChartData = last30Days.map(day => {
        const earningForDay = earningsData?.find(e => e.date === day.fullDate);
        return {
            date: day.displayDate,
            revenue: earningForDay?.amount || 0,
        };
    });

    setChartData(newChartData);

    const newTotalRevenue = earningsData?.reduce((sum, earning) => sum + earning.amount, 0) || 0;
    setTotalRevenue(newTotalRevenue);
    
  }, [earningsData]);


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
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Faturamento total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatBalance(totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">Faturamento total da sua conta.</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas Pendentes</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatBalance(pendingRevenue)}</div>
                <p className="text-xs text-muted-foreground">{pendingSales?.length || 0} PIX gerados aguardando pagamento.</p>
            </CardContent>
            </Card>
        </div>
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
        <Card>
          <CardHeader>
            <CardTitle>Ganhos</CardTitle>
            <CardDescription>
              Faturamento dos últimos 30 dias.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
              <RechartsAreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator="dot"
                      formatter={(value) =>
                        new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(value as number)
                      }
                    />
                  }
                />
                <Area
                  dataKey="revenue"
                  type="natural"
                  fill="var(--color-revenue)"
                  fillOpacity={0.4}
                  stroke="var(--color-revenue)"
                  stackId="a"
                />
              </RechartsAreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
