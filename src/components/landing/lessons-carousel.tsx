
'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const lessons = [
  {
    id: 'lesson-1',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/y510lieie4op8pdhz5o07zj8?v=1764037761049',
    description: 'Aula 1',
  },
  {
    id: 'lesson-2',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/e9v9vopox1y5qctk6ztvj4mw?v=1764038145428',
    description: 'Aula 2',
  },
  {
    id: 'lesson-3',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/rtykaylwwnetzpo5wcb5o4p5?v=1764046946432',
    description: 'Aula 3',
  },
];

export const LessonsCarousel = () => {
  const duplicatedLessons = [...lessons, ...lessons];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-1 text-center relative z-30">
        <h1 className="md:text-5xl text-3xl lg:text-6xl text-white font-body mb-10" style={{ textShadow: '0 0 8px hsla(var(--primary), 0.5)' }}>
          Aulas <span className="text-primary">premium</span> e <span className="text-primary"> exclusivas! </span>
        </h1>
        <div
          className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll">
            {duplicatedLessons.map((lesson, index) => (
              <li key={`${lesson.id}-${index}`}>
                <Image
                  src={lesson.imageUrl}
                  alt={lesson.description}
                  width={150}
                  height={225}
                  className={cn("rounded-xl object-cover h-[225px] w-[150px]")}
                />
              </li>
            ))}
          </ul>
           <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
            {duplicatedLessons.map((lesson, index) => (
              <li key={`${lesson.id}-clone-${index}`}>
                <Image
                  src={lesson.imageUrl}
                  alt={lesson.description}
                  width={150}
                  height={225}
                  className={cn("rounded-xl object-cover h-[225px] w-[150px]")}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
