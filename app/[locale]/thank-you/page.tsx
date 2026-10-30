import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { localized, pathFor } from '@/lib/routes';
import { whatsappUrl } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { ArcField } from '@/components/sections/arc-art';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'thankYou' });
  return buildMetadata({ locale, paths: localized(() => '/thank-you'), title: t('metaTitle'), description: t('body'), noindex: true });
}

export default async function ThankYouPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const steps = t.raw('thankYou.steps') as string[];
  return (
    <section className="relative overflow-hidden pt-32 pb-[clamp(64px,10vw,160px)] lg:pt-44">
      <ArcField tone="light" className="pointer-events-none absolute -top-20 -right-40 w-[34rem] opacity-15 max-md:hidden" />
      <div className="container-site relative">
        <h1 className="hero-word max-w-3xl font-display text-h1" style={{ '--w': 0 } as React.CSSProperties}>
          {t('thankYou.title')}
        </h1>
        <p className="hero-follow mt-6 max-w-xl text-body-lg text-ink-muted">{t('thankYou.body')}</p>
        <div className="hero-follow mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappUrl(t('thankYou.waMessage'))} external variant="whatsapp" size="lg" fullOnMobile track="whatsapp_click" trackLabel="thank_you">
            {t('cta.continueWhatsapp')}
          </Button>
          <Button href={pathFor(locale, '/blog')} variant="secondary" size="lg" fullOnMobile>
            {t('nav.blog')}
          </Button>
        </div>
        <div className="mt-16 max-w-xl rounded-panel border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-h4 font-semibold">{t('thankYou.next')}</h2>
          <ol className="mt-5 space-y-4">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-small font-semibold text-white">{i + 1}</span>
                <span className="pt-1">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
