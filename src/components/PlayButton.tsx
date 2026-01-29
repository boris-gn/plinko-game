interface PlayButtonProps {
  onClick: () => void;
  disabled: boolean;
  isPlaying: boolean;
}

export function PlayButton({ onClick, disabled, isPlaying }: PlayButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative mt-6 rounded-3xl font-black text-xl
        transition-all duration-300 overflow-hidden
        ${disabled
          ? 'opacity-50 cursor-not-allowed bg-gray-700'
          : 'hover:scale-105 active:scale-95'
        }
      `}
      style={{
        width: '176px',
        height: '38px',
        background: disabled
          ? '#4a5568'
          : 'linear-gradient(90deg, #4169E1 0%, #FF1493 50%, #FFD700 100%)',
        boxShadow: disabled
          ? 'none'
          : '0 0 30px rgba(255,20,147,0.6), 0 0 60px rgba(65,105,225,0.4)',
        border: '3px solid rgba(255,255,255,0.3)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>

      <div className="relative flex items-center justify-center">
        <span className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          {isPlaying ? 'Đang bật...' : 'Bật nắp'}
        </span>
      </div>
    </button>
  );
}
