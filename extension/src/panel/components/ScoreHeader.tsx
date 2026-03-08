import React from 'react';
import type { MatchData } from '../../types/match';

interface Props {
  matchData: MatchData;
}

export default function ScoreHeader({ matchData }: Props) {
  const statusColors = {
    live: 'bg-red-600',
    upcoming: 'bg-amber-600',
    finished: 'bg-slate-600'
  };

  const statusText = {
    live: 'LIVE',
    upcoming: 'UPCOMING',
    finished: 'FINISHED'
  };

  return (
    <div className="bg-slate-900 rounded p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className={`px-2.5 py-1 ${statusColors[matchData.status]} text-white text-xs font-semibold rounded uppercase tracking-wide`}>
            {statusText[matchData.status]}
          </span>
          {matchData.status === 'live' && (
            <span className="text-slate-400 text-sm font-medium">{matchData.minute}'</span>
          )}
        </div>
        <span className="text-slate-500 text-sm">{matchData.league}</span>
      </div>

      <div className="grid grid-cols-3 gap-6 items-center">
        <div className="text-right">
          <h2 className="text-xl font-semibold text-white truncate">{matchData.homeTeam}</h2>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl font-bold text-white">{matchData.homeScore}</span>
            <span className="text-2xl text-slate-600">:</span>
            <span className="text-4xl font-bold text-white">{matchData.awayScore}</span>
          </div>
          <p className="text-slate-500 text-xs mt-2">{matchData.period}</p>
        </div>
        
        <div className="text-left">
          <h2 className="text-xl font-semibold text-white truncate">{matchData.awayTeam}</h2>
        </div>
      </div>
    </div>
  );
}