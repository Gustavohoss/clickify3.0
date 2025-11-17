'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import type { CanvasComponentData } from '../types';
import { WavingHandIcon } from './WavingHandIcon';

export const DepoimentosCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const testimonials = component.props.testimonials || [];
  const { cardBackgroundColor, cardBorderColor } = component.props;

  if (testimonials.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">Depoimentos</h3>
        <p className="mt-1 text-gray-500">Adicione depoimentos para começar</p>
      </div>
    );
  }

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-5 w-5',
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {testimonials.map((item) => (
        <div
          key={item.id}
          className="p-4 border"
          style={{
            backgroundColor: cardBackgroundColor,
            borderColor: cardBorderColor,
          }}
        >
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={item.imageUrl} alt={item.name} />
              <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <StarRating rating={item.rating} />
              <div className="mt-2">
                <p className="font-bold text-black">{item.name}</p>
                <p className="text-sm text-gray-500">{item.handle}</p>
              </div>
              <p className="mt-2 text-gray-600">{item.testimonial}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
