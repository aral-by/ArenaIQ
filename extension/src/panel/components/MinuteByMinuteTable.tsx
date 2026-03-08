import React from 'react';
import type { MatchData } from '../../types/match';

interface Props {
  matchData: MatchData;
}

export default function MinuteByMinuteTable({ matchData }: Props) {
  const { minuteByMinute, homeTeam, awayTeam } = matchData;

  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-800/50 p-5">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
        Minute by Minute
      </h3>
      
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="flex gap-1 mb-2">
            <div className="w-16 text-xs text-slate-500 font-medium"></div>
            {minuteByMinute.slice(0, 10).map((data) => (
              <div key={data.minute} className="w-10 text-center text-xs text-slate-500 font-medium">
                {data.minute}'
              </div>
            ))}
          </div>

          <div className="flex gap-1 mb-1">
            <div className="w-16 text-xs text-slate-400 truncate">{homeTeam}</div>
            {minuteByMinute.slice(0, 10).map((data) => (
              <div 
                key={data.minute} 
                className="w-10 h-8 bg-slate-800/50 rounded flex items-center justify-center text-sm font-semibold text-white"
              >
                {data.homePoints}
              </div>
            ))}
          </div>

          <div className="flex gap-1">
            <div className="w-16 text-xs text-slate-400 truncate">{awayTeam}</div>
            {minuteByMinute.slice(0, 10).map((data) => (
              <div 
                key={data.minute} 
                className="w-10 h-8 bg-slate-800/50 rounded flex items-center justify-center text-sm font-semibold text-white"
              >
                {data.awayPoints}
              </div>
            ))}
          </div>

          {minuteByMinute.length > 10 && (
            <div className="mt-3 text-center">
              <button className="text-xs text-slate-500 hover:text-slate-400 transition">
                Show all {minuteByMinute.length} minutes →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
