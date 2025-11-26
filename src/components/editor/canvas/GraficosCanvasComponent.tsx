'use client';

import { cn } from '@/lib/utils';
import type { CanvasComponentData } from '../types';
import { WavingHandIcon } from './WavingHandIcon';

export const GraficosCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    graficosItems = [],
    barColor = '#000000',
    trackColor = '#FFFFFF',
    textColor = '#000000',
    graficosLayout = '2-cols',
    disposition = 'top',
  } = component.props;

  const layoutClasses: { [key: string]: string } = {
    '1-col': 'grid-cols-1',
    '2-cols': 'grid-cols-2',
    '3-cols': 'grid-cols-3',
    '4-cols': 'grid-cols-4',
  };

  const gridClass = layoutClasses[graficosLayout] || 'grid-cols-2';
  const dispositionClass = disposition === 'top' ? 'flex-col' : 'flex-row items-center';

  if (graficosItems.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">Gráficos</h3>
        <p className="mt-1 text-gray-500">Adicione itens para começar.</p>
      </div>
    );
  }

  return (
    <div className={cn('grid gap-4', gridClass)}>
      {graficosItems.map((item) => (
        <div
          key={item.id}
          className={cn(
            'flex gap-2 p-4',
            dispositionClass,
            disposition === 'top' && 'items-center'
          )}
        >
          {item.title && <h4 className="text-sm font-semibold text-center mb-1" style={{ color: textColor }}>{item.title}</h4>}
          <div
            className={cn(
              'relative flex justify-end overflow-hidden rounded-lg border',
              disposition === 'top' ? 'h-32 w-12 flex-col' : 'h-12 w-32 flex-row-reverse'
            )}
            style={{ backgroundColor: trackColor }}
          >
            <div
              style={{
                [disposition === 'top' ? 'height' : 'width']: `${item.value}%`,
                backgroundColor: barColor,
              }}
            />
            <div
              className={cn(
                'absolute rounded-full px-1.5 py-0.5 text-xs font-semibold',
                disposition === 'top'
                  ? 'top-2 left-1/2 -translate-x-1/2'
                  : 'left-2 top-1/2 -translate-y-1/2'
              )}
              style={{
                color: textColor,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              {item.value}%
            </div>
          </div>
          <p className="text-center text-sm text-black mt-1" style={{ color: textColor }}>
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};
