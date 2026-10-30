'use client';

import { useEffect, useRef, useState } from 'react';
import { Ph } from './ph';

/**
 * A stat that counts up once when it scrolls into view (1.2 s, ease-out), then stays still.
 * Placeholder or non-numeric values render as-is. Reduced motion shows the final value.
 */
export function Stat({ value, label }: { value: string; label: string }) {
  const match = /^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/.exec(value);
  const numeric = match && !value.includes('[[');
  const target = numeric ? parseFloat(match[2].replace(',', '.')) : 0;
  const decimals = numeric && match[2].includes('.') ? match[2].split('.')[1].length : 0;
  const [shown, setShown] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!numeric || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current!;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1200);
          const eased = 1 - Math.pow(1 - p, 4);
          setShown(target * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setShown(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [numeric, target]);

  return (
    <div ref={ref}>
      <p
        className={
          value.includes('[[') ? 'text-h4 font-semibold' : 'text-stat tabular font-semibold'
        }
      >
        {numeric && shown !== null ? (
          `${match[1]}${shown.toFixed(decimals)}${match[3]}`
        ) : (
          <Ph>{value}</Ph>
        )}
      </p>
      <p className="text-body text-ink-muted mt-3">{label}</p>
    </div>
  );
}
