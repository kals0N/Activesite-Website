import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { localized, pathFor } from '@/lib/routes';
import { whatsappUrl } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'thankYou' });
  return buildMetadata({
    locale,
    paths: localized(() => '/thank-you'),
    title: t('metaTitle'),
    description: t('body'),
    noindex: true,
  });
}

export default async function ThankYouPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const steps = t.raw('thankYou.steps') as string[];
  return (
    <section className="relative overflow-hidden pt-32 pb-[clamp(64px,10vw,160px)] lg:pt-44">
      <div className="container-site relative">
        <h1 className="hero-title font-display text-h1 max-w-3xl">{t('thankYou.title')}</h1>
        <p className="hero-follow text-body-lg text-ink-muted mt-6 max-w-xl">
          {t('thankYou.body')}
        </p>
        <div className="hero-follow mt-10 flex flex-col gap-3 sm:flex-row">
          <Button
            href={whatsappUrl(t('thankYou.waMessage'))}
            external
            variant="whatsapp"
            size="lg"
            fullOnMobile
            track="whatsapp_click"
            trackLabel="thank_you"
          >
            {t('cta.continueWhatsapp')}
          </Button>
          <Button href={pathFor(locale, '/blog')} variant="secondary" size="lg" fullOnMobile>
            {t('nav.blog')}
          </Button>
        </div>
        <div className="rounded-panel border-border bg-surface mt-16 max-w-xl border p-6 sm:p-8">
          <h2 className="text-h4 font-semibold">{t('thankYou.next')}</h2>
          <ol className="mt-5 space-y-4">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="bg-ink text-small inline-flex size-8 shrink-0 items-center justify-center rounded-full font-semibold text-white">
                  {i + 1}
                </span>
                <span className="pt-1">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
