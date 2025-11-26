'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import type { CanvasComponentData } from '../types';

export const GraficoCircularCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    title = 'SUA CHANCE DE TER O CORPO QUE TANTO DESEJA COM O TREINOS PMT',
    value = 100,
    trackColor = '#E5E7EB',
    progressColor = '#EC4899',
    textColor = '#111827',
    cardBackgroundColor = '#FFFFFF',
    cardBorderColor = '#F3F4F6',
  } = component.props;

  const data = [
    { name: 'Progress', value: value },
    { name: 'Remaining', value: 100 - value },
  ];

  return (
    <div
      className="w-full rounded-lg border p-6 text-center"
      style={{
        backgroundColor: cardBackgroundColor,
        borderColor: cardBorderColor,
      }}
    >
      <p className="mb-4 font-bold" style={{ color: textColor }}>
        {title}
      </p>
      <div className="mx-auto h-48 w-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="75%"
              outerRadius="100%"
              startAngle={90}
              endAngle={450}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={progressColor} />
              <Cell fill={trackColor} />
               <Label
                value={`${value}%`}
                position="center"
                fill={textColor}
                fontSize="36px"
                fontWeight="bold"
                dominantBaseline="middle"
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
