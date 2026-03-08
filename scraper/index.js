import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/scrape', async (req, res) => {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter required' });
  }

  // Mock data for testing UI
  const mockData = {
    homeTeam: 'Los Angeles Lakers',
    awayTeam: 'Boston Celtics',
    homeScore: 98,
    awayScore: 102,
    minute: 45,
    period: 'Q4',
    status: 'live',
    league: 'NBA',
    homeOdds: 2.15,
    awayOdds: 1.75,
    recentEvents: [
      'LeBron James 3-pointer',
      'Jayson Tatum layup',
      'Anthony Davis block'
    ],
    homeStats: {
      fieldGoalAttempts: 46,
      fieldGoalsMade: 21,
      fieldGoalPercentage: 45.65,
      twoPointAttempts: 32,
      twoPointMade: 16,
      twoPointPercentage: 50.0,
      threePointAttempts: 14,
      threePointMade: 5,
      threePointPercentage: 35.71,
      freeThrowAttempts: 4,
      freeThrowMade: 3,
      freeThrowPercentage: 75.0,
      offensiveRebounds: 9,
      defensiveRebounds: 13,
      totalRebounds: 22,
      assists: 8,
      blocks: 2,
      turnovers: 17,
      steals: 15,
      fouls: 8
    },
    awayStats: {
      fieldGoalAttempts: 37,
      fieldGoalsMade: 17,
      fieldGoalPercentage: 45.95,
      twoPointAttempts: 30,
      twoPointMade: 16,
      twoPointPercentage: 53.33,
      threePointAttempts: 7,
      threePointMade: 1,
      threePointPercentage: 14.29,
      freeThrowAttempts: 3,
      freeThrowMade: 2,
      freeThrowPercentage: 66.7,
      offensiveRebounds: 7,
      defensiveRebounds: 16,
      totalRebounds: 23,
      assists: 9,
      blocks: 2,
      turnovers: 26,
      steals: 9,
      fouls: 8
    },
    quarterScores: {
      home: { q1: 24, q2: 22, q3: 26, q4: 26 },
      away: { q1: 28, q2: 24, q3: 25, q4: 25 }
    },
    minuteByMinute: [
      // Q1 - 10 dakika
      { minute: 1, homePoints: 2, awayPoints: 3, period: 'Q1' },
      { minute: 2, homePoints: 4, awayPoints: 2, period: 'Q1' },
      { minute: 3, homePoints: 3, awayPoints: 5, period: 'Q1' },
      { minute: 4, homePoints: 5, awayPoints: 4, period: 'Q1' },
      { minute: 5, homePoints: 2, awayPoints: 3, period: 'Q1' },
      { minute: 6, homePoints: 3, awayPoints: 4, period: 'Q1' },
      { minute: 7, homePoints: 2, awayPoints: 2, period: 'Q1' },
      { minute: 8, homePoints: 3, awayPoints: 5, period: 'Q1' },
      { minute: 9, homePoints: 0, awayPoints: 0, period: 'Q1' },
      { minute: 10, homePoints: 0, awayPoints: 0, period: 'Q1' },
      // Q2 - 10 dakika
      { minute: 11, homePoints: 5, awayPoints: 4, period: 'Q2' },
      { minute: 12, homePoints: 3, awayPoints: 3, period: 'Q2' },
      { minute: 13, homePoints: 2, awayPoints: 5, period: 'Q2' },
      { minute: 14, homePoints: 4, awayPoints: 2, period: 'Q2' },
      { minute: 15, homePoints: 2, awayPoints: 3, period: 'Q2' },
      { minute: 16, homePoints: 3, awayPoints: 2, period: 'Q2' },
      { minute: 17, homePoints: 0, awayPoints: 2, period: 'Q2' },
      { minute: 18, homePoints: 2, awayPoints: 0, period: 'Q2' },
      { minute: 19, homePoints: 1, awayPoints: 3, period: 'Q2' },
      { minute: 20, homePoints: 0, awayPoints: 0, period: 'Q2' },
      // Q3 - 10 dakika
      { minute: 21, homePoints: 7, awayPoints: 5, period: 'Q3' },
      { minute: 22, homePoints: 3, awayPoints: 2, period: 'Q3' },
      { minute: 23, homePoints: 2, awayPoints: 4, period: 'Q3' },
      { minute: 24, homePoints: 5, awayPoints: 3, period: 'Q3' },
      { minute: 25, homePoints: 2, awayPoints: 2, period: 'Q3' },
      { minute: 26, homePoints: 3, awayPoints: 4, period: 'Q3' },
      { minute: 27, homePoints: 0, awayPoints: 2, period: 'Q3' },
      { minute: 28, homePoints: 2, awayPoints: 0, period: 'Q3' },
      { minute: 29, homePoints: 2, awayPoints: 3, period: 'Q3' },
      { minute: 30, homePoints: 0, awayPoints: 0, period: 'Q3' },
      // Q4 - 10 dakika
      { minute: 31, homePoints: 5, awayPoints: 6, period: 'Q4' },
      { minute: 32, homePoints: 4, awayPoints: 3, period: 'Q4' },
      { minute: 33, homePoints: 3, awayPoints: 2, period: 'Q4' },
      { minute: 34, homePoints: 5, awayPoints: 4, period: 'Q4' },
      { minute: 35, homePoints: 2, awayPoints: 3, period: 'Q4' },
      { minute: 36, homePoints: 3, awayPoints: 2, period: 'Q4' },
      { minute: 37, homePoints: 2, awayPoints: 2, period: 'Q4' },
      { minute: 38, homePoints: 2, awayPoints: 3, period: 'Q4' },
      { minute: 39, homePoints: 0, awayPoints: 0, period: 'Q4' },
      { minute: 40, homePoints: 0, awayPoints: 0, period: 'Q4' }
    ],
    analysis: {
      commentary: 'The game is intensely competitive in the final quarter. Boston maintains a narrow 4-point lead with strong defensive pressure. Lakers are struggling with turnovers but LeBron is keeping them in the game with clutch shots.',
      bettingInsight: 'Boston has momentum with 67% field goal accuracy in Q4. The away team odds at 1.75 reflect their current control, though Lakers could still mount a comeback.',
      timestamp: Date.now()
    }
  };

  res.json(mockData);
});

app.post('/ask-ai', async (req, res) => {
  const { matchData, message } = req.body;
  
  if (!matchData) {
    return res.status(400).json({ error: 'Match data required' });
  }

  // Mock AI analizi - gerçekte GPT-4o'ya gönderilecek
  const responses = [
    `${matchData.period} periyodunda maç oldukça rekabetçi seyrediyor. ${matchData.awayTeam}, ${matchData.awayScore - matchData.homeScore} sayı farkla önde gidiyor. ${matchData.homeTeam}'in şut yüzdesi düşük, ancak ribaunt sayısı yüksek. Kritik anlarda savunma önemli olacak.`,
    `${matchData.homeTeam}'in son çeyrekte performans artışı göstermesi gerekiyor. Şu anda top kayıpları fazla ve bu maçı doğrudan etkiliyor. ${matchData.awayTeam} defansif olarak güçlü bir görüntü sergiliyor.`,
    `İstatistikler ${matchData.awayTeam} lehine gözüküyor. Özellikle şut yüzdesi ve ribaunt kontrolünde avantajlılar. ${matchData.homeTeam}'in son 10 dakikada tempo değişikliği yapması gerekebilir.`
  ];

  const insights = [
    `Maçın gidişatına göre ${matchData.awayTeam} önde gözüküyor. Oranlar bunu yansıtıyor (${matchData.awayOdds}). ${matchData.homeTeam}'in geri dönüşü için güçlü bir çeyrek gerekli.`,
    `${matchData.homeTeam}'in form grafiğine bakıldığında momentum kaybetmiş durumda. Defansif değişiklikler kritik önem taşıyor.`,
    `Her iki takım da benzer şut yüzdelerine sahip ama ${matchData.awayTeam}'in ribaunt avantajı fark yaratıyor.`
  ];

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  const randomInsight = insights[Math.floor(Math.random() * insights.length)];

  const aiAnalysis = {
    commentary: message ? `"${message}" sorusuna yanıt: ${randomResponse}` : randomResponse,
    bettingInsight: randomInsight,
    timestamp: Date.now()
  };

  res.json(aiAnalysis);
});

app.listen(PORT, () => {
  console.log(`✓ Scraper service running on http://localhost:${PORT}`);
  console.log('Ready to receive requests from extension...');
});