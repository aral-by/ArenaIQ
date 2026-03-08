import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { MatchData } from '../../types/match';

interface Props {
  matchData: MatchData;
}

export default function ScoreChart({ matchData }: Props) {
  const { minuteByMinute, homeTeam, awayTeam } = matchData;

  // Kümülatif skor hesapla
  const chartData = minuteByMinute.map((data, idx) => {
    const homeSum = minuteByMinute.slice(0, idx + 1).reduce((sum, d) => sum + d.homePoints, 0);
    const awaySum = minuteByMinute.slice(0, idx + 1).reduce((sum, d) => sum + d.awayPoints, 0);
    
    return {
      minute: data.minute,
      [homeTeam]: homeSum,
      [awayTeam]: awaySum,
      period: data.period
    };
  });

  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-800/50 p-5">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
        Skor Grafiği
      </h3>
      
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis 
            dataKey="minute" 
            stroke="#64748b" 
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            label={{ value: 'Dakika', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 12 }}
          />
          <YAxis 
            stroke="#64748b" 
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            label={{ value: 'Skor', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #334155', 
              borderRadius: '6px',
              fontSize: '12px'
            }}
            labelStyle={{ color: '#cbd5e1', fontWeight: 'bold' }}
            itemStyle={{ color: '#e2e8f0' }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            iconType="line"
          />
          <Line 
            type="monotone" 
            dataKey={homeTeam} 
            stroke="#9333ea" 
            strokeWidth={3}
            dot={{ fill: '#9333ea', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey={awayTeam} 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
