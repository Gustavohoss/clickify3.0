'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import type { Step } from '../types';

export const StepSettings = ({
  step,
  onUpdateStep,
}: {
  step: Step;
  onUpdateStep: (id: number, name: string) => void;
  steps: Step[];
}) => {
  const [stepName, setStepName] = useState(step.name);

  useEffect(() => {
    setStepName(step.name);
  }, [step]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStepName(e.target.value);
  };

  const handleNameBlur = () => {
    if (stepName.trim() === '') {
      setStepName(step.name); // revert if empty
    } else {
      onUpdateStep(step.id, stepName);
    }
  };

  return (
    <>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">Título da Etapa</h3>
        <div className='mt-2'>
            <UILabel htmlFor="step-name" className="text-sm">
            Nome da Etapa
            </UILabel>
            <Input
            id="step-name"
            value={stepName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            className="mt-1 text-base"
            />
        </div>
      </div>
    </>
  );
};
