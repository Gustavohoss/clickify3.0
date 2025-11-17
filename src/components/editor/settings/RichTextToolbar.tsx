'use client';

import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Bold, Italic, Underline, Strikethrough, Link as LinkIcon, List as ListIcon, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify, RemoveFormatting
} from 'lucide-react';


export const RichTextToolbar = ({ onFormat }: { onFormat: (command: string, value?: string) => void }) => {
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

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-md border-b border-white/10 bg-transparent p-1">
      <Select defaultValue="p" onValueChange={(value) => onFormat('formatBlock', value)}>
        <SelectTrigger className="h-7 w-[80px] border-none bg-transparent text-xs text-gray-300 focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className='bg-gray-800 text-white border-gray-700'>
          <SelectItem value="p">Normal</SelectItem>
          <SelectItem value="h1">Título 1</SelectItem>
          <SelectItem value="h2">Título 2</SelectItem>
          <SelectItem value="h3">Título 3</SelectItem>
        </SelectContent>
      </Select>
       <Select defaultValue="Normal" onValueChange={(value) => console.log(value)}>
        <SelectTrigger className="h-7 w-[80px] border-none bg-transparent text-xs text-gray-300 focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className='bg-gray-800 text-white border-gray-700'>
          <SelectItem value="Normal">Normal</SelectItem>
          <SelectItem value="Highlighted">Destacado</SelectItem>
        </SelectContent>
      </Select>
      <ToolbarButton icon={<Bold size={16} />} command="bold" />
      <ToolbarButton icon={<Italic size={16} />} command="italic" />
      <ToolbarButton icon={<Underline size={16} />} command="underline" />
      <ToolbarButton icon={<Strikethrough size={16} />} command="strikeThrough" />
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