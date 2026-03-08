import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useMatchData } from '../hooks/useMatchData';
import ScoreHeader from './components/ScoreHeader';
import QuarterBreakdown from './components/QuarterBreakdown';
import MatchStatistics from './components/MatchStatistics';
import MinuteByMinuteTable from './components/MinuteByMinuteTable';
import ScoreChart from './components/ScoreChart';
import AIChatBubble from './components/AIChatBubble';
import '../styles.css';

function Panel() {
  const params = new URLSearchParams(window.location.search);
  const matchUrl = params.get('url') || '';
  const { matchData, analyses, loading, error } = useMatchData(matchUrl);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnalyses, setAiAnalyses] = useState<any[]>([]);

  const handleAskAI = async (message: string) => {
    if (!matchData || aiLoading) return;
    
    setAiLoading(true);
    try {
      // API'den AI analizi iste
      const response = await fetch('http://localhost:4000/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchData, message })
      });
      
      if (response.ok) {
        const analysis = await response.json();
        setAiAnalyses(prev => [analysis, ...prev]);
      }
    } catch (err) {
      console.error('AI analizi alınamadı:', err);
    } finally {
      setAiLoading(false);
    }
  };

  if (loading && !matchData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-slate-700 border-t-purple-500 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-slate-500 text-sm">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-slate-900/50 border border-slate-800 rounded p-6 max-w-md">
          <p className="text-slate-400 text-sm">Hata: {error}</p>
        </div>
      </div>
    );
  }

  if (!matchData) return null;

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10 shadow-xl">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <img 
            src="../../../logo/mainlogo.png" 
            alt="ArenaIQ" 
            className="h-8 w-auto"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="space-y-6">
          <ScoreHeader matchData={matchData} />
          
          <QuarterBreakdown matchData={matchData} />
          
          <MatchStatistics matchData={matchData} />

          <ScoreChart matchData={matchData} />
          
          <MinuteByMinuteTable matchData={matchData} />
        </div>
      </div>

      <AIChatBubble onAskAI={handleAskAI} analyses={aiAnalyses} loading={aiLoading} />
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Panel />);