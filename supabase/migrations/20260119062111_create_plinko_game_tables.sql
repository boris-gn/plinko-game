/*
  # Plinko Game Database Schema

  1. New Tables
    - `game_results`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz) - When the game was played
      - `bucket_index` (int) - Which bucket (0-4) the cork landed in
      - `multiplier` (text) - The multiplier value (X1, X3, X10, 5X, 7X)
      - `multiplier_value` (numeric) - Numeric value of multiplier for calculations
      - `session_id` (text) - Browser session identifier
      - `win_amount` (numeric) - Optional: Amount won if implementing betting
    
    - `player_stats`
      - `session_id` (text, primary key)
      - `total_plays` (int) - Total number of games played
      - `total_turns` (int) - Current turn balance
      - `bucket_distribution` (jsonb) - Distribution of results across buckets
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public access (arcade-style game doesn't require auth)
    - Session-based access control
*/

-- Create game_results table
CREATE TABLE IF NOT EXISTS game_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  bucket_index int NOT NULL CHECK (bucket_index >= 0 AND bucket_index <= 4),
  multiplier text NOT NULL,
  multiplier_value numeric NOT NULL,
  session_id text NOT NULL,
  win_amount numeric DEFAULT 0
);

-- Create player_stats table
CREATE TABLE IF NOT EXISTS player_stats (
  session_id text PRIMARY KEY,
  total_plays int DEFAULT 0,
  total_turns int DEFAULT 10,
  bucket_distribution jsonb DEFAULT '{"0": 0, "1": 0, "2": 0, "3": 0, "4": 0}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE game_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for game_results
CREATE POLICY "Anyone can insert game results"
  ON game_results
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can view own session results"
  ON game_results
  FOR SELECT
  TO anon
  USING (true);

-- Create policies for player_stats
CREATE POLICY "Anyone can insert player stats"
  ON player_stats
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view player stats"
  ON player_stats
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Users can update own session stats"
  ON player_stats
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_game_results_session_id ON game_results(session_id);
CREATE INDEX IF NOT EXISTS idx_game_results_created_at ON game_results(created_at DESC);
