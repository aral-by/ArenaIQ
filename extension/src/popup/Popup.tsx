import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';

function Popup() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url?.includes('flashscore.com')) {
        setUrl(tabs[0].url);
      }
    });
  }, []);

  const handleAnalyze = () => {
    if (!url) return;
    const panelUrl = chrome.runtime.getURL(`panel.html?url=${encodeURIComponent(url)}`);
    chrome.tabs.create({ url: panelUrl });
  };

  return (
    <div className="w-80 p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">AI</span>
        </div>
        <h1 className="text-2xl font-bold text-white">ArenaIQ</h1>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">
            FlashScore Maç Linki
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.flashscore.com/match/..."
            className="w-full px-4 py-2.5 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <button
          onClick={handleAnalyze}
          disabled={!url}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-purple-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Analizi Başlat
        </button>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Popup />);