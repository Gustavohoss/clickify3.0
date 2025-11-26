'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Grip } from 'lucide-react';
import type { CanvasComponentData, ComponentProps, Lista2Item } from '../types';

export const Lista2Settings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const items = component.props.lista2Items || [];

  const handleUpdateItem = (itemId: number, newText: string) => {
    const newItems = items.map((item) =>
      item.id === itemId ? { ...item, text: newText } : item
    );
    onUpdate({ ...component.props, lista2Items: newItems });
  };

  const handleAddItem = () => {
    const newItem: Lista2Item = {
      id: Date.now(),
      text: `Novo Item ${items.length + 1}`,
    };
    onUpdate({ ...component.props, lista2Items: [...items, newItem] });
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = items.filter((item) => item.id !== itemId);
    onUpdate({ ...component.props, lista2Items: newItems });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Título</h3>
         <div>
            <UILabel htmlFor="title" className="text-xs">
              Título da Lista
            </UILabel>
            <Input
              id="title"
              value={component.props.title || ''}
              onChange={(e) => onUpdate({ ...component.props, title: e.target.value })}
              className="mt-1"
            />
          </div>
      </Card>
      
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Itens da Lista</h3>
        <ScrollArea className="h-[30rem]">
          <div className="space-y-4 pr-4">
            {items.map((item) => (
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
                  <Input
                    value={item.text}
                    onChange={(e) => handleUpdateItem(item.id, e.target.value)}
                    className="h-9"
                    placeholder="Texto do item"
                  />
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
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="card-bg-color" className="text-xs">Fundo</UILabel>
            <Input type="color" id="card-bg-color" className="h-8 w-full p-1" value={component.props.cardBackgroundColor || '#FFFFFF'} onChange={(e) => onUpdate({ ...component.props, cardBackgroundColor: e.target.value })} />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="card-text-color" className="text-xs">Texto</UILabel>
            <Input type="color" id="card-text-color" className="h-8 w-full p-1" value={component.props.cardTextColor || '#000000'} onChange={(e) => onUpdate({ ...component.props, cardTextColor: e.target.value })} />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="card-border-color" className="text-xs">Borda</UILabel>
            <Input type="color" id="card-border-color" className="h-8 w-full p-1" value={component.props.cardBorderColor || '#E5E7EB'} onChange={(e) => onUpdate({ ...component.props, cardBorderColor: e.target.value })} />
          </div>
        </div>
      </Card>
    </div>
  );
};
