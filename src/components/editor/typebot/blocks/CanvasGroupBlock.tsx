'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Copy, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CanvasBlock, DropIndicator } from '../../types';
import { CanvasTextBlock } from './CanvasTextBlock';
import { ConnectionHandle } from '../ui/ConnectionHandle';
import { DropPlaceholder } from '../ui/DropPlaceholder';

export const CanvasGroupBlock = ({
  block,
  groupIndex,
  onBlockMouseDown,
  onDuplicate,
  onDelete,
  onContextMenu,
  isSelected,
  setSelectedBlockId,
  dropIndicator,
  updateBlockProps,
  variables,
  onConnectionStart,
  selectedBlockId,
}: {
  block: CanvasBlock;
  groupIndex: number;
  onBlockMouseDown: (e: React.MouseEvent, block: CanvasBlock) => void;
  onDuplicate: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  onContextMenu: (e: React.MouseEvent, block: CanvasBlock) => void;
  isSelected: boolean;
  setSelectedBlockId: (id: number | null) => void;
  dropIndicator: DropIndicator;
  updateBlockProps: (id: number, props: any) => void;
  variables: string[];
  onConnectionStart: (
    e: React.MouseEvent,
    fromBlockId: number,
    fromHandle: 'output'
  ) => void;
  selectedBlockId: number | null;
}) => (
  <div
    id={`block-${block.id}`}
    className="group absolute w-72 cursor-grab select-none pointer-events-auto"
    style={{
      transform: `translate(${block.position.x}px, ${block.position.y}px)`,
    }}
    onMouseDown={(e) => {
      if (e.button !== 0) return;
      onBlockMouseDown(e, block);
    }}
    onContextMenu={(e) => onContextMenu(e, block)}
  >
    <ConnectionHandle
      data-handle-id={`output-${block.id}`}
      onMouseDown={(e) => {
        e.stopPropagation();
        onConnectionStart(e, block.id, 'output');
      }}
    />
    <ConnectionHandle
      data-handle-id={`input-${block.id}`}
      isInput
      onMouseDown={(e) => e.stopPropagation()}
    />

    <div className="absolute -top-10 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-md bg-[#181818] p-1 opacity-0 transition-opacity group-hover:opacity-100">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-white/70 hover:bg-[#3f3f46] hover:text-white"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Play size={14} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-white/70 hover:bg-[#3f3f46] hover:text-white"
        onClick={onDuplicate}
      >
        <Copy size={14} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-white/70 hover:bg-[#3f3f46] hover:text-white"
        onClick={onDelete}
      >
        <Trash2 size={14} />
      </Button>
    </div>

    <div
      className={cn(
        'w-72 rounded-lg bg-[#262626] p-3 space-y-2',
        isSelected && 'ring-2 ring-blue-500'
      )}
    >
      <div className="text-sm font-medium">Grupo #{groupIndex + 1}</div>
      <div
        data-children-container
        className="min-h-[50px] rounded-md border border-dashed border-white/20 p-2 space-y-2"
      >
        {(block.children || []).map((child, index) => (
          <React.Fragment key={child.id}>
            {dropIndicator?.groupId === block.id &&
              dropIndicator.index === index && <DropPlaceholder />}
            <CanvasTextBlock
              block={child}
              onBlockMouseDown={(e, b) => onBlockMouseDown(e, b)}
              onContextMenu={(e, block) => onContextMenu(e, block)}
              isSelected={selectedBlockId === child.id}
              setSelectedBlockId={setSelectedBlockId}
              isChild={true}
              updateBlockProps={updateBlockProps}
              variables={variables}
            />
          </React.Fragment>
        ))}
        {dropIndicator?.groupId === block.id &&
          dropIndicator.index === (block.children?.length || 0) && (
            <DropPlaceholder />
          )}
      </div>
    </div>
  </div>
);
