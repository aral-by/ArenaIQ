# ArenaIQ

Real-time AI-powered basketball match analysis Chrome extension for FlashScore.

## Features

- 🏀 Live match score tracking
- 🤖 AI-powered match commentary (GPT-4o)
- 📊 Betting odds analysis
- ⏱️ Auto-refresh every 60 seconds
- 👀 Professional purple-accented UI

## Stack

- **Extension**: React + Vite + TailwindCSS + TypeScript
- **Scraper**: Node.js + Playwright + Express
- **AI**: OpenAI GPT-4o

## Setup

### 1. Extension

```bash
cd extension
npm install
npm run build
```

Load `extension/dist` folder in Chrome:
1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `extension/dist` folder

### 2. Scraper Service

```bash
cd scraper
cp ../.env.example .env
# Edit .env and add your OpenAI API key
npm install
npm run dev
```

Scraper runs on `http://localhost:4000`

## Usage

1. Open a FlashScore match page
2. Click the ArenaIQ extension icon
3. Click "Analizi Başlat"
4. View live analysis in new tab

## Disclaimer

This tool is for analysis purposes only. Not financial advice.