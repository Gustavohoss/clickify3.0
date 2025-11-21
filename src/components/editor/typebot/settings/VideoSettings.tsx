'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { CanvasBlock } from '../../types';

export const VideoBlockSettings = ({
  block,
  onUpdate,
  position,
}: {
  block: CanvasBlock;
  onUpdate: (id: number, props: any) => void;
  position: { x: number; y: number };
}) => {
  const [videoUrl, setVideoUrl] = useState(block.props?.videoUrl || '');
  const [autoplay, setAutoplay] = useState(block.props?.autoplay || false);

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
    onUpdate(block.id, { ...block.props, videoUrl: e.target.value });
  };

  const handleAutoplayChange = (checked: boolean) => {
    setAutoplay(checked);
    onUpdate(block.id, { ...block.props, autoplay: checked });
  };

  return (
    <div
      className="absolute w-72 rounded-lg bg-[#262626] p-3 shadow-lg"
      style={{
        left: `${position.x + 300}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <Tabs defaultValue="link" className="w-full">
        <TabsList className="grid w-full grid-cols-1 bg-transparent p-0 h-auto">
          <TabsTrigger
            value="link"
            className="text-xs data-[state=active]:bg-[#3f3f46] data-[state=active]:text-white rounded-md"
          >
            Link
          </TabsTrigger>
        </TabsList>
        <TabsContent value="link" className="mt-4">
          <div className="space-y-4">
            <Input
              placeholder="Cole o link do vídeo..."
              value={videoUrl}
              onChange={handleVideoUrlChange}
              className="bg-[#181818] border-[#3f3f46] text-white"
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="autoplay"
                checked={autoplay}
                onCheckedChange={handleAutoplayChange}
              />
              <Label htmlFor="autoplay" className="text-sm text-white">
                Habilitar autoplay
              </Label>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
