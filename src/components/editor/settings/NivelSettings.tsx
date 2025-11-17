'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import type { CanvasComponentData, ComponentProps } from '../types';

export const NivelSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="title" className="text-xs">
              Título
            </UILabel>
            <Input
              id="title"
              value={component.props.title || 'Nível'}
              onChange={(e) => onUpdate({ ...component.props, title: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="subtitle" className="text-xs">
              Subtítulo
            </UILabel>
            <Input
              id="subtitle"
              value={component.props.subtitle || 'Lorem ipsum'}
              onChange={(e) => onUpdate({ ...component.props, subtitle: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="tooltipText" className="text-xs">
              Texto da Dica
            </UILabel>
            <Input
              id="tooltipText"
              value={component.props.tooltipText || 'Você está aqui'}
              onChange={(e) => onUpdate({ ...component.props, tooltipText: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Configurações</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="value" className="text-xs">
              Valor ({component.props.value || 75}%)
            </UILabel>
            <Slider
              id="value"
              min={0}
              max={100}
              step={1}
              value={[component.props.value || 75]}
              onValueChange={(value) => onUpdate({ ...component.props, value: value[0] })}
              className="mt-2"
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="showTooltip">Mostrar Dica</UILabel>
            <Switch
              id="showTooltip"
              checked={component.props.showTooltip}
              onCheckedChange={(checked) => onUpdate({ ...component.props, showTooltip: checked })}
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="nivelTrackColor" className="text-xs">Fundo da Barra</UILabel>
            <Input type="color" id="nivelTrackColor" className="h-8 w-full p-1" value={component.props.nivelTrackColor || '#E5E7EB'} onChange={(e) => onUpdate({ ...component.props, nivelTrackColor: e.target.value })} />
          </div>
           <div className="space-y-1">
            <UILabel htmlFor="nivelProgressColor" className="text-xs">Progresso</UILabel>
            <Input type="color" id="nivelProgressColor" className="h-8 w-full p-1" value={component.props.nivelProgressColor || '#111827'} onChange={(e) => onUpdate({ ...component.props, nivelProgressColor: e.target.value })} />
          </div>
           <div className="space-y-1">
            <UILabel htmlFor="nivelThumbColor" className="text-xs">Pino</UILabel>
            <Input type="color" id="nivelThumbColor" className="h-8 w-full p-1" value={component.props.nivelThumbColor || '#FFFFFF'} onChange={(e) => onUpdate({ ...component.props, nivelThumbColor: e.target.value })} />
          </div>
           <div className="space-y-1">
            <UILabel htmlFor="tooltipColor" className="text-xs">Fundo da Dica</UILabel>
            <Input type="color" id="tooltipColor" className="h-8 w-full p-1" value={component.props.tooltipColor || '#111827'} onChange={(e) => onUpdate({ ...component.props, tooltipColor: e.target.value })} />
          </div>
           <div className="space-y-1">
            <UILabel htmlFor="tooltipTextColor" className="text-xs">Texto da Dica</UILabel>
            <Input type="color" id="tooltipTextColor" className="h-8 w-full p-1" value={component.props.tooltipTextColor || '#FFFFFF'} onChange={(e) => onUpdate({ ...component.props, tooltipTextColor: e.target.value })} />
          </div>
        </div>
      </Card>
    </div>
  );
};
