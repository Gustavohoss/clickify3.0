
'use client';

import type { CanvasComponentData, ComponentProps, Step } from '../types';
import { AlertSettings } from './AlertSettings';
import { AudioSettings } from './AudioSettings';
import { BotaoSettings } from './BotaoSettings';
import { CarregandoSettings } from './CarregandoSettings';
import { CarroselSettings } from './CarroselSettings';
import { CartesianoSettings } from './CartesianoSettings';
import { CompararSettings } from './CompararSettings';
import { ConfettiSettings } from './ConfettiSettings';
import { DepoimentosSettings } from './DepoimentosSettings';
import { EntradaSettings } from './EntradaSettings';
import { EspacadorSettings } from './EspacadorSettings';
import { FaqSettings } from './FaqSettings';
import { GraficosSettings } from './GraficosSettings';
import { ImagemSettings } from './ImagemSettings';
import { ListaSettings } from './ListaSettings';
import { MarquiseSettings } from './MarquiseSettings';
import { NivelSettings } from './NivelSettings';
import { OpcoesSettings } from './OpcoesSettings';
import { PrecoSettings } from './PrecoSettings';
import { TermosSettings } from './TermosSettings';
import { TextoSettings } from './TextoSettings';
import { VideoSettings } from './VideoSettings';


export const ComponentSettings = ({
  component,
  onUpdate,
  steps,
  activeStepId,
}: {
  component: CanvasComponentData | null;
  onUpdate: (id: number, props: ComponentProps) => void;
  steps: Step[];
  activeStepId: number;
}) => {
  if (!component) return null;

  const handleUpdate = (props: ComponentProps) => {
    onUpdate(component.id, props);
  };

  const renderSettings = () => {
    switch (component.name) {
      case 'Alerta':
        return <AlertSettings component={component} onUpdate={handleUpdate} />;
      // case 'Argumentos':
      //   return <ArgumentosSettings component={component} onUpdate={handleUpdate} />;
      case 'Audio':
        return <AudioSettings component={component} onUpdate={handleUpdate} />;
      case 'Botão':
        return (
          <BotaoSettings
            component={component}
            onUpdate={handleUpdate}
            steps={steps}
            activeStepId={activeStepId}
          />
        );
      case 'Carregando':
        return <CarregandoSettings component={component} onUpdate={handleUpdate} />;
      case 'Carrosel':
        return <CarroselSettings component={component} onUpdate={handleUpdate} />;
      case 'Cartesiano':
        return <CartesianoSettings component={component} onUpdate={handleUpdate} />;
      case 'Comparar':
        return <CompararSettings component={component} onUpdate={handleUpdate} />;
      case 'Confetti':
        return <ConfettiSettings component={component} onUpdate={handleUpdate} />;
      case 'Depoimentos':
        return <DepoimentosSettings component={component} onUpdate={handleUpdate} />;
      case 'Entrada':
        return <EntradaSettings component={component} onUpdate={handleUpdate} />;
      case 'Espaçador':
        return <EspacadorSettings component={component} onUpdate={handleUpdate} />;
      case 'FAQ':
        return <FaqSettings component={component} onUpdate={handleUpdate} />;
      case 'Gráficos':
        return <GraficosSettings component={component} onUpdate={handleUpdate} />;
      case 'Imagem':
        return <ImagemSettings component={component} onUpdate={handleUpdate} />;
      case 'Lista':
        return <ListaSettings component={component} onUpdate={handleUpdate} />;
      case 'Marquise':
        return <MarquiseSettings component={component} onUpdate={handleUpdate} />;
      case 'Nível':
        return <NivelSettings component={component} onUpdate={handleUpdate} />;
      case 'Opções':
        return <OpcoesSettings component={component} onUpdate={handleUpdate} />;
      case 'Preço':
        return <PrecoSettings component={component} onUpdate={handleUpdate} />;
      case 'Termos':
        return <TermosSettings component={component} onUpdate={handleUpdate} />;
      case 'Texto':
        return <TextoSettings component={component} onUpdate={handleUpdate} />;
      case 'Video':
        return <VideoSettings component={component} onUpdate={handleUpdate} />;
      default:
        return (
          <p className="text-sm text-muted-foreground">
            Opções de configuração para o componente {component.name} aparecerão aqui.
          </p>
        );
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Editando: {component.name}</h3>
      {renderSettings()}
    </div>
  );
};
