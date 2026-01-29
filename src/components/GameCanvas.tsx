import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { GAME_CONFIG, BUCKETS } from "../config/gameConfig";
import { calculatePegPositions, getBucketBoundaries } from "../utils/pegLayout";

interface GameCanvasProps {
  corkBody: Matter.Body | null;
  onCanvasReady: (ctx: CanvasRenderingContext2D) => void;
}

export function GameCanvas({ corkBody, onCanvasReady }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const pegImageRef = useRef<HTMLImageElement>();
  const boardImageRef = useRef<HTMLImageElement>();
  const corkImageRef = useRef<HTMLImageElement>();
  const cupImageRef = useRef<HTMLImageElement>();
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const pegPositionsRef = useRef(calculatePegPositions());
  const bucketBoundariesRef = useRef(getBucketBoundaries());
  const imagesLoadedRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;

    const pegSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="26" viewBox="0 0 15 26" fill="none">
  <g filter="url(#filter0_f_9659_60087)">
    <path d="M8.59961 13.1289V14.0901C8.0238 15.5318 6.68024 15.0512 6.29636 14.0901V10.2454V7.36187C6.29636 5.43953 6.29636 4.47836 4.56893 4.47836C3.28138 4.47836 2.92742 1.49275 5.72055 2.07543C8.0238 2.55591 8.59961 4.31816 8.59961 5.43953V8.32304V13.1289Z" fill="url(#paint0_linear_9659_60087)"/>
  </g>
  <g filter="url(#filter1_f_9659_60087)">
    <circle cx="5.5" cy="5.5" r="5.5" transform="matrix(-1 0 0 1 12.5996 13)" fill="url(#paint1_radial_9659_60087)"/>
  </g>
  <g filter="url(#filter2_f_9659_60087)">
    <circle cx="5.5" cy="5.5" r="5.5" transform="matrix(-1 0 0 1 12.5996 13)" fill="url(#paint2_radial_9659_60087)"/>
  </g>
  <g filter="url(#filter3_f_9659_60087)">
    <circle cx="5.5" cy="5.5" r="5.5" transform="matrix(-1 0 0 1 12.5996 13)" fill="url(#paint3_radial_9659_60087)"/>
  </g>
  <g filter="url(#filter4_f_9659_60087)">
    <circle cx="5.5" cy="5.5" r="5.5" transform="matrix(-1 0 0 1 12.5996 13)" fill="url(#paint4_radial_9659_60087)"/>
  </g>
  <g filter="url(#filter5_f_9659_60087)">
    <circle cx="5.5" cy="5.5" r="5.5" transform="matrix(-1 0 0 1 12.5996 13)" fill="url(#paint5_radial_9659_60087)"/>
  </g>
  <circle cx="4.27778" cy="4.27778" r="4.27778" transform="matrix(-1 0 0 1 11.377 14.2222)" fill="url(#paint6_radial_9659_60087)"/>
  <circle cx="4.27778" cy="4.27778" r="4.27778" transform="matrix(-1 0 0 1 11.377 14.2222)" fill="url(#paint7_radial_9659_60087)"/>
  <circle cx="4.27778" cy="4.27778" r="4.27778" transform="matrix(-1 0 0 1 11.377 14.2222)" fill="url(#paint8_linear_9659_60087)"/>
  <circle cx="4.27778" cy="4.27778" r="4.27778" transform="matrix(-1 0 0 1 11.377 13)" fill="url(#paint9_radial_9659_60087)"/>
  <defs>
    <filter id="filter0_f_9659_60087" x="1.59961" y="0" width="9" height="17" filterUnits="userSpaceOnUse" colorinterpolationfilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="0" result="effect1_foregroundBlur_9659_60087"/>
    </filter>
    <filter id="filter1_f_9659_60087" x="0.0996094" y="11.5" width="14" height="14" filterUnits="userSpaceOnUse" colorinterpolationfilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="0.75" result="effect1_foregroundBlur_9659_60087"/>
    </filter>
    <filter id="filter2_f_9659_60087" x="0.0996094" y="11.5" width="14" height="14" filterUnits="userSpaceOnUse" colorinterpolationfilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="0.75" result="effect1_foregroundBlur_9659_60087"/>
    </filter>
    <filter id="filter3_f_9659_60087" x="0.0996094" y="11.5" width="14" height="14" filterUnits="userSpaceOnUse" colorinterpolationfilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="0.75" result="effect1_foregroundBlur_9659_60087"/>
    </filter>
    <filter id="filter4_f_9659_60087" x="-0.000390649" y="11.4" width="14.2" height="14.2" filterUnits="userSpaceOnUse" colorinterpolationfilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="0.8" result="effect1_foregroundBlur_9659_60087"/>
    </filter>
    <filter id="filter5_f_9659_60087" x="-0.000390649" y="11.4" width="14.2" height="14.2" filterUnits="userSpaceOnUse" colorinterpolationfilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="0.8" result="effect1_foregroundBlur_9659_60087"/>
    </filter>
    <linearGradient id="paint0_linear_9659_60087" x1="6.09847" y1="2.07533" x2="6.09847" y2="14.9999" gradientUnits="userSpaceOnUse">
      <stop offset="0.104877" stop-color="#B10000" stop-opacity="0.6"/>
      <stop offset="0.84183" stop-color="white"/>
    </linearGradient>
    <radialGradient id="paint1_radial_9659_60087" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.5 -1.22222) rotate(90) scale(9.77778)">
      <stop stop-color="#7100FF"/>
      <stop offset="1" stop-color="#7D2964" stop-opacity="0.1"/>
    </radialGradient>
    <radialGradient id="paint2_radial_9659_60087" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.5 -1.22222) rotate(90) scale(9.77778)">
      <stop stop-color="#7100FF"/>
      <stop offset="1" stop-color="#7D2964" stop-opacity="0.1"/>
    </radialGradient>
    <radialGradient id="paint3_radial_9659_60087" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.5 -1.22222) rotate(90) scale(9.77778)">
      <stop stop-color="#7100FF"/>
      <stop offset="1" stop-color="#7D2964" stop-opacity="0.1"/>
    </radialGradient>
    <radialGradient id="paint4_radial_9659_60087" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(4.88889 11.6111) rotate(-90) scale(7.33333)">
      <stop stop-color="#FF0030"/>
      <stop offset="1" stop-color="#7D2964" stop-opacity="0.1"/>
    </radialGradient>
    <radialGradient id="paint5_radial_9659_60087" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(4.88889 11.6111) rotate(-90) scale(7.33333)">
      <stop stop-color="#FF0030"/>
      <stop offset="1" stop-color="#7D2964" stop-opacity="0.1"/>
    </radialGradient>
    <radialGradient id="paint6_radial_9659_60087" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(4.27778 4.27778) rotate(90) scale(4.27778)">
      <stop stop-color="#D9D9D9"/>
      <stop offset="1" stop-color="white" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="paint7_radial_9659_60087" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(4.27778 4.27778) rotate(90) scale(4.27778)">
      <stop stop-color="#D9D9D9"/>
      <stop offset="1" stop-color="white" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="paint8_linear_9659_60087" x1="4.27778" y1="-2.44444" x2="4.27778" y2="6.72222" gradientUnits="userSpaceOnUse">
      <stop stop-color="#D9D9D9"/>
      <stop offset="0.685084" stop-color="white" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="paint9_radial_9659_60087" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(4.27778 4.27778) rotate(90) scale(6.72222)">
      <stop stop-color="white"/>
      <stop offset="0.597812" stop-color="white" stop-opacity="0"/>
    </radialGradient>
  </defs>
</svg>`;

    const checkAllImagesLoaded = () => {
      imagesLoadedRef.current += 1;
      if (imagesLoadedRef.current === 4) {
        onCanvasReady(ctx);
        drawStaticScene();
      }
    };

    const boardImage = new Image();
    boardImage.onload = checkAllImagesLoaded;
    boardImage.onerror = checkAllImagesLoaded;
    boardImage.src = "/board_inside.png";
    boardImageRef.current = boardImage;

    const corkImage = new Image();
    corkImage.onload = checkAllImagesLoaded;
    corkImage.onerror = checkAllImagesLoaded;
    corkImage.src = "/cork.png";
    corkImageRef.current = corkImage;

    const cupImage = new Image();
    cupImage.onload = checkAllImagesLoaded;
    cupImage.onerror = checkAllImagesLoaded;
    cupImage.src = "/cup.png";
    cupImageRef.current = cupImage;

    const pegImage = new Image();
    pegImage.onload = checkAllImagesLoaded;
    pegImage.onerror = checkAllImagesLoaded;
    pegImage.src = "data:image/svg+xml;base64," + btoa(pegSvg);
    pegImageRef.current = pegImage;

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [onCanvasReady]);

  function drawBackground(ctx: CanvasRenderingContext2D) {
    const { width, height } = GAME_CONFIG.canvas;

    if (
      boardImageRef.current &&
      boardImageRef.current.complete &&
      boardImageRef.current.naturalWidth > 0
    ) {
      ctx.drawImage(boardImageRef.current, 0, 0, width, height);
    } else {
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "#8B4513");
      gradient.addColorStop(0.5, "#A0522D");
      gradient.addColorStop(1, "#8B4513");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(139, 69, 19, 0.3)";
      ctx.lineWidth = 2;
      for (let i = 0; i < height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }
    }
  }

  function drawPeg(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    isActive: boolean,
  ) {
    if (!pegImageRef.current) return;

    ctx.save();
    const width = 6;
    const height = 12;

    if (!isActive) {
      ctx.globalAlpha = 0.3;
    }

    ctx.drawImage(
      pegImageRef.current,
      x - width / 2,
      y - height / 2,
      width,
      height,
    );
    ctx.restore();
  }

  function drawBucket(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    _height: number,
    color: string,
    multiplier: string,
  ) {
    ctx.save();

    const cupWidth = 26;
    const cupHeight = 38;
    const cupX = x + width / 2 - cupWidth / 2;
    const cupY = GAME_CONFIG.canvas.height - cupHeight - 8;

    if (
      cupImageRef.current &&
      cupImageRef.current.complete &&
      cupImageRef.current.naturalWidth > 0
    ) {
      ctx.drawImage(cupImageRef.current, cupX, cupY, cupWidth, cupHeight);
    } else {
      const gradient = ctx.createLinearGradient(
        cupX,
        cupY,
        cupX,
        cupY + cupHeight,
      );
      gradient.addColorStop(0, "#FFE5B4");
      gradient.addColorStop(1, "#DEB887");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(cupX + cupWidth * 0.2, cupY);
      ctx.lineTo(cupX + cupWidth * 0.8, cupY);
      ctx.lineTo(cupX + cupWidth, cupY + cupHeight);
      ctx.lineTo(cupX, cupY + cupHeight);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "#CD853F";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cupX + cupWidth * 0.2, cupY);
      ctx.lineTo(cupX + cupWidth * 0.8, cupY);
      ctx.stroke();
    }

    if (multiplier) {
      const badgeX = x + width / 2;
      const badgeY = y - 18;
      const badgeWidth = 28;
      const badgeHeight = 16;
      const badgeRadius = 8;

      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(
        badgeX - badgeWidth / 2,
        badgeY - badgeHeight / 2,
        badgeWidth,
        badgeHeight,
        badgeRadius,
      );
      ctx.fill();

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.shadowBlur = 10;
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.font = "bold 9px Arial";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(multiplier, badgeX, badgeY);

      if (multiplier === "10X") {
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#FFD700";
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 8px Arial";
        ctx.fillText("✦", badgeX - 16, badgeY);
        ctx.fillText("✦", badgeX + 16, badgeY);
      }
    }

    ctx.restore();
  }

  function drawCork(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    angle: number,
  ) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const corkSize = 16;

    if (
      corkImageRef.current &&
      corkImageRef.current.complete &&
      corkImageRef.current.naturalWidth > 0
    ) {
      ctx.drawImage(
        corkImageRef.current,
        -corkSize / 2,
        -corkSize / 2,
        corkSize,
        corkSize,
      );
    } else {
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, corkSize / 2);
      gradient.addColorStop(0, "#D4A574");
      gradient.addColorStop(0.7, "#8B5A3C");
      gradient.addColorStop(1, "#654321");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, corkSize / 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.beginPath();
      ctx.arc(-corkSize / 6, -corkSize / 6, corkSize / 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawStaticScene() {
    if (!ctxRef.current) return;

    const ctx = ctxRef.current;

    drawBackground(ctx);
    pegPositionsRef.current.forEach((peg) =>
      drawPeg(ctx, peg.x, peg.y, peg.active),
    );

    const bucketY = GAME_CONFIG.canvas.height - GAME_CONFIG.bucket.height - 8;
    bucketBoundariesRef.current.forEach((bucket, index) => {
      const bucketConfig = BUCKETS[index];
      drawBucket(
        ctx,
        bucket.left,
        bucketY,
        GAME_CONFIG.bucket.width,
        GAME_CONFIG.bucket.height,
        bucketConfig.color,
        bucketConfig.multiplier,
      );
    });
  }

  useEffect(() => {
    if (!ctxRef.current) return;

    const ctx = ctxRef.current;
    const cupHeight = 38;
    const cupY = GAME_CONFIG.canvas.height - cupHeight - 8;
    const bucketY = GAME_CONFIG.canvas.height - GAME_CONFIG.bucket.height - 8;

    function render() {
      if (!ctxRef.current || !corkBody) return;

      drawBackground(ctx);
      pegPositionsRef.current.forEach((peg) =>
        drawPeg(ctx, peg.x, peg.y, peg.active),
      );

      bucketBoundariesRef.current.forEach((bucket, index) => {
        const bucketConfig = BUCKETS[index];
        drawBucket(
          ctx,
          bucket.left,
          bucketY,
          GAME_CONFIG.bucket.width,
          GAME_CONFIG.bucket.height,
          bucketConfig.color,
          bucketConfig.multiplier,
        );
      });

      if (corkBody && corkBody.position.y < cupY + cupHeight - 10) {
        drawCork(ctx, corkBody.position.x, corkBody.position.y, corkBody.angle);
      }

      if (corkBody) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    }

    if (corkBody) {
      render();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [corkBody]);

  return (
    <canvas
      ref={canvasRef}
      width={GAME_CONFIG.canvas.width}
      height={GAME_CONFIG.canvas.height}
      className="rounded-lg"
    />
  );
}
