
'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Grip } from 'lucide-react';
import type { CanvasComponentData, ComponentProps, ListItem } from '../types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const emojis = [
  '✅', '🚀', '💡', '🔥', '⭐', '❤️', '👍', '🎉', '💰', '📈', '🎯', '🤔'
];


export const ListaSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const listItems = component.props.listItems || [];

  const handleUpdateItem = (
    itemId: number,
    key: keyof ListItem,
    value: string
  ) => {
    const newItems = listItems.map((item) =>
      item.id === itemId ? { ...item, [key]: value } : item
    );
    onUpdate({ ...component.props, listItems: newItems });
  };

  const handleAddItem = () => {
    const newItem: ListItem = {
      id: Date.now(),
      icon: '✅',
      iconBgColor: '#10B981',
      title: `Novo Item ${listItems.length + 1}`,
      subtitle: 'Descrição do item',
    };
    onUpdate({ ...component.props, listItems: [...listItems, newItem] });
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = listItems.filter((item) => item.id !== itemId);
    onUpdate({ ...component.props, listItems: newItems });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Itens da Lista</h3>
        <ScrollArea className="h-[35rem]">
          <div className="space-y-4 pr-4">
            {listItems.map((item) => (
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
                <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 pt-8">
                  <UILabel htmlFor={`title-${item.id}`} className="text-xs">
                    Título
                  </UILabel>
                  <Input
                    id={`title-${item.id}`}
                    value={item.title}
                    onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)}
                    className="h-8"
                  />

                  <UILabel htmlFor={`subtitle-${item.id}`} className="text-xs">
                    Subtítulo
                  </UILabel>
                  <Input
                    id={`subtitle-${item.id}`}
                    value={item.subtitle}
                    onChange={(e) => handleUpdateItem(item.id, 'subtitle', e.target.value)}
                    className="h-8"
                  />
                  
                  <UILabel className="text-xs">
                    Ícone
                  </UILabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-8 w-16 justify-start">
                        {item.icon}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2">
                       <div className="grid grid-cols-4 gap-2">
                          {emojis.map((emoji) => (
                            <Button
                              key={emoji}
                              variant="ghost"
                              className="text-lg"
                              onClick={() => handleUpdateItem(item.id, 'icon', emoji)}
                            >
                              {emoji}
                            </Button>
                          ))}
                        </div>
                    </PopoverContent>
                  </Popover>

                  <UILabel htmlFor={`iconBgColor-${item.id}`} className="text-xs">
                    Cor
                  </UILabel>
                  <Input
                    type="color"
                    id={`iconBgColor-${item.id}`}
                    value={item.iconBgColor}
                    onChange={(e) => handleUpdateItem(item.id, 'iconBgColor', e.target.value)}
                    className="h-8 w-16 p-1"
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
            <UILabel htmlFor="card-bg-color" className="text-xs">Cor</UILabel>
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
