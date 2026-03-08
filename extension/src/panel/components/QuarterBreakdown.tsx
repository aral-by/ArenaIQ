import React from 'react';
import type { MatchData } from '../../types/match';

interface Props {
  matchData: MatchData;
}

export default function QuarterBreakdown({ matchData }: Props) {
  const { quarterScores, homeTeam, awayTeam } = matchData;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700/50 p-6 shadow-xl">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-5">
        Çeyrekler
      </h3>
      
      <div className="space-y-3">
        <div className="grid grid-cols-5 gap-3 text-center text-xs text-slate-400 font-semibold">
          <div></div>
          <div>1. Ç</div>
          <div>2. Ç</div>
          <div>3. Ç</div>
          <div>4. Ç</div>
        </div>

        <div className="grid grid-cols-5 gap-3 text-center">
          <div className="text-left text-slate-200 text-sm truncate font-bold">{homeTeam}</div>
          <div className="bg-purple-900/40 border-2 border-purple-700/50 rounded-lg py-2.5 text-white font-bold text-lg shadow-lg">{quarterScores.home.q1}</div>
          <div className="bg-purple-900/40 border-2 border-purple-700/50 rounded-lg py-2.5 text-white font-bold text-lg shadow-lg">{quarterScores.home.q2}</div>
          <div className="bg-purple-900/40 border-2 border-purple-700/50 rounded-lg py-2.5 text-white font-bold text-lg shadow-lg">{quarterScores.home.q3}</div>
          <div className="bg-purple-900/40 border-2 border-purple-700/50 rounded-lg py-2.5 text-white font-bold text-lg shadow-lg">{quarterScores.home.q4}</div>
        </div>

        <div className="grid grid-cols-5 gap-3 text-center">
          <div className="text-left text-slate-200 text-sm truncate font-bold">{awayTeam}</div>
          <div className="bg-blue-900/40 border-2 border-blue-700/50 rounded-lg py-2.5 text-white font-bold text-lg shadow-lg">{quarterScores.away.q1}</div>
          <div className="bg-blue-900/40 border-2 border-blue-700/50 rounded-lg py-2.5 text-white font-bold text-lg shadow-lg">{quarterScores.away.q2}</div>
          <div className="bg-blue-900/40 border-2 border-blue-700/50 rounded-lg py-2.5 text-white font-bold text-lg shadow-lg">{quarterScores.away.q3}</div>
          <div className="bg-blue-900/40 border-2 border-blue-700/50 rounded-lg py-2.5 text-white font-bold text-lg shadow-lg">{quarterScores.away.q4}</div>
        </div>
      </div>
    </div>
  );
}
