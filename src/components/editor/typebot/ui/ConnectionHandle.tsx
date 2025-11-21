'use client';

import { cn } from '@/lib/utils';

export const ConnectionHandle = ({
  onMouseDown,
  isInput = false,
  'data-handle-id': dataHandleId,
}: {
  onMouseDown: (e: React.MouseEvent) => void;
  isInput?: boolean;
  'data-handle-id'?: string;
}) => (
  <div
    data-handle-id={dataHandleId}
    className={cn(
      'absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-orange-400 bg-[#111111] cursor-pointer z-10',
      isInput ? '-left-[5px]' : '-right-[5px]'
    )}
    onMouseDown={onMouseDown}
  />
);
