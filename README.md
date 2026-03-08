<div align="center">
  <img src="logo/mainlogo.png" alt="ArenaIQ Logo" width="600">
  
  <h1>ArenaIQ</h1>
  
  <p>Real-time AI-powered basketball match analysis Chrome extension for FlashScore.</p>
</div>

---

## Features

- Live match score tracking
- AI-powered match commentary (GPT-4o)
- Betting odds analysis
- Auto-refresh every 60 seconds
- Professional UI design

## Tech Stack

**Extension**: React + Vite + TailwindCSS + TypeScript  
**Scraper**: Node.js + Playwright + Express  
**AI**: OpenAI GPT-4o

## Installation

### Extension Setup

```bash
cd extension
npm install
npm run build
```

Load the extension in Chrome:
1. Navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `extension/dist` folder

### Scraper Service Setup

> **⚠️ Yapım Aşamasında**  
> Gerçek FlashScore scrape servisi ve OpenAI entegrasyonu henüz geliştirilme aşamasındadır. Şu an mock verilerle çalışmaktadır.

```bash
cd scraper
cp ../.env.example .env
npm install
npm run dev
```

Edit `.env` file and add your OpenAI API key. The scraper service runs on `http://localhost:4000`.

## Usage

1. Open a FlashScore match page in your browser
2. Click the ArenaIQ extension icon
3. Click "Analizi Başlat" button
4. View live analysis in the opened tab

The panel updates automatically every 60 seconds with fresh data and commentary.

## Disclaimer

This tool is for informational and analysis purposes only. Not financial or betting advice.