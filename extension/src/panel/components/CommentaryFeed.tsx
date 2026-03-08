import React from 'react';
import type { AIAnalysis } from '../../types/match';

interface Props {
  analyses: AIAnalysis[];
}

export default function CommentaryFeed({ analyses }: Props) {
  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-800/50 p-5">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
        Commentary
      </h3>
      
      <div className="space-y-3 max-h-[550px] overflow-y-auto pr-2">
        {analyses.length === 0 ? (
          <p className="text-slate-600 text-center py-12 text-sm">Waiting for analysis...</p>
        ) : (
          analyses.map((analysis, idx) => (
            <div key={idx} className="bg-slate-800/30 rounded p-4 border border-slate-800/50">
              <p className="text-slate-300 text-sm leading-relaxed">{analysis.commentary}</p>
              <p className="text-slate-600 text-xs mt-2">
                {new Date(analysis.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}