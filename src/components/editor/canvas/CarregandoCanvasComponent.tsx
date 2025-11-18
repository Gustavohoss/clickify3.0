
'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import type { CanvasComponentData } from '../types';

export const CarregandoCanvasComponent = ({
  component,
  onNextStep,
}: {
  component: CanvasComponentData;
  onNextStep?: () => void;
}) => {
  const {
    loadingText = 'Carregando...',
    loadingDescription = 'Lorem ipsum dollor sit amet.',
    progressColor = '#000000',
    progressTrackColor = '#E5E7EB',
    titleColor = '#000000',
    descriptionColor = '#000000',
    duration = 5,
    limit = 100,
    showTitle = true,
    showProgress = true,
    autoSkip = false,
  } = component.props;

  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    setAnimatedProgress(0); // Reset animation on prop change

    if (!showProgress || duration <= 0 || limit <= 0) {
      if (limit > 0) setAnimatedProgress(limit);
      return;
    }

    const intervalTime = 50; // Update every 50ms for smooth animation
    const totalSteps = (duration * 1000) / intervalTime;
    const increment = limit / totalSteps;

    const timer = setInterval(() => {
      setAnimatedProgress((prev) => {
        const nextProgress = prev + increment;
        if (nextProgress >= limit) {
          clearInterval(timer);
          if (autoSkip) {
            onNextStep?.();
          }
          return limit;
        }
        return nextProgress;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [duration, limit, showProgress, autoSkip, onNextStep]);

  const displayProgress = Math.floor(animatedProgress);

  return (
    <div className="w-full space-y-4 text-center">
      {showTitle && (
        <div className="flex items-center justify-between text-sm font-medium">
          <span style={{ color: titleColor }} className="text-black">
            {loadingText}
          </span>
          {showProgress && (
            <span style={{ color: progressColor }} className="text-black">
              {displayProgress}%
            </span>
          )}
        </div>
      )}
      {showProgress && (
        <Progress
          value={displayProgress}
          className="h-2 w-full"
          style={
            {
              backgroundColor: progressTrackColor,
              '--progress-indicator-color': progressColor,
            } as React.CSSProperties
          }
        />
      )}
      <p className="pt-1 text-sm" style={{ color: descriptionColor }}>
        {loadingDescription}
      </p>
    </div>
  );
};
