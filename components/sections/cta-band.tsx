import { getTranslations } from 'next-intl/server';
import { Check } from 'lucide-react';
import { BookButton, WhatsAppButton } from '@/components/ui/cta-buttons';
import { Ph } from '@/components/ui/ph';
import { NewsletterForm } from '@/components/integrations/newsletter-form';

/** The closing block every page ends with: one primary action, objections handled beside it. */
export async function CtaBand({
  title,
  body,
  location,
  topic,
  newsletter = false,
  buttonLabel,
}: {
  title?: string;
  body?: string;
  location: string;
  topic?: string;
  newsletter?: boolean;
  buttonLabel?: string;
}) {
  const t = await getTranslations();
  const objections = [
    t('objections.free'),
    t('objections.response'),
    t('objections.launch'),
    t('objections.guarantee'),
  ];

  return (
    <section aria-labelledby={`cta-${location}`} className="section-y">
      <div className="container-site">
        <div
          data-reveal
          className="rounded-panel border-border bg-surface-warm grid grid-cols-1 gap-12 border px-6 py-12 sm:px-10 lg:grid-cols-12 lg:px-16 lg:py-20"
        >
          <div className={newsletter ? 'min-w-0 lg:col-span-7' : 'min-w-0 lg:col-span-9'}>
            <h2 id={`cta-${location}`} className="font-display text-h2 max-w-3xl">
              {title ?? t('home.final.title')}
            </h2>
            <p className="text-body-lg text-ink-muted mt-5 max-w-xl">
              {body ?? t('home.final.body')}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BookButton location={location} label={buttonLabel ?? t('cta.bookLong')} />
              <WhatsAppButton location={location} topic={topic} />
            </div>
            <ul className="text-small text-ink-muted mt-9 grid gap-3 sm:grid-cols-2">
              {objections.map((o) => (
                <li key={o} className="flex items-start gap-2.5">
                  <Check aria-hidden size={18} className="text-success mt-px shrink-0" />
                  <span>
                    <Ph>{o}</Ph>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {newsletter && (
            <div className="self-end lg:col-span-4 lg:col-start-9">
              <div className="rounded-card border-border bg-surface border p-6 sm:p-8">
                <p className="text-h4 font-semibold">{t('newsletter.title')}</p>
                <p className="text-small text-ink-muted mt-2">
                  <Ph>{t('newsletter.body')}</Ph>
                </p>
                <NewsletterForm location={`${location}_band`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
