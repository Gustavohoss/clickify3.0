"use client";

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const plans = {
  monthly: [
    {
      name: 'Free',
      price: 'R$0',
      period: 'para sempre',
      description: 'Para quem está começando e quer testar a plataforma.',
      features: ['1 funil de vendas', 'Geração de produtos com IA (básico)', 'Watermark Clickify'],
      cta: 'Começar Grátis',
      popular: false,
    },
    {
      name: 'Pro',
      price: 'R$47',
      period: '/mês',
      description: 'Para criadores que querem escalar com IA avançada.',
      features: ['5 funis de vendas', 'IA avançada para produtos e copy', 'Integrações', 'Sem watermark'],
      cta: 'Assinar Pro',
      popular: true,
    },
    {
      name: 'Premium',
      price: 'Custom',
      period: '',
      description: 'Para negócios que precisam de performance máxima.',
      features: ['Funis ilimitados', 'Mentor IA dedicado', 'Suporte prioritário', 'API Access'],
      cta: 'Fale com vendas',
      popular: false,
    },
  ],
  annual: [
    {
      name: 'Free',
      price: 'R$0',
      period: 'para sempre',
      description: 'Para quem está começando e quer testar a plataforma.',
      features: ['1 funil de vendas', 'Geração de produtos com IA (básico)', 'Watermark Clickify'],
      cta: 'Começar Grátis',
      popular: false,
    },
    {
      name: 'Pro',
      price: 'R$37',
      period: '/mês',
      description: 'Economize 20% com o plano anual.',
      features: ['5 funis de vendas', 'IA avançada para produtos e copy', 'Integrações', 'Sem watermark'],
      cta: 'Assinar Pro Anual',
      popular: true,
    },
    {
      name: 'Premium',
      price: 'Custom',
      period: '',
      description: 'Para negócios que precisam de performance máxima.',
      features: ['Funis ilimitados', 'Mentor IA dedicado', 'Suporte prioritário', 'API Access'],
      cta: 'Fale com vendas',
      popular: false,
    },
  ]
};

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const currentPlans = plans[billingCycle];

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Um plano para cada etapa da sua jornada
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Comece de graça e evolua conforme seu negócio cresce. Sem pegadinhas.
          </p>
        </div>

        <div className="mt-8 flex justify-center items-center gap-4">
          <Label htmlFor="billing-cycle">Mensal</Label>
          <Switch
            id="billing-cycle"
            checked={billingCycle === 'annual'}
            onCheckedChange={(checked) => setBillingCycle(checked ? 'annual' : 'monthly')}
          />
          <Label htmlFor="billing-cycle">Anual (20% off)</Label>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {currentPlans.map((plan) => (
            <Card key={plan.name} className={cn('flex flex-col', plan.popular ? 'border-primary ring-2 ring-primary shadow-lg' : '')}>
              {plan.popular && <Badge className="absolute -top-3 right-4">Mais Popular</Badge>}
              <CardHeader>
                <CardTitle className="text-2xl font-headline">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="flex items-baseline gap-2 pt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
