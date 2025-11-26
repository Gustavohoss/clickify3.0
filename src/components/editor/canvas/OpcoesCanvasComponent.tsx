'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Check } from 'lucide-react';
import type { CanvasComponentData } from '../types';
import { WavingHandIcon } from './WavingHandIcon';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const OpcoesCanvasComponent = ({ component, onOptionClick }: { component: CanvasComponentData, onOptionClick?: () => void; }) => {
  const {
    opcoesItems = [],
    borderStyle = 'media',
    shadowStyle = 'pequena',
    spacingStyle = 'medio',
    detailStyle = 'nenhum',
    styleType = 'simples',
    multipleChoice = false,
    autoAdvance = true,
  } = component.props;
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const borderClasses: Record<string, string> = {
    pequena: 'rounded-md',
    media: 'rounded-lg',
    grande: 'rounded-xl',
    gigante: 'rounded-2xl',
    'sem-borda': 'rounded-none',
  };
  const shadowClasses: Record<string, string> = {
    nenhuma: 'shadow-none',
    pequena: 'shadow-sm',
    media: 'shadow-md',
    grande: 'shadow-lg',
  };
  const spacingClasses: Record<string, string> = {
    pequeno: 'space-y-1',
    medio: 'space-y-2',
    grande: 'space-y-3',
  };
  const styleClasses: Record<string, string> = {
    simples: 'bg-white border border-gray-300',
    relevo: 'bg-gray-50 border-b-4 border-gray-200 active:border-b-2',
  };

  const handleClick = (itemId: number) => {
    if (multipleChoice) {
      setSelectedItems(prev => 
        prev.includes(itemId) 
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setSelectedItems([itemId]);
      if (autoAdvance && onOptionClick) {
        onOptionClick();
      }
    }
  }

  if (opcoesItems.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">Opções</h3>
        <p className="mt-1 text-gray-500">Configure suas opções</p>
      </div>
    );
  }

  return (
    <div className={cn('w-full', spacingClasses[spacingStyle])}>
      {opcoesItems.map((item) => {
        const isSelected = selectedItems.includes(item.id);
        const iconIsImage = item.iconType === 'image' && item.imageUrl;

        return (
          <button
            key={item.id}
            className={cn(
              'flex w-full items-center p-4 text-left transition-all relative',
              borderClasses[borderStyle],
              shadowClasses[shadowStyle],
              styleClasses[styleType],
              isSelected && 'ring-2 ring-primary border-primary'
            )}
            onClick={() => handleClick(item.id)}
          >
            {iconIsImage ? (
              <Image src={item.imageUrl!} alt={item.text} width={48} height={48} className="mr-4 rounded-full" />
            ) : (
              <span className="mr-4 text-4xl">{item.icon}</span>
            )}
            <span className="flex-grow font-medium text-black">{item.text}</span>
            {detailStyle === 'seta' && !isSelected && <ArrowRight className="h-5 w-5 text-gray-400" />}
            {detailStyle === 'confirmacao' && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                {isSelected && <div className="h-3 w-3 rounded-full bg-primary" />}
              </div>
            )}
             {isSelected && detailStyle !== 'nenhum' && <Check className="h-5 w-5 text-primary" />}
          </button>
        )
      })}
    </div>
  );
};
