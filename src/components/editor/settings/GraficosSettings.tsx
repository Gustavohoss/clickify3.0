'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Grip } from 'lucide-react';
import type { CanvasComponentData, ComponentProps, GraficosItem } from '../types';

export const GraficosSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const graficosItems = component.props.graficosItems || [];

  const handleUpdateItem = (
    itemId: number,
    key: keyof GraficosItem,
    value: string | number
  ) => {
    const newItems = graficosItems.map((item) =>
      item.id === itemId ? { ...item, [key]: value } : item
    );
    onUpdate({ ...component.props, graficosItems: newItems });
  };

  const handleAddItem = () => {
    const newItem: GraficosItem = {
      id: Date.now(),
      title: `Título ${graficosItems.length + 1}`,
      label: `Item ${graficosItems.length + 1}`,
      value: Math.floor(Math.random() * 100),
    };
    onUpdate({ ...component.props, graficosItems: [...graficosItems, newItem] });
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = graficosItems.filter((item) => item.id !== itemId);
    onUpdate({ ...component.props, graficosItems: newItems });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Itens do Gráfico</h3>
        <ScrollArea className="h-[25rem]">
          <div className="space-y-3 pr-4">
            {graficosItems.map((item) => (
              <Card key={item.id} className="relative bg-card p-3 space-y-3">
                 <div className="absolute top-2 left-2 flex items-center justify-center text-muted-foreground">
                  <Grip className="h-4 w-4 cursor-grab" />
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2 pt-8">
                  <Input
                    value={item.title || ''}
                    onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)}
                    className="h-9"
                    placeholder="Título"
                  />
                   <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={item.label}
                      onChange={(e) => handleUpdateItem(item.id, 'label', e.target.value)}
                      className="h-9"
                      placeholder="Rótulo"
                    />
                    <Input
                      type="number"
                      value={item.value}
                      onChange={(e) => handleUpdateItem(item.id, 'value', Number(e.target.value))}
                      className="h-9"
                      placeholder="Valor"
                      max={100}
                      min={0}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddItem}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Item
        </Button>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilo</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="graficosLayout" className="text-xs">
              Layout
            </UILabel>
            <Select
              value={component.props.graficosLayout || '2-cols'}
              onValueChange={(value) => onUpdate({ ...component.props, graficosLayout: value })}
            >
              <SelectTrigger id="graficosLayout" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-col">1 Coluna</SelectItem>
                <SelectItem value="2-cols">2 Colunas</SelectItem>
                <SelectItem value="3-cols">3 Colunas</SelectItem>
                <SelectItem value="4-cols">4 Colunas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <UILabel htmlFor="disposition" className="text-xs">
              Disposição
            </UILabel>
            <Select
              value={component.props.disposition || 'top'}
              onValueChange={(value) => onUpdate({ ...component.props, disposition: value })}
            >
              <SelectTrigger id="disposition" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top">Barra em Cima</SelectItem>
                <SelectItem value="side">Barra ao Lado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização de Cores</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="barColor" className="text-xs">
              Barra
            </UILabel>
            <Input
              type="color"
              id="barColor"
              className="h-8 w-full p-1"
              value={component.props.barColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, barColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="trackColor" className="text-xs">
              Fundo
            </UILabel>
            <Input
              type="color"
              id="trackColor"
              className="h-8 w-full p-1"
              value={component.props.trackColor || '#FFFFFF'}
              onChange={(e) => onUpdate({ ...component.props, trackColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="textColor" className="text-xs">
              Texto
            </UILabel>
            <Input
              type="color"
              id="textColor"
              className="h-8 w-full p-1"
              value={component.props.textColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, textColor: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
