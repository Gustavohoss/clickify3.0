'use client';

import { Button } from '@/components/ui/button';
import { Copy, Trash2 } from 'lucide-react';

export const ContextMenu = ({
  x,
  y,
  onDuplicate,
  onDelete,
}: {
  x: number;
  y: number;
  onDuplicate: () => void;
  onDelete: () => void;
}) => {
  return (
    <div
      className="absolute z-50 w-40 rounded-lg bg-[#262626] p-2 shadow-lg"
      style={{ top: y, left: x }}
    >
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 text-sm font-normal text-white/80 hover:bg-[#3f3f46] hover:text-white"
        onClick={onDuplicate}
      >
        <Copy size={14} /> Duplicar
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 text-sm font-normal text-red-500 hover:bg-red-500/10 hover:text-red-500"
        onClick={onDelete}
      >
        <Trash2 size={14} /> Excluir
      </Button>
    </div>
  );
};
