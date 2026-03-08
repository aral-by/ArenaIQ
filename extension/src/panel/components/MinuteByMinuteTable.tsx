import React from 'react';
import type { MatchData } from '../../types/match';

interface Props {
  matchData: MatchData;
}

export default function MinuteByMinuteTable({ matchData }: Props) {
  const { minuteByMinute, homeTeam, awayTeam } = matchData;

  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-800/50 p-5">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Dakika Dakika Skor Tablosu
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Home Team Table */}
        <div>
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-purple-400 mb-2">{homeTeam}</h4>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {minuteByMinute.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-xs text-slate-500 mb-1">{data.minute}'</div>
                <div className="w-full aspect-square bg-purple-900/30 border border-purple-800/50 rounded flex items-center justify-center text-sm font-bold text-purple-200">
                  {data.homePoints}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Away Team Table */}
        <div>
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-blue-400 mb-2">{awayTeam}</h4>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {minuteByMinute.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-xs text-slate-500 mb-1">{data.minute}'</div>
                <div className="w-full aspect-square bg-blue-900/30 border border-blue-800/50 rounded flex items-center justify-center text-sm font-bold text-blue-200">
                  {data.awayPoints}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
