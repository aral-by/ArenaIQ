export interface TeamStats {
  fieldGoalAttempts: number;
  fieldGoalsMade: number;
  fieldGoalPercentage: number;
  twoPointAttempts: number;
  twoPointMade: number;
  twoPointPercentage: number;
  threePointAttempts: number;
  threePointMade: number;
  threePointPercentage: number;
  freeThrowAttempts: number;
  freeThrowMade: number;
  freeThrowPercentage: number;
  offensiveRebounds: number;
  defensiveRebounds: number;
  totalRebounds: number;
  assists: number;
  blocks: number;
  turnovers: number;
  steals: number;
  fouls: number;
}

export interface QuarterScore {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  ot?: number[];
}

export interface MinuteData {
  minute: number;
  homePoints: number;
  awayPoints: number;
  period: string;
}

export interface MatchData {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  period: string;
  status: 'live' | 'upcoming' | 'finished' | 'waiting';
  league: string;
  homeOdds: number;
  awayOdds: number;
  recentEvents: string[];
  homeStats: TeamStats;
  awayStats: TeamStats;
  quarterScores: {
    home: QuarterScore;
    away: QuarterScore;
  };
  minuteByMinute: MinuteData[];
  startTime?: string;
  timeUntilStart?: number;
}

export interface AIAnalysis {
  commentary: string;
  bettingInsight: string;
  timestamp: number;
}