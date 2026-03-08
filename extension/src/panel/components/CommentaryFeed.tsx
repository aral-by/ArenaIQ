import React from 'react';
import type { AIAnalysis } from '../../types/match';

interface Props {
  analyses: AIAnalysis[];
}

export default function CommentaryFeed({ analyses }: Props) {
  return (
    <div className="bg-slate-900 rounded p-5 border border-slate-800">
      <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-4">
        Match Commentary
      </h3>
      
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {analyses.length === 0 ? (
          <p className="text-slate-500 text-center py-8 text-sm">No analysis yet...</p>
        ) : (
          analyses.map((analysis, idx) => (
            <div key={idx} className="bg-slate-800 rounded p-4 border border-slate-700/50">
              <p className="text-slate-200 text-sm leading-relaxed mb-2">{analysis.commentary}</p>
              <p className="text-slate-500 text-xs">
                {new Date(analysis.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}