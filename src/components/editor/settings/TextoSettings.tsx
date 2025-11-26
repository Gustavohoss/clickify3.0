'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { RichTextToolbar } from './RichTextToolbar';
import type { CanvasComponentData, ComponentProps } from '../types';

export const TextoSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [currentBlockType, setCurrentBlockType] = useState('p');

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.innerHTML !== component.props.content) {
      editor.innerHTML = component.props.content || '';
    }
  }, [component.id, component.props.content]);

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
    updateCurrentBlockType();
    handleContentChange();
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      onUpdate({ ...component.props, content: editorRef.current.innerHTML });
    }
  };
  
  const updateCurrentBlockType = () => {
    let blockType = document.queryCommandValue('formatBlock');
    if (blockType === '' || blockType === 'div') {
        blockType = 'p';
    }
    setCurrentBlockType(blockType);
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo do Texto</h3>
        <div className="rounded-md border border-gray-200">
          <RichTextToolbar onFormat={handleFormat} currentBlockType={currentBlockType} />
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="w-full max-w-none overflow-auto rounded-b-md p-4 h-64 outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onBlur={handleContentChange}
            onKeyUp={updateCurrentBlockType}
            onMouseUp={updateCurrentBlockType}
          />
        </div>
      </Card>
    </div>
  );
};
