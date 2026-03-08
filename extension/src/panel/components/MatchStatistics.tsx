import React from 'react';
import type { MatchData } from '../../types/match';

interface Props {
  matchData: MatchData;
}

export default function MatchStatistics({ matchData }: Props) {
  const { homeStats, awayStats, homeTeam, awayTeam } = matchData;

  const StatRow = ({ label, homeValue, awayValue, isPercentage = false }: { 
    label: string; 
    homeValue: number; 
    awayValue: number; 
    isPercentage?: boolean;
  }) => {
    const homeWidth = homeValue + awayValue > 0 ? (homeValue / (homeValue + awayValue)) * 100 : 50;
    const awayWidth = 100 - homeWidth;

    return (
      <div className="py-3 border-b border-slate-800/50 last:border-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-400 text-xs font-medium w-20 text-right">
            {homeValue}{isPercentage ? '%' : ''}
          </span>
          <span className="text-slate-500 text-xs uppercase tracking-wider flex-1 text-center">{label}</span>
          <span className="text-slate-400 text-xs font-medium w-20 text-left">
            {awayValue}{isPercentage ? '%' : ''}
          </span>
        </div>
        <div className="flex gap-1 h-1.5">
          <div 
            className="bg-purple-600/80 rounded-full transition-all duration-300"
            style={{ width: `${homeWidth}%` }}
          ></div>
          <div 
            className="bg-blue-600/80 rounded-full transition-all duration-300"
            style={{ width: `${awayWidth}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-800/50 p-5">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
        Takım İstatistikleri
      </h3>

      <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
        <span className="text-purple-400 text-xs font-semibold">{homeTeam}</span>
        <span className="text-blue-400 text-xs font-semibold">{awayTeam}</span>
      </div>
      
      <div className="space-y-1">
        <StatRow 
          label="Şut %" 
          homeValue={homeStats.fieldGoalPercentage} 
          awayValue={awayStats.fieldGoalPercentage}
          isPercentage
        />
        <StatRow 
          label="İsabetli Şut" 
          homeValue={homeStats.fieldGoalsMade} 
          awayValue={awayStats.fieldGoalsMade}
        />
        <StatRow 
          label="2 Sayılık %" 
          homeValue={homeStats.twoPointPercentage} 
          awayValue={awayStats.twoPointPercentage}
          isPercentage
        />
        <StatRow 
          label="3 Sayılık %" 
          homeValue={homeStats.threePointPercentage} 
          awayValue={awayStats.threePointPercentage}
          isPercentage
        />
        <StatRow 
          label="Serbest Atış %" 
          homeValue={homeStats.freeThrowPercentage} 
          awayValue={awayStats.freeThrowPercentage}
          isPercentage
        />
        <StatRow 
          label="Ribaunt" 
          homeValue={homeStats.totalRebounds} 
          awayValue={awayStats.totalRebounds}
        />
        <StatRow 
          label="Asist" 
          homeValue={homeStats.assists} 
          awayValue={awayStats.assists}
        />
        <StatRow 
          label="Top Çalma" 
          homeValue={homeStats.steals} 
          awayValue={awayStats.steals}
        />
        <StatRow 
          label="Blok" 
          homeValue={homeStats.blocks} 
          awayValue={awayStats.blocks}
        />
        <StatRow 
          label="Top Kaybı" 
          homeValue={homeStats.turnovers} 
          awayValue={awayStats.turnovers}
        />
        <StatRow 
          label="Faul" 
          homeValue={homeStats.fouls} 
          awayValue={awayStats.fouls}
        />
      </div>
    </div>
  );
}
