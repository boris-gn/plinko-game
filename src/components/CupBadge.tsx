import clsx from "clsx";

interface ICupBadgeProps {
  text: string;
  textColor: string;
  mainBgColor?: string;
  bgImage?: boolean;
  strokeColor: string;
  isWinning?: boolean;
  hasResult: boolean | null;
  className?: string;
  animationBgColor?: string;
}

const CupBadge = ({
  text,
  textColor,
  mainBgColor,
  bgImage,
  strokeColor,
  isWinning,
  hasResult,
  className,
  animationBgColor,
}: ICupBadgeProps) => {
  const grayTextColor = "#3B3B3B";
  const grayBgColor = "#292929";
  const grayStrokeColor = "#525252";

  const displayTextColor = !hasResult
    ? textColor
    : isWinning
      ? textColor
      : grayTextColor;

  const displayBgColor = !hasResult
    ? mainBgColor
    : isWinning
      ? mainBgColor
      : grayBgColor;

  const displayStrokeColor = !hasResult
    ? strokeColor
    : isWinning
      ? strokeColor
      : grayStrokeColor;

  return (
    <svg
      className={clsx("z-10", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="41"
      height="26"
      viewBox="0 0 41 26"
      fill="none"
    >
      <defs>
        {/* Gradient */}
        <linearGradient
          id="goldGradient"
          gradientUnits="userSpaceOnUse"
          x1="6.52344"
          y1="7.15479"
          x2="34.20884"
          y2="7.15479"
        >
          <stop
            offset="0%"
            stopColor={
              !hasResult ? "#915500" : isWinning ? "#915500" : grayBgColor
            }
          />
          <stop
            offset="100%"
            stopColor={
              !hasResult ? "#F3F100" : isWinning ? "#F3F100" : grayBgColor
            }
          />
        </linearGradient>

        {/* Blur filter */}
        <filter
          id="filter0_f_10607_32539"
          x="0"
          y="0"
          width="40.7285"
          height="25.6504"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      <g>
        {/* Layer 1: The solid background color (Base) */}
        <rect
          className={clsx(
            !hasResult && !isWinning && "animate-svg-color-pulse",
          )}
          x="6.52344"
          y="7.15479"
          width="27.6854"
          height="11.3408"
          rx="5.67039"
          fill={displayBgColor}
          style={
            {
              "--main-bg": displayBgColor,
              "--anim-bg": animationBgColor,
            } as React.CSSProperties
          }
        />

        {/* Layer 2: The Pulsing Gradient (Overlay) */}
        {/* This only renders/pulses if bgImage is true */}
        {bgImage && (
          <rect
            className={clsx(!hasResult && !isWinning && "animate-gold-glow")}
            x="6.52344"
            y="7.15479"
            width="27.6854"
            height="11.3408"
            rx="5.67039"
            fill="url(#goldGradient)"
          />
        )}
      </g>

      <g filter="url(#filter0_f_10607_32539)">
        <rect
          x="4.59961"
          y="4.6001"
          width="31.5295"
          height="16.4502"
          rx="8.22509"
          stroke={displayStrokeColor}
          strokeWidth="1.2"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.8;0.2"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <rect
        x="4.59961"
        y="4.6001"
        width="31.5295"
        height="16.4502"
        rx="8.22509"
        stroke={displayStrokeColor}
        strokeWidth="1.2"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.4;1;0.4"
          dur="1.8s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="strokeWidth"
          values="1.2;1.8;1.2"
          dur="1.8s"
          repeatCount="indefinite"
        />
      </rect>

      <rect
        x="4.59961"
        y="4.6001"
        width="31.5295"
        height="16.4502"
        rx="8.22509"
        stroke={!hasResult ? "white" : isWinning ? "white" : grayTextColor}
        strokeWidth="0.3"
      />

      {/* Content */}
      {text ? (
        <text
          x="20.5"
          y="13.5"
          fontFamily="Arial, sans-serif"
          fontSize="6"
          fontWeight="bold"
          fill={displayTextColor}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {text}
        </text>
      ) : (
        <svg
          x="15.5"
          y="8.5"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
        >
          <path
            d="M4.66667 0.5C2.36667 0.5 0.5 2.36667 0.5 4.66667C0.5 6.96667 2.36667 8.83333 4.66667 8.83333C6.96667 8.83333 8.83333 6.96667 8.83333 4.66667C8.83333 2.36667 6.96667 0.5 4.66667 0.5ZM1.33333 4.66667C1.33333 2.825 2.825 1.33333 4.66667 1.33333C5.4375 1.33333 6.14583 1.59583 6.70833 2.0375L2.0375 6.70833C1.59583 6.14583 1.33333 5.4375 1.33333 4.66667ZM4.66667 8C3.89583 8 3.1875 7.7375 2.625 7.29583L7.29583 2.625C7.7375 3.1875 8 3.89583 8 4.66667C8 6.50833 6.50833 8 4.66667 8Z"
            stroke={
              !hasResult ? "#CF1322" : isWinning ? "#CF1322" : grayTextColor
            }
          />
        </svg>
      )}
    </svg>
  );
};

export default CupBadge;
