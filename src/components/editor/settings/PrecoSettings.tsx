'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import type { CanvasComponentData, ComponentProps } from '../types';

export const PrecoSettings = ({
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
            <UILabel htmlFor="planName" className="text-xs">
              Nome do Plano
            </UILabel>
            <Input
              id="planName"
              value={component.props.planName || ''}
              onChange={(e) => onUpdate({ ...component.props, planName: e.target.value })}
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <UILabel htmlFor="price" className="text-xs">
                Preço
              </UILabel>
              <Input
                id="price"
                value={component.props.price || ''}
                onChange={(e) => onUpdate({ ...component.props, price: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <UILabel htmlFor="priceSubtitle" className="text-xs">
                Subtítulo do Preço
              </UILabel>
              <Input
                id="priceSubtitle"
                value={component.props.priceSubtitle || ''}
                onChange={(e) => onUpdate({ ...component.props, priceSubtitle: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <UILabel htmlFor="discountText" className="text-xs">
                Texto de Desconto
              </UILabel>
              <Input
                id="discountText"
                value={component.props.discountText || ''}
                onChange={(e) => onUpdate({ ...component.props, discountText: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <UILabel htmlFor="popularText" className="text-xs">
                Texto de Popular
              </UILabel>
              <Input
                id="popularText"
                value={component.props.popularText || ''}
                onChange={(e) => onUpdate({ ...component.props, popularText: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <UILabel htmlFor="showPopularBanner">Mostrar Faixa "Popular"</UILabel>
            <Switch
              id="showPopularBanner"
              checked={component.props.showPopularBanner}
              onCheckedChange={(checked) => onUpdate({ ...component.props, showPopularBanner: checked })}
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização de Cores</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <UILabel className="text-xs">Fundo do Cartão</UILabel>
            <Input type="color" className="h-8 w-full p-1" value={component.props.cardBgColor || '#FFFFFF'} onChange={(e) => onUpdate({ ...component.props, cardBgColor: e.target.value })} />
          </div>
          <div className="space-y-1">
            <UILabel className="text-xs">Fundo do Preço</UILabel>
            <Input type="color" className="h-8 w-full p-1" value={component.props.priceBoxColor || '#E5E7EB'} onChange={(e) => onUpdate({ ...component.props, priceBoxColor: e.target.value })} />
          </div>
          <div className="space-y-1">
            <UILabel className="text-xs">Texto do Preço</UILabel>
            <Input type="color" className="h-8 w-full p-1" value={component.props.priceTextColor || '#111827'} onChange={(e) => onUpdate({ ...component.props, priceTextColor: e.target.value })} />
          </div>
          <div className="space-y-1">
            <UILabel className="text-xs">Fundo da Faixa</UILabel>
            <Input type="color" className="h-8 w-full p-1" value={component.props.popularBannerColor || '#1F2937'} onChange={(e) => onUpdate({ ...component.props, popularBannerColor: e.target.value })} />
          </div>
          <div className="space-y-1">
            <UILabel className="text-xs">Texto da Faixa</UILabel>
            <Input type="color" className="h-8 w-full p-1" value={component.props.popularTextColor || '#FFFFFF'} onChange={(e) => onUpdate({ ...component.props, popularTextColor: e.target.value })} />
          </div>
        </div>
      </Card>
    </div>
  );
};
