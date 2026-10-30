import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { localized, pathFor } from '@/lib/routes';
import { PageHero } from '@/components/sections/page-hero';
import { ServicesBento } from '@/components/sections/services-bento';
import { CtaBand } from '@/components/sections/cta-band';
import { BookButton } from '@/components/ui/cta-buttons';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'servicesHub' });
  return buildMetadata({ locale, paths: localized(() => '/services'), title: t('metaTitle'), description: t('metaDescription') });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <PageHero
        title={t('servicesHub.title')}
        sub={t('servicesHub.sub')}
        location="services_hero"
        crumbs={[
          { name: t('breadcrumbs.home'), href: pathFor(locale, '/') },
          { name: t('nav.services'), href: pathFor(locale, '/services') },
        ]}
      />
      <section aria-label={t('nav.services')} className="pb-[clamp(64px,10vw,160px)]">
        <div className="container-site">
          <ServicesBento headingLevel="h2" />
          <div data-reveal className="mt-4 flex flex-col gap-6 rounded-panel bg-primary-tint p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-h3 font-semibold">{t('servicesHub.notSure')}</h2>
              <p className="mt-2 text-body-lg text-ink-muted">{t('servicesHub.notSureBody')}</p>
              <p className="mt-3 text-small text-ink-muted">{t('pricing')}</p>
            </div>
            <BookButton location="services_not_sure" label={t('cta.plan')} />
          </div>
        </div>
      </section>
      <CtaBand location="services_final" />
    </>
  );
}
