import { useState, useEffect } from 'react';
import { fetchMatchData } from '../lib/api';
import type { MatchData, AIAnalysis } from '../types/match';

interface UseMatchDataResult {
  matchData: MatchData | null;
  analyses: AIAnalysis[];
  loading: boolean;
  error: string | null;
}

export function useMatchData(matchUrl: string): UseMatchDataResult {
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [analyses, setAnalyses] = useState<AIAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchMatchData(matchUrl);
      setMatchData(data);
      setAnalyses(prev => [data.analysis, ...prev]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // 60s
    return () => clearInterval(interval);
  }, [matchUrl]);

  return { matchData, analyses, loading, error };
}