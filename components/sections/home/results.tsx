import { getLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getCaseStudies } from '@/lib/content';
import { caseStudyPaths, pathFor } from '@/lib/routes';
import { CaseStudyCard } from '@/components/ui/case-study-card';
import { Button } from '@/components/ui/button';

/** Results come before services. */
export async function Results() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const studies = getCaseStudies(locale).slice(0, 3);

  return (
    <section aria-labelledby="results-title" className="section-y bg-surface-warm">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div data-reveal className="max-w-2xl">
            <h2 id="results-title" className="font-display text-h2">
              {t('home.results.title')}
            </h2>
            <p className="text-body-lg text-ink-muted mt-5">{t('home.results.sub')}</p>
          </div>
          <Button
            href={pathFor(locale, '/work')}
            variant="secondary"
            size="md"
            className="shrink-0 max-md:hidden"
          >
            {t('cta.allWork')}
          </Button>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {studies.map((s, i) => (
            <CaseStudyCard
              key={s.key}
              study={s}
              href={caseStudyPaths(s.key)[locale]}
              readLabel={t('cta.readStory')}
              measuresLabel={t('work.results')}
              index={i}
            />
          ))}
        </div>
        <p className="text-small text-ink-muted mt-8">{t('home.results.placeholderNote')}</p>
      </div>
    </section>
  );
}
