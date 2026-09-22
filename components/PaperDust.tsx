"use client";

import { useEffect, useRef } from "react";

type Mote = { x: number; y: number; r: number; s: number; a: number; tw: number };

/** Partikel debu kertas yang melayang naik — dekoratif, mati saat prefers-reduced-motion. */
export function PaperDust({
  className = "",
  count = 16,
}: {
  className?: string;
  count?: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;

    const motes: Mote[] = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.4,
      s: Math.random() * 0.00022 + 0.00004,
      a: Math.random() * 0.5 + 0.2,
      tw: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = canvas.width = Math.max(1, Math.round(rect.width * dpr));
      h = canvas.height = Math.max(1, Math.round(rect.height * dpr));
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.y -= m.s;
        m.tw += 0.02;
        if (m.y < -0.05) {
          m.y = 1.05;
          m.x = Math.random();
        }
        const twinkle = (Math.sin(m.tw) + 1) / 2;
        ctx.beginPath();
        ctx.arc(m.x * w, m.y * h, m.r * dpr * (0.6 + twinkle * 0.8), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 246, 232, ${m.a * (0.3 + twinkle * 0.7)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
