import { Sparkles, Gift, HelpCircle } from 'lucide-react';

interface GameHeaderProps {
  turns: number;
  onAddTurns: () => void;
  onHelp: () => void;
  onRewards: () => void;
}

export function GameHeader({ turns, onAddTurns, onHelp, onRewards }: GameHeaderProps) {
  return (
    <div className="relative w-full max-w-[800px] mb-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onHelp}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-green-500/50 hover:scale-110 transition-transform"
          aria-label="Help"
        >
          <HelpCircle size={24} />
        </button>

        <div className="text-center">
          <h1
            className="text-6xl font-black mb-2"
            style={{
              background: 'linear-gradient(135deg, #FF1493 0%, #00BFFF 50%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(255,20,147,0.5)',
              fontFamily: 'Arial Black, sans-serif',
              letterSpacing: '2px',
            }}
          >
            DRINKO
          </h1>
          <h2
            className="text-5xl font-black"
            style={{
              background: 'linear-gradient(135deg, #00BFFF 0%, #FF1493 50%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(0,191,255,0.5)',
              fontFamily: 'Arial Black, sans-serif',
              letterSpacing: '2px',
            }}
          >
            PLINKO
          </h2>
          <div
            className="text-sm font-semibold mt-1 px-4 py-1 rounded-full inline-block"
            style={{
              background: 'linear-gradient(90deg, #4169E1, #FF1493)',
              color: 'white',
              textShadow: '0 0 10px rgba(255,255,255,0.5)',
            }}
          >
            GIẬT NẮP THẮNG LỚN
          </div>
        </div>

        <button
          onClick={onRewards}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/50 hover:scale-110 transition-transform"
          aria-label="Rewards"
        >
          <Gift size={24} />
        </button>
      </div>

      <div className="flex items-center justify-between px-6 py-4 rounded-2xl bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 border-2 border-blue-400 shadow-lg shadow-blue-500/30">
        <button
          onClick={onAddTurns}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold shadow-lg shadow-yellow-500/50 hover:scale-105 transition-transform"
        >
          <Sparkles size={20} className="animate-pulse" />
          <div className="text-left">
            <div className="text-xs opacity-80">THÊM</div>
            <div className="text-sm leading-tight">LƯỢT MỞ</div>
          </div>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="w-32 h-32 relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-600 to-orange-700 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs text-yellow-200 font-semibold">OPEN</div>
                  <div className="text-xl text-white font-black">HERE</div>
                  <div className="w-6 h-6 mx-auto mt-1 rounded-full border-4 border-yellow-900 bg-yellow-800 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-5xl font-black text-yellow-400 tracking-wider" style={{ fontFamily: 'monospace', textShadow: '0 0 20px rgba(255,215,0,0.8)' }}>
              {turns.toString().padStart(3, '0')}
            </div>
            <div className="text-xs text-gray-300 font-semibold mt-1">LƯỢT MỞ NẮP CHAI</div>
          </div>
        </div>
      </div>
    </div>
  );
}
