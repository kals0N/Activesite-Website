import { getLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { pathFor } from '@/lib/routes';
import { Button } from '@/components/ui/button';
import { Mark } from '@/components/ui/icons';

export async function FounderNote() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  return (
    <section aria-label={t('about.founderTitle')} className="section-y">
      <div className="container-site">
        <figure data-reveal className="mx-auto max-w-4xl">
          <Mark size={40} />
          <blockquote className="font-display text-h2 mt-8">
            <p>“{t('home.founder.quote')}”</p>
          </blockquote>
          <figcaption className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <span className="block font-semibold">{t('home.founder.name')}</span>
              <span className="text-small text-ink-muted block">{t('home.founder.role')}</span>
            </span>
            <Button href={pathFor(locale, '/about')} variant="secondary" size="md">
              {t('cta.aboutFounder')}
            </Button>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
