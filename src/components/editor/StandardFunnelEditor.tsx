

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
  Grip,
  Trash2,
  Wand2,
  Combine,
  Brush,
  Users,
  Smartphone,
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

// Read-only version of CanvasComponent for the preview
const PreviewCanvasComponent = ({
  component,
  onNextStep,
}: {
  component: CanvasComponentData;
  onNextStep?: () => void;
}) => {
  const renderComponent = () => {
    switch (component.name) {
      case 'Alerta': return <AlertCanvasComponent component={component} />;
      case 'Argumentos': return <ArgumentoCanvasComponent component={component} />;
      case 'Audio': return <AudioCanvasComponent component={component} />;
      case 'Botão':
        // The button itself will trigger the onNextStep when clicked.
        return (
          <div onClick={component.props.action === 'next_step' ? onNextStep : undefined}>
            <BotaoCanvasComponent component={component} />
          </div>
        );
      case 'Carregando': return <CarregandoCanvasComponent component={component} />;
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


function QuizPreview({ funnel, activeStepId, onNextStep }: { funnel: Funnel, activeStepId: number | null, onNextStep: () => void }) {
    const activeStep = funnel.steps.find(step => step.id === activeStepId) as Step | undefined;

    if (!activeStep) {
        return (
             <div className="flex flex-col items-center justify-center h-full text-white">
                <p>Nenhuma etapa selecionada</p>
            </div>
        )
    }

    return (
        <div className="w-[320px] h-[640px] bg-gray-900 rounded-3xl border-4 border-gray-700 shadow-2xl overflow-hidden flex flex-col pointer-events-auto">
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
  const [activeView, setActiveView] = useState<EditorView>('construtor');
  const [activeStepId, setActiveStepId] = useState<number | null>(() => (funnel.steps as Step[])[0]?.id || null);
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(null);

  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const startPanPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!activeStepId && funnel.steps.length > 0) {
      setActiveStepId((funnel.steps as Step[])[0].id);
    }
  }, [funnel.steps, activeStepId]);

  const updateFunnel = (updater: (prev: Funnel) => Funnel) => {
    setFunnel((prev) => (prev ? updater(prev) : null));
  };

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

  const editorViews: { id: EditorView; label: string; icon: React.ReactNode }[] = [
    { id: 'construtor', label: 'Construtor', icon: <Wand2 /> },
    { id: 'fluxo', label: 'Fluxo', icon: <Combine /> },
    { id: 'design', label: 'Design', icon: <Brush /> },
    { id: 'leads', label: 'Leads', icon: <Users /> },
    { id: 'configuracoes', label: 'Configurações', icon: <Settings /> },
  ];

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
                        <QuizPreview funnel={funnel} activeStepId={activeStepId} onNextStep={handleNextStepPreview}/>
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
          <Button size="sm">
            <Rocket className="mr-2 h-4 w-4" />
            Publicar
          </Button>
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
                  {(funnel.steps as Step[]).map((step) => (
                    <div key={step.id} className="group relative">
                      <Button
                        variant={activeStepId === step.id ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setActiveStepId(step.id)}
                      >
                        <Grip className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="flex-1 truncate text-left">{step.name}</span>
                      </Button>
                      <div className="absolute top-1/2 right-1 -translate-y-1/2 opacity-0 group-hover:opacity-100">
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
           >
              <div 
                className="absolute"
                style={{ transform: `translate(${panOffset.x}px, ${panOffset.y}px)` }}
                >
                <div className="flex gap-8">
                  {(funnel.steps as Step[]).map((step, index) => (
                    <div key={step.id} className="w-64 rounded-lg bg-gray-900 p-4 shadow-lg text-white">
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
        ) : (
          <main
            className={cn(
              'flex-1 overflow-y-auto bg-white p-4 md:p-8',
              activeView !== 'construtor' && 'hidden md:block'
            )}
            onClick={() => setSelectedComponentId(null)}
          >
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
                  {activeStepComponents.map((comp) => (
                    <CanvasComponent
                      key={comp.id}
                      component={comp}
                      isSelected={selectedComponentId === comp.id}
                      onClick={() => setSelectedComponentId(comp.id)}
                      onDuplicate={() => duplicateComponent(comp.id)}
                      onDelete={() => deleteComponent(comp.id)}
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
                {activeView === 'design' && <DesignSettings />}
              </div>
            </ScrollArea>
          </aside>
        )}
      </div>
    </div>
  );
}
