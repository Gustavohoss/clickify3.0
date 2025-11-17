'use client';

import type { CanvasComponentData } from '../types';
import { WavingHandIcon } from './WavingHandIcon';

export const ListaCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const items = component.props.listItems || [];
  const { cardBackgroundColor, cardTextColor, cardBorderColor } = component.props;

  if (items.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">Lista</h3>
        <p className="mt-1 text-gray-500">Adicione itens para começar</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="rounded-lg bg-white p-3 shadow-md"
          style={{
            backgroundColor: cardBackgroundColor,
            borderColor: cardBorderColor,
            borderWidth: cardBorderColor ? '1px' : '0',
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: item.iconBgColor }}
            >
              <span className="text-xl text-white">{item.icon}</span>
            </div>
            <div>
              <p 
                className="font-semibold text-black"
                style={{ color: cardTextColor }}
              >
                {item.title}
              </p>
              <p 
                className="text-sm text-gray-500"
                style={{ color: cardTextColor ? `${cardTextColor}B3` : '' }}
              >
                {item.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
