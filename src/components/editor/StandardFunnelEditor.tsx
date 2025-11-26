'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Settings,
  Eye,
  Save,
  Rocket,
  Plus,
  MoreVertical,
  Trash2,
  Wand2,
  Combine,
  Brush,
  Users,
  Smartphone,
  ImageIcon,
  ArrowRight,
  ClipboardCopy,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Copy,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label as UILabel } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { StepSettings } from './settings/StepSettings';
import { ComponentSettings } from './settings/ComponentSettings';
import { DesignSettings } from './settings/DesignSettings';
import { FunnelSettings } from './settings/FunnelSettings';
import { CanvasComponent } from './canvas/CanvasComponent';
import { components, type ComponentType, type Funnel, type Step, type EditorView, type CanvasComponentData, type ComponentProps, modelColors, modelIcons } from './types.tsx';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog.tsx';

import { GenericCanvasComponent } from './canvas/GenericCanvasComponent';
import { AlertCanvasComponent } from './canvas/AlertCanvasComponent';
import { ArgumentoCanvasComponent } from './canvas/ArgumentoCanvasComponent';
import { AudioCanvasComponent } from './canvas/AudioCanvasComponent';
import { BotaoCanvasComponent } from './canvas/BotaoCanvasComponent';
import { CarregandoCanvasComponent } from './canvas/CarregandoCanvasComponent';
import { CarroselCanvasComponent } from './canvas/CarroselCanvasComponent';
import { CartesianoCanvasComponent } from './canvas/CartesianoCanvasComponent';
import { CompararCanvasComponent } from './canvas/CompararCanvasComponent';
import { ConfettiCanvasComponent } from './canvas/ConfettiCanvasComponent';
import { DepoimentosCanvasComponent } from './canvas/DepoimentosCanvasComponent';
import { EntradaCanvasComponent } from './canvas/EntradaCanvasComponent';
import { EspacadorCanvasComponent } from './canvas/EspacadorCanvasComponent';
import { FaqCanvasComponent } from './canvas/FaqCanvasComponent';
import { GraficosCanvasComponent } from './canvas/GraficosCanvasComponent';
import { ImagemCanvasComponent } from './canvas/ImagemCanvasComponent';
import { ListaCanvasComponent } from './canvas/ListaCanvasComponent';
import { MarquiseCanvasComponent } from './canvas/MarquiseCanvasComponent';
import { NivelCanvasComponent } from './canvas/NivelCanvasComponent';
import { OpcoesCanvasComponent } from './canvas/OpcoesCanvasComponent';
import { PrecoCanvasComponent } from './canvas/PrecoCanvasComponent';
import { TermosCanvasComponent } from './canvas/TermosCanvasComponent';
import { TextoCanvasComponent } from './canvas/TextoCanvasComponent';
import { VideoCanvasComponent } from './canvas/VideoCanvasComponent';
import Image from 'next/image';
import { Progress } from '../ui/progress.tsx';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu.tsx';

// Read-only version of CanvasComponent for the preview
export const PreviewCanvasComponent = ({
  component,
  onNextStep,
  onGoToStep,
}: {
  component: CanvasComponentData;
  onNextStep?: () => void;
  onGoToStep?: (stepId: number) => void;
}) => {
  const renderComponent = () => {
    switch (component.name) {
      case 'Alerta': return <AlertCanvasComponent component={component} />;
      case 'Argumentos': return <ArgumentoCanvasComponent component={component} />;
      case 'Audio': return <AudioCanvasComponent component={component} />;
      case 'Botão': return <BotaoCanvasComponent component={component} onNextStep={onNextStep} onGoToStep={onGoToStep} />;
      case 'Carregando': return <CarregandoCanvasComponent component={component} onNextStep={onNextStep} />;
      case 'Carrosel': return <CarroselCanvasComponent component={component} />;
      case 'Cartesiano': return <CartesianoCanvasComponent component={component} />;
      case 'Comparar': return <CompararCanvasComponent component={component} />;
      case 'Confetti': return <ConfettiCanvasComponent component={component} />;
      case 'Depoimentos': return <DepoimentosCanvasComponent component={component} />;
      case 'Entrada': return <EntradaCanvasComponent component={component} />;
      case 'Espaçador': return <EspacadorCanvasComponent component={component} />;
      case 'FAQ': return <FaqCanvasComponent component={component} />;
      case 'Gráficos': return <GraficosCanvasComponent component={component} />;
      case 'Imagem': return <ImagemCanvasComponent component={component} />;
      case 'Lista': return <ListaCanvasComponent component={component} />;
      case 'Marquise': return <MarquiseCanvasComponent component={component} />;
      case 'Nível': return <NivelCanvasComponent component={component} />;
      case 'Opções': return <OpcoesCanvasComponent component={component} onOptionClick={onNextStep} />;
      case 'Preço': return <PrecoCanvasComponent component={component} />;
      case 'Termos': return <TermosCanvasComponent component={component} />;
      case 'Texto': return <TextoCanvasComponent component={component} />;
      case 'Video': return <VideoCanvasComponent component={component} />;
      default: return <GenericCanvasComponent component={component} />;
    }
  };

  return <div className="pointer-events-auto">{renderComponent()}</div>;
};


function QuizPreview({ funnel, activeStepId, onNextStep, backgroundColor, primaryColor }: { funnel: Funnel, activeStepId: number | null, onNextStep: () => void, backgroundColor: string, primaryColor: string }) {
    const steps = funnel.steps as Step[];
    const activeStep = steps.find(step => step.id === activeStepId);

    if (!activeStep) {
        return (
             <div className="flex flex-col items-center justify-center h-full text-white">
                <p>Nenhuma etapa selecionada</p>
            </div>
        )
    }

    const currentIndex = steps.findIndex(step => step.id === activeStepId);
    const progressValue = ((currentIndex + 1) / steps.length) * 100;

    const renderLogo = () => {
      if (funnel.headerLogoType === 'emoji') {
        return <span className="text-4xl">{funnel.headerLogoValue}</span>;
      }
      if (funnel.headerLogoType === 'image' && funnel.headerLogoValue && (funnel.headerLogoValue.startsWith('http') || funnel.headerLogoValue.startsWith('/'))) {
        return <Image src={funnel.headerLogoValue} alt="Logo" width={40} height={40} className="rounded-md" />;
      }
      return <ImageIcon size={40} className="rounded-md text-gray-400" />;
    }


    return (
        <div 
          className="w-[320px] h-[640px] rounded-3xl border-4 border-gray-700 shadow-2xl overflow-hidden flex flex-col"
          style={{ backgroundColor }}
        >
            <header className="flex flex-col items-center p-4 space-y-4">
              {renderLogo()}
              <Progress 
                value={progressValue} 
                className="w-full h-2 bg-gray-300"
                style={{'--progress-indicator-color': primaryColor} as React.CSSProperties}
              />
            </header>
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex flex-col gap-4">
                    {activeStep.components.map(comp => (
                        <PreviewCanvasComponent
                            key={comp.id}
                            component={comp}
                            onNextStep={onNextStep}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function StandardFunnelEditor({
  funnel,
  setFunnel,
  debouncedUpdateFunnel,
}: {
  funnel: Funnel;
  setFunnel: (updater: (prev: Funnel | null) => Funnel | null) => void;
  debouncedUpdateFunnel: any;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<EditorView>('construtor');
  const [activeStepId, setActiveStepId] = useState<number | null>(() => (funnel.steps as Step[])[0]?.id || null);
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(null);
  const [isPublished, setIsPublished] = useState(funnel.isPublished || false);

  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const startPanPosition = useRef({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [primaryColor, setPrimaryColor] = React.useState('#000000');
  const [backgroundColor, setBackgroundColor] = React.useState('#FFFFFF');
  const [titleColor, setTitleColor] = React.useState('#000000');
  const [textColor, setTextColor] = React.useState('#000000');
  const [interactiveTextColor, setInteractiveTextColor] = React.useState('#FFFFFF');

  useEffect(() => {
    if (!activeStepId && funnel.steps.length > 0) {
      setActiveStepId((funnel.steps as Step[])[0].id);
    }
    if (funnel.isPublished !== isPublished) {
      setIsPublished(funnel.isPublished || false);
    }
  }, [funnel, activeStepId, isPublished]);

  const updateFunnel = (updater: (prev: Funnel) => Funnel) => {
    setFunnel((prev) => (prev ? updater(prev) : null));
  };
  
  const updateFunnelProps = (props: Partial<Funnel>) => {
    updateFunnel(prev => ({...prev, ...props}));
  }

  const addStep = () => {
    const newStepId = Date.now();
    const newStep: Step = {
      id: newStepId,
      name: `Etapa ${(funnel.steps as Step[]).length + 1}`,
      components: [],
    };
    updateFunnel((prev) => ({ ...prev, steps: [...prev.steps, newStep] as Step[] }));
    setActiveStepId(newStepId);
  };

  const updateStepName = (id: number, name: string) => {
    updateFunnel((prev) => ({
      ...prev,
      steps: (prev.steps as Step[]).map((step) =>
        step.id === id ? { ...step, name } : step
      ),
    }));
  };
  
  const duplicateStep = (id: number) => {
    const steps = funnel.steps as Step[];
    const stepToDuplicate = steps.find((s) => s.id === id);
    if (!stepToDuplicate) return;

    const newStep: Step = {
      ...stepToDuplicate,
      id: Date.now(),
      name: `${stepToDuplicate.name} (Cópia)`,
    };

    const index = steps.findIndex((s) => s.id === id);
    const newSteps = [...steps];
    newSteps.splice(index + 1, 0, newStep);

    updateFunnel((prev) => ({ ...prev, steps: newSteps }));
    setActiveStepId(newStep.id);
  };


  const deleteStep = (id: number) => {
    const steps = funnel.steps as Step[];
    if (steps.length === 1) return;

    let newActiveStepId = activeStepId;
    if (activeStepId === id) {
      const currentIndex = steps.findIndex((s) => s.id === id);
      newActiveStepId =
        steps[currentIndex - 1]?.id || steps[currentIndex + 1]?.id;
    }

    updateFunnel((prev) => ({
      ...prev,
      steps: (prev.steps as Step[]).filter((step) => step.id !== id),
    }));

    setActiveStepId(newActiveStepId);
  };

  const moveStep = (stepId: number, direction: 'up' | 'down') => {
    const steps = funnel.steps as Step[];
    const index = steps.findIndex((s) => s.id === stepId);

    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= steps.length) return;

    const newSteps = [...steps];
    const [movedStep] = newSteps.splice(index, 1);
    newSteps.splice(newIndex, 0, movedStep);

    updateFunnel((prev) => ({ ...prev, steps: newSteps }));
  };

  const addComponentToCanvas = (component: ComponentType) => {
    if (!activeStepId) return;

    let defaultProps: ComponentProps = {};
    if (component.name === 'Alerta') {
        const model = 'success';
        defaultProps = {
            model,
            ...modelColors[model],
            icon: modelIcons[model],
            title: 'Título do Alerta',
            description: 'Esta é a descrição do alerta.'
        };
    }

    if (component.name === 'Argumentos') {
      defaultProps = {
        items: [
          {
            id: Date.now(),
            icon: '👋',
            description: '<h4><b>Argumento</b></h4><p>Lorem ipsum dolor sit amet.</p>',
          },
        ],
      };
    }
    
    if (component.name === 'Carrosel') {
      defaultProps = {
        slides: [
          {
            id: Date.now(),
            imageUrl: `https://picsum.photos/seed/${Date.now()}/400/300`,
            caption: 'Nova Legenda',
          }
        ],
        loop: true,
      }
    }

    if (component.name === 'Cartesiano') {
      defaultProps = {
        chartData: [
          { id: 1, name: 'A', value: 20, indicatorLabel: '', isFeatured: false },
          { id: 2, name: 'B', value: 40, indicatorLabel: 'Você', isFeatured: true },
          { id: 3, name: 'C', value: 75, indicatorLabel: 'Objetivo', isFeatured: false },
        ],
        gradientStartColor: '#16A34A',
        gradientEndColor: '#EF4444',
      };
    }

    if (component.name === 'Depoimentos') {
      defaultProps = {
        testimonials: [
          {
            id: Date.now(),
            imageUrl: `https://picsum.photos/seed/${Date.now()}/48/48`,
            name: 'Nome da Pessoa',
            handle: '@usuario',
            rating: 5,
            testimonial: 'Este é um depoimento de exemplo. Você pode editar o texto, a imagem e a avaliação nas configurações.',
          },
        ],
      };
    }

    if (component.name === 'FAQ') {
      defaultProps = {
        faqItems: [
          {
            id: Date.now(),
            question: 'Primeira Pergunta?',
            answer: 'Esta é a resposta para a primeira pergunta.',
          },
          {
            id: Date.now() + 1,
            question: 'Segunda Pergunta?',
            answer: 'Esta é a resposta para a segunda pergunta.',
          },
        ],
      };
    }
    
    if (component.name === 'Gráficos') {
      defaultProps = {
        graficosItems: [
          {
            id: Date.now(),
            label: 'Item 1',
            value: 75,
          },
          {
            id: Date.now() + 1,
            label: 'Item 2',
            value: 50,
          },
        ],
      };
    }

    if (component.name === 'Lista') {
      defaultProps = {
        listItems: [
          { id: Date.now() + 1, icon: '✅', iconBgColor: '#10B981', title: 'Item 1', subtitle: 'Descrição do item 1' },
          { id: Date.now() + 2, icon: '✅', iconBgColor: '#10B981', title: 'Item 2', subtitle: 'Descrição do item 2' },
          { id: Date.now() + 3, icon: '✅', iconBgColor: '#10B981', title: 'Item 3', subtitle: 'Descrição do item 3' },
          { id: Date.now() + 4, icon: '✅', iconBgColor: '#10B981', title: 'Item 4', subtitle: 'Descrição do item 4' },
        ],
      };
    }

    if (component.name === 'Marquise') {
      defaultProps = {
        marquiseItems: [
          {
            id: Date.now(),
            name: 'Nome do Usuário',
            handle: '@usuario',
            avatarUrl: `https://picsum.photos/seed/${Date.now()}/40/40`,
            text: 'Este é um depoimento de exemplo que se move na tela. Você pode editar o texto, imagem e informações do usuário.',
          },
          {
            id: Date.now() + 1,
            name: 'Outro Usuário',
            handle: '@outro.usuario',
            avatarUrl: `https://picsum.photos/seed/${Date.now() + 1}/40/40`,
            text: 'Clickify é incrível! Facilitou muito a criação do meu primeiro produto digital. Recomendo!',
          },
        ],
      };
    }

    if (component.name === 'Opções') {
      defaultProps = {
        opcoesItems: [
          { id: Date.now() + 1, icon: '💬', text: 'Opção 1' },
          { id: Date.now() + 2, icon: '✅', text: 'Opção 2' },
        ],
      };
    }

    if (component.name === 'Termos') {
      defaultProps = {
        mainText: 'Ao clicar em alguma das opções, você concorda com os',
        links: [
           { id: Date.now() + 1, text: 'Termos de utilização e serviço', url: '#', enabled: true },
           { id: Date.now() + 2, text: 'Política de privacidade', url: '#', enabled: true },
           { id: Date.now() + 3, text: 'Política de subscrição', url: '#', enabled: true },
           { id: Date.now() + 4, text: 'Política de cookies', url: '#', enabled: false },
        ],
      };
    }

    if (component.name === 'Texto') {
        defaultProps = {
            content: '<h3><b>Título</b></h3><p>Preencha o texto.</p>',
        };
    }


    const newComponent: CanvasComponentData = {
      ...component,
      id: Date.now(),
      props: defaultProps,
    };

    updateFunnel((prev) => ({
      ...prev,
      steps: (prev.steps as Step[]).map((step) =>
        step.id === activeStepId
          ? { ...step, components: [...step.components, newComponent] }
          : step
      ),
    }));
  };

  const updateComponentProps = (componentId: number, props: ComponentProps) => {
    updateFunnel((prev) => ({
      ...prev,
      steps: (prev.steps as Step[]).map((step) =>
        step.id === activeStepId
          ? {
              ...step,
              components: step.components.map((c) =>
                c.id === componentId ? { ...c, props } : c
              ),
            }
          : step
      ),
    }));
  };

  const moveComponent = (componentId: number, direction: 'up' | 'down') => {
    const activeStep = (funnel.steps as Step[]).find((s) => s.id === activeStepId);
    if (!activeStep) return;

    const components = activeStep.components;
    const index = components.findIndex((c) => c.id === componentId);

    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= components.length) return;

    const newComponents = [...components];
    const [movedComponent] = newComponents.splice(index, 1);
    newComponents.splice(newIndex, 0, movedComponent);

    updateFunnel((prev) => ({
      ...prev,
      steps: (prev.steps as Step[]).map((step) =>
        step.id === activeStepId ? { ...step, components: newComponents } : step
      ),
    }));
  };

  const duplicateComponent = (id: number) => {
    const activeStep = (funnel.steps as Step[]).find((s) => s.id === activeStepId);
    if (!activeStep) return;
    const componentToDuplicate = activeStep.components.find((c) => c.id === id);
    if (!componentToDuplicate) return;
    const newComponent = { ...componentToDuplicate, id: Date.now() };
    const index = activeStep.components.findIndex((c) => c.id === id);
    const newComponents = [...activeStep.components];
    newComponents.splice(index + 1, 0, newComponent);
    updateFunnel((prev) => ({
      ...prev,
      steps: (prev.steps as Step[]).map((step) =>
        step.id === activeStepId ? { ...step, components: newComponents } : step
      ),
    }));
  };

  const deleteComponent = (id: number) => {
    updateFunnel((prev) => ({
      ...prev,
      steps: (prev.steps as Step[]).map((step) =>
        step.id === activeStepId
          ? { ...step, components: step.components.filter((c) => c.id !== id) }
          : step
      ),
    }));
    if (selectedComponentId === id) {
      setSelectedComponentId(null);
    }
  };

  const activeStep = (funnel.steps as Step[]).find((s) => s.id === activeStepId);
  const activeStepComponents = activeStep?.components || [];
  const selectedComponent = activeStepComponents.find((c) => c.id === selectedComponentId) || null;

  const handleNextStepPreview = () => {
    const steps = funnel.steps as Step[];
    const currentIndex = steps.findIndex(step => step.id === activeStepId);
    if (currentIndex !== -1 && currentIndex < steps.length - 1) {
      setActiveStepId(steps[currentIndex + 1].id);
    } else {
      // Optionally loop back to the start or close the preview
      setActiveStepId(steps[0].id);
    }
  }

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget && e.button === 0) {
      setIsPanning(true);
      startPanPosition.current = { x: e.clientX, y: e.clientY };
      e.currentTarget.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isPanning) {
      const dx = e.clientX - startPanPosition.current.x;
      const dy = e.clientY - startPanPosition.current.y;
      setPanOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      startPanPosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    if (isPanning) {
      setIsPanning(false);
      e.currentTarget.style.cursor = 'default';
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLElement>) => {
    e.preventDefault();
    const zoomFactor = 1.1;
    const newZoom = e.deltaY > 0 ? zoom / zoomFactor : zoom * zoomFactor;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const mousePointX = (mouseX - panOffset.x) / zoom;
    const mousePointY = (mouseY - panOffset.y) / zoom;
    
    const newPanX = mouseX - mousePointX * newZoom;
    const newPanY = mouseY - mousePointY * newZoom;

    setZoom(newZoom);
    setPanOffset({x: newPanX, y: newPanY});
  }

  const handlePublishToggle = (publish: boolean) => {
    updateFunnel(prev => ({ ...prev, isPublished: publish }));
    setIsPublished(publish);
    debouncedUpdateFunnel.flush();
    toast({
      title: publish ? 'Funil Publicado!' : 'Funil agora é um rascunho.',
      description: publish ? 'Seu funil agora está ativo.' : 'Seu funil não está mais visível publicamente.',
    });
  };
  
  const handleCopyUrl = () => {
    if (!funnel) return;
    const funnelSlug = funnel.slug || funnel.name.toLowerCase().trim().replace(/[^a-z0-9\\s-]/g, '').replace(/[\\s-]+/g, '-');
    const publicUrl = `${window.location.origin}/funil/${funnelSlug}/${funnel.id}`;
    navigator.clipboard.writeText(publicUrl);
    toast({
      title: 'URL Copiada!',
      description: `O link do funil foi copiado para a área de transferência.`,
    });
  }

  const currentIndex = funnel.type === 'quiz' && activeStepId ? (funnel.steps as Step[]).findIndex(step => step.id === activeStepId) : -1;
  const progressValue = funnel.type === 'quiz' && activeStepId && (funnel.steps as Step[]).length > 0 ? ((currentIndex + 1) / (funnel.steps as Step[]).length) * 100 : 0;


  const editorViews: { id: EditorView; label: string; icon: React.ReactNode }[] = [
    { id: 'construtor', label: 'Construtor', icon: <Wand2 /> },
    { id: 'fluxo', label: 'Fluxo', icon: <Combine /> },
    { id: 'design', label: 'Design', icon: <Brush /> },
    { id: 'configuracoes', label: 'Configurações', icon: <Settings /> },
  ];
  
  const stepWidth = 256;
  const stepGap = 64;

  const renderLogo = () => {
    if (funnel.headerLogoType === 'emoji') {
      return <span className="text-4xl">{funnel.headerLogoValue}</span>;
    }
    if (funnel.headerLogoType === 'image' && funnel.headerLogoValue && (funnel.headerLogoValue.startsWith('http') || funnel.headerLogoValue.startsWith('/'))) {
      return <Image src={funnel.headerLogoValue} alt="Logo" width={40} height={40} className="rounded-md" />;
    }
    return <ImageIcon size={40} className="rounded-md text-gray-400" />;
  };

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <header className="flex h-16 items-center justify-between border-b border-border px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <span className="text-lg font-semibold">{funnel.name}</span>
        </div>
        <div className="hidden items-center gap-2 rounded-lg bg-card p-1 md:flex">
          {editorViews.map((view) => (
            <Button
              key={view.id}
              variant={activeView === view.id ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveView(view.id)}
              className="gap-2"
            >
              {view.icon}
              <span className="hidden sm:inline">{view.label}</span>
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
            {funnel.type === 'quiz' && (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Smartphone className="h-5 w-5" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none max-w-fit shadow-none">
                       <DialogHeader className="sr-only">
                        <DialogTitle>Pré-visualização do Quiz</DialogTitle>
                        <DialogDescription>
                            Veja como seu quiz aparecerá em um dispositivo móvel.
                        </DialogDescription>
                        </DialogHeader>
                        <QuizPreview 
                          funnel={funnel} 
                          activeStepId={activeStepId} 
                          onNextStep={handleNextStepPreview}
                          backgroundColor={backgroundColor}
                          primaryColor={primaryColor}
                        />
                    </DialogContent>
                </Dialog>
            )}
            <Button variant="ghost" size="icon">
                <Eye className="h-5 w-5" />
            </Button>
          <Button variant="outline" size="sm" onClick={() => debouncedUpdateFunnel.flush()}>
            <Save className="mr-2 h-4 w-4" />
            Salvar
          </Button>
          {isPublished ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="secondary">
                  <span className="relative mr-2 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                  </span>
                  Publicado
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleCopyUrl}>
                  <ClipboardCopy className="mr-2 h-4 w-4" />
                  Copiar Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePublishToggle(false)}>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Deixar Offline
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" onClick={() => handlePublishToggle(true)}>
              <Rocket className="mr-2 h-4 w-4" />
              Publicar
            </Button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {activeView === 'construtor' && (
          <aside
            className={cn(
              'border-r border-border md:flex',
              'flex-row',
              'w-full md:w-96'
            )}
          >
            <div className="flex w-1/2 flex-col border-r border-border">
              <div className="flex h-14 items-center justify-between border-b border-border px-4">
                <h2 className="font-semibold">Etapas</h2>
                <Button variant="ghost" size="icon" onClick={addStep}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <div className="space-y-1 p-2">
                  {(funnel.steps as Step[]).map((step, index) => (
                    <div key={step.id} className="group relative flex items-center">
                      <Button
                        variant={activeStepId === step.id ? 'secondary' : 'ghost'}
                        className="w-full justify-start pr-16"
                        onClick={() => setActiveStepId(step.id)}
                      >
                        <span className="flex-1 truncate text-left">{step.name}</span>
                      </Button>
                      <div className="absolute top-1/2 right-1 -translate-y-1/2 opacity-0 group-hover:opacity-100 flex items-center">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveStep(step.id, 'up')} disabled={index === 0}>
                            <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveStep(step.id, 'down')} disabled={index === (funnel.steps as Step[]).length - 1}>
                            <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-40 p-1">
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-sm font-normal"
                              onClick={() => duplicateStep(step.id)}
                            >
                              <Copy className="mr-2 h-4 w-4" /> Duplicar
                            </Button>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-sm font-normal text-red-500 hover:text-red-500"
                              onClick={() => deleteStep(step.id)}
                              disabled={(funnel.steps as Step[]).length <= 1}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Excluir
                            </Button>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="flex w-1/2 flex-col">
              <div className="flex h-14 items-center border-b border-border px-4">
                <h2 className="font-semibold">Componentes</h2>
              </div>
              <ScrollArea className="flex-1">
                <div className="grid grid-cols-1 gap-2 p-2">
                  {components.map((component) => (
                    <Card
                      key={component.name}
                      className="group flex cursor-pointer items-center justify-start gap-3 p-2 text-left transition-colors bg-gray-800 text-white hover:bg-gray-700"
                      onClick={() => addComponentToCanvas(component)}
                    >
                      <div className="relative flex-shrink-0">{component.icon}</div>
                      <div className="flex flex-col">
                        <span className="flex-grow text-xs font-medium">{component.name}</span>
                        {component.isNew && <Badge className="mt-1 w-fit scale-90">Novo</Badge>}
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </aside>
        )}

        {activeView === 'fluxo' ? (
           <main 
            className="flex-1 bg-gray-800/50 p-4 md:p-8 overflow-hidden relative"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(128, 128, 128, 0.2) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} 
            onWheel={handleWheel}
           >
              <div
                className="absolute"
                style={{ transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`, transformOrigin: 'top left' }}
              >
                 <svg className="absolute overflow-visible pointer-events-none">
                    <defs>
                        <marker
                        id="arrowhead"
                        viewBox="0 0 10 10"
                        refX="5"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                        >
                        <path d={`M 0 0 L 10 5 L 0 10 z`} fill="#6B7280" />
                        </marker>
                    </defs>
                    {(funnel.steps as Step[]).slice(0, -1).map((_, index) => (
                        <path
                        key={index}
                        d={`M ${(index * (stepWidth + stepGap)) + stepWidth} 100 H ${((index + 1) * (stepWidth + stepGap))}`}
                        stroke="#6B7280"
                        strokeWidth="2"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                        />
                    ))}
                 </svg>
                <div className="flex gap-16 pointer-events-none">
                  {(funnel.steps as Step[]).map((step, index) => (
                    <div key={step.id} style={{ width: `${stepWidth}px` }} className="pointer-events-auto rounded-lg bg-gray-900 p-4 shadow-lg text-white">
                      <div className="flex items-center justify-between mb-4">
                         <h3 className="font-semibold">{step.name}</h3>
                         <div className="h-3 w-3 rounded-full border-2 border-gray-500"></div>
                      </div>
                       <div className="space-y-2 text-sm">
                        {step.components.slice(0, 4).map(comp => (
                          <div key={comp.id} className="flex items-center justify-between rounded bg-gray-800/50 p-2">
                            <span>{comp.name}</span>
                            <div className="h-2 w-2 rounded-full border border-gray-600"></div>
                          </div>
                        ))}
                         {step.components.length > 4 && <p className="text-xs text-gray-500">... e mais {step.components.length - 4}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
           </main>
        ) : activeView === 'configuracoes' ? (
          <FunnelSettings funnel={funnel} />
        ) : (
          <main
            className={cn(
              'flex-1 overflow-y-auto p-4 md:p-8',
              activeView !== 'construtor' && 'hidden md:block'
            )}
            style={{ backgroundColor: backgroundColor }}
            onClick={() => setSelectedComponentId(null)}
          >
            {funnel.type === 'quiz' && (
              <div className="mx-auto w-full max-w-sm">
                <header className="flex flex-col items-center p-4 space-y-4 rounded-t-lg bg-transparent">
                  {renderLogo()}
                  <Progress 
                    value={progressValue} 
                    className="w-full mt-4 h-2" 
                    style={{'--progress-indicator-color': primaryColor} as React.CSSProperties}
                  />
                </header>
              </div>
            )}
            <div className="mx-auto w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
              {activeStepComponents.length === 0 ? (
                <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-transparent p-4 text-center min-h-[400px]">
                  <div>
                    <p className="text-lg font-semibold text-black">Nada por aqui 😔</p>
                    <p className="text-sm text-gray-500">Adicione um componente para começar.</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {activeStepComponents.map((comp, index) => (
                    <CanvasComponent
                      key={comp.id}
                      component={comp}
                      isSelected={selectedComponentId === comp.id}
                      onClick={() => setSelectedComponentId(comp.id)}
                      onDuplicate={() => duplicateComponent(comp.id)}
                      onDelete={() => deleteComponent(comp.id)}
                      onMoveUp={() => moveComponent(comp.id, 'up')}
                      onMoveDown={() => moveComponent(comp.id, 'down')}
                      isFirst={index === 0}
                      isLast={index === activeStepComponents.length - 1}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        )}
        {(activeView === 'construtor' || activeView === 'design') && (
          <aside
            className={cn(
              'hidden border-l border-border p-6 lg:block',
              'w-80'
            )}
          >
            <ScrollArea className="h-full">
              <div className="space-y-6 pr-4">
                {activeView === 'construtor' &&
                  (selectedComponent ? (
                    <ComponentSettings
                      component={selectedComponent}
                      onUpdate={updateComponentProps}
                      steps={(funnel.steps as Step[])}
                      activeStepId={activeStepId!}
                    />
                  ) : activeStep ? (
                    <StepSettings
                      step={activeStep}
                      onUpdateStep={updateStepName}
                      steps={(funnel.steps as Step[])}
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Selecione uma etapa para editar.
                    </div>
                  ))}
                {activeView === 'design' && <DesignSettings 
                    primaryColor={primaryColor} setPrimaryColor={setPrimaryColor}
                    backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor}
                    titleColor={titleColor} setTitleColor={setTitleColor}
                    textColor={textColor} setTextColor={setTextColor}
                    interactiveTextColor={interactiveTextColor} setInteractiveTextColor={setInteractiveTextColor}
                    funnel={funnel}
                    onUpdateFunnel={updateFunnelProps}
                />}
              </div>
            </ScrollArea>
          </aside>
        )}
      </div>
    </div>
  );
}
