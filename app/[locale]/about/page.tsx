import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Gauge, Target, Zap } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { localized, pathFor } from '@/lib/routes';
import { personLd } from '@/lib/jsonld';
import { site } from '@/lib/site';
import { PageHero } from '@/components/sections/page-hero';
import { CtaBand } from '@/components/sections/cta-band';
import { JsonLd } from '@/components/ui/json-ld';
import { FacebookIcon, InstagramIcon, LinkedInIcon } from '@/components/ui/icons';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return buildMetadata({
    locale,
    paths: localized(() => '/about'),
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

const howIcons = [Target, Zap, Gauge];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const ta = await getTranslations('about');
  const how = ta.raw('how') as { title: string; body: string }[];
  const values = ta.raw('values') as { title: string; body: string }[];
  const markets = ta.raw('markets') as string[];
  const founderBody = ta.raw('founderBody') as string[];
  const social = [
    { label: 'LinkedIn', href: site.social.linkedin, Icon: LinkedInIcon },
    { label: 'Instagram', href: site.social.instagram, Icon: InstagramIcon },
    { label: 'Facebook', href: site.social.facebook, Icon: FacebookIcon },
  ];

  return (
    <>
      <PageHero
        title={ta('title')}
        sub={ta('mission')}
        location="about_hero"
        crumbs={[
          { name: t('breadcrumbs.home'), href: pathFor(locale, '/') },
          { name: t('nav.about'), href: pathFor(locale, '/about') },
        ]}
      />

      <section className="pb-[clamp(64px,10vw,160px)]">
        <div className="container-site grid-site gap-y-12">
          <p data-reveal className="text-h3 col-span-4 font-semibold md:col-span-8 lg:col-span-7">
            {ta('partner')}
          </p>
        </div>
      </section>

      <section aria-labelledby="how-title" className="section-y bg-surface-warm">
        <div className="container-site">
          <h2 id="how-title" data-reveal className="font-display text-h2">
            {ta('howTitle')}
          </h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {how.map((h, i) => {
              const Icon = howIcons[i];
              return (
                <li
                  key={h.title}
                  data-reveal
                  style={{ '--i': i } as React.CSSProperties}
                  className="rounded-panel bg-surface p-7 sm:p-8"
                >
                  <Icon aria-hidden size={24} />
                  <h3 className="text-h3 mt-6 font-semibold">{h.title}</h3>
                  <p className="text-body-lg text-ink-muted mt-3">{h.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Founder message */}
      <section aria-labelledby="founder-title" className="section-y relative overflow-hidden">
        <div className="container-site grid-site relative gap-y-12">
          <div className="col-span-4 md:col-span-3 lg:col-span-4">
            <div className="rounded-panel bg-surface-warm flex aspect-[4/5] max-w-xs flex-col justify-end p-8">
              <span
                aria-hidden
                className="font-display text-[5rem] leading-none tracking-[-0.04em]"
              >
                TK
              </span>
              <span className="text-ink-muted text-small mt-3">{ta('founderSign')}</span>
            </div>
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-7 lg:col-start-6">
            <h2 id="founder-title" className="font-display text-h2">
              {ta('founderTitle')}
            </h2>
            <div className="text-body-lg text-ink mt-8 max-w-[62ch] space-y-5">
              {founderBody.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className="font-display text-h4 mt-10">{ta('founderSign')}</p>
            <p className="text-small text-ink-muted">{ta('founderRole')}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="section-y">
        <div className="container-site grid-site gap-y-12">
          <h2
            id="values-title"
            data-reveal
            className="font-display text-h2 col-span-4 md:col-span-8 lg:col-span-4"
          >
            {ta('valuesTitle')}
          </h2>
          <ul className="col-span-4 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:col-span-8">
            {values.map((v, i) => (
              <li
                key={v.title}
                data-reveal
                style={{ '--i': i } as React.CSSProperties}
                className="border-ink border-t pt-6"
              >
                <h3 className="text-h4 font-semibold">{v.title}</h3>
                <p className="text-ink-muted mt-2">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="markets-title" className="pb-[clamp(64px,10vw,160px)]">
        <div className="container-site">
          <div
            data-reveal
            className="rounded-panel border-border bg-surface grid gap-10 border p-6 sm:p-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-6">
              <h2 id="markets-title" className="text-h3 font-semibold">
                {ta('marketsTitle')}
              </h2>
              <p className="text-body-lg text-ink-muted mt-4">{ta('marketsBody')}</p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <ul className="flex flex-wrap gap-2">
                {markets.map((m) => (
                  <li
                    key={m}
                    className="bg-surface-warm text-small inline-flex h-11 items-center rounded-full px-5 font-medium"
                  >
                    {m}
                  </li>
                ))}
              </ul>
              <h3 className="text-small text-ink-muted mt-8 font-medium">{ta('socialTitle')}</h3>
              <ul className="mt-3 flex gap-2">
                {social.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener"
                      aria-label={`${label} ${t('a11y.newTab')}`}
                      className="border-border hover:border-primary hover:text-primary inline-flex size-11 items-center justify-center rounded-full border transition-colors"
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand location="about_final" />
      <JsonLd data={personLd(locale)} />
    </>
  );
}
