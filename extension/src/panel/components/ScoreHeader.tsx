import React from 'react';
import type { MatchData } from '../../types/match';

interface Props {
  matchData: MatchData;
}

export default function ScoreHeader({ matchData }: Props) {
  const statusColors = {
    live: 'bg-red-500',
    upcoming: 'bg-slate-600',
    finished: 'bg-slate-700',
    waiting: 'bg-yellow-600'
  };

  const statusText = {
    live: 'CANLI',
    upcoming: 'YAKLAŞAN',
    finished: 'BİTTİ',
    waiting: 'BEKLEMEDE'
  };

  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-800/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 ${statusColors[matchData.status]} text-white text-xs font-bold rounded uppercase`}>
            {statusText[matchData.status]}
          </span>
          {matchData.status === 'live' && (
            <span className="text-slate-400 text-sm">{matchData.minute}'</span>
          )}
        </div>
        <span className="text-slate-500 text-xs uppercase tracking-wider">{matchData.league}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1 text-right pr-8">
          <p className="text-white text-lg font-medium">{matchData.homeTeam}</p>
        </div>
        
        <div className="flex items-center gap-4 px-6">
          <span className="text-white text-5xl font-bold tabular-nums">{matchData.homeScore}</span>
          <span className="text-slate-700 text-3xl font-light">-</span>
          <span className="text-white text-5xl font-bold tabular-nums">{matchData.awayScore}</span>
        </div>
        
        <div className="flex-1 text-left pl-8">
          <p className="text-white text-lg font-medium">{matchData.awayTeam}</p>
        </div>
      </div>
      
      <p className="text-center text-slate-500 text-xs mt-4">{matchData.period}</p>
    </div>
  );
}