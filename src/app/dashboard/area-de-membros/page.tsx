'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tv, Package, ArrowRight } from 'lucide-react';

type MemberAreaType = 'netflix' | 'common';

const memberAreaTypes = [
  {
    icon: <Tv className="h-8 w-8" />,
    title: 'Estilo Netflix',
    description: 'Um layout moderno e visual, perfeito para cursos em vídeo.',
    type: 'netflix' as MemberAreaType,
  },
  {
    icon: <Package className="h-8 w-8" />,
    title: 'Área de Membros Comum',
    description: 'Uma estrutura clássica e organizada para diversos tipos de conteúdo.',
    type: 'common' as MemberAreaType,
  },
];

export default function AreaDeMembrosPage() {
  const router = useRouter();

  const handleTypeSelect = (type: MemberAreaType) => {
    // Redireciona para a nova página de criação com o tipo como parâmetro de busca
    router.push(`/dashboard/area-de-membros/novo?type=${type}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Qual estilo de Área de Membros você quer criar?
        </h1>
        <p className="mt-2 text-muted-foreground">
          Escolha um modelo para organizar e entregar seu conteúdo.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {memberAreaTypes.map((area) => (
          <button
            onClick={() => handleTypeSelect(area.type)}
            key={area.title}
            className="block text-left"
          >
            <Card className="group h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:border-primary">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {area.icon}
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">{area.title}</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  {area.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
