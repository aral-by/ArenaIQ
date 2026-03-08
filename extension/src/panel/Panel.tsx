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
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-300 text-lg">Maç verileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 max-w-md">
          <p className="text-red-400 text-lg">Hata: {error}</p>
        </div>
      </div>
    );
  }

  if (!matchData) return null;

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">AI</span>
          </div>
          <h1 className="text-3xl font-bold text-white">ArenaIQ</h1>
        </div>

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