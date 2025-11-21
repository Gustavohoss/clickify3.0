'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import type { CanvasBlock } from '../../types';

export const EmbedBlockSettings = ({
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
        <Label className="text-xs text-white/50">Link ou código</Label>
        <Textarea
          value={props.url || ''}
          onChange={(e) => handleChange('url', e.target.value)}
          placeholder="Cole seu link ou código aqui..."
          className="bg-[#181818] border-[#3f3f46] text-white mt-1 h-32"
        />
      </div>

      <div>
        <Label className="text-xs text-white/50">Altura ({props.height || 200}px)</Label>
        <Slider
          value={[props.height || 200]}
          onValueChange={(value) => handleChange('height', value[0])}
          max={1000}
          step={10}
          className="mt-2"
        />
      </div>

      <div className="flex items-center justify-between rounded-lg bg-[#181818] p-3">
        <Label htmlFor="wait-for-event" className="text-sm">
          Aguardar pelo evento
        </Label>
        <Switch
          id="wait-for-event"
          checked={props.waitForEvent}
          onCheckedChange={(c) => handleChange('waitForEvent', c)}
        />
      </div>
    </div>
  );
};
