'use client';

import { CheckCircle } from 'lucide-react';
import type { CanvasComponentData, Lista2Item } from '../types';
import { WavingHandIcon } from './WavingHandIcon';

export const Lista2CanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const items = component.props.lista2Items || [];
  const title = component.props.title || 'Com o Treinos PMT, você terá:';
  const { cardBackgroundColor, cardTextColor, cardBorderColor } = component.props;

  if (items.length === 0) {
    return (
      <div
        className="rounded-lg border p-6 text-center text-black shadow-md"
        style={{
          backgroundColor: cardBackgroundColor || '#FFFFFF',
          borderColor: cardBorderColor || '#E5E7EB',
        }}
      >
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold" style={{ color: cardTextColor || '#000000' }}>
          Lista 2.0
        </h3>
        <p className="mt-1 text-gray-500" style={{ color: cardTextColor ? `${cardTextColor}B3` : '' }}>
          Adicione itens para começar.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border p-6 shadow-md"
      style={{
        backgroundColor: cardBackgroundColor || '#FFFFFF',
        borderColor: cardBorderColor || '#E5E7EB',
      }}
    >
      <h3 className="mb-4 text-lg font-bold" style={{ color: cardTextColor || '#000000' }}>
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item: Lista2Item) => (
          <li key={item.id} className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 flex-shrink-0 text-black" style={{ color: cardTextColor || '#000000' }} />
            <span className="text-base" style={{ color: cardTextColor || '#000000' }}>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
