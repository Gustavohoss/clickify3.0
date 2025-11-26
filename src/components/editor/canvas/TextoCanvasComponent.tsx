'use client';

import type { CanvasComponentData } from '../types';

export const TextoCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { content = '<h3><b>Título</b></h3><p>Preencha o texto.</p>' } = component.props;

  return (
    <div
      className="w-full max-w-none text-black"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
