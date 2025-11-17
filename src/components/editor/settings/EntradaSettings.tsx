
'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import type { CanvasComponentData, ComponentProps } from '../types';

export const EntradaSettings = ({
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
            <UILabel htmlFor="label" className="text-xs">
              Rótulo
            </UILabel>
            <Input
              id="label"
              value={component.props.label || ''}
              onChange={(e) => onUpdate({ ...component.props, label: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="placeholder" className="text-xs">
              Placeholder
            </UILabel>
            <Input
              id="placeholder"
              value={component.props.placeholder || ''}
              onChange={(e) => onUpdate({ ...component.props, placeholder: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="inputType" className="text-xs">
              Tipo de Entrada
            </UILabel>
            <Select
              value={component.props.inputType || 'text'}
              onValueChange={(value: 'text' | 'email' | 'password' | 'number' | 'tel') =>
                onUpdate({ ...component.props, inputType: value })
              }
            >
              <SelectTrigger id="inputType" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Texto</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="password">Senha</SelectItem>
                <SelectItem value="number">Número</SelectItem>
                <SelectItem value="tel">Telefone</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between pt-2">
            <UILabel htmlFor="required">Obrigatório</UILabel>
            <Switch
              id="required"
              checked={component.props.required}
              onCheckedChange={(checked) => onUpdate({ ...component.props, required: checked })}
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilo</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="textAlign" className="text-xs">
              Alinhamento do Texto
            </UILabel>
            <Select
              value={component.props.textAlign || 'left'}
              onValueChange={(value: 'left' | 'center' | 'right') =>
                onUpdate({ ...component.props, textAlign: value })
              }
            >
              <SelectTrigger id="textAlign" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Esquerda</SelectItem>
                <SelectItem value="center">Centro</SelectItem>
                <SelectItem value="right">Direita</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <div className="grid grid-cols-2 gap-4">
            <div>
                <UILabel htmlFor="fontSize" className="text-xs">
                Tamanho da Fonte
                </UILabel>
                <Select
                    value={component.props.fontSize || 'base'}
                    onValueChange={(value: 'sm' | 'base' | 'lg') => onUpdate({ ...component.props, fontSize: value })}
                >
                    <SelectTrigger id="fontSize" className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                    <SelectItem value="sm">Pequeno</SelectItem>
                    <SelectItem value="base">Médio</SelectItem>
                    <SelectItem value="lg">Grande</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <UILabel htmlFor="padding" className="text-xs">
                Espaçamento
                </UILabel>
                <Select
                    value={component.props.padding || 'base'}
                    onValueChange={(value: 'sm' | 'base' | 'lg') => onUpdate({ ...component.props, padding: value })}
                >
                    <SelectTrigger id="padding" className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                    <SelectItem value="sm">Pequeno</SelectItem>
                    <SelectItem value="base">Médio</SelectItem>
                    <SelectItem value="lg">Grande</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
        </div>
      </Card>

       <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="bg-color" className="text-xs">Fundo</UILabel>
            <Input
              type="color"
              id="bg-color"
              className="h-8 w-full p-1"
              value={component.props.backgroundColor || '#FFFFFF'}
              onChange={(e) => onUpdate({ ...component.props, backgroundColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="text-color" className="text-xs">Texto</UILabel>
            <Input
              type="color"
              id="text-color"
              className="h-8 w-full p-1"
              value={component.props.textColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, textColor: e.target.value })}
            />
          </div>
           <div className="space-y-1">
            <UILabel htmlFor="border-color" className="text-xs">Borda</UILabel>
            <Input
              type="color"
              id="border-color"
              className="h-8 w-full p-1"
              value={component.props.borderColor || '#E5E7EB'}
              onChange={(e) => onUpdate({ ...component.props, borderColor: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
