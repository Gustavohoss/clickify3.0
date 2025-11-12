
'use client';

import React, { Suspense, useState, ReactNode } from 'react';
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
  ImageIcon,
  List,
  Text as TextIcon,
  CheckSquare,
  ChevronsRight,
  Quote,
  TextCursorInput,
  SlidersHorizontal,
  Rows,
  DollarSign,
  FileCode,
  FileText as FileTextIcon,
  Heading1,
  Video,
  Check,
  XCircle,
  CheckCircle,
  Info,
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';


type ComponentType = {
  name: string;
  icon: ReactNode;
  isNew?: boolean;
};

type AlertModel = 'success' | 'error' | 'warning' | 'info';

const modelColors: Record<AlertModel, { backgroundColor: string; textColor: string; borderColor: string }> = {
    success: { backgroundColor: '#D1FAE5', textColor: '#065F46', borderColor: '#10B981' },
    error: { backgroundColor: '#FEE2E2', textColor: '#991B1B', borderColor: '#EF4444' },
    warning: { backgroundColor: '#FEF3C7', textColor: '#92400E', borderColor: '#F59E0B' },
    info: { backgroundColor: '#DBEAFE', textColor: '#1E40AF', borderColor: '#3B82F6' },
};

const modelIcons: Record<AlertModel, ReactNode> = {
    success: <CheckCircle />,
    error: <XCircle />,
    warning: <AlertTriangle />,
    info: <Info />,
};


type ComponentProps = {
  // Common properties for all components
  [key: string]: any; 
  // Specific properties for Alert
  title?: string;
  description?: string;
  model?: AlertModel;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  icon?: ReactNode;
};

type CanvasComponentData = ComponentType & { 
  id: number;
  props: ComponentProps;
};

const components: ComponentType[] = [
  { name: 'Alerta', icon: <AlertTriangle /> },
  { name: 'Argumentos', icon: <MessageSquareText /> },
  { name: 'Audio', icon: <AudioWaveform /> },
  { name: 'Botão', icon: <MousePointerClick /> },
  { name: 'Carregando', icon: <Loader /> },
  { name: 'Carrosel', icon: <View /> },
  { name: 'Cartesiano', icon: <TrendingUp /> },
  { name: 'Comparar', icon: <GitCompareArrows />, isNew: true },
  { name: 'Confetti', icon: <Sparkles />, isNew: true },
  { name: 'Depoimentos', icon: <Quote /> },
  { name: 'Entrada', icon: <TextCursorInput /> },
  { name: 'Espaçador', icon: <Rows /> },
  { name: 'FAQ', icon: <HelpCircle />, isNew: true },
  { name: 'Gráficos', icon: <BarChart2 /> },
  { name: 'Imagem', icon: <ImageIcon /> },
  { name: 'Lista', icon: <List />, isNew: true },
  { name: 'Marquise', icon: <ChevronsRight />, isNew: true },
  { name: 'Nível', icon: <SlidersHorizontal /> },
  { name: 'Opções', icon: <CheckSquare /> },
  { name: 'Preço', icon: <DollarSign /> },
  { name: 'Script', icon: <FileCode /> },
  { name: 'Termos', icon: <FileTextIcon /> },
  { name: 'Texto', icon: <TextIcon /> },
  { name: 'Título', icon: <Heading1 /> },
  { name: 'Video', icon: <Video /> },
];

const GenericCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  return (
    <Card className="p-4 flex items-center gap-4 bg-muted/20">
      <div className='text-primary'>{component.icon}</div>
      <p className="font-semibold">{component.name}</p>
    </Card>
  );
};

const AlertCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
    const { title, description, backgroundColor, textColor, borderColor, icon } = component.props;
    const IconComponent = icon || <Check className="h-4 w-4" />;

    return (
        <Alert 
            style={{
                backgroundColor: backgroundColor,
                borderColor: borderColor
            }}
        >
            {React.cloneElement(IconComponent as React.ReactElement, { className: "h-5 w-5", style: { color: textColor } })}
            <AlertTitle style={{ color: textColor }}>{title || 'Título do Alerta'}</AlertTitle>
            <AlertDescription style={{ color: textColor }}>
                {description || 'Esta é a descrição do alerta.'}
            </AlertDescription>
        </Alert>
    )
}

const CanvasComponent = ({ component, isSelected, onClick }: { component: CanvasComponentData, isSelected: boolean, onClick: () => void }) => {
  const renderComponent = () => {
    switch (component.name) {
      case 'Alerta':
        return <AlertCanvasComponent component={component} />;
      default:
        return <GenericCanvasComponent component={component} />;
    }
  };
    
  return (
      <div 
        className={cn("p-1 rounded-lg cursor-pointer", isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background")}
        onClick={onClick}
      >
          {renderComponent()}
      </div>
  );
};

const StepSettings = () => (
    <>
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
    </>
);

const AlertSettings = ({ component, onUpdate }: { component: CanvasComponentData, onUpdate: (props: ComponentProps) => void }) => {

  const handleModelChange = (model: AlertModel) => {
    const colors = modelColors[model];
    const icon = modelIcons[model];
    onUpdate({ ...component.props, model, ...colors, icon });
  };
    
  return (
    <div className='space-y-6'>
       <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Informações</h3>
        <div className="space-y-3">
            <div>
              <Label htmlFor="title" className='text-xs'>Título</Label>
              <Input
                id="title"
                value={component.props.title || ''}
                onChange={(e) => onUpdate({ ...component.props, title: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description" className='text-xs'>Descrição</Label>
              <Textarea
                id="description"
                value={component.props.description || ''}
                onChange={(e) => onUpdate({ ...component.props, description: e.target.value })}
                className="mt-1"
              />
            </div>
        </div>
      </Card>
      
      <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Estilo</h3>
         <div>
            <Label htmlFor="model" className='text-xs'>Modelo</Label>
            <Select
              value={component.props.model || 'success'}
              onValueChange={(value: AlertModel) => handleModelChange(value)}
            >
              <SelectTrigger id="model" className="mt-1">
                <SelectValue placeholder="Selecione o modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="success">Sucesso</SelectItem>
                <SelectItem value="error">Erro</SelectItem>
                <SelectItem value="warning">Aviso</SelectItem>
                <SelectItem value="info">Informação</SelectItem>
              </SelectContent>
            </Select>
          </div>
      </Card>

      <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
            <div className='space-y-1'>
                <Label htmlFor='color' className='text-xs'>Cor</Label>
                <Input 
                    type='color' 
                    id='color' 
                    className='p-1 h-8' 
                    value={component.props.backgroundColor || '#ffffff'}
                    onChange={(e) => onUpdate({ ...component.props, backgroundColor: e.target.value })}
                />
            </div>
            <div className='space-y-1'>
                <Label htmlFor='text-color' className='text-xs'>Texto</Label>
                <Input 
                    type='color' 
                    id='text-color' 
                    className='p-1 h-8'
                    value={component.props.textColor || '#000000'}
                    onChange={(e) => onUpdate({ ...component.props, textColor: e.target.value })}
                />
            </div>
            <div className='space-y-1'>
                <Label htmlFor='border-color' className='text-xs'>Borda</Label>
                <Input 
                    type='color' 
                    id='border-color' 
                    className='p-1 h-8'
                    value={component.props.borderColor || '#000000'}
                    onChange={(e) => onUpdate({ ...component.props, borderColor: e.target.value })}
                />
            </div>
        </div>
      </Card>

    </div>
  )
}

const ComponentSettings = ({ component, onUpdate }: { component: CanvasComponentData | null, onUpdate: (id: number, props: ComponentProps) => void }) => {
    if (!component) return <div className="text-sm text-muted-foreground">Selecione um componente para editar.</div>;

    const handleUpdate = (props: ComponentProps) => {
      onUpdate(component.id, props);
    };

    const renderSettings = () => {
      switch (component.name) {
        case 'Alerta':
          return <AlertSettings component={component} onUpdate={handleUpdate} />;
        default:
          return <p className="text-sm text-muted-foreground">Opções de configuração para o componente {component.name} aparecerão aqui.</p>;
      }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Editando: {component.name}</h3>
            {renderSettings()}
        </div>
    );
};


function FunnelEditorContent() {
  const searchParams = useSearchParams();
  const funnelName = searchParams.get('name') || 'Novo Funil';
  const [canvasComponents, setCanvasComponents] = useState<CanvasComponentData[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(null);

  const addComponentToCanvas = (component: ComponentType) => {
    let defaultProps: ComponentProps = {};
    if (component.name === 'Alerta') {
      const model: AlertModel = 'success';
      defaultProps = {
        title: 'Sucesso!',
        description: 'Seu item foi salvo com sucesso.',
        model: model,
        ...modelColors[model],
        icon: modelIcons[model],
      };
    }
    const newComponent: CanvasComponentData = { 
        ...component, 
        id: Date.now(),
        props: defaultProps
    };
    setCanvasComponents(prev => [...prev, newComponent]);
  };

  const updateComponentProps = (id: number, props: ComponentProps) => {
    setCanvasComponents(prev =>
      prev.map(c => (c.id === id ? { ...c, props } : c))
    );
  };

  const selectedComponent = canvasComponents.find(c => c.id === selectedComponentId) || null;

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
        <aside className="flex border-r border-border">
          {/* Steps Column */}
          <div className="w-60 flex-col border-r border-border">
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
          </div>
          
          {/* Components Column */}
          <div className="w-72 flex-col">
            <ScrollArea className="h-full">
              <div className="grid grid-cols-2 gap-2 p-4">
                {components.map((component) => (
                  <Card 
                    key={component.name} 
                    className="group flex cursor-pointer flex-col items-center justify-center p-3 text-center transition-colors hover:bg-primary/10 hover:text-primary"
                    onClick={() => addComponentToCanvas(component)}
                    >
                    <div className="relative text-primary">
                      {component.icon}
                      {component.isNew && <Badge className="absolute -top-2 -right-4 scale-75">Novo</Badge>}
                    </div>
                    <span className="mt-2 text-xs font-medium">{component.name}</span>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4" onClick={() => setSelectedComponentId(null)}>
            <div className="mx-auto w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-4 text-muted-foreground">
                    <ArrowLeft className="h-5 w-5 cursor-pointer hover:text-foreground" />
                    <Separator className="flex-1" />
                    <ImageIcon className="h-8 w-8 text-primary" />
                    <Separator className="flex-1" />
                </div>
                <div className="mt-8 flex min-h-[400px] flex-col gap-4 rounded-lg border-2 border-dashed border-border bg-card/50 p-4">
                    {canvasComponents.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-center text-muted-foreground">
                            <div>
                                <p className="text-lg">Nada por aqui 😔</p>
                                <p className="text-sm">Clique em um componente para começar.</p>
                            </div>
                        </div>
                    ) : (
                        canvasComponents.map((comp) => (
                            <CanvasComponent 
                                key={comp.id} 
                                component={comp} 
                                isSelected={selectedComponentId === comp.id}
                                onClick={() => setSelectedComponentId(comp.id)}
                            />
                        ))
                    )}
                </div>
            </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 border-l border-border p-6">
          <div className="space-y-6">
            {selectedComponent ? (
                <ComponentSettings component={selectedComponent} onUpdate={updateComponentProps} />
            ) : (
                <StepSettings />
            )}
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
