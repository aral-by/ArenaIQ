import React from 'react';
import type { AIAnalysis } from '../../types/match';

interface Props {
  onAskAI: () => void;
  analyses: AIAnalysis[];
  loading: boolean;
}

export default function AIPanel({ onAskAI, analyses, loading }: Props) {
  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-800/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          AI Analiz
        </h3>
        <button
          onClick={onAskAI}
          disabled={loading}
          className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-xs font-medium rounded transition-colors"
        >
          {loading ? 'Analiz Ediliyor...' : 'AI\'dan Sor'}
        </button>
      </div>
      
      <div className="space-y-3 max-h-[550px] overflow-y-auto pr-2">
        {analyses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-sm">Maç analizi almak için "AI'dan Sor" butonuna tıklayın</p>
          </div>
        ) : (
          analyses.map((analysis, idx) => (
            <div key={idx} className="bg-slate-800/30 rounded p-4 border border-slate-800/50">
              <p className="text-slate-300 text-sm leading-relaxed mb-3">{analysis.commentary}</p>
              {analysis.bettingInsight && (
                <p className="text-slate-400 text-xs leading-relaxed pt-3 border-t border-slate-700/50">
                  <span className="font-semibold">Oran Değerlendirmesi:</span> {analysis.bettingInsight}
                </p>
              )}
              <p className="text-slate-600 text-xs mt-3">
                {new Date(analysis.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}