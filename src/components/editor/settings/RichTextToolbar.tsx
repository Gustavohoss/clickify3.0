'use client';

import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Bold, Italic, Underline, Strikethrough, Link as LinkIcon, List as ListIcon, ListOrdered, AlignLeft, AlignCenter, AlignRight, RemoveFormatting, Baseline, Highlighter
} from 'lucide-react';


export const RichTextToolbar = ({ onFormat, currentBlockType }: { onFormat: (command: string, value?: string) => void; currentBlockType: string; }) => {
  const ToolbarButton = ({ icon, command, value }: { icon: ReactNode; command: string; value?: string; }) => (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 text-gray-400 hover:bg-white/10 hover:text-white"
      onMouseDown={(e) => {
        e.preventDefault();
        if (command === 'createLink') {
          const url = prompt('Digite a URL do link:');
          if (url) {
            onFormat(command, url);
          }
        } else {
          onFormat(command, value);
        }
      }}
    >
      {icon}
    </Button>
  );

  const ColorButton = ({ icon, command }: { icon: ReactNode; command: 'foreColor' | 'hiliteColor' }) => {
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onFormat(command, e.target.value);
    };

    return (
      <div className="relative h-7 w-7">
        <label
          className="flex h-full w-full cursor-pointer items-center justify-center rounded-md text-gray-400 hover:bg-white/10 hover:text-white"
        >
          {icon}
          <input
            type="color"
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={handleColorChange}
            onMouseDown={(e) => e.preventDefault()}
          />
        </label>
      </div>
    );
  }

  const handleFormatBlockChange = (value: string) => {
    onFormat('formatBlock', value);
  };


  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-md border-b border-white/10 bg-transparent p-1">
      <Select value={currentBlockType} onValueChange={handleFormatBlockChange}>
        <SelectTrigger
          className="h-7 w-[120px] border-none bg-transparent text-xs text-gray-300 focus:ring-0"
          onMouseDown={(e) => e.preventDefault()}
        >
          <SelectValue placeholder="Normal" />
        </SelectTrigger>
        <SelectContent className='bg-gray-800 text-white border-gray-700'>
          <SelectItem value="h1">Heading 1</SelectItem>
          <SelectItem value="h2">Heading 2</SelectItem>
          <SelectItem value="h3">Heading 3</SelectItem>
          <SelectItem value="p">Normal</SelectItem>
        </SelectContent>
      </Select>
      <ToolbarButton icon={<Bold size={16} />} command="bold" />
      <ToolbarButton icon={<Italic size={16} />} command="italic" />
      <ToolbarButton icon={<Underline size={16} />} command="underline" />
      <ToolbarButton icon={<Strikethrough size={16} />} command="strikeThrough" />
      <ColorButton icon={<Baseline size={16} />} command="foreColor" />
      <ColorButton icon={<Highlighter size={16} />} command="hiliteColor" />
      <ToolbarButton icon={<ListIcon size={16} />} command="insertUnorderedList" />
      <ToolbarButton icon={<ListOrdered size={16} />} command="insertOrderedList" />
      <ToolbarButton icon={<AlignLeft size={16} />} command="justifyLeft" />
      <ToolbarButton icon={<AlignCenter size={16} />} command="justifyCenter" />
      <ToolbarButton icon={<AlignRight size={16} />} command="justifyRight" />
      <ToolbarButton icon={<LinkIcon size={16} />} command="createLink" />
      <ToolbarButton icon={<RemoveFormatting size={16} />} command="removeFormat" />
    </div>
  );
};
