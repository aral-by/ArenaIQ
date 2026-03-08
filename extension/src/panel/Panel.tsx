import React from 'react';
import { createRoot } from 'react-dom/client';
import { useMatchData } from '../hooks/useMatchData';
import ScoreHeader from './components/ScoreHeader';
import CommentaryFeed from './components/CommentaryFeed';
import OddsPanel from './components/OddsPanel';
import '../styles.css';

function Panel() {
  const params = new URLSearchParams(window.location.search);
  const matchUrl = params.get('url') || '';
  const { matchData, analyses, loading, error } = useMatchData(matchUrl);

  if (loading && !matchData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-slate-400">Loading match data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-slate-900 border border-red-900/50 rounded p-6 max-w-md">
          <p className="text-red-400">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!matchData) return null;

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <img 
            src="../../../logo/mainlogo.png" 
            alt="ArenaIQ" 
            className="h-8 w-auto"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <ScoreHeader matchData={matchData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <CommentaryFeed analyses={analyses} />
          </div>
          <div>
            <OddsPanel matchData={matchData} />
          </div>
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Panel />);