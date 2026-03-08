export interface MatchData {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  period: string;
  status: 'live' | 'upcoming' | 'finished';
  league: string;
  homeOdds: number;
  awayOdds: number;
  recentEvents: string[];
}

export interface AIAnalysis {
  commentary: string;
  bettingInsight: string;
  timestamp: number;
}