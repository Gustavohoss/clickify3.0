
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Braces } from 'lucide-react';

export const EditableTextBlock = React.memo(
  ({ initialContent, onSave, onVariableInsert, variables }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    useEffect(() => {
      // Set initial content when the component mounts or initialContent changes
      if (editorRef.current && editorRef.current.innerHTML !== initialContent) {
        editorRef.current.innerHTML = initialContent || '';
      }
    }, [initialContent]);

    const handleBlur = () => {
      if (editorRef.current) {
        // Save to parent state only when focus is lost
        onSave(editorRef.current.innerHTML);
      }
    };
    
    const handleVariableInsert = (variable: string) => {
      const editor = editorRef.current;
      if (!editor) return;
    
      editor.focus();
    
      document.execCommand('insertHTML', false, `<span style="color: #a78bfa;" contenteditable="false">{{${variable}}}</span>&nbsp;`);
      
      onSave(editor.innerHTML); // Save immediately after inserting a variable
      setIsPopoverOpen(false);
    };

    return (
      <div className="relative w-full">
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={handleBlur}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          dangerouslySetInnerHTML={{ __html: initialContent || '' }}
          data-placeholder="Digite sua mensagem..."
          className="w-full bg-transparent text-sm text-white outline-none resize-none p-0 pr-8 min-h-[20px] [&[data-placeholder]]:before:content-[attr(data-placeholder)] [&[data-placeholder]]:before:text-white/40 [&:not(:empty)]:before:hidden"
        />
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              className="absolute right-1 top-1 h-6 w-6 rounded bg-[#3f3f46] flex items-center justify-center hover:bg-[#4a4a52]"
              onMouseDown={(e) => e.preventDefault()} // Prevent editor from losing focus
            >
              <Braces size={14} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0 bg-[#262626] border-[#3f3f46] text-white">
            <Command>
              <CommandInput placeholder="Procurar variável..." className="h-9 text-white" />
              <CommandList>
                <CommandEmpty>Nenhuma variável encontrada.</CommandEmpty>
                <CommandGroup>
                  {variables.map((variable) => (
                    <CommandItem
                      key={variable}
                      value={variable}
                      onSelect={() => handleVariableInsert(variable)}
                    >
                      {variable}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

EditableTextBlock.displayName = 'EditableTextBlock';
