import NextLink from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { getServicesByGroup } from '@/lib/services';
import { servicePaths } from '@/lib/routes';
import { ServiceIcon } from '@/components/ui/service-icon';
import { cn } from '@/lib/cn';

/**
 * Services as a bento: Build (the core offer) gets the large panel; Design and Grow sit beside it.
 * Each row is written as the outcome the client gets, with the service name as the label.
 */
export async function ServicesBento({ headingLevel = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('nav');
  const groups = getServicesByGroup(locale);
  const order = { design: 0, build: 1, grow: 2 } as const;
  const sorted = [...groups].sort((a, b) => order[a.group] - order[b.group]);
  const H = headingLevel;

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      {sorted.map(({ group, services }, gi) => (
        <div
          key={group}
          data-reveal
          style={{ '--i': gi } as React.CSSProperties}
          className={cn(
            'rounded-panel border-border border p-6 sm:p-8',
            group === 'build' && 'bg-surface lg:col-span-7',
            group === 'design' && 'bg-surface-warm lg:col-span-5',
            group === 'grow' && 'bg-surface-warm lg:col-span-12',
          )}
        >
          <div className="flex items-baseline justify-between gap-4">
            <H className="font-display text-h3 !font-normal tracking-[-0.02em]">
              {t(`groups.${group}`)}
            </H>
            <p className="text-small text-ink-muted text-right">{t(`groupLines.${group}`)}</p>
          </div>
          <ul
            className={cn(
              'mt-6 grid gap-2',
              group === 'build' && 'sm:grid-cols-2',
              group === 'grow' && 'sm:grid-cols-2 xl:grid-cols-4',
            )}
          >
            {services.map((s) => (
              <li key={s.key}>
                <NextLink
                  href={servicePaths(s.key)[locale]}
                  className="group/svc rounded-card bg-canvas/60 hover:border-border hover:bg-surface hover:shadow-lift flex h-full items-start gap-4 border border-transparent p-4 transition-[transform,box-shadow,border-color] duration-(--duration-base) ease-(--ease-out) hover:-translate-y-1"
                >
                  <span className="bg-primary-tint text-primary inline-flex size-10 shrink-0 items-center justify-center rounded-full">
                    <ServiceIcon name={s.icon} size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-small text-ink-muted block font-medium">{s.name}</span>
                    <span className="text-body text-ink mt-1 block font-semibold tracking-[-0.02em]">
                      {s.outcome}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    size={18}
                    className="text-ink-muted group-hover/svc:text-primary mt-1 shrink-0 transition-colors"
                  />
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
