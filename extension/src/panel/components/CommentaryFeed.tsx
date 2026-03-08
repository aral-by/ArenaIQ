import React from 'react';
import type { AIAnalysis } from '../../types/match';

interface Props {
  analyses: AIAnalysis[];
}

export default function CommentaryFeed({ analyses }: Props) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-purple-500/20">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
        Maç Yorumu
      </h3>
      
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {analyses.length === 0 ? (
          <p className="text-slate-400 text-center py-8">Henüz analiz yok...</p>
        ) : (
          analyses.map((analysis, idx) => (
            <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">AI</span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-200 leading-relaxed mb-2">{analysis.commentary}</p>
                  <p className="text-slate-400 text-sm">
                    {new Date(analysis.timestamp).toLocaleTimeString('tr-TR')}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}