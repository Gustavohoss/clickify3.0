'use client';

import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import type { CanvasComponentData } from '../types';
import { WavingHandIcon } from './WavingHandIcon';
import * as React from 'react';

export const CarroselCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const slides = component.props.slides || [];
  const loop = component.props.loop ?? false;

  const carouselOptions = React.useMemo(() => ({
    loop,
  }), [loop]);


  if (slides.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">Carrossel</h3>
        <p className="mt-1 text-gray-500">Adicione slides para começar</p>
      </div>
    );
  }
  
  const renderSlides = () => {
    return slides.map((slide, index) => (
      <CarouselItem key={`${slide.id}-${index}`}>
        <div className="p-1">
          <div className="border-0 bg-transparent shadow-none">
            <div className="relative flex aspect-video items-center justify-center bg-gray-100 p-0">
              {slide.imageUrl ? (
                <Image
                  src={slide.imageUrl}
                  alt={slide.caption || 'Slide image'}
                  layout="fill"
                  objectFit="contain"
                />
              ) : (
                <ImageIcon className="h-12 w-12 text-gray-400" />
              )}
            </div>
          </div>
          {slide.caption && (
            <p className="mt-2 text-center text-sm text-black">{slide.caption}</p>
          )}
        </div>
      </CarouselItem>
    ));
  };


  return (
    <Carousel className="w-full" opts={carouselOptions}>
      <CarouselContent>
        {renderSlides()}
        {loop && renderSlides()}
      </CarouselContent>
      <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2" />
    </Carousel>
  );
};
