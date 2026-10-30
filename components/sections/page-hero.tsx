import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { BookButton, WhatsAppButton } from '@/components/ui/cta-buttons';
import { Breadcrumbs, type Crumb } from '@/components/ui/breadcrumbs';
import { Ph } from '@/components/ui/ph';
import { ArcField } from './arc-art';
import { cn } from '@/lib/cn';

/**
 * Inner-page hero: breadcrumbs, one H1, a one-line promise and the primary CTA,
 * so every page has a call to action above the fold on mobile.
 */
export async function PageHero({
  title,
  sub,
  crumbs,
  location,
  topic,
  ctas = true,
  bookLabel,
  children,
  art = true,
}: {
  title: string;
  sub?: string;
  crumbs: Crumb[];
  location: string;
  topic?: string;
  ctas?: boolean;
  bookLabel?: string;
  children?: ReactNode;
  art?: boolean;
}) {
  const t = await getTranslations('objections');
  return (
    <section className="relative overflow-hidden pt-24 pb-14 sm:pt-28 lg:pt-36 lg:pb-20">
      {art && (
        <ArcField
          tone="light"
          className="pointer-events-none absolute top-10 -right-48 w-[30rem] opacity-[0.12] max-lg:hidden xl:-right-24"
        />
      )}
      <div className="container-site relative">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 max-w-4xl lg:mt-10" data-wa-topic={topic}>
          <h1 className="hero-title font-display text-h1">
            <Ph>{title}</Ph>
          </h1>
          {sub && (
            <p
              className="hero-follow text-body-lg text-ink-muted mt-6 max-w-2xl"
              style={{ '--d': 0 } as React.CSSProperties}
            >
              <Ph>{sub}</Ph>
            </p>
          )}
          {ctas && (
            <div
              className={cn('hero-follow mt-8 flex flex-col gap-3 sm:flex-row')}
              style={{ '--d': 1 } as React.CSSProperties}
            >
              <BookButton location={location} label={bookLabel} />
              <WhatsAppButton location={location} topic={topic} />
            </div>
          )}
          {ctas && (
            <p
              className="hero-follow text-small text-ink-muted mt-5"
              style={{ '--d': 2 } as React.CSSProperties}
            >
              {t('free')}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
