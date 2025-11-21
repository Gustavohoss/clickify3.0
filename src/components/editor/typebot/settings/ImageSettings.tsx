'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { CanvasBlock } from '../../types';

export const ImageBlockSettings = ({
  block,
  onUpdate,
  position,
}: {
  block: CanvasBlock;
  onUpdate: (id: number, props: any) => void;
  position: { x: number; y: number };
}) => {
  const [imageUrl, setImageUrl] = useState(block.props?.imageUrl || '');
  const [onClickLink, setOnClickLink] = useState(
    block.props?.onClickLink || false
  );

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    onUpdate(block.id, { ...block.props, imageUrl: e.target.value });
  };

  const handleOnClickLinkChange = (checked: boolean) => {
    setOnClickLink(checked);
    onUpdate(block.id, { ...block.props, onClickLink: checked });
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
        <TabsList className="grid w-full grid-cols-5 bg-transparent p-0 h-auto">
          <TabsTrigger
            value="link"
            className="text-xs data-[state=active]:bg-[#3f3f46] data-[state=active]:text-white rounded-md"
          >
            Link
          </TabsTrigger>
          <TabsTrigger
            value="upload"
            className="text-xs data-[state=active]:bg-[#3f3f46] data-[state=active]:text-white rounded-md"
          >
            Enviar
          </TabsTrigger>
          <TabsTrigger
            value="giphy"
            className="text-xs data-[state=active]:bg-[#3f3f46] data-[state=active]:text-white rounded-md"
          >
            Giphy
          </TabsTrigger>
          <TabsTrigger
            value="unsplash"
            className="text-xs data-[state=active]:bg-[#3f3f46] data-[state=active]:text-white rounded-md"
          >
            Unsplash
          </TabsTrigger>
          <TabsTrigger
            value="icon"
            className="text-xs data-[state=active]:bg-[#3f3f46] data-[state=active]:text-white rounded-md"
          >
            Ícone
          </TabsTrigger>
        </TabsList>
        <TabsContent value="link" className="mt-4">
          <div className="space-y-4">
            <Input
              placeholder="Cole o link da imagem..."
              value={imageUrl}
              onChange={handleImageUrlChange}
              className="bg-[#181818] border-[#3f3f46] text-white"
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="on-click-link"
                checked={onClickLink}
                onCheckedChange={handleOnClickLinkChange}
              />
              <Label htmlFor="on-click-link" className="text-sm">
                Abrir link ao clicar
              </Label>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
