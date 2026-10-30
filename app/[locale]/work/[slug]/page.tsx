import type { Metadata } from 'next';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { getCaseStudies, getCaseStudy } from '@/lib/content';
import { getService } from '@/lib/services';
import { buildMetadata } from '@/lib/seo';
import { creativeWorkLd } from '@/lib/jsonld';
import { caseStudyPaths, pathFor, servicePaths } from '@/lib/routes';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { DeviceFrame } from '@/components/ui/device-frame';
import { JsonLd } from '@/components/ui/json-ld';
import { Mdx } from '@/components/ui/mdx';
import { Ph } from '@/components/ui/ph';
import { BookButton, WhatsAppButton } from '@/components/ui/cta-buttons';
import { CtaBand } from '@/components/sections/cta-band';
import { TrackView } from '@/components/integrations/track-view';

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => getCaseStudies(locale).map((c) => ({ locale, slug: c.slug })));
}
export const dynamicParams = false;

const strip = (s: string) => s.replace(/\[\[PLACEHOLDER:[^\]]*\]\]\s*/g, '').trim();

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = getCaseStudy(locale, slug);
  if (!c) return {};
  return buildMetadata({
    locale,
    paths: caseStudyPaths(c.key),
    title: `${c.title} | Activesite`,
    description: strip(c.summary).slice(0, 155),
    type: 'article',
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const study = getCaseStudy(locale, slug);
  if (!study) notFound();
  const t = await getTranslations();
  const tw = await getTranslations('work');
  const path = caseStudyPaths(study.key)[locale];

  const meta = [
    { label: tw('client'), value: study.client },
    { label: tw('industry'), value: study.industry },
    { label: tw('timeline'), value: study.timeline },
  ];

  return (
    <>
      <TrackView event="case_study_view" params={{ key: study.key }} />
      <section className="pt-24 sm:pt-28 lg:pt-36">
        <div className="container-site">
          <Breadcrumbs
            items={[
              { name: t('breadcrumbs.home'), href: pathFor(locale, '/') },
              { name: t('nav.work'), href: pathFor(locale, '/work') },
              { name: strip(study.title), href: path },
            ]}
          />
          <div className="mt-10 grid-site gap-y-10">
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <p
                className={`hero-word font-display ${study.metric.includes('[[') ? 'text-h1' : 'text-display'}`}
                style={{ '--w': 0 } as React.CSSProperties}
              >
                <Ph>{study.metric}</Ph>
              </p>
              <p className="hero-follow mt-4 text-body-lg text-ink-muted" style={{ '--d': 0 } as React.CSSProperties}>
                <Ph>{study.metricLabel}</Ph>
              </p>
              <h1 className="hero-follow mt-8 max-w-2xl text-h3 font-semibold" style={{ '--d': 1 } as React.CSSProperties}>
                {study.title}
              </h1>
              <div className="hero-follow mt-8 flex flex-col gap-3 sm:flex-row" style={{ '--d': 2 } as React.CSSProperties}>
                <BookButton location={`case_${study.key}_hero`} label={t('cta.resultsLike')} />
                <WhatsAppButton location={`case_${study.key}_hero`} />
              </div>
            </div>
            <dl className="col-span-4 grid content-start gap-5 self-end rounded-panel border border-border bg-surface p-6 md:col-span-8 md:grid-cols-2 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-small text-ink-muted">{m.label}</dt>
                  <dd className="mt-1 font-medium">
                    <Ph>{m.value}</Ph>
                  </dd>
                </div>
              ))}
              <div>
                <dt className="text-small text-ink-muted">{tw('services')}</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {study.services.map((k) => (
                    <NextLink key={k} href={servicePaths(k)[locale]} className="inline-flex h-9 items-center rounded-full border border-border px-3 text-small hover:border-primary hover:text-primary">
                      {getService(locale, k).name}
                    </NextLink>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-14 aspect-[4/3] overflow-hidden rounded-panel sm:aspect-[16/9]" style={{ viewTransitionName: `case-${study.key}` }}>
            <DeviceFrame tone={study.tone} label={study.client} />
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <article className="prose-site mx-auto lg:mx-0 lg:ml-[calc(100%/12*4)]">
            <Mdx source={study.body} />
          </article>
        </div>
      </section>

      <section aria-labelledby="visuals-title" className="pb-[clamp(64px,10vw,160px)]">
        <div className="container-site">
          <h2 id="visuals-title" className="font-display text-h2">
            {tw('visuals')}
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {(['navy', 'blue'] as const).map((tone, i) => (
              <div key={tone} data-reveal style={{ '--i': i } as React.CSSProperties} className="aspect-[4/3] overflow-hidden rounded-panel">
                <DeviceFrame tone={tone} label="[[PLACEHOLDER: project screenshot]]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="results-title" className="section-y bg-surface-warm">
        <div className="container-site">
          <h2 id="results-title" className="font-display text-h2">
            {tw('results')}
          </h2>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-panel border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {study.results.map((r, i) => (
              <div key={r.label} data-reveal style={{ '--i': i } as React.CSSProperties} className="bg-surface p-7">
                <dt className="text-body text-ink-muted">{r.label}</dt>
                <dd className={r.value.includes('[[') ? 'mt-3 text-h4 font-semibold' : 'mt-3 text-stat font-semibold tabular'}>
                  <Ph>{r.value}</Ph>
                </dd>
              </div>
            ))}
          </dl>
          <figure data-reveal className="mt-16 max-w-4xl">
            <figcaption className="text-small font-medium text-ink-muted">{tw('quote')}</figcaption>
            <blockquote className="mt-4 font-display text-h2">
              <p>
                “<Ph>{study.quote.text}</Ph>”
              </p>
            </blockquote>
            <p className="mt-6">
              <span className="block font-semibold">
                <Ph>{study.quote.name}</Ph>
              </span>
              <span className="block text-small text-ink-muted">
                <Ph>{study.quote.role}</Ph>
              </span>
            </p>
          </figure>
        </div>
      </section>

      <CtaBand location={`case_${study.key}_final`} title={tw('ctaTitle')} body={tw('ctaBody')} buttonLabel={t('cta.resultsLike')} />
      <JsonLd data={creativeWorkLd({ title: study.title, description: strip(study.summary), path, locale })} />
    </>
  );
}
