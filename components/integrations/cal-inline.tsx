'use client';

import { useEffect, useRef, useState, type ComponentType } from 'react';
import { useLocale } from 'next-intl';
import type { Locale } from '@/i18n/routing';
import { track } from '@/lib/analytics';
import { CAL_NAMESPACE, loadCal } from './cal-loader';

type CalProps = { calLink: string; namespace?: string; config?: Record<string, string>; style?: React.CSSProperties; className?: string };

/**
 * Inline Cal.com calendar for /contact. The embed (and its third-party script) loads only when
 * the section comes within 400px of the viewport; a skeleton holds the space meanwhile.
 */
export function CalInline({ calLink, loadingLabel, fallback }: { calLink: string; loadingLabel: string; fallback: React.ReactNode }) {
  const locale = useLocale() as Locale;
  const ref = useRef<HTMLDivElement>(null);
  const [Cal, setCal] = useState<ComponentType<CalProps> | null>(null);

  useEffect(() => {
    if (!calLink || !ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        void loadCal(locale);
        import('@calcom/embed-react').then((m) => {
          setCal(() => m.default as unknown as ComponentType<CalProps>);
          track('booking_opened', { mode: 'inline' });
        });
      },
      { rootMargin: '400px' },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [calLink, locale]);

  if (!calLink) return <>{fallback}</>;

  return (
    <div ref={ref} className="relative min-h-[640px] overflow-hidden rounded-panel border border-border bg-surface">
      {!Cal && (
        <div aria-busy="true" aria-label={loadingLabel} className="absolute inset-0 grid grid-cols-7 gap-2 p-6">
          <span className="col-span-4 h-6 animate-skeleton rounded bg-surface-warm" />
          <span className="col-span-7 h-4 animate-skeleton rounded bg-surface-warm" />
          {Array.from({ length: 35 }, (_, i) => (
            <span key={i} className="aspect-square animate-skeleton rounded-lg bg-surface-warm" />
          ))}
        </div>
      )}
      {Cal && (
        <Cal
          namespace={CAL_NAMESPACE}
          calLink={calLink}
          config={{ layout: 'month_view', locale }}
          style={{ width: '100%', height: '100%', minHeight: 640, overflow: 'auto' }}
        />
      )}
    </div>
  );
}
