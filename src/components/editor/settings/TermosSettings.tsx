
'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Grip } from 'lucide-react';
import type { CanvasComponentData, ComponentProps, TermosLinkItem } from '../types';

export const TermosSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const links = component.props.links || [];

  const handleUpdateLink = (
    linkId: number,
    key: keyof TermosLinkItem,
    value: string
  ) => {
    const newLinks = links.map((link) =>
      link.id === linkId ? { ...link, [key]: value } : link
    );
    onUpdate({ ...component.props, links: newLinks });
  };

  const handleAddLink = () => {
    const newLink: TermosLinkItem = {
      id: Date.now(),
      text: 'Novo Link',
      url: '#',
    };
    onUpdate({ ...component.props, links: [...links, newLink] });
  };

  const handleDeleteLink = (linkId: number) => {
    const newLinks = links.filter((link) => link.id !== linkId);
    onUpdate({ ...component.props, links: newLinks });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="mainText" className="text-xs">
              Texto Principal
            </UILabel>
            <Input
              id="mainText"
              value={component.props.mainText || ''}
              onChange={(e) => onUpdate({ ...component.props, mainText: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Links</h3>
        <ScrollArea className="h-[20rem]">
          <div className="space-y-3 pr-4">
            {links.map((link) => (
              <Card key={link.id} className="relative bg-card p-3 space-y-3">
                <div className="absolute top-2 left-2 flex items-center justify-center text-muted-foreground">
                  <Grip className="h-4 w-4 cursor-grab" />
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDeleteLink(link.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-2 pt-8">
                  <Input
                    value={link.text}
                    onChange={(e) => handleUpdateLink(link.id, 'text', e.target.value)}
                    className="h-9"
                    placeholder="Texto do Link"
                  />
                  <Input
                    value={link.url}
                    onChange={(e) => handleUpdateLink(link.id, 'url', e.target.value)}
                    className="h-9"
                    placeholder="URL"
                  />
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddLink}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Link
        </Button>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilo do Texto</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="termosTextColor" className="text-xs">Cor do Texto</UILabel>
            <Input
              type="color"
              id="termosTextColor"
              className="h-8 w-full p-1 mt-1"
              value={component.props.termosTextColor || '#6B7280'}
              onChange={(e) => onUpdate({ ...component.props, termosTextColor: e.target.value })}
            />
          </div>
          <div>
            <UILabel htmlFor="termosFontSize" className="text-xs">Tamanho da Fonte</UILabel>
            <Select
              value={component.props.termosFontSize || 'sm'}
              onValueChange={(value) => onUpdate({ ...component.props, termosFontSize: value })}
            >
              <SelectTrigger id="termosFontSize" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xs">Extra Pequeno</SelectItem>
                <SelectItem value="sm">Pequeno</SelectItem>
                <SelectItem value="base">Médio</SelectItem>
                <SelectItem value="lg">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <UILabel htmlFor="termosTextAlign" className="text-xs">Alinhamento</UILabel>
            <Select
              value={component.props.termosTextAlign || 'center'}
              onValueChange={(value) => onUpdate({ ...component.props, termosTextAlign: value })}
            >
              <SelectTrigger id="termosTextAlign" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Esquerda</SelectItem>
                <SelectItem value="center">Centro</SelectItem>
                <SelectItem value="right">Direita</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </div>
  );
};
