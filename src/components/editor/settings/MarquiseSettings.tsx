
'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Grip } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import type { CanvasComponentData, ComponentProps, MarquiseItem } from '../types';

export const MarquiseSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const marquiseItems = component.props.marquiseItems || [];

  const handleUpdateItem = (
    itemId: number,
    key: keyof MarquiseItem,
    value: string
  ) => {
    const newItems = marquiseItems.map((item) =>
      item.id === itemId ? { ...item, [key]: value } : item
    );
    onUpdate({ ...component.props, marquiseItems: newItems });
  };

  const handleAddItem = () => {
    const newItem: MarquiseItem = {
      id: Date.now(),
      name: 'Nome do Usuário',
      handle: '@usuario',
      avatarUrl: `https://picsum.photos/seed/${Date.now()}/40/40`,
      text: 'Este é um novo depoimento que pode ser editado.',
    };
    onUpdate({ ...component.props, marquiseItems: [...marquiseItems, newItem] });
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = marquiseItems.filter((item) => item.id !== itemId);
    onUpdate({ ...component.props, marquiseItems: newItems });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Itens da Marquise</h3>
        <ScrollArea className="h-[30rem]">
          <div className="space-y-4 pr-4">
            {marquiseItems.map((item) => (
              <Card key={item.id} className="relative bg-card p-3 space-y-3">
                <div className="absolute top-2 left-2 flex items-center justify-center text-muted-foreground">
                  <Grip className="h-4 w-4 cursor-grab" />
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2 pt-8">
                   <div>
                    <UILabel htmlFor={`name-${item.id}`} className="text-xs">Nome</UILabel>
                    <Input id={`name-${item.id}`} value={item.name} onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)} className="mt-1 h-8" />
                  </div>
                   <div>
                    <UILabel htmlFor={`handle-${item.id}`} className="text-xs">@Handle</UILabel>
                    <Input id={`handle-${item.id}`} value={item.handle} onChange={(e) => handleUpdateItem(item.id, 'handle', e.target.value)} className="mt-1 h-8" />
                  </div>
                   <div>
                    <UILabel htmlFor={`avatarUrl-${item.id}`} className="text-xs">URL do Avatar</UILabel>
                    <Input id={`avatarUrl-${item.id}`} value={item.avatarUrl} onChange={(e) => handleUpdateItem(item.id, 'avatarUrl', e.target.value)} className="mt-1 h-8" />
                  </div>
                   <div>
                    <UILabel htmlFor={`text-${item.id}`} className="text-xs">Texto</UILabel>
                    <Textarea id={`text-${item.id}`} value={item.text} onChange={(e) => handleUpdateItem(item.id, 'text', e.target.value)} className="mt-1" />
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
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Animação</h3>
         <div className="space-y-4">
            <div>
              <UILabel htmlFor="speed" className="text-xs">
                Velocidade
              </UILabel>
              <Slider
                id="speed"
                min={1}
                max={100}
                step={1}
                value={[component.props.speed || 20]}
                onValueChange={(value) => onUpdate({ ...component.props, speed: value[0] })}
                className="mt-2"
              />
            </div>
            <div>
                <UILabel htmlFor="direction" className="text-xs">Direção</UILabel>
                <Select
                    value={component.props.direction || 'left'}
                    onValueChange={(value: 'left' | 'right') => onUpdate({ ...component.props, direction: value })}
                >
                    <SelectTrigger id="direction" className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                    <SelectItem value="left">Esquerda</SelectItem>
                    <SelectItem value="right">Direita</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center justify-between">
                <UILabel htmlFor="pauseOnHover">Pausar ao passar o mouse</UILabel>
                <Switch
                id="pauseOnHover"
                checked={component.props.pauseOnHover}
                onCheckedChange={(checked) => onUpdate({ ...component.props, pauseOnHover: checked })}
                />
            </div>
         </div>
      </Card>
    </div>
  );
};
