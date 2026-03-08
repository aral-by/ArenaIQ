import React from 'react';
import { createRoot } from 'react-dom/client';
import { useMatchData } from '../hooks/useMatchData';
import ScoreHeader from './components/ScoreHeader';
import QuarterBreakdown from './components/QuarterBreakdown';
import MatchStatistics from './components/MatchStatistics';
import MinuteByMinuteTable from './components/MinuteByMinuteTable';
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
          <div className="w-10 h-10 border-2 border-slate-700 border-t-purple-500 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-slate-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-slate-900/50 border border-slate-800 rounded p-6 max-w-md">
          <p className="text-slate-400 text-sm">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!matchData) return null;

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="border-b border-slate-900 bg-slate-950 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <img 
            src="../../../logo/mainlogo.png" 
            alt="ArenaIQ" 
            className="h-7 w-auto"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <ScoreHeader matchData={matchData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <div className="lg:col-span-2 space-y-5">
            <QuarterBreakdown matchData={matchData} />
            <MinuteByMinuteTable matchData={matchData} />
            <MatchStatistics matchData={matchData} />
            <CommentaryFeed analyses={analyses} />
          </div>
          <div className="space-y-5">
            <OddsPanel matchData={matchData} />
          </div>
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Panel />);