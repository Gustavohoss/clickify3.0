'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { ImageIcon } from 'lucide-react';
import { PreviewCanvasComponent } from '@/components/editor/StandardFunnelEditor';
import type { Funnel, Step } from '@/components/editor/types';

export function QuizPublicViewer({ funnel }: { funnel: Funnel }) {
  const [activeStepId, setActiveStepId] = useState<number | null>(() => (funnel.steps as Step[])[0]?.id || null);

  const steps = funnel.steps as Step[];
  const activeStep = steps.find(step => step.id === activeStepId);

  const currentIndex = steps.findIndex(step => step.id === activeStepId);
  const progressValue = ((currentIndex + 1) / steps.length) * 100;
  
  const backgroundColor = funnel.backgroundColor || '#FFFFFF';

  const renderLogo = () => {
    if (funnel.headerLogoType === 'emoji') {
      return <span className="text-4xl">{funnel.headerLogoValue}</span>;
    }
    if (funnel.headerLogoType === 'image' && funnel.headerLogoValue && (funnel.headerLogoValue.startsWith('http') || funnel.headerLogoValue.startsWith('/'))) {
      return <Image src={funnel.headerLogoValue} alt="Logo" width={40} height={40} className="rounded-md" />;
    }
    return <ImageIcon size={40} className="rounded-md text-gray-400" />;
  };
  
  const handleNextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === activeStepId);
    if (currentIndex !== -1 && currentIndex < steps.length - 1) {
      setActiveStepId(steps[currentIndex + 1].id);
    }
  };

  const handleGoToStep = (stepId: number) => {
    setActiveStepId(stepId);
  };

  return (
    <div 
      className="flex min-h-screen w-full items-start justify-center p-4"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="w-full max-w-sm">
        <header className="flex flex-col items-center p-4 space-y-4 rounded-t-lg bg-transparent">
          {renderLogo()}
          <Progress value={progressValue} className="w-full mt-4 h-2" />
        </header>
        <div className="flex flex-col gap-4 p-4">
          {activeStep?.components.map(comp => (
            <PreviewCanvasComponent
              key={comp.id}
              component={comp}
              onNextStep={handleNextStep}
              onGoToStep={handleGoToStep}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
