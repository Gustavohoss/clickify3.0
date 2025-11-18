
'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ColorPicker = ({ label, color, onChange }: { label: string, color: string, onChange: (color: string) => void }) => (
  <div className="space-y-2">
    <Label className="text-sm text-muted-foreground">{label}</Label>
    <div className="relative h-10 w-full rounded-md border border-input overflow-hidden">
      <Input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="h-full w-full" style={{ backgroundColor: color }} />
    </div>
  </div>
);


export const DesignSettings = () => {
    // TODO: Connect these states to the actual funnel design properties
  const [primaryColor, setPrimaryColor] = React.useState('#000000');
  const [backgroundColor, setBackgroundColor] = React.useState('#FFFFFF');
  const [titleColor, setTitleColor] = React.useState('#000000');
  const [textColor, setTextColor] = React.useState('#000000');
  const [interactiveTextColor, setInteractiveTextColor] = React.useState('#FFFFFF');

  return (
    <div className="space-y-6">
       <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium">CORES</h3>
        <div className="space-y-4">
          <ColorPicker label="Primária" color={primaryColor} onChange={setPrimaryColor} />
          <ColorPicker label="Fundo" color={backgroundColor} onChange={setBackgroundColor} />
          <ColorPicker label="Títulos" color={titleColor} onChange={setTitleColor} />
          <ColorPicker label="Textos" color={textColor} onChange={setTextColor} />
          <ColorPicker label="Textos Interativos" color={interactiveTextColor} onChange={setInteractiveTextColor} />
        </div>
      </Card>
    </div>
  );
};
