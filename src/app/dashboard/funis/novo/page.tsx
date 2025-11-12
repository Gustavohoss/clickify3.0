'use client';

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Bot, FileText, HelpCircle } from "lucide-react";
import Link from "next/link";

const funnelTypes = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: "Página de Venda",
    description: "Crie uma página de alta conversão para vender seu produto diretamente.",
    href: "/dashboard/funis/editor?type=sales-page",
  },
  {
    icon: <Bot className="h-8 w-8" />,
    title: "Typebot",
    description: "Engaje seu público com um chatbot interativo para capturar leads.",
    href: "/dashboard/funis/editor?type=typebot",
  },
  {
    icon: <HelpCircle className="h-8 w-8" />,
    title: "Quiz",
    description: "Qualifique seus leads com um quiz divertido e personalizado.",
    href: "/dashboard/funis/editor?type=quiz",
  },
];

export default function NovoFunilPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Qual tipo de funil você quer criar?
        </h1>
        <p className="mt-2 text-muted-foreground">
          Escolha um modelo para começar a construir sua máquina de vendas.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {funnelTypes.map((funnel) => (
          <Link href={funnel.href} key={funnel.title} className="block">
            <Card className="group transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:border-primary">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                        {funnel.icon}
                    </div>
                    <ArrowRight className="h-6 w-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">{funnel.title}</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">{funnel.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
