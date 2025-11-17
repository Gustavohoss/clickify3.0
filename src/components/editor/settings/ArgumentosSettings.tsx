'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Grip } from 'lucide-react';
import type { CanvasComponentData, ComponentProps, ArgumentItem } from '../types';
import { Textarea } from '@/components/ui/textarea';
import React, { useState, useRef, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RichTextToolbar } from './RichTextToolbar';

const ArgumentEditor = ({
  item,
  onUpdate,
  onDelete,
}: {
  item: ArgumentItem;
  onUpdate: (id: number, newContent: Partial<ArgumentItem>) => void;
  onDelete: (id: number) => void;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(item.description);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.innerHTML !== content) {
      editor.innerHTML = content;
    }
  }, [content]);

  const handleContentChange = () => {
    if (editorRef.current) {
      onUpdate(item.id, { description: editorRef.current.innerHTML });
    }
  };

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleContentChange();
  };
  
  const handleTitleChange = (e: React.FocusEvent<HTMLHeadingElement>) => {
    onUpdate(item.id, { title: e.currentTarget.innerText });
  };

  return (
     <Card className="relative bg-[#1e1e1e] border-[#333] p-4 space-y-4">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-muted-foreground">
        <Grip className="h-5 w-5 cursor-grab text-gray-500" />
        </div>

        <div className="flex justify-center pt-6">
        <div className="relative">
            <Popover>
            <PopoverTrigger asChild>
                <button className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-3xl">
                {item.icon}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <p className="p-4">Emoji picker placeholder</p>
            </PopoverContent>
            </Popover>
            <button 
              onClick={() => onDelete(item.id)}
              className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white"
            >
            <Trash2 className="h-3 w-3" />
            </button>
        </div>
        </div>
        
        <div className='bg-white/5 rounded-md'>
        <RichTextToolbar onFormat={handleFormat} />
        <div className="p-4 text-white focus:outline-none"
             ref={editorRef}
             contentEditable
             suppressContentEditableWarning
             onBlur={handleContentChange}
             dangerouslySetInnerHTML={{ __html: item.description }}
        >
        </div>
        </div>
        
        <div className="flex justify-center">
          <Button variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:bg-red-500/10 hover:text-red-500" onClick={() => onDelete(item.id)}>
              <Trash2 className="h-4 w-4" />
          </Button>
        </div>
    </Card>
  )
}


export const ArgumentosSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const items = component.props.items || [];
  
  const handleUpdateItem = (
    itemId: number,
    newContent: Partial<ArgumentItem>
  ) => {
    const newItems = items.map((item) =>
      item.id === itemId ? { ...item, ...newContent } : item
    );
    onUpdate({ ...component.props, items: newItems });
  };

  const handleAddItem = () => {
    const newItem: ArgumentItem = {
      id: Date.now(),
      icon: '💬',
      title: 'Argumento',
      description: '<strong>Argumento</strong><p>Lorem ipsum dolor sit amet.</p>',
    };
    onUpdate({ ...component.props, items: [...items, newItem] });
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = items.filter((item) => item.id !== itemId);
    onUpdate({ ...component.props, items: newItems });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map((item: ArgumentItem) => (
           <ArgumentEditor 
            key={item.id}
            item={item}
            onUpdate={handleUpdateItem}
            onDelete={handleDeleteItem}
           />
        ))}
      </div>
      <Button variant="link" className="text-white/70" onClick={handleAddItem}>
        <Plus className="mr-2 h-4 w-4" />
        Adicionar Argumento
      </Button>
    </div>
  );
};
