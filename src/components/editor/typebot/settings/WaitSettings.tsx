'use client';

import React from 'react';
import { Braces } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { CanvasBlock } from '../../types';

export const WaitBlockSettings = ({
  block,
  onUpdate,
  position,
}: {
  block: CanvasBlock;
  onUpdate: (id: number, props: any) => void;
  position: { x: number; y: number };
}) => {
  const props = block.props || {};

  const handleChange = (key: string, value: any) => {
    onUpdate(block.id, { ...props, [key]: value });
  };

  return (
    <div
      className="absolute w-72 rounded-lg bg-[#262626] p-4 shadow-lg space-y-4 text-white"
      style={{
        left: `${position.x + 300}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div>
        <Label className="text-sm text-white/80">Segundos a esperar:</Label>
        <div className="relative mt-1">
          <Input
            type="number"
            placeholder="2"
            value={props.duration || ''}
            onChange={(e) =>
              handleChange('duration', e.target.value ? Number(e.target.value) : '')
            }
            className="bg-[#181818] border-[#3f3f46] text-white pr-8 focus:border-orange-500 focus-visible:ring-orange-500"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
            <Braces size={16} />
          </button>
        </div>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="advanced" className="border-none">
          <AccordionTrigger className="text-sm p-2 hover:no-underline hover:bg-[#3f3f46] rounded-md">
            Avançado
          </AccordionTrigger>
          <AccordionContent className="p-2 space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-timer" className="text-sm">
                Mostrar temporizador
              </Label>
              <Switch
                id="show-timer"
                checked={props.showTimer}
                onCheckedChange={(c) => handleChange('showTimer', c)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
