
'use client';

import {
  AlertTriangle,
  Plus,
  ArrowLeft,
  Settings,
  Eye,
  Save,
  Rocket,
  PanelLeft,
  MoreVertical,
  GripVertical,
  AudioWaveform,
  MessageSquareText,
  MousePointerClick,
  Loader,
  View,
  TrendingUp,
  GitCompareArrows,
  Sparkles,
  Star,
  LogIn,
  Minus,
  HelpCircle,
  BarChart2,
  Image as ImageIcon,
  List,
  Text,
  CheckSquare,
  ChevronsRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const components = [
  { name: 'Alerta', icon: <AlertTriangle /> },
  { name: 'Argumentos', icon: <MessageSquareText /> },
  { name: 'Audio', icon: <AudioWaveform /> },
  { name: 'Botão', icon: <MousePointerClick /> },
  { name: 'Carregando', icon: <Loader /> },
  { name: 'Carrosel', icon: <View /> },
  { name: 'Cartesiano', icon: <TrendingUp /> },
  { name: 'Comparar', icon: <GitCompareArrows />, isNew: true },
  { name: 'Confetti', icon: <Sparkles />, isNew: true },
  { name: 'Depoimentos', icon: <Star /> },
  { name: 'Entrada', icon: <LogIn /> },
  { name: 'Espaçador', icon: <Minus /> },
  { name: 'FAQ', icon: <HelpCircle />, isNew: true },
  { name: 'Gráficos', icon: <BarChart2 /> },
  { name: 'Imagem', icon: <ImageIcon /> },
  { name: 'Lista', icon: <List />, isNew: true },
  { name: 'Marquise', icon: <ChevronsRight />, isNew: true },
  { name: 'Nível', icon: <TrendingUp /> },
  { name: 'Opções', icon: <CheckSquare /> },
];

function FunnelEditorContent() {
  const searchParams = useSearchParams();
  const funnelName = searchParams.get('name') || 'Novo Funil';

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-border px-4 md:px-6">
        <div className="flex items-center gap-4">
            <PanelLeft className="h-6 w-6 text-muted-foreground" />
            <span className="text-lg font-semibold">{funnelName}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-card p-1">
            <Button variant="secondary" size="sm">Construtor</Button>
            <Button variant="ghost" size="sm">Fluxo</Button>
            <Button variant="ghost" size="sm">Design</Button>
            <Button variant="ghost" size="sm">Leads</Button>
            <Button variant="ghost" size="sm">Configurações</Button>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Eye className="h-5 w-5" /></Button>
            <Button variant="outline" size="sm"><Save className="mr-2 h-4 w-4" />Salvar</Button>
            <Button size="sm"><Rocket className="mr-2 h-4 w-4" />Publicar</Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="flex w-72 flex-col border-r border-border">
          <div className="flex h-14 items-center justify-between border-b border-border px-4">
            <div className="flex items-center gap-2">
              <GripVertical className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold">Etapa 1</h2>
            </div>
            <MoreVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="p-4">
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Etapa
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="grid grid-cols-2 gap-2 p-4">
              {components.map((component) => (
                <Card key={component.name} className="group flex cursor-grab flex-col items-center justify-center p-3 text-center transition-colors hover:bg-primary/10 hover:text-primary">
                   <div className="relative">
                    {component.icon}
                    {component.isNew && <Badge className="absolute -top-2 -right-4 scale-75">Novo</Badge>}
                   </div>
                  <span className="mt-2 text-xs font-medium">{component.name}</span>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Center Canvas */}
        <main className="flex flex-1 items-center justify-center bg-muted/20 p-4">
          <div className="w-full max-w-2xl">
              <div className="flex items-center gap-4 text-muted-foreground">
                <ArrowLeft className="h-5 w-5 cursor-pointer hover:text-foreground" />
                <Separator className="flex-1" />
                <ImageIcon className="h-8 w-8 text-primary" />
                <Separator className="flex-1" />
              </div>
              <div className="mt-8 flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50">
                  <div className="text-center text-muted-foreground">
                    <p className="text-lg">Nada por aqui 😔</p>
                    <p className="text-sm">Adicione um componente para começar.</p>
                  </div>
              </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 border-l border-border p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Título da Etapa</h3>
              <Input defaultValue="Etapa 1" className="mt-2 text-base" />
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Header</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-logo">Mostrar Logo</Label>
                  <Switch id="show-logo" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-progress">Mostrar Progresso</Label>
                  <Switch id="show-progress" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="allow-back">Permitir Voltar</Label>
                  <Switch id="allow-back" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function EditorPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <FunnelEditorContent />
        </Suspense>
    )
}
