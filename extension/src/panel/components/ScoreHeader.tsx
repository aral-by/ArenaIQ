import React from 'react';
import type { MatchData } from '../../types/match';

interface Props {
  matchData: MatchData;
}

export default function ScoreHeader({ matchData }: Props) {
  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-800/50 p-5">
      <div className="flex items-center justify-between mb-5">
        <span className="text-slate-400 text-xs uppercase tracking-wider">{matchData.league}</span>
        {matchData.status === 'live' && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-red-400 text-xs font-medium">Canlı</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-8">
        {/* Home Team */}
        <div className="flex flex-col items-end gap-3 flex-1">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
            <span className="text-slate-600 text-xs font-bold">LOGO</span>
          </div>
          <p className="text-white text-base font-semibold text-right">{matchData.homeTeam}</p>
        </div>
        
        {/* Score */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="text-white text-4xl font-bold tabular-nums">{matchData.homeScore}</span>
            <span className="text-slate-600 text-2xl">-</span>
            <span className="text-white text-4xl font-bold tabular-nums">{matchData.awayScore}</span>
          </div>
          <div className="text-center">
            <p className="text-slate-400 text-sm font-medium">{matchData.period}</p>
            {matchData.status === 'live' && (
              <p className="text-slate-500 text-xs mt-0.5">{matchData.minute}'</p>
            )}
          </div>
        </div>
        
        {/* Away Team */}
        <div className="flex flex-col items-start gap-3 flex-1">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
            <span className="text-slate-600 text-xs font-bold">LOGO</span>
          </div>
          <p className="text-white text-base font-semibold text-left">{matchData.awayTeam}</p>
        </div>
      </div>
    </div>
  );
}