'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Grip, Star } from 'lucide-react';
import type { CanvasComponentData, ComponentProps, TestimonialItem } from '../types';

export const DepoimentosSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const testimonials = component.props.testimonials || [];

  const handleUpdateTestimonial = (
    testimonialId: number,
    key: keyof TestimonialItem,
    value: string | number
  ) => {
    const newTestimonials = testimonials.map((item) =>
      item.id === testimonialId ? { ...item, [key]: value } : item
    );
    onUpdate({ ...component.props, testimonials: newTestimonials });
  };

  const handleAddTestimonial = () => {
    const newTestimonial: TestimonialItem = {
      id: Date.now(),
      imageUrl: `https://picsum.photos/seed/${Date.now()}/48/48`,
      name: 'Novo Depoimento',
      handle: '@usuario',
      rating: 5,
      testimonial: 'Adicione o texto do depoimento aqui.',
    };
    onUpdate({ ...component.props, testimonials: [...testimonials, newTestimonial] });
  };

  const handleDeleteTestimonial = (testimonialId: number) => {
    const newTestimonials = testimonials.filter((item) => item.id !== testimonialId);
    onUpdate({ ...component.props, testimonials: newTestimonials });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Depoimentos</h3>
        <ScrollArea className="h-[40rem]">
          <div className="space-y-4 pr-4">
            {testimonials.map((item) => (
              <Card key={item.id} className="relative bg-card p-3 space-y-3">
                <div className="absolute top-2 left-2 flex items-center justify-center text-muted-foreground">
                  <Grip className="h-4 w-4 cursor-grab" />
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleDeleteTestimonial(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 pt-8">
                  <UILabel htmlFor={`name-${item.id}`} className="text-xs">
                    Nome
                  </UILabel>
                  <Input
                    id={`name-${item.id}`}
                    value={item.name}
                    onChange={(e) => handleUpdateTestimonial(item.id, 'name', e.target.value)}
                    className="h-8"
                  />
                  <UILabel htmlFor={`handle-${item.id}`} className="text-xs">
                    @
                  </UILabel>
                  <Input
                    id={`handle-${item.id}`}
                    value={item.handle}
                    onChange={(e) => handleUpdateTestimonial(item.id, 'handle', e.target.value)}
                    className="h-8"
                  />
                  <UILabel htmlFor={`imageUrl-${item.id}`} className="text-xs">
                    Avatar
                  </UILabel>
                  <Input
                    id={`imageUrl-${item.id}`}
                    value={item.imageUrl}
                    onChange={(e) => handleUpdateTestimonial(item.id, 'imageUrl', e.target.value)}
                    className="h-8"
                  />
                  <UILabel htmlFor={`rating-${item.id}`} className="text-xs">
                    Nota
                  </UILabel>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 cursor-pointer ${
                          i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                        onClick={() => handleUpdateTestimonial(item.id, 'rating', i + 1)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <UILabel htmlFor={`testimonial-${item.id}`} className="text-xs">
                    Depoimento
                  </UILabel>
                  <Textarea
                    id={`testimonial-${item.id}`}
                    value={item.testimonial}
                    onChange={(e) =>
                      handleUpdateTestimonial(item.id, 'testimonial', e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddTestimonial}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Depoimento
        </Button>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="card-bg-color" className="text-xs">
              Fundo
            </UILabel>
            <Input
              type="color"
              id="card-bg-color"
              className="h-8 w-full p-1"
              value={component.props.cardBackgroundColor || '#FFFFFF'}
              onChange={(e) =>
                onUpdate({ ...component.props, cardBackgroundColor: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="card-text-color" className="text-xs">
              Texto
            </UILabel>
            <Input
              type="color"
              id="card-text-color"
              className="h-8 w-full p-1"
              value={component.props.cardTextColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, cardTextColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="card-border-color" className="text-xs">
              Borda
            </UILabel>
            <Input
              type="color"
              id="card-border-color"
              className="h-8 w-full p-1"
              value={component.props.cardBorderColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, cardBorderColor: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
