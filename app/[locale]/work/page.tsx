import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getCaseStudies } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { caseStudyPaths, localized, pathFor } from '@/lib/routes';
import { PageHero } from '@/components/sections/page-hero';
import { CtaBand } from '@/components/sections/cta-band';
import { CaseStudyCard } from '@/components/ui/case-study-card';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'work' });
  return buildMetadata({
    locale,
    paths: localized(() => '/work'),
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const studies = getCaseStudies(locale);
  return (
    <>
      <PageHero
        title={t('work.title')}
        sub={t('work.sub')}
        location="work_hero"
        bookLabel={t('cta.resultsLike')}
        crumbs={[
          { name: t('breadcrumbs.home'), href: pathFor(locale, '/') },
          { name: t('nav.work'), href: pathFor(locale, '/work') },
        ]}
      />
      <section aria-label={t('nav.work')} className="pb-[clamp(64px,10vw,160px)]">
        <div className="container-site">
          <ul className="grid gap-5 md:grid-cols-3">
            {studies.map((s, i) => (
              <li key={s.key}>
                <CaseStudyCard
                  study={s}
                  href={caseStudyPaths(s.key)[locale]}
                  readLabel={t('cta.readStory')}
                  measuresLabel={t('work.results')}
                  index={i}
                />
              </li>
            ))}
          </ul>
          <p className="text-small text-ink-muted mt-8">{t('home.results.placeholderNote')}</p>
        </div>
      </section>
      <CtaBand
        location="work_final"
        title={t('work.ctaTitle')}
        body={t('work.ctaBody')}
        buttonLabel={t('cta.resultsLike')}
      />
    </>
  );
}
