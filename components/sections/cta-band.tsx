import { getTranslations } from 'next-intl/server';
import { Check } from 'lucide-react';
import { BookButton, WhatsAppButton } from '@/components/ui/cta-buttons';
import { Ph } from '@/components/ui/ph';
import { NewsletterForm } from '@/components/integrations/newsletter-form';
import { ArcField } from '@/components/sections/arc-art';
import { cn } from '@/lib/cn';

/** The closing block every page ends with: one primary action, objections handled beside it. */
export async function CtaBand({
  title,
  body,
  location,
  topic,
  newsletter = false,
  buttonLabel,
  tone = 'ink',
}: {
  title?: string;
  body?: string;
  location: string;
  topic?: string;
  newsletter?: boolean;
  buttonLabel?: string;
  /** Pages that already have a dark section use the warm band, keeping one dark moment per page. */
  tone?: 'ink' | 'warm';
}) {
  const ink = tone === 'ink';
  const t = await getTranslations();
  const objections = [t('objections.free'), t('objections.response'), t('objections.launch'), t('objections.guarantee')];

  return (
    <section
      aria-labelledby={`cta-${location}`}
      className={cn('relative overflow-hidden', ink ? 'on-ink bg-ink text-white' : 'bg-surface-warm text-ink')}
    >
      <ArcField
        tone={ink ? 'ink' : 'light'}
        className={cn(
          'pointer-events-none absolute -right-40 -bottom-56 w-[44rem] max-md:-right-64 max-md:w-[34rem]',
          ink ? 'opacity-90' : 'opacity-[0.14]',
        )}
      />
      <div className="container-site section-y relative">
        <div className="grid-site gap-y-12">
          <div data-reveal className="col-span-4 md:col-span-8 lg:col-span-7">
            <h2 id={`cta-${location}`} className="font-display text-h1">
              {title ?? t('home.final.title')}
            </h2>
            <p className={cn('mt-6 max-w-xl text-body-lg', ink ? 'text-ink-soft' : 'text-ink-muted')}>{body ?? t('home.final.body')}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <BookButton location={location} variant={ink ? 'inverse' : 'primary'} label={buttonLabel ?? t('cta.bookLong')} />
              <WhatsAppButton location={location} variant="whatsapp" topic={topic} />
            </div>
            <ul className={cn('mt-10 grid gap-3 text-small sm:grid-cols-2', ink ? 'text-ink-soft' : 'text-ink-muted')}>
              {objections.map((o) => (
                <li key={o} className="flex items-start gap-2.5">
                  <Check aria-hidden size={18} className={cn('mt-px shrink-0', ink ? 'text-accent' : 'text-success')} />
                  <span>
                    <Ph>{o}</Ph>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {newsletter && (
            <div data-reveal style={{ '--i': 2 } as React.CSSProperties} className="col-span-4 self-end md:col-span-6 lg:col-span-4 lg:col-start-9">
              <div className="rounded-panel border border-border-ink bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
                <p className="text-h4 font-semibold">{t('newsletter.title')}</p>
                <p className="mt-2 text-small text-ink-soft">
                  <Ph>{t('newsletter.body')}</Ph>
                </p>
                <NewsletterForm location={`${location}_band`} tone="ink" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
