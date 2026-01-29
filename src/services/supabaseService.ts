import { supabase } from '../lib/supabase';

export interface GameResultRecord {
  bucket_index: number;
  multiplier: string;
  multiplier_value: number;
  session_id: string;
  win_amount?: number;
}

export interface PlayerStats {
  session_id: string;
  total_plays: number;
  total_turns: number;
  bucket_distribution: Record<string, number>;
}

export function getSessionId(): string {
  let sessionId = localStorage.getItem('plinko_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('plinko_session_id', sessionId);
  }
  return sessionId;
}

export async function saveGameResult(result: GameResultRecord): Promise<void> {
  try {
    const { error } = await supabase.from('game_results').insert([result]);

    if (error) {
      console.error('Error saving game result:', error);
    }
  } catch (err) {
    console.error('Error saving game result:', err);
  }
}

export async function getPlayerStats(sessionId: string): Promise<PlayerStats | null> {
  try {
    const { data, error } = await supabase
      .from('player_stats')
      .select('*')
      .eq('session_id', sessionId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching player stats:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error fetching player stats:', err);
    return null;
  }
}

export async function initializePlayerStats(sessionId: string): Promise<void> {
  try {
    const existing = await getPlayerStats(sessionId);
    if (existing) return;

    const { error } = await supabase.from('player_stats').insert([
      {
        session_id: sessionId,
        total_plays: 0,
        total_turns: 10,
        bucket_distribution: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0 },
      },
    ]);

    if (error) {
      console.error('Error initializing player stats:', error);
    }
  } catch (err) {
    console.error('Error initializing player stats:', err);
  }
}

export async function updatePlayerStats(
  sessionId: string,
  bucketIndex: number,
  turnsRemaining: number
): Promise<void> {
  try {
    const stats = await getPlayerStats(sessionId);
    if (!stats) return;

    const newDistribution = { ...stats.bucket_distribution };
    newDistribution[bucketIndex.toString()] = (newDistribution[bucketIndex.toString()] || 0) + 1;

    const { error } = await supabase
      .from('player_stats')
      .update({
        total_plays: stats.total_plays + 1,
        total_turns: turnsRemaining,
        bucket_distribution: newDistribution,
        updated_at: new Date().toISOString(),
      })
      .eq('session_id', sessionId);

    if (error) {
      console.error('Error updating player stats:', error);
    }
  } catch (err) {
    console.error('Error updating player stats:', err);
  }
}

export async function getRecentResults(sessionId: string, limit = 10) {
  try {
    const { data, error } = await supabase
      .from('game_results')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent results:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching recent results:', err);
    return [];
  }
}
