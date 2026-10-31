import NextLink from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import type { CaseStudy } from '@/lib/content';
import { cn } from '@/lib/cn';
import { Ph } from './ph';

/**
 * Project card: the goal is the headline, followed by who it is for and what we measure.
 * Typographic on purpose. Add real screenshots to a case study page once a client approves them.
 */
export function CaseStudyCard({
  study,
  href,
  readLabel,
  measuresLabel,
  index = 0,
}: {
  study: CaseStudy;
  href: string;
  readLabel: string;
  measuresLabel?: string;
  index?: number;
  /** @deprecated kept for older call sites */
  size?: 'md' | 'lg';
  /** @deprecated kept for older call sites */
  tone?: 'ink' | 'light';
}) {
  return (
    <NextLink
      href={href}
      data-reveal
      style={{ '--i': index } as React.CSSProperties}
      className={cn(
        'group/cs rounded-panel border-border bg-surface flex h-full flex-col border p-6 sm:p-8',
        'hover:border-ink/20 hover:shadow-lift transition-[transform,box-shadow,border-color] duration-(--duration-base) ease-(--ease-out) hover:-translate-y-1',
      )}
    >
      <p className="text-small text-ink-muted">
        <Ph>{study.client}</Ph>
      </p>
      <h3 className="font-display text-h3 mt-8">
        <Ph>{study.metric}</Ph>
      </h3>
      <p className="text-small text-ink-muted mt-2">
        <Ph>{study.metricLabel}</Ph>
      </p>
      <p className="mt-5">{study.summary}</p>

      <div className="border-border mt-6 border-t pt-5">
        {measuresLabel && <p className="text-small text-ink-muted font-medium">{measuresLabel}</p>}
        <ul className="mt-3 space-y-2">
          {study.results.slice(0, 3).map((r) => (
            <li key={r.value} className="text-small flex items-start gap-2">
              <Check aria-hidden size={16} className="text-success mt-0.5 shrink-0" />
              <span>{r.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <span className="text-small text-primary mt-auto inline-flex items-center gap-1.5 pt-8 font-medium">
        {readLabel}
        <ArrowUpRight
          aria-hidden
          size={16}
          className="transition-transform group-hover/cs:translate-x-0.5 group-hover/cs:-translate-y-0.5"
        />
      </span>
    </NextLink>
  );
}
