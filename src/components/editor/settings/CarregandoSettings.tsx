
'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import type { CanvasComponentData, ComponentProps } from '../types';

export const CarregandoSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Progresso</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="duration" className="text-xs">
              Duração
            </UILabel>
            <Input
              id="duration"
              type="number"
              value={component.props.duration || 5}
              onChange={(e) => onUpdate({ ...component.props, duration: Number(e.target.value) })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="limit" className="text-xs">
              Limite
            </UILabel>
            <Input
              id="limit"
              type="number"
              value={component.props.limit || 100}
              onChange={(e) => onUpdate({ ...component.props, limit: Number(e.target.value) })}
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilo</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="loadingText" className="text-xs">
              Título
            </UILabel>
            <Input
              id="loadingText"
              value={component.props.loadingText || ''}
              onChange={(e) => onUpdate({ ...component.props, loadingText: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="loadingDescription" className="text-xs">
              Descrição
            </UILabel>
            <Input
              id="loadingDescription"
              value={component.props.loadingDescription || ''}
              onChange={(e) =>
                onUpdate({ ...component.props, loadingDescription: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="showTitle">Mostrar Título</UILabel>
            <Switch
              id="showTitle"
              checked={component.props.showTitle}
              onCheckedChange={(checked) => onUpdate({ ...component.props, showTitle: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="showProgress">Mostrar Progresso</UILabel>
            <Switch
              id="showProgress"
              checked={component.props.showProgress}
              onCheckedChange={(checked) => onUpdate({ ...component.props, showProgress: checked })}
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="titleColor" className="text-xs">
              Cor do Título
            </UILabel>
            <Input
              type="color"
              id="titleColor"
              className="h-8 w-full p-1"
              value={component.props.titleColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, titleColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="descriptionColor" className="text-xs">
              Cor da Descrição
            </UILabel>
            <Input
              type="color"
              id="descriptionColor"
              className="h-8 w-full p-1"
              value={component.props.descriptionColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, descriptionColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="progress-color" className="text-xs">
              Cor do Progresso
            </UILabel>
            <Input
              type="color"
              id="progress-color"
              className="h-8 w-full p-1"
              value={component.props.progressColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, progressColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="progressTrackColor" className="text-xs">
              Fundo da Barra
            </UILabel>
            <Input
              type="color"
              id="progressTrackColor"
              className="h-8 w-full p-1"
              value={component.props.progressTrackColor || '#E5E7EB'}
              onChange={(e) => onUpdate({ ...component.props, progressTrackColor: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
