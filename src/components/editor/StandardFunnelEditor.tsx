

'use client';

import React, { useState, useCallback, useEffect } from 'react';
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
          {
            id: Date.now(),
            icon: '✅',
            iconBgColor: '#10B981',
            title: 'Item 1',
            subtitle: 'Descrição do item 1',
          },
          {
            id: Date.now() + 1,
            icon: '✅',
            iconBgColor: '#10B981',
            title: 'Item 2',
            subtitle: 'Descrição do item 2',
          },
          {
            id: Date.now() + 2,
            icon: '✅',
            iconBgColor: '#10B981',
            title: 'Item 3',
            subtitle: 'Descrição do item 3',
          },
          {
            id: Date.now() + 3,
            icon: '✅',
            iconBgColor: '#10B981',
            title: 'Item 4',
            subtitle: 'Descrição do item 4',
          },
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
          {
            id: Date.now(),
            icon: '💬',
            text: 'Opção 1',
          },
          {
            id: Date.now() + 1,
            icon: '✅',
            text: 'Opção 2',
          },
        ],
      };
    }

    if (component.name === 'Termos') {
      defaultProps = {
        mainText: 'Ao clicar em alguma das opções, você concorda com os',
        links: [
          { id: Date.now(), text: 'Termos de utilização e serviço', url: '#' },
          { id: Date.now() + 1, text: 'Política de privacidade', url: '#' },
          { id: Date.now() + 2, text: 'Política de subscrição', url: '#' },
          { id: Date.now() + 3, text: 'Política de cookies', url: '#' },
        ],
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
        <aside
          className={cn(
            'border-r border-border md:flex',
            activeView === 'construtor' ? 'flex-row' : 'hidden',
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

        <main
          className="flex-1 overflow-y-auto bg-white p-4 md:p-8"
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

        <aside
          className={cn(
            'hidden border-l border-border p-6 lg:block',
            activeView === 'construtor' || activeView === 'design' ? 'w-80' : 'hidden'
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
      </div>
    </div>
  );
}
