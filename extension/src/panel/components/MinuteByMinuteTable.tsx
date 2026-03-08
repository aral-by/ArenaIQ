import React from 'react';
import type { MatchData } from '../../types/match';

interface Props {
  matchData: MatchData;
}

export default function MinuteByMinuteTable({ matchData }: Props) {
  const { minuteByMinute, homeTeam, awayTeam } = matchData;

  // Periyotlara göre grupla (her periyot 10 dakika)
  const quarters = [
    { label: '1. Çeyrek', data: minuteByMinute.slice(0, 10) },
    { label: '2. Çeyrek', data: minuteByMinute.slice(10, 20) },
    { label: '3. Çeyrek', data: minuteByMinute.slice(20, 30) },
    { label: '4. Çeyrek', data: minuteByMinute.slice(30, 40) }
  ];

  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-800/50 p-5">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Dakika Dakika Skor Tablosu
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Home Team Table */}
        <div>
          <h4 className="text-sm font-semibold text-purple-400 mb-4">{homeTeam}</h4>
          <div className="space-y-3">
            {quarters.map((quarter, qIdx) => (
              <div key={qIdx}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-slate-500 font-medium w-20">{quarter.label}</span>
                  <div className="flex gap-1 flex-1">
                    {quarter.data.map((data, idx) => (
                      <div 
                        key={idx}
                        className="flex-1 h-10 bg-purple-900/30 border border-purple-800/50 rounded flex items-center justify-center text-sm font-bold text-purple-200"
                      >
                        {data.homePoints}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Away Team Table */}
        <div>
          <h4 className="text-sm font-semibold text-blue-400 mb-4">{awayTeam}</h4>
          <div className="space-y-3">
            {quarters.map((quarter, qIdx) => (
              <div key={qIdx}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-slate-500 font-medium w-20">{quarter.label}</span>
                  <div className="flex gap-1 flex-1">
                    {quarter.data.map((data, idx) => (
                      <div 
                        key={idx}
                        className="flex-1 h-10 bg-blue-900/30 border border-blue-800/50 rounded flex items-center justify-center text-sm font-bold text-blue-200"
                      >
                        {data.awayPoints}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
