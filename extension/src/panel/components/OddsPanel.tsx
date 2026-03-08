import React from 'react';
import type { MatchData } from '../../types/match';

interface Props {
  matchData: MatchData;
}

export default function OddsPanel({ matchData }: Props) {
  return (
    <div className="bg-slate-900 rounded p-5 border border-slate-800">
      <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-4">
        Betting Odds
      </h3>
      
      <div className="space-y-3">
        <div className="bg-slate-800 rounded p-4 border border-slate-700/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300 text-sm">{matchData.homeTeam}</span>
            <span className="text-xl font-semibold text-purple-400">{matchData.homeOdds.toFixed(2)}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1.5">
            <div 
              className="bg-purple-600 h-1.5 rounded-full transition-all"
              style={{ width: `${Math.min((1 / matchData.homeOdds) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-800 rounded p-4 border border-slate-700/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300 text-sm">{matchData.awayTeam}</span>
            <span className="text-xl font-semibold text-purple-400">{matchData.awayOdds.toFixed(2)}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1.5">
            <div 
              className="bg-purple-600 h-1.5 rounded-full transition-all"
              style={{ width: `${Math.min((1 / matchData.awayOdds) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-amber-900/10 border border-amber-800/30 rounded p-3 mt-4">
          <p className="text-amber-200/80 text-xs">
            For informational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}