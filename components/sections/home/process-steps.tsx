'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Scroll storytelling. Desktop: the left column pins while steps advance, with a progress line.
 * Mobile: a vertical timeline with simple reveals, no pinning. Works fully without JS
 * (every step is visible; only the "active" emphasis needs JS).
 */
export function ProcessSteps({ steps, heading }: { steps: { name: string; body: string }[]; heading: ReactNode }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const progress = (active + 1) / steps.length;

  return (
    <div className="grid-site gap-y-12">
      <div className="col-span-4 md:col-span-8 lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          {heading}
          <div className="mt-12 hidden lg:block" aria-hidden>
            <div className="flex items-baseline gap-4">
              <span className="font-display text-[7rem] leading-none text-primary tabular">{String(active + 1).padStart(2, '0')}</span>
              <span className="text-h3 font-semibold">{steps[active].name}</span>
            </div>
            <div className="mt-6 h-px w-full max-w-sm bg-border">
              <div
                className="h-px origin-left bg-ink transition-transform duration-(--duration-slow) ease-(--ease-out)"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
          </div>
        </div>
      </div>

      <ol className="relative col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
        <span aria-hidden className="absolute top-2 bottom-2 left-[19px] w-px bg-border lg:hidden" />
        {steps.map((s, i) => (
          <li
            key={s.name}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-step={i}
            data-reveal
            className="relative flex gap-6 pb-10 last:pb-0 lg:min-h-[32vh] lg:items-center lg:pb-0"
          >
            <span
              className={cn(
                'relative z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full border text-small font-semibold tabular transition-colors duration-(--duration-base)',
                i <= active ? 'border-ink bg-ink text-white' : 'border-border bg-surface text-ink-muted',
              )}
            >
              {i + 1}
            </span>
            <div className="lg:max-w-md">
              <h3
                className={cn(
                  'text-h3 font-semibold transition-colors duration-(--duration-base)',
                  i === active ? 'text-ink' : 'lg:text-ink-muted',
                )}
              >
                {s.name}
              </h3>
              <p className="mt-2 text-body-lg text-ink-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
