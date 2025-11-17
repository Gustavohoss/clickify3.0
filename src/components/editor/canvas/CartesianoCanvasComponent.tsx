'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Label as ChartLabel,
} from 'recharts';
import type { CanvasComponentData } from '../types';
import { WavingHandIcon } from './WavingHandIcon';

export const CartesianoCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    chartTitle = 'Cartesiano',
    chartData = [],
    gradientStartColor = '#000000',
    gradientEndColor = '#000000',
    showArea = true,
    showGrid = true,
  } = component.props;

  if (chartData.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">Gráfico Cartesiano</h3>
        <p className="mt-1 text-gray-500">Adicione pontos de dados para começar.</p>
      </div>
    );
  }

  const indicators = chartData.filter((d) => d.indicatorLabel);
  const uniqueId = React.useId();

  return (
    <div className="p-4">
      <h3 className="mb-4 text-lg font-bold text-black">{chartTitle}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            left: -20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id={`colorGradient-${uniqueId}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="5%" stopColor={gradientStartColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={gradientEndColor} stopOpacity={0.8} />
            </linearGradient>
          </defs>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200" />
          )}
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#000000' }} />
          <YAxis tick={{ fontSize: 12, fill: '#000000' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#e5e7eb',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={gradientStartColor}
            fill={showArea ? `url(#colorGradient-${uniqueId})` : 'transparent'}
            strokeWidth={2}
          />

          {indicators.map((indicator, index) => (
            <ReferenceDot
              key={index}
              x={indicator.name}
              y={indicator.value}
              r={8}
              fill="#FFFFFF"
              stroke="#A0AEC0"
              strokeWidth={2}
            >
              <ChartLabel
                value={indicator.indicatorLabel}
                position="top"
                offset={-20}
                style={{
                  fill: '#000000',
                  backgroundColor: '#ffffff',
                  padding: '2px 8px',
                  borderRadius: '1rem',
                  fontSize: 12,
                  border: '1px solid #e5e7eb',
                }}
              />
            </ReferenceDot>
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
