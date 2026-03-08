import React from 'react';
import type { MatchData } from '../../types/match';

interface Props {
  matchData: MatchData;
}

export default function ScoreHeader({ matchData }: Props) {
  const statusColors = {
    live: 'bg-red-500',
    upcoming: 'bg-yellow-500',
    finished: 'bg-gray-500'
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 border border-purple-500/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 ${statusColors[matchData.status]} text-white text-sm font-semibold rounded-full`}>
            {matchData.status === 'live' ? 'CANLI' : matchData.status === 'upcoming' ? 'YAKLAŞAN' : 'BİTTİ'}
          </span>
          {matchData.status === 'live' && (
            <span className="text-purple-300 font-semibold">{matchData.minute}'</span>
          )}
        </div>
        <span className="text-slate-400 text-sm">{matchData.league}</span>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="text-right">
          <h2 className="text-2xl font-bold text-white">{matchData.homeTeam}</h2>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="text-5xl font-bold text-white">{matchData.homeScore}</span>
            <span className="text-3xl text-purple-400">-</span>
            <span className="text-5xl font-bold text-white">{matchData.awayScore}</span>
          </div>
          <p className="text-slate-400 text-sm mt-2">{matchData.period}</p>
        </div>
        
        <div className="text-left">
          <h2 className="text-2xl font-bold text-white">{matchData.awayTeam}</h2>
        </div>
      </div>
    </div>
  );
}