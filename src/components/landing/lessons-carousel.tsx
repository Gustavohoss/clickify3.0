
'use client';

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { BGPattern } from '@/components/ui/bg-pattern';


const lessons = [
  PlaceHolderImages.find(p => p.id === 'lesson-card-1'),
  PlaceHolderImages.find(p => p.id === 'lesson-card-2'),
  PlaceHolderImages.find(p => p.id === 'lesson-card-3'),
  PlaceHolderImages.find(p => p.id === 'lesson-card-4'),
  PlaceHolderImages.find(p => p.id === 'lesson-card-5'),
  PlaceHolderImages.find(p => p.id === 'lesson-card-6'),
].filter(Boolean) as any[];

const lessonsWithDuplicates = [...lessons, ...lessons];

export const LessonsCarousel = () => {
    return (
        <section className="relative py-16 overflow-hidden">
            <BGPattern variant="grid" className="z-10" />
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-background to-transparent z-20" />
            <div className="container mx-auto px-4 text-center relative z-30">
                <h2 className="text-3xl md:text-4xl font-bold font-body mb-10">
                    Aulas <span className="text-primary">Premium e Exclusivas</span>
                </h2>
                <div
                    className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
                >
                    <div
                        className={cn(
                            'flex shrink-0 items-center justify-around [animation-play-state:running] group-hover:[animation-play-state:paused]',
                            'animate-slide'
                        )}
                    >
                        {lessonsWithDuplicates.map((lesson, index) => (
                            <div key={`${lesson.id}-${index}`} className="relative w-[280px] h-[500px] shrink-0 px-4">
                                <Image
                                    src={lesson.imageUrl}
                                    alt={lesson.description}
                                    width={280}
                                    height={500}
                                    className="rounded-xl object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
