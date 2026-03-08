import type { MatchData, AIAnalysis } from '../types/match';

const API_BASE = 'http://localhost:4000';

export async function fetchMatchData(matchUrl: string): Promise<MatchData & { analysis: AIAnalysis }> {
  const response = await fetch(`${API_BASE}/scrape?url=${encodeURIComponent(matchUrl)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch match data');
  }
  return response.json();
}