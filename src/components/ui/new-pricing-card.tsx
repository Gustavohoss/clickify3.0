
'use client';

import { Check } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface NewPricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  priceSuffix?: string;
  features: string[];
  isFeatured: boolean;
}

export function NewPricingCard({
  title,
  subtitle,
  price,
  priceSuffix,
  features,
  isFeatured,
}: NewPricingCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-3xl border p-8 text-white',
        isFeatured
          ? 'border-primary/50 bg-gray-900/50'
          : 'border-gray-700 bg-gray-900/30'
      )}
    >
      {isFeatured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
          Mais Popular
        </div>
      )}
      <div className="space-y-2 text-center">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-gray-400">{subtitle}</p>
      </div>

      <ul className="mt-8 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Check className="h-4 w-4" />
            </span>
            <span className="font-medium">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <p className="text-5xl font-bold">
          {price}
          {priceSuffix && <span className="text-lg font-normal text-gray-400">{priceSuffix}</span>}
        </p>
        <div className="mt-4 flex items-center justify-center gap-4">
           <Image src="https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/a68fdlm0uvhla5lseapdlldx?v=1763597469798" alt="Pix" width={32} height={24} />
           <Image src="https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/dy0jgeiy3p0ow3jv7girqid2?v=1763597472369" alt="Visa" width={32} height={24} />
           <Image src="https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/ecqfs0lq4nosjbnybwwl63lz?v=1763597481076" alt="Boleto" width={32} height={24} />
        </div>
      </div>
      
      <Button variant="glow" size="lg" className="mt-8 w-full">
        Escolher este plano
      </Button>
    </div>
  );
}
