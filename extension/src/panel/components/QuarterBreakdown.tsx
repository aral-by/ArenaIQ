import React from 'react';
import type { MatchData } from '../../types/match';

interface Props {
  matchData: MatchData;
}

export default function QuarterBreakdown({ matchData }: Props) {
  const { quarterScores, homeTeam, awayTeam } = matchData;

  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-800/50 p-4">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Çeyrekler
      </h3>
      
      <div className="space-y-2">
        <div className="grid grid-cols-5 gap-2 text-center text-xs text-slate-500 font-medium">
          <div></div>
          <div>1. Ç</div>
          <div>2. Ç</div>
          <div>3. Ç</div>
          <div>4. Ç</div>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center">
          <div className="text-left text-slate-300 text-sm truncate font-semibold">{homeTeam}</div>
          <div className="bg-purple-900/30 border border-purple-700/50 rounded py-1.5 text-white font-bold shadow">{quarterScores.home.q1}</div>
          <div className="bg-purple-900/30 border border-purple-700/50 rounded py-1.5 text-white font-bold shadow">{quarterScores.home.q2}</div>
          <div className="bg-purple-900/30 border border-purple-700/50 rounded py-1.5 text-white font-bold shadow">{quarterScores.home.q3}</div>
          <div className="bg-purple-900/30 border border-purple-700/50 rounded py-1.5 text-white font-bold shadow">{quarterScores.home.q4}</div>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center">
          <div className="text-left text-slate-300 text-sm truncate font-semibold">{awayTeam}</div>
          <div className="bg-blue-900/30 border border-blue-700/50 rounded py-1.5 text-white font-bold shadow">{quarterScores.away.q1}</div>
          <div className="bg-blue-900/30 border border-blue-700/50 rounded py-1.5 text-white font-bold shadow">{quarterScores.away.q2}</div>
          <div className="bg-blue-900/30 border border-blue-700/50 rounded py-1.5 text-white font-bold shadow">{quarterScores.away.q3}</div>
          <div className="bg-blue-900/30 border border-blue-700/50 rounded py-1.5 text-white font-bold shadow">{quarterScores.away.q4}</div>
        </div>
      </div>
    </div>
  );
}
