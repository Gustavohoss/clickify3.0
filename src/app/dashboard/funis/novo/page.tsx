'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, FileText, HelpCircle } from "lucide-react";

type FunnelType = 'sales-page' | 'typebot' | 'quiz';

const funnelTypes = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: "Página de Venda",
    description: "Crie uma página de alta conversão para vender seu produto diretamente.",
    type: "sales-page" as FunnelType,
  },
  {
    icon: <Bot className="h-8 w-8" />,
    title: "Typebot",
    description: "Engaje seu público com um chatbot interativo para capturar leads.",
    type: "typebot" as FunnelType,
  },
  {
    icon: <HelpCircle className="h-8 w-8" />,
    title: "Quiz",
    description: "Qualifique seus leads com um quiz divertido e personalizado.",
    type: "quiz" as FunnelType,
  },
];

export default function NovoFunilPage() {
  const router = useRouter();
  const [selectedFunnel, setSelectedFunnel] = useState<FunnelType | null>(null);
  const [funnelName, setFunnelName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFunnelSelect = (funnelType: FunnelType) => {
    setSelectedFunnel(funnelType);
    setIsDialogOpen(true);
  };

  const handleCreateFunnel = () => {
    if (funnelName.trim() && selectedFunnel) {
      router.push(`/dashboard/funis/editor?type=${selectedFunnel}&name=${encodeURIComponent(funnelName.trim())}`);
    }
    // TODO: Add toast notification for empty name
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedFunnel(null);
    setFunnelName("");
  }


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
          <button onClick={() => handleFunnelSelect(funnel.type)} key={funnel.title} className="block text-left">
            <Card className="group transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:border-primary h-full">
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
          </button>
        ))}
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dê um nome ao seu funil</AlertDialogTitle>
            <AlertDialogDescription>
              Este nome ajudará você a identificar seu funil mais tarde.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input 
              placeholder="Ex: Funil de Lançamento"
              value={funnelName}
              onChange={(e) => setFunnelName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFunnel()}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDialog}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleCreateFunnel} asChild>
                <Button disabled={!funnelName.trim()}>Criar Funil</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
