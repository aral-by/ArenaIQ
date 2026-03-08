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
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1.5 ${statusColors[matchData.status]} text-white text-xs font-bold rounded-full uppercase shadow-lg`}>
            {statusText[matchData.status]}
          </span>
          {matchData.status === 'live' && (
            <span className="text-slate-300 text-base font-semibold">{matchData.minute}'</span>
          )}
        </div>
        <span className="text-slate-400 text-sm uppercase tracking-wider font-medium">{matchData.league}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1 text-right pr-12">
          <p className="text-white text-2xl font-bold">{matchData.homeTeam}</p>
        </div>
        
        <div className="flex items-center gap-6 px-10 py-6 bg-slate-950/50 rounded-xl border border-slate-700/30">
          <span className="text-white text-6xl font-black tabular-nums tracking-tight">{matchData.homeScore}</span>
          <span className="text-slate-600 text-4xl font-light">-</span>
          <span className="text-white text-6xl font-black tabular-nums tracking-tight">{matchData.awayScore}</span>
        </div>
        
        <div className="flex-1 text-left pl-12">
          <p className="text-white text-2xl font-bold">{matchData.awayTeam}</p>
        </div>
      </div>
      
      <p className="text-center text-slate-400 text-sm mt-6 font-medium">{matchData.period}</p>
    </div>
  );
}