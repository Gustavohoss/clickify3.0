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
  Label,
  Customized,
} from 'recharts';
import type { CanvasComponentData, CartesianChartDataPoint } from '../types';
import { WavingHandIcon } from './WavingHandIcon';

const CustomLabel = (props: any) => {
    const { cx, cy, value, isFeatured } = props;
    
    if (!value || cx === undefined || cy === undefined) return null;
  
    const textWidth = value.length * 7;
    const boxWidth = textWidth + 16;
    
    const bgColor = isFeatured ? '#000000' : '#FFFFFF';
    const textColor = isFeatured ? '#FFFFFF' : '#000000';
    const borderColor = isFeatured ? '#000000' : '#e5e7eb';
  
    return (
      <g transform={`translate(${cx - boxWidth / 2}, ${cy - 45})`}>
        <rect x="0" y="0" width={boxWidth} height="28" rx="8" fill={bgColor} stroke={borderColor} strokeWidth="1" />
        <text x={boxWidth/2} y="18" textAnchor="middle" fill={textColor} fontSize="12">
          {value}
        </text>
        <path d={`M ${boxWidth/2 - 5} 28 L ${boxWidth/2} 33 L ${boxWidth/2 + 5} 28 Z`} fill={bgColor} stroke={borderColor} strokeWidth="1" />
      </g>
    );
  };


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

  const uniqueId = React.useId();

  return (
    <div className="p-4">
      <h3 className="mb-4 text-lg font-bold text-black">{chartTitle}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={chartData}
          margin={{
            top: 40,
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
          
           {chartData.map((point: CartesianChartDataPoint) => (
             <ReferenceDot
                key={`dot-${point.id}`}
                x={point.name}
                y={point.value}
                r={8}
                fill="#FFFFFF"
                stroke={point.isFeatured ? '#000000' : '#A0AEC0'}
                strokeWidth={2}
                ifOverflow="extendDomain"
              />
          ))}

          <Customized 
            // A key is needed here to force re-render when data changes
            key={`customized-labels-${JSON.stringify(chartData)}`}
            component={(props) => {
              const { xAxis, yAxis, data } = props;
              // These checks are important as the props might not be available on first render
              if (!xAxis || !yAxis || !data) return null;

              const { scale: xScale } = xAxis[0];
              const { scale: yScale } = yAxis[0];

              return (
                <g>
                  {data.map((entry, index) => {
                    const point = chartData.find(p => p.name === entry.name && p.value === entry.value);
                    if (!point || !point.indicatorLabel) return null;
                    
                    const cx = xScale(entry.name);
                    const cy = yScale(entry.value);

                    return (
                        <CustomLabel 
                          key={`label-${point.id}`}
                          cx={cx} 
                          cy={cy}
                          value={point.indicatorLabel}
                          isFeatured={point.isFeatured}
                        />
                    );
                  })}
                </g>
              );
            }} 
          />

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
