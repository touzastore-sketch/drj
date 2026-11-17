import { useEffect, useRef } from 'react';

interface GoldenParticlesProps {
  lightMotion: boolean;
  prefersReducedMotion: boolean;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  alpha: number;
  alphaPhase: number;
  alphaSpeed: number;
  color: string;
}

const SAGE_PALETTE = [
  'rgba(69, 128, 94, ',   // #45805E Eucalyptus Sage
  'rgba(123, 184, 149, ', // #7BB895 Pastel Mint Glow
  'rgba(247, 252, 249, ', // #F7FCF9 Pearl Mint Light
];

export function GoldenParticles({ lightMotion, prefersReducedMotion }: GoldenParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;

    const particleCount = lightMotion ? 14 : 34;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * (width || 600),
      y: Math.random() * (height || 600),
      radius: (lightMotion ? 0.9 : 1.1) + Math.random() * (lightMotion ? 1.4 : 2.1),
      speedY: -(0.14 + Math.random() * (lightMotion ? 0.22 : 0.38)),
      speedX: (Math.random() - 0.5) * (lightMotion ? 0.14 : 0.28),
      alpha: 0.2 + Math.random() * 0.45,
      alphaPhase: Math.random() * Math.PI * 2,
      alphaSpeed: 0.008 + Math.random() * 0.015,
      color: SAGE_PALETTE[Math.floor(Math.random() * SAGE_PALETTE.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.alphaPhase * 0.6) * 0.08;
        p.alphaPhase += p.alphaSpeed;

        if (p.y < -12) {
          p.y = height + 12;
          p.x = Math.random() * width;
        }
        if (p.x < -12) p.x = width + 12;
        if (p.x > width + 12) p.x = -12;

        const currentAlpha = p.alpha * (0.55 + 0.45 * Math.sin(p.alphaPhase));

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.2);
        gradient.addColorStop(0, `${p.color}${currentAlpha.toFixed(3)})`);
        gradient.addColorStop(0.45, `${p.color}${(currentAlpha * 0.4).toFixed(3)})`);
        gradient.addColorStop(1, `${p.color}0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [lightMotion, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] opacity-85"
    />
  );
}
