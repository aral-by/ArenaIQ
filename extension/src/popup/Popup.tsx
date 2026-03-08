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
    const panelUrl = chrome.runtime.getURL(`src/panel/panel.html?url=${encodeURIComponent(url)}`);
    chrome.tabs.create({ url: panelUrl });
  };

  return (
    <div className="w-96 bg-slate-950">
      <div className="bg-slate-900 px-6 py-4 border-b border-slate-800">
        <img 
          src="../../../logo/mainlogo.png" 
          alt="ArenaIQ" 
          className="h-8 w-auto"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">
            Maçın Linki:
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste FlashScore match URL..."
            className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded text-white text-sm placeholder-slate-600 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition"
          />
        </div>
        
        <button
          onClick={handleAnalyze}
          disabled={!url}
          className="w-full py-2.5 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Maça Göz At
        </button>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Popup />);