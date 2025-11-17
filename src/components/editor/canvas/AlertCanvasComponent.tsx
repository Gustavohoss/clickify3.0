'use client';

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { CanvasComponentData } from '../types';
import { CheckCircle } from 'lucide-react';

export const AlertCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { title, description, backgroundColor, textColor, borderColor, icon } =
    component.props;
  const IconComponent = icon || <CheckCircle className="h-4 w-4" />;

  return (
    <Alert
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
    >
      {React.isValidElement(IconComponent) ? React.cloneElement(IconComponent as React.ReactElement, {
        className: 'h-5 w-5',
        style: { color: textColor },
      }) : null}
      <AlertTitle style={{ color: textColor }}>{title || 'Título do Alerta'}</AlertTitle>
      <AlertDescription style={{ color: textColor }}>
        {description || 'Esta é a descrição do alerta.'}
      </AlertDescription>
    </Alert>
  );
};
