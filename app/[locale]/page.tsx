import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { localized } from '@/lib/routes';
import { Hero } from '@/components/sections/home/hero';
import { LogoStrip } from '@/components/sections/home/logo-strip';
import { Problem } from '@/components/sections/home/problem';
import { Results } from '@/components/sections/home/results';
import { ServicesBento } from '@/components/sections/services-bento';
import { Process } from '@/components/sections/home/process';
import { Stats } from '@/components/sections/home/stats';
import { Why } from '@/components/sections/home/why';
import { Testimonials } from '@/components/sections/home/testimonials';
import { FounderNote } from '@/components/sections/home/founder-note';
import { LocalSeo } from '@/components/sections/home/local';
import { CtaBand } from '@/components/sections/cta-band';
import { Faq } from '@/components/ui/faq';
import { SectionHeading } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { pathFor } from '@/lib/routes';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    locale,
    paths: localized(() => '/'),
    title: t('homeTitle'),
    description: t('homeDescription'),
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <Hero />
      <LogoStrip />
      <Problem />
      <Results />
      <section aria-labelledby="services-title" className="section-y">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="services-title"
              title={t('home.services.title')}
              sub={t('home.services.sub')}
            />
            <Button
              href={pathFor(locale, '/services')}
              variant="secondary"
              size="md"
              className="shrink-0 self-start md:self-auto"
            >
              {t('nav.allServices')}
            </Button>
          </div>
          <div className="mt-14">
            <ServicesBento />
          </div>
        </div>
      </section>
      <Process />
      <Stats />
      <Why />
      <Testimonials />
      <FounderNote />
      <LocalSeo />
      <section aria-labelledby="faq-title" className="section-y pt-0">
        <div className="container-site grid-site gap-y-10">
          <h2
            id="faq-title"
            data-reveal
            className="font-display text-h2 col-span-4 md:col-span-8 lg:col-span-4"
          >
            {t('home.faq.title')}
          </h2>
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <Faq items={t.raw('home.faq.items') as { q: string; a: string }[]} />
          </div>
        </div>
      </section>
      <CtaBand location="home_final" tone="warm" />
    </>
  );
}
