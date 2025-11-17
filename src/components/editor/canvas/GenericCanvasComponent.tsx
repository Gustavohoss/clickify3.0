'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import type { CanvasComponentData } from '../types';

export const GenericCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  return (
    <Card className="flex items-center gap-4 bg-card p-4 text-card-foreground">
      <div className="text-primary">
         {React.isValidElement(component.icon) ? component.icon : null}
      </div>
      <p className="font-semibold">{component.name}</p>
    </Card>
  );
};
