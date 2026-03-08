import React from 'react';
import type { MatchData } from '../../types/match';

interface Props {
  matchData: MatchData;
}

export default function MinuteByMinuteTable({ matchData }: Props) {
  const { minuteByMinute, homeTeam, awayTeam } = matchData;

  // Çeyreklere göre grupla
  const quarters = [
    { label: '1. Çeyrek', data: minuteByMinute.slice(0, 10) },
    { label: '2. Çeyrek', data: minuteByMinute.slice(10, 20) },
    { label: '3. Çeyrek', data: minuteByMinute.slice(20, 30) },
    { label: '4. Çeyrek', data: minuteByMinute.slice(30, 40) }
  ];

  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-800/50 p-5">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
        Dakika Dakika Skor Tablosu (40 Hücre)
      </h3>
      
      <div className="space-y-5">
        {quarters.map((quarter, qIdx) => (
          <div key={qIdx}>
            <h4 className="text-xs font-medium text-slate-500 mb-2">{quarter.label}</h4>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="flex gap-1 mb-2">
                  <div className="w-20 text-xs text-slate-500 font-medium"></div>
                  {quarter.data.map((data) => (
                    <div key={data.minute} className="w-12 text-center text-xs text-slate-500 font-medium">
                      {data.minute}'
                    </div>
                  ))}
                </div>

                <div className="flex gap-1 mb-1">
                  <div className="w-20 text-xs text-slate-300 truncate font-medium">{homeTeam}</div>
                  {quarter.data.map((data) => (
                    <div 
                      key={data.minute} 
                      className="w-12 h-10 bg-purple-900/30 border border-purple-800/50 rounded flex items-center justify-center text-sm font-bold text-purple-200"
                    >
                      {data.homePoints}
                    </div>
                  ))}
                </div>

                <div className="flex gap-1">
                  <div className="w-20 text-xs text-slate-300 truncate font-medium">{awayTeam}</div>
                  {quarter.data.map((data) => (
                    <div 
                      key={data.minute} 
                      className="w-12 h-10 bg-blue-900/30 border border-blue-800/50 rounded flex items-center justify-center text-sm font-bold text-blue-200"
                    >
                      {data.awayPoints}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
