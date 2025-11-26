'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Pencil, Copy, Trash2 } from 'lucide-react';
import type { CanvasComponentData } from '../types';
import { GenericCanvasComponent } from './GenericCanvasComponent';
import { AlertCanvasComponent } from './AlertCanvasComponent';
import { ArgumentoCanvasComponent } from './ArgumentoCanvasComponent';
import { AudioCanvasComponent } from './AudioCanvasComponent';
import { BotaoCanvasComponent } from './BotaoCanvasComponent';
import { CarregandoCanvasComponent } from './CarregandoCanvasComponent';
import { CarroselCanvasComponent } from './CarroselCanvasComponent';
import { CartesianoCanvasComponent } from './CartesianoCanvasComponent';
import { CompararCanvasComponent } from './CompararCanvasComponent';
import { ConfettiCanvasComponent } from './ConfettiCanvasComponent';
import { DepoimentosCanvasComponent } from './DepoimentosCanvasComponent';
import { EntradaCanvasComponent } from './EntradaCanvasComponent';
import { EspacadorCanvasComponent } from './EspacadorCanvasComponent';
import { FaqCanvasComponent } from './FaqCanvasComponent';
import { GraficosCanvasComponent } from './GraficosCanvasComponent';
import { ImagemCanvasComponent } from './ImagemCanvasComponent';
import { ListaCanvasComponent } from './ListaCanvasComponent';
import { Lista2CanvasComponent } from './Lista2CanvasComponent';
import { MarquiseCanvasComponent } from './MarquiseCanvasComponent';
import { NivelCanvasComponent } from './NivelCanvasComponent';
import { OpcoesCanvasComponent } from './OpcoesCanvasComponent';
import { PrecoCanvasComponent } from './PrecoCanvasComponent';
import { TermosCanvasComponent } from './TermosCanvasComponent';
import { TextoCanvasComponent } from './TextoCanvasComponent';
import { VideoCanvasComponent } from './VideoCanvasComponent';

export const CanvasComponent = ({
  component,
  isSelected,
  onClick,
  onDuplicate,
  onDelete,
  onOptionClick,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  component: CanvasComponentData;
  isSelected: boolean;
  onClick: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onOptionClick?: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const renderComponent = () => {
    switch (component.name) {
      case 'Alerta':
        return <AlertCanvasComponent component={component} />;
      case 'Argumentos':
        return <ArgumentoCanvasComponent component={component} />;
      case 'Audio':
        return <AudioCanvasComponent component={component} />;
      case 'Botão':
        return <BotaoCanvasComponent component={component} />;
      case 'Carregando':
        return <CarregandoCanvasComponent component={component} />;
      case 'Carrosel':
        return <CarroselCanvasComponent component={component} />;
      case 'Cartesiano':
        return <CartesianoCanvasComponent component={component} />;
      case 'Comparar':
        return <CompararCanvasComponent component={component} />;
      case 'Confetti':
        return <ConfettiCanvasComponent component={component} />;
      case 'Depoimentos':
        return <DepoimentosCanvasComponent component={component} />;
      case 'Entrada':
        return <EntradaCanvasComponent component={component} />;
      case 'Espaçador':
        return <EspacadorCanvasComponent component={component} />;
      case 'FAQ':
        return <FaqCanvasComponent component={component} />;
      case 'Gráficos':
        return <GraficosCanvasComponent component={component} />;
      case 'Imagem':
        return <ImagemCanvasComponent component={component} />;
      case 'Lista':
        return <ListaCanvasComponent component={component} />;
      case 'Lista 2.0':
        return <Lista2CanvasComponent component={component} />;
      case 'Marquise':
        return <MarquiseCanvasComponent component={component} />;
      case 'Nível':
        return <NivelCanvasComponent component={component} />;
      case 'Opções':
        return <OpcoesCanvasComponent component={component} onOptionClick={onOptionClick} />;
      case 'Preço':
        return <PrecoCanvasComponent component={component} />;
      case 'Termos':
        return <TermosCanvasComponent component={component} />;
      case 'Texto':
      case 'Título':
        return <TextoCanvasComponent component={component} />;
      case 'Video':
        return <VideoCanvasComponent component={component} />;
      default:
        return <GenericCanvasComponent component={component} />;
    }
  };

  return (
    <div
      className={cn(
        'relative cursor-pointer rounded-lg p-1 group',
        isSelected && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
      )}
      onClick={onClick}
    >
      <div className="absolute top-0 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 rounded-md bg-blue-500 p-0.5 shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white hover:bg-blue-600 hover:text-white disabled:opacity-50"
          onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
          disabled={isFirst}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
         <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white hover:bg-blue-600 hover:text-white disabled:opacity-50"
          onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
          disabled={isLast}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white hover:bg-blue-600 hover:text-white"
          onClick={onClick}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white hover:bg-blue-600 hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white hover:bg-red-500 hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {renderComponent()}
    </div>
  );
};
