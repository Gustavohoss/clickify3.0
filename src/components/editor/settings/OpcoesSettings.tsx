
'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Grip } from 'lucide-react';
import type { CanvasComponentData, ComponentProps, OpcaoItem } from '../types';

export const OpcoesSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const opcoesItems = component.props.opcoesItems || [];

  const handleUpdateItem = (
    itemId: number,
    key: keyof OpcaoItem,
    value: string
  ) => {
    const newItems = opcoesItems.map((item) =>
      item.id === itemId ? { ...item, [key]: value } : item
    );
    onUpdate({ ...component.props, opcoesItems: newItems });
  };

  const handleAddItem = () => {
    const newItem: OpcaoItem = {
      id: Date.now(),
      icon: '💬',
      text: `Opção ${opcoesItems.length + 1}`,
    };
    onUpdate({ ...component.props, opcoesItems: [...opcoesItems, newItem] });
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = opcoesItems.filter((item) => item.id !== itemId);
    onUpdate({ ...component.props, opcoesItems: newItems });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Itens</h3>
        <ScrollArea className="h-[25rem]">
          <div className="space-y-3 pr-4">
            {opcoesItems.map((item) => (
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
                <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 pt-8">
                  <UILabel htmlFor={`icon-${item.id}`} className="text-xs">
                    Ícone
                  </UILabel>
                  <Input
                    id={`icon-${item.id}`}
                    value={item.icon}
                    onChange={(e) => handleUpdateItem(item.id, 'icon', e.target.value)}
                    className="h-8"
                  />

                  <UILabel htmlFor={`text-${item.id}`} className="text-xs">
                    Texto
                  </UILabel>
                  <Input
                    id={`text-${item.id}`}
                    value={item.text}
                    onChange={(e) => handleUpdateItem(item.id, 'text', e.target.value)}
                    className="h-8"
                  />
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddItem}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Opção
        </Button>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Interação</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <UILabel htmlFor="multipleChoice">Múltipla Escolha</UILabel>
            <Switch
              id="multipleChoice"
              checked={component.props.multipleChoice}
              onCheckedChange={(checked) =>
                onUpdate({ ...component.props, multipleChoice: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="opcoesRequired">Obrigatório</UILabel>
            <Switch
              id="opcoesRequired"
              checked={component.props.opcoesRequired}
              onCheckedChange={(checked) =>
                onUpdate({ ...component.props, opcoesRequired: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="autoAdvance">Avançar Automaticamente</UILabel>
            <Switch
              id="autoAdvance"
              checked={component.props.autoAdvance}
              onCheckedChange={(checked) =>
                onUpdate({ ...component.props, autoAdvance: checked })
              }
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilo</h3>
        <div className="space-y-4">
          <UILabel className="text-xs">Borda</UILabel>
          <Select
            value={component.props.borderStyle || 'media'}
            onValueChange={(value) => onUpdate({ ...component.props, borderStyle: value })}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="pequena">Pequena</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="grande">Grande</SelectItem>
              <SelectItem value="gigante">Gigante</SelectItem>
              <SelectItem value="sem-borda">Sem Borda</SelectItem>
            </SelectContent>
          </Select>
          
          <UILabel className="text-xs">Sombra</UILabel>
          <Select
            value={component.props.shadowStyle || 'pequena'}
            onValueChange={(value) => onUpdate({ ...component.props, shadowStyle: value })}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="nenhuma">Nenhuma</SelectItem>
              <SelectItem value="pequena">Pequena</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="grande">Grande</SelectItem>
            </SelectContent>
          </Select>

          <UILabel className="text-xs">Espaçamento</UILabel>
          <Select
            value={component.props.spacingStyle || 'medio'}
            onValueChange={(value) => onUpdate({ ...component.props, spacingStyle: value })}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="pequeno">Pequeno</SelectItem>
              <SelectItem value="medio">Médio</SelectItem>
              <SelectItem value="grande">Grande</SelectItem>
            </SelectContent>
          </Select>

          <UILabel className="text-xs">Detalhe</UILabel>
          <Select
            value={component.props.detailStyle || 'nenhum'}
            onValueChange={(value) => onUpdate({ ...component.props, detailStyle: value })}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="nenhum">Nenhum</SelectItem>
              <SelectItem value="seta">Seta</SelectItem>
              <SelectItem value="confirmacao">Confirmação</SelectItem>
            </SelectContent>
          </Select>
          
          <UILabel className="text-xs">Tipo</UILabel>
           <Select
            value={component.props.styleType || 'simples'}
            onValueChange={(value) => onUpdate({ ...component.props, styleType: value })}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
                <SelectItem value="simples">Simples</SelectItem>
                <SelectItem value="relevo">Relevo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
    </div>
  );
};
