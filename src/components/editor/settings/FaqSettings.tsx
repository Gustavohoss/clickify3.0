'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Grip } from 'lucide-react';
import type { CanvasComponentData, ComponentProps, FaqItem } from '../types';

export const FaqSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const faqItems = component.props.faqItems || [];

  const handleUpdateItem = (
    itemId: number,
    key: keyof FaqItem,
    value: string
  ) => {
    const newItems = faqItems.map((item) =>
      item.id === itemId ? { ...item, [key]: value } : item
    );
    onUpdate({ ...component.props, faqItems: newItems });
  };

  const handleAddItem = () => {
    const newItem: FaqItem = {
      id: Date.now(),
      question: 'Nova Pergunta?',
      answer: 'Adicione a resposta aqui.',
    };
    onUpdate({ ...component.props, faqItems: [...faqItems, newItem] });
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = faqItems.filter((item) => item.id !== itemId);
    onUpdate({ ...component.props, faqItems: newItems });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Itens do FAQ</h3>
        <ScrollArea className="h-[40rem]">
          <div className="space-y-4 pr-4">
            {faqItems.map((item) => (
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
                <div className="pt-8 space-y-2">
                  <div>
                    <UILabel htmlFor={`question-${item.id}`} className="text-xs">
                      Pergunta
                    </UILabel>
                    <Input
                      id={`question-${item.id}`}
                      value={item.question}
                      onChange={(e) => handleUpdateItem(item.id, 'question', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <UILabel htmlFor={`answer-${item.id}`} className="text-xs">
                      Resposta
                    </UILabel>
                    <Textarea
                      id={`answer-${item.id}`}
                      value={item.answer}
                      onChange={(e) => handleUpdateItem(item.id, 'answer', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddItem}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Pergunta
        </Button>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="faq-bg-color" className="text-xs">
              Fundo
            </UILabel>
            <Input
              type="color"
              id="faq-bg-color"
              className="h-8 w-full p-1"
              value={component.props.faqBackgroundColor || '#FFFFFF'}
              onChange={(e) =>
                onUpdate({ ...component.props, faqBackgroundColor: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="faq-text-color" className="text-xs">
              Texto
            </UILabel>
            <Input
              type="color"
              id="faq-text-color"
              className="h-8 w-full p-1"
              value={component.props.faqTextColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, faqTextColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="faq-border-color" className="text-xs">
              Borda
            </UILabel>
            <Input
              type="color"
              id="faq-border-color"
              className="h-8 w-full p-1"
              value={component.props.faqBorderColor || '#E5E7EB'}
              onChange={(e) => onUpdate({ ...component.props, faqBorderColor: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
