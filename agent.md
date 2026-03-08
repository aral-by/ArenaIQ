# ArenaIQ — Agent Document (v2)

## Project Overview

ArenaIQ is a Chrome Extension that takes a single FlashScore match URL as input and opens a new tab with a real-time AI-powered analysis panel. No authentication, no backend dashboard — just paste the link, hit analyze, and get live insights instantly.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Chrome Extension | Manifest V3, React + Vite |
| New Tab Panel | React, Tailwind CSS |
| Scraper | Node.js + Playwright (local service) |
| AI Analysis | OpenAI API (GPT-4o) |
| Realtime Updates | Polling (60s interval) via REST |
| Local Server | Express (localhost:4000) |

---

## Architecture Overview

```
User pastes FlashScore match URL into Extension Popup
                      │
                      ▼
          "Analyze" button clicked
                      │
                      ▼
        New tab opens → ArenaIQ Panel
                      │
                      ▼
        Panel sends match URL to local scraper
        (localhost:4000/scrape?url=...)
                      │
                      ▼
        Playwright scrapes FlashScore match page
                      │
              ┌───────┴────────┐
              ▼                ▼
        Live Score        Match Stats
        + Minute          + Odds Data
              │                │
              └───────┬────────┘
                      ▼
              OpenAI GPT-4o API
                      │
                      ▼
        ┌─────────────────────────────┐
        │       ArenaIQ Panel         │
        │  • Live Score               │
        │  • Match Commentary         │
        │  • Betting Suggestions      │
        └─────────────────────────────┘
                  (updates every 60s)
```

---

## Core Features

### 1. Chrome Extension Popup
- Kullanıcı FlashScore'da bir maç sayfasındayken extension ikonuna tıklar
- Popup açılır, aktif sekmenin URL'si otomatik olarak input alanına doldurulur
- Kullanıcı isterse URL'yi manuel olarak yapıştırabilir
- **"Analizi Başlat"** butonuna basınca yeni bir tab açılır
- Yeni tab: `chrome-extension://.../panel.html?url=<match_url>`

### 2. Local Scraper Service (Node.js + Playwright)
- `localhost:4000` üzerinde çalışan hafif bir Express sunucusu
- Tek endpoint: `GET /scrape?url=<flashscore_match_url>`
- Playwright ile headless browser açar, maç sayfasını parse eder
- Döndürülen veri:

```json
{
  "homeTeam": "string",
  "awayTeam": "string",
  "homeScore": 0,
  "awayScore": 0,
  "minute": 0,
  "period": "string",
  "status": "live | upcoming | finished",
  "league": "string",
  "homeOdds": 0.0,
  "awayOdds": 0.0,
  "recentEvents": ["string"]
}
```

### 3. ArenaIQ Panel (New Tab)
Panel 3 ana bölümden oluşur:

**① Live Score Header**
- Takım isimleri, anlık skor, maç dakikası, periyot
- Her 60 saniyede bir otomatik güncelleme
- Skor değişimlerinde animasyonlu highlight

**② Maçın Gidişat Yorumu**
- GPT-4o'ya scrape edilen veri gönderilir
- Her güncelleme döngüsünde yeni bir analiz üretilir
- Analizler kronolojik olarak aşağıya eklenir (feed görünümü)

**③ Bahis Önerileri / Oran Analizi**
- Mevcut maç oranları gösterilir (home / away)
- GPT-4o maçın gidişatına göre kısa bir oran yorumu üretir
- **Disclaimer:** "Bu bilgiler yalnızca analiz amaçlıdır, yatırım tavsiyesi değildir."

---

## User Flow

```
1. Kullanıcı FlashScore'da bir maç sayfasını açar
2. Extension ikonuna tıklar → popup açılır
3. URL otomatik dolar veya manuel girilir
4. "Analizi Başlat" butonuna basar
5. Yeni tab açılır → ArenaIQ panel yüklenir
6. Panel scraper'a istek atar → veri çekilir → AI'ya gönderilir
7. Canlı skor, yorum ve oran analizi ekrana gelir
8. Her 60 saniyede panel otomatik güncellenir
```

---

## File & Folder Structure

```
areniq/
├── AGENT.md
│
├── extension/                        # Chrome Extension (React + Vite)
│   ├── manifest.json                 # Manifest V3
│   ├── src/
│   │   ├── popup/
│   │   │   ├── Popup.tsx             # URL input + Analizi Başlat butonu
│   │   │   └── popup.html
│   │   ├── panel/
│   │   │   ├── Panel.tsx             # Ana analiz paneli (new tab)
│   │   │   ├── components/
│   │   │   │   ├── ScoreHeader.tsx   # Canlı skor + dakika
│   │   │   │   ├── CommentaryFeed.tsx # AI yorum akışı
│   │   │   │   └── OddsPanel.tsx     # Oran analizi
│   │   │   └── panel.html
│   │   ├── hooks/
│   │   │   └── useMatchData.ts       # Polling hook (60s)
│   │   ├── lib/
│   │   │   └── api.ts                # Scraper servis iletişimi
│   │   └── types/
│   │       └── match.ts
│   ├── public/
│   │   └── icons/
│   │       ├── icon16.png
│   │       ├── icon48.png
│   │       └── icon128.png
│   ├── vite.config.ts
│   └── package.json
│
├── scraper/                          # Local Node.js scraper servisi
│   ├── index.ts                      # Express sunucu girişi (port 4000)
│   ├── scraper.ts                    # Playwright scrape logic
│   ├── parser.ts                     # Ham HTML → structured JSON
│   ├── ai.ts                         # OpenAI GPT-4o entegrasyonu
│   └── package.json
│
├── .env.example
└── README.md
```

---

## Environment Variables

```env
# Scraper Service
PORT=4000
OPENAI_API_KEY=sk-...
```

---

## AI Prompt Structure

Her analiz döngüsünde GPT-4o'ya şu formatta prompt gönderilir:

```
You are a professional basketball analyst. Analyze the following live match data and provide:
1. A 2-3 sentence match commentary describing the current flow of the game.
2. A 1-2 sentence betting insight based on current odds and match momentum.

Match Data:
- Teams: {homeTeam} vs {awayTeam}
- Score: {homeScore} - {awayScore}
- Minute: {minute} | Period: {period}
- League: {league}
- Odds: Home {homeOdds} | Away {awayOdds}
- Recent Events: {recentEvents}

Respond in Turkish. Be concise and data-driven.
```

---

## Development Milestones

| # | Milestone | Açıklama |
|---|---|---|
| 1 | Scraper MVP | Playwright ile FlashScore maç sayfasından veri çekme |
| 2 | Express API | `/scrape` endpoint'i + JSON response |
| 3 | AI Integration | GPT-4o prompt + yorum + oran analizi üretimi |
| 4 | Extension Popup | URL input + yeni tab açma |
| 5 | Panel UI | Score header + commentary feed + odds panel |
| 6 | Polling Loop | 60 saniyelik otomatik güncelleme |
| 7 | Polish | Loading states, hata yönetimi, animasyonlar |

---

## Notes & Constraints

- Scraper servisi kullanıcının bilgisayarında lokal olarak çalışır; dış sunucu gerekmez.
- FlashScore'un bot korumasına karşı Playwright'ın stealth modunu kullanmak gerekebilir (`playwright-extra` + `puppeteer-extra-plugin-stealth`).
- Extension, `localhost:4000`'e istek atabilmek için `manifest.json` içinde `host_permissions` tanımlanmalıdır.
- Panel sayfası scraper servis çalışmıyorsa kullanıcıya açık bir hata mesajı göstermeli ve servisin nasıl başlatılacağını belirtmelidir.