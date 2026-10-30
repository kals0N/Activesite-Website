import { getLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getCaseStudies } from '@/lib/content';
import { caseStudyPaths, pathFor } from '@/lib/routes';
import { CaseStudyCard } from '@/components/ui/case-study-card';
import { Button } from '@/components/ui/button';

/** The page's one dark section: results come before services. */
export async function Results() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const studies = getCaseStudies(locale).slice(0, 3);

  return (
    <section aria-labelledby="results-title" className="on-ink section-y bg-ink text-white">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div data-reveal className="max-w-2xl">
            <h2 id="results-title" className="font-display text-h2">
              {t('home.results.title')}
            </h2>
            <p className="text-body-lg text-ink-soft mt-5">{t('home.results.sub')}</p>
          </div>
          <Button
            href={pathFor(locale, '/work')}
            variant="inverse"
            size="md"
            className="shrink-0 max-md:hidden"
          >
            {t('cta.allWork')}
          </Button>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {studies.map((s, i) => (
            <div
              key={s.key}
              className={i === 0 ? 'md:col-span-2 lg:col-span-7 lg:row-span-2' : 'lg:col-span-5'}
            >
              <CaseStudyCard
                study={s}
                href={caseStudyPaths(s.key)[locale]}
                readLabel={t('cta.readStory')}
                size={i === 0 ? 'lg' : 'md'}
                index={i}
              />
            </div>
          ))}
        </div>
        <p className="text-small text-ink-soft mt-8">{t('home.results.placeholderNote')}</p>
      </div>
    </section>
  );
}
