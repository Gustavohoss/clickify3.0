'use client';

import React from 'react';
import type { CanvasComponentData, ArgumentItem } from '../types';
import { WavingHandIcon } from './WavingHandIcon';
import { cn } from '@/lib/utils';

export const ArgumentoCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const items = component.props.items || [];
  const layout = component.props.layout || 'list';
  const disposition = component.props.disposition || 'icon-top';

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center text-black bg-white rounded-lg border border-gray-200">
        <div className="mb-2">
          <WavingHandIcon />
        </div>
        <h3 className="text-base font-bold">Argumento</h3>
        <p className="mt-1 text-sm text-gray-500">Lorem ipsum dollor sit amet</p>
      </div>
    );
  }

  const layoutClasses: { [key: string]: string } = {
    list: 'space-y-4',
    '2-cols': 'grid md:grid-cols-2 gap-4',
    '3-cols': 'grid md:grid-cols-3 gap-4',
    '4-cols': 'grid md:grid-cols-4 gap-4',
  };

  const dispositionClasses: { [key: string]: { container: string, text: string } } = {
    'icon-top': {
      container: 'flex-col text-center',
      text: 'text-center'
    },
    'icon-side': {
      container: 'flex-row text-left',
      text: 'text-left'
    }
  }

  return (
    <div className={layoutClasses[layout]}>
      {items.map((item: ArgumentItem) => (
        <div 
          key={item.id} 
          className={cn(
            "flex items-center gap-4 text-black p-4 rounded-lg bg-white border border-gray-200",
            dispositionClasses[disposition].container
          )}
        >
          <div className="text-3xl">{item.icon}</div>
          <div className={cn('flex-1', dispositionClasses[disposition].text)} dangerouslySetInnerHTML={{ __html: item.description }} />
        </div>
      ))}
    </div>
  );
};
