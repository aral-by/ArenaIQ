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
    analysis: {
      commentary: 'The game is intensely competitive in the final quarter. Boston maintains a narrow 4-point lead with strong defensive pressure. Lakers are struggling with turnovers but LeBron is keeping them in the game with clutch shots.',
      bettingInsight: 'Boston has momentum with 67% field goal accuracy in Q4. The away team odds at 1.75 reflect their current control, though Lakers could still mount a comeback.',
      timestamp: Date.now()
    }
  };

  res.json(mockData);
});

app.listen(PORT, () => {
  console.log(`✓ Scraper service running on http://localhost:${PORT}`);
  console.log('Ready to receive requests from extension...');
});