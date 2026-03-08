import React from 'react';
import type { MatchData } from '../../types/match';

interface Props {
  matchData: MatchData;
}

export default function QuarterBreakdown({ matchData }: Props) {
  const { quarterScores, homeTeam, awayTeam } = matchData;

  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-800/50 p-5">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
        Quarter Breakdown
      </h3>
      
      <div className="space-y-3">
        <div className="grid grid-cols-5 gap-2 text-center text-xs text-slate-500 font-medium">
          <div></div>
          <div>Q1</div>
          <div>Q2</div>
          <div>Q3</div>
          <div>Q4</div>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center">
          <div className="text-left text-slate-400 text-sm truncate">{homeTeam}</div>
          <div className="bg-slate-800/50 rounded py-1.5 text-white font-semibold">{quarterScores.home.q1}</div>
          <div className="bg-slate-800/50 rounded py-1.5 text-white font-semibold">{quarterScores.home.q2}</div>
          <div className="bg-slate-800/50 rounded py-1.5 text-white font-semibold">{quarterScores.home.q3}</div>
          <div className="bg-slate-800/50 rounded py-1.5 text-white font-semibold">{quarterScores.home.q4}</div>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center">
          <div className="text-left text-slate-400 text-sm truncate">{awayTeam}</div>
          <div className="bg-slate-800/50 rounded py-1.5 text-white font-semibold">{quarterScores.away.q1}</div>
          <div className="bg-slate-800/50 rounded py-1.5 text-white font-semibold">{quarterScores.away.q2}</div>
          <div className="bg-slate-800/50 rounded py-1.5 text-white font-semibold">{quarterScores.away.q3}</div>
          <div className="bg-slate-800/50 rounded py-1.5 text-white font-semibold">{quarterScores.away.q4}</div>
        </div>
      </div>
    </div>
  );
}
