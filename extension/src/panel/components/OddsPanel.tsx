import React from 'react';
import type { MatchData } from '../../types/match';

interface Props {
  matchData: MatchData;
}

export default function OddsPanel({ matchData }: Props) {
  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-800/50 p-5">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
        Odds
      </h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-400 text-xs">{matchData.homeTeam}</span>
            <span className="text-2xl font-bold text-white tabular-nums">{matchData.homeOdds.toFixed(2)}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1">
            <div 
              className="bg-purple-500 h-1 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((1 / matchData.homeOdds) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-400 text-xs">{matchData.awayTeam}</span>
            <span className="text-2xl font-bold text-white tabular-nums">{matchData.awayOdds.toFixed(2)}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1">
            <div 
              className="bg-purple-500 h-1 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((1 / matchData.awayOdds) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-800/30 rounded p-3 mt-6">
          <p className="text-slate-500 text-xs leading-relaxed">
            Informational purposes only. Not betting advice.
          </p>
        </div>
      </div>
    </div>
  );
}