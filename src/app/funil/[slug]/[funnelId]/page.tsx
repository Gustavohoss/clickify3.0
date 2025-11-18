'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Funnel, Step } from '@/components/editor/types.tsx';
import { PreviewCanvasComponent } from '@/components/editor/StandardFunnelEditor';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

function FunnelPublicContent() {
  const { funnelId } = useParams() as { funnelId: string };
  const firestore = useFirestore();

  const funnelRef = useMemoFirebase(
    () => (funnelId ? doc(firestore, 'funnels', funnelId) : null),
    [firestore, funnelId]
  );
  const { data: funnelData, isLoading } = useDoc<Funnel>(funnelRef);

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Carregando funil...
      </div>
    );
  }

  if (!funnelData || !funnelData.isPublished) {
    return (
      <div className="flex h-screen items-center justify-center">
        Funil não encontrado ou está offline.
      </div>
    );
  }

  const steps = funnelData.steps as Step[];
  const activeStep = steps?.[activeStepIndex];

  if (!activeStep) {
    return (
        <div className="flex h-screen items-center justify-center">
            Nenhuma etapa encontrada neste funil.
        </div>
    );
  }

  const handleNextStep = () => {
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    } else {
      console.log('Fim do funil');
    }
  };

  const handleGoToStep = (stepId: number) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    if (stepIndex !== -1) {
      setActiveStepIndex(stepIndex);
    }
  };


  const backgroundColor = funnelData.backgroundColor || '#FFFFFF';
  const progressValue = steps.length > 0 ? ((activeStepIndex + 1) / steps.length) * 100 : 0;


  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor }}>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto w-full max-w-sm">
             {funnelData.type === 'quiz' && (
              <header className="flex flex-col items-center p-4 rounded-t-lg bg-transparent">
                <Image src="https://picsum.photos/seed/logo/40/40" alt="Logo" width={40} height={40} className="rounded-md" />
                <Progress value={progressValue} className="w-full mt-4 h-2" />
              </header>
            )}
            <div className="space-y-4">
              {activeStep.components.map((comp) => (
              <PreviewCanvasComponent
                  key={comp.id}
                  component={comp}
                  onNextStep={handleNextStep}
                  onGoToStep={handleGoToStep}
              />
              ))}
            </div>
        </div>
        </main>
    </div>
  );
}

export default function FunnelPublicPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <FunnelPublicContent />
        </Suspense>
    )
}
