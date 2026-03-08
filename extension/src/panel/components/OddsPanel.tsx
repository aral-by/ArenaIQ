import React from 'react';
import type { MatchData } from '../../types/match';

interface Props {
  matchData: MatchData;
}

export default function OddsPanel({ matchData }: Props) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-purple-500/20">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
        Oran Analizi
      </h3>
      
      <div className="space-y-4">
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300 font-medium">{matchData.homeTeam}</span>
            <span className="text-2xl font-bold text-purple-400">{matchData.homeOdds.toFixed(2)}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${(1 / matchData.homeOdds) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300 font-medium">{matchData.awayTeam}</span>
            <span className="text-2xl font-bold text-purple-400">{matchData.awayOdds.toFixed(2)}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${(1 / matchData.awayOdds) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mt-6">
          <p className="text-yellow-200 text-xs leading-relaxed">
            ⚠️ Bu bilgiler yalnızca analiz amaçlıdır, yatırım tavsiyesi değildir.
          </p>
        </div>
      </div>
    </div>
  );
}