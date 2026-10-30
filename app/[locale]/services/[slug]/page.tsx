import type { Metadata } from 'next';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { locales, type Locale } from '@/i18n/routing';
import { getService, getServiceBySlug, getServices } from '@/lib/services';
import { getCaseStudyByKey } from '@/lib/content';
import { caseStudyPaths, pathFor, servicePaths } from '@/lib/routes';
import { buildMetadata } from '@/lib/seo';
import { serviceLd } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/page-hero';
import { CtaBand } from '@/components/sections/cta-band';
import { Faq } from '@/components/ui/faq';
import { JsonLd } from '@/components/ui/json-ld';
import { Ph } from '@/components/ui/ph';
import { CaseStudyCard } from '@/components/ui/case-study-card';
import { ServiceIcon } from '@/components/ui/service-icon';

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => getServices(locale).map((s) => ({ locale, slug: s.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = getServiceBySlug(locale, slug);
  if (!s) return {};
  return buildMetadata({ locale, paths: servicePaths(s.key), title: s.metaTitle, description: s.metaDescription });
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug(locale, slug);
  if (!service) notFound();
  const t = await getTranslations();
  const ts = await getTranslations('service');
  const steps = t.raw('home.process.steps') as { name: string; body: string }[];
  const study = getCaseStudyByKey(locale, service.caseStudy);
  const path = servicePaths(service.key)[locale];

  return (
    <>
      <PageHero
        title={service.outcome}
        sub={service.promise}
        location={`service_${service.key}`}
        topic={service.name}
        crumbs={[
          { name: t('breadcrumbs.home'), href: pathFor(locale, '/') },
          { name: t('nav.services'), href: pathFor(locale, '/services') },
          { name: service.name, href: path },
        ]}
      />

      {/* Who it is for → problems it solves */}
      <section aria-labelledby="who-title" className="pb-[clamp(64px,10vw,160px)]">
        <div className="container-site grid gap-4 lg:grid-cols-12">
          <div data-reveal className="rounded-panel border border-border bg-surface p-6 sm:p-10 lg:col-span-5">
            <h2 id="who-title" className="font-display text-h2">
              {ts('whoFor')}
            </h2>
            <ul className="mt-8 space-y-4">
              {service.whoFor.map((w) => (
                <li key={w} className="flex gap-3 text-body-lg">
                  <Check aria-hidden size={20} className="mt-1 shrink-0 text-success" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal style={{ '--i': 1 } as React.CSSProperties} className="rounded-panel bg-surface-warm p-6 sm:p-10 lg:col-span-7">
            <h2 className="font-display text-h2">{ts('problems')}</h2>
            <ul className="mt-8 divide-y divide-border">
              {service.problems.map((p) => (
                <li key={p} className="flex gap-4 py-4 text-body-lg first:pt-0 last:pb-0">
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-surface">
                    <X aria-hidden size={14} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section aria-labelledby="outcomes-title" className="pb-[clamp(64px,10vw,160px)]">
        <div className="container-site">
          <h2 id="outcomes-title" data-reveal className="font-display text-h2">
            {ts('outcomes')}
          </h2>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-panel border border-border bg-border md:grid-cols-3">
            {service.outcomes.map((o, i) => (
              <div key={o.label} data-reveal style={{ '--i': i } as React.CSSProperties} className="bg-surface p-7 sm:p-8">
                <dt className="text-body text-ink-muted">{o.label}</dt>
                <dd className={o.metric.includes('[[') ? 'mt-3 text-h4 font-semibold' : 'mt-3 text-stat font-semibold tabular'}>
                  <Ph>{o.metric}</Ph>
                </dd>
              </div>
            ))}
          </dl>
          {service.outcomes.some((o) => o.metric.includes('[[')) && (
            <p className="mt-4 text-small text-ink-muted">{ts('outcomesNote')}</p>
          )}
        </div>
      </section>

      {/* What is included + process */}
      <section aria-labelledby="included-title" className="section-y bg-surface-warm">
        <div className="container-site grid-site gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <h2 id="included-title" data-reveal className="font-display text-h2">
              {ts('included')}
            </h2>
            <ul className="mt-8 grid gap-3">
              {service.deliverables.map((d, i) => (
                <li key={d} data-reveal style={{ '--i': i } as React.CSSProperties} className="flex items-start gap-4 rounded-card bg-surface p-5">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                    <Check aria-hidden size={16} />
                  </span>
                  <span className="pt-1 text-body-lg">{d}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-small text-ink-muted">{t('pricing')}</p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
            <h2 data-reveal className="font-display text-h2">
              {ts('process')}
            </h2>
            <p data-reveal className="mt-5 text-body-lg text-ink-muted">
              {service.processNote}
            </p>
            <ol className="mt-8 space-y-5 border-l border-border pl-6">
              {steps.map((s, i) => (
                <li key={s.name} data-reveal style={{ '--i': i } as React.CSSProperties} className="relative">
                  <span aria-hidden className="absolute top-2 -left-[29px] size-2.5 rounded-full border-2 border-surface-warm bg-ink" />
                  <h3 className="text-h4 font-semibold">
                    <span className="mr-2 text-ink-muted tabular">{i + 1}.</span>
                    {s.name}
                  </h3>
                  <p className="mt-1 text-ink-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Related case study */}
      {study && (
        <section aria-labelledby="study-title" className="section-y">
          <div className="container-site grid-site items-center gap-y-10">
            <div className="col-span-4 md:col-span-8 lg:col-span-5">
              <h2 id="study-title" data-reveal className="font-display text-h2">
                {ts('caseStudy')}
              </h2>
              <p data-reveal className="mt-5 text-body-lg text-ink-muted">
                <Ph>{study.summary}</Ph>
              </p>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
              <CaseStudyCard study={study} href={caseStudyPaths(study.key)[locale]} readLabel={t('cta.readStory')} tone="light" />
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="pb-[clamp(64px,10vw,160px)]">
        <div className="container-site grid-site gap-y-10">
          <h2 id="faq-title" data-reveal className="col-span-4 font-display text-h2 md:col-span-8 lg:col-span-4">
            {ts('faq', { service: service.name })}
          </h2>
          <div className="col-span-4 md:col-span-8">
            <Faq items={service.faqs} />
          </div>
        </div>
      </section>

      <CtaBand
        location={`service_${service.key}_final`}
        topic={service.name}
        title={ts('ctaTitle', { service: service.name })}
        body={ts('ctaBody')}
        buttonLabel={t('cta.plan')}
      />

      {/* Related services */}
      <section aria-labelledby="related-title" className="section-y">
        <div className="container-site">
          <h2 id="related-title" className="font-display text-h2">
            {ts('related')}
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {service.related.map((key) => {
              const r = getService(locale, key);
              return (
                <li key={key}>
                  <NextLink
                    href={servicePaths(key)[locale]}
                    className="group/rel flex h-full flex-col rounded-card border border-border bg-surface p-6 transition-[transform,box-shadow] duration-(--duration-base) ease-(--ease-out) hover:-translate-y-1 hover:shadow-lift"
                  >
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary-tint text-primary">
                      <ServiceIcon name={r.icon} size={18} />
                    </span>
                    <span className="mt-5 text-small font-medium text-ink-muted">{r.name}</span>
                    <span className="mt-1 text-h4 font-semibold">{r.outcome}</span>
                    <ArrowUpRight aria-hidden size={18} className="mt-auto self-end pt-4 text-ink-muted group-hover/rel:text-primary" />
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <JsonLd data={serviceLd({ name: service.name, description: service.metaDescription, path, locale })} />
    </>
  );
}
