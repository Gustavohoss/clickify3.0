'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Webhook } from 'lucide-react';
import Image from 'next/image';

const gateways = [
  {
    name: 'Kiwify',
    logo: 'https://cdn.worldvectorlogo.com/logos/kiwify-1.svg',
    description: 'Conecte sua conta Kiwify para sincronizar vendas e clientes.'
  },
  {
    name: 'Hotmart',
    logo: 'https://cdn.worldvectorlogo.com/logos/hotmart-1.svg',
    description: 'Sincronize seus produtos e vendas da Hotmart.'
  },
  {
    name: 'PerfectPay',
    logo: 'https://perfectpay.com.br/wp-content/uploads/2022/07/LOGO-PERFECT-PAY-PNG.png',
    description: 'Integre com a PerfectPay para gerenciar suas transações.'
  },
   {
    name: 'Stripe',
    logo: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg',
    description: 'Conecte com o Stripe para processar pagamentos globais.'
  }
];

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Configurações
        </h1>
        <p className="mt-2 text-muted-foreground">
          Gerencie as integrações e configurações da sua conta.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="h-6 w-6" />
            Webhooks de Pagamento
          </CardTitle>
          <CardDescription>
            Conecte seus gateways de pagamento para automatizar o fluxo de dados.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          {gateways.map((gateway) => (
            <Card key={gateway.name} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                 <div className="relative h-12 w-12 flex-shrink-0">
                    <Image 
                        src={gateway.logo} 
                        alt={`${gateway.name} logo`}
                        layout="fill"
                        objectFit="contain"
                    />
                 </div>
                 <div>
                    <CardTitle>{gateway.name}</CardTitle>
                 </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{gateway.description}</p>
                <div className="mt-4">
                  <Label htmlFor={`${gateway.name}-webhook`} className="text-xs">URL do Webhook</Label>
                  <Input id={`${gateway.name}-webhook`} placeholder="Cole a URL do seu webhook aqui" className="mt-1"/>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Salvar</Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
