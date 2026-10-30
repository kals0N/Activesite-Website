import NextLink from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from '@/lib/content';
import { cn } from '@/lib/cn';
import { Ph } from './ph';
import { DeviceFrame } from './device-frame';

/**
 * Outcome-led case study card: the metric is the headline. On hover the frame scales slightly
 * and the summary slides up over a gradient. The view-transition-name lets the browser morph
 * this card's frame into the case study hero on navigation.
 */
export function CaseStudyCard({
  study,
  href,
  readLabel,
  size = 'md',
  index = 0,
  tone = 'ink',
}: {
  study: CaseStudy;
  href: string;
  readLabel: string;
  size?: 'md' | 'lg';
  index?: number;
  tone?: 'ink' | 'light';
}) {
  const ink = tone === 'ink';
  return (
    <NextLink
      href={href}
      data-reveal
      style={{ '--i': index } as React.CSSProperties}
      className={cn(
        'group/cs rounded-panel relative flex h-full flex-col overflow-hidden border transition-[border-color,box-shadow]',
        ink
          ? 'border-border-ink bg-white/[0.03] hover:border-white/30'
          : 'border-border bg-surface hover:shadow-lift',
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          size === 'lg' ? 'aspect-[16/10] lg:aspect-auto lg:min-h-80 lg:flex-1' : 'aspect-[16/10]',
        )}
      >
        <div
          className="absolute inset-0 transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/cs:scale-[1.03]"
          style={{ viewTransitionName: `case-${study.key}` }}
        >
          <DeviceFrame tone={study.tone} label={study.client} />
        </div>
        <div className="from-ink via-ink/80 absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t to-transparent p-6 pt-16 opacity-0 transition-[opacity,transform] duration-(--duration-base) ease-(--ease-out) group-hover/cs:translate-y-0 group-hover/cs:opacity-100 group-focus-visible/cs:translate-y-0 group-focus-visible/cs:opacity-100 max-lg:hidden">
          <p className="text-small text-ink-soft">
            <Ph>{study.summary}</Ph>
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
        <p className={cn('font-display text-h3 leading-tight', ink ? 'text-white' : 'text-ink')}>
          <Ph>{study.metric}</Ph>
        </p>
        <p className={cn('text-small', ink ? 'text-ink-soft' : 'text-ink-muted')}>
          <Ph>{study.metricLabel}</Ph>
        </p>
        <h3 className={cn('text-body mt-2 font-medium', ink ? 'text-white' : 'text-ink')}>
          {study.title}
        </h3>
        <span
          className={cn(
            'text-small mt-auto inline-flex items-center gap-1.5 pt-3 font-medium',
            ink ? 'text-accent' : 'text-primary',
          )}
        >
          {readLabel}
          <ArrowUpRight
            aria-hidden
            size={16}
            className="transition-transform group-hover/cs:translate-x-0.5 group-hover/cs:-translate-y-0.5"
          />
        </span>
      </div>
    </NextLink>
  );
}
