'use client';

import React, { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LiquidGlassCardProps extends HTMLAttributes<HTMLDivElement> {
  borderRadius?: string;
  blurIntensity?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shadowIntensity?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
  glowIntensity?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  draggable?: boolean;
}

const blurClasses = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
  '2xl': 'backdrop-blur-2xl',
};

const shadowClasses = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  none: 'shadow-none',
};

const glowClasses = {
  xs: 'shadow-[0_0_4px_0_rgba(255,255,255,0.1)]',
  sm: 'shadow-[0_0_8px_0_rgba(255,255,255,0.1)]',
  md: 'shadow-[0_0_12px_0_rgba(255,255,255,0.1)]',
  lg: 'shadow-[0_0_16px_0_rgba(255,255,255,0.1)]',
  xl: 'shadow-[0_0_24px_0_rgba(255,255,255,0.1)]',
  none: 'shadow-none',
};

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  className,
  borderRadius = '1rem',
  blurIntensity = 'lg',
  shadowIntensity = 'md',
  glowIntensity = 'sm',
  draggable = true,
  children,
  ...props
}) => {
  return (
    <motion.div
      drag={draggable}
      dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }}
      className={cn(
        'relative bg-white/10 p-4 border border-white/20',
        blurClasses[blurIntensity],
        shadowClasses[shadowIntensity],
        glowClasses[glowIntensity],
        className
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
