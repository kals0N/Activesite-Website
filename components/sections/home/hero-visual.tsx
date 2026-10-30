'use client';

import { useEffect, useRef } from 'react';
import { ARC_BOTTOM, ARC_TOP } from '@/components/ui/icons';

/**
 * Hero art: the logo's two arcs at monumental scale over a slow gradient mesh (blue, navy, gold).
 * Pure SVG/CSS — nothing to download, so it never competes with the headline for LCP.
 * On desktop pointers it leans gently toward the cursor (disabled for reduced motion).
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia('(pointer: fine) and (min-width: 768px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduce.matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        el.style.setProperty('--px', x.toFixed(3));
        el.style.setProperty('--py', y.toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="hero-follow pointer-events-none relative mx-auto mt-4 h-[22rem] w-full max-w-[34rem] md:absolute md:top-24 md:-right-24 md:mt-0 md:h-[36rem] md:w-[36rem] md:max-w-none lg:top-20 lg:-right-16 lg:h-[46rem] lg:w-[46rem] xl:right-[max(-4rem,calc((100vw-1360px)/2-4rem))]"
      style={{ '--d': 1, '--px': 0, '--py': 0 } as React.CSSProperties}
    >
      {/* Gradient mesh */}
      <div className="mesh absolute inset-[12%] rounded-full opacity-70 blur-3xl md:opacity-60">
        <div className="absolute top-[8%] left-[12%] size-[55%] rounded-full bg-primary/45" />
        <div className="absolute right-[6%] bottom-[10%] size-[50%] rounded-full bg-ink/25" />
        <div className="absolute top-[42%] left-[38%] size-[30%] rounded-full bg-accent/45" />
      </div>
      {/* The arcs: depth layers move by different amounts for a subtle 5–15% parallax */}
      <svg
        viewBox="2 3 36 35"
        className="absolute inset-0 size-full transition-transform duration-700 ease-(--ease-out)"
        style={{ transform: 'translate3d(calc(var(--px) * -28px), calc(var(--py) * -22px), 0)' }}
      >
        <g className="origin-center motion-safe:animate-arc-spin" style={{ transformBox: 'view-box', animationDuration: '120s' }}>
          <path d={ARC_TOP} fill="var(--color-primary)" />
          <g style={{ transform: 'translate(calc(var(--px) * 1.2px), calc(var(--py) * 1.2px))' }}>
            <path d={ARC_BOTTOM} fill="var(--color-ink)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
