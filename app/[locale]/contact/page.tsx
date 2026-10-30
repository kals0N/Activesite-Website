import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Clock, Mail } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { localized, pathFor } from '@/lib/routes';
import { getServices } from '@/lib/services';
import { site } from '@/lib/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { PageHero } from '@/components/sections/page-hero';
import { CtaBand } from '@/components/sections/cta-band';
import { CalInline } from '@/components/integrations/cal-inline';
import { ContactForm } from '@/components/integrations/contact-form';
import { WhatsAppButton } from '@/components/ui/cta-buttons';
import { Faq } from '@/components/ui/faq';
import { Ph } from '@/components/ui/ph';
import { WhatsAppIcon } from '@/components/ui/icons';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return buildMetadata({ locale, paths: localized(() => '/contact'), title: t('metaTitle'), description: t('metaDescription') });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const tc = await getTranslations('contact');

  return (
    <>
      <PageHero
        title={tc('title')}
        sub={tc('sub')}
        location="contact_hero"
        art={false}
        crumbs={[
          { name: t('breadcrumbs.home'), href: pathFor(locale, '/') },
          { name: t('nav.contact'), href: pathFor(locale, '/contact') },
        ]}
      />

      <section id="book" aria-labelledby="book-title" className="scroll-mt-24 pb-[clamp(64px,10vw,160px)]">
        <div className="container-site grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 id="book-title" className="text-h3 font-semibold">
              {tc('bookTitle')}
            </h2>
            <p className="mt-2 text-ink-muted">{tc('bookNote')}</p>
            <div className="mt-6">
              <CalInline
                calLink={site.calLink}
                loadingLabel={tc('bookLoading')}
                fallback={
                  <div className="rounded-panel border border-dashed border-border bg-surface p-8">
                    <p className="text-body-lg">{tc('bookFallback')}</p>
                    <p className="mt-2 text-small text-ink-muted">
                      <Ph>[[PLACEHOLDER: Cal.com username/event link]]</Ph>
                    </p>
                    <div className="mt-6">
                      <WhatsAppButton location="contact_book_fallback" variant="whatsapp" />
                    </div>
                  </div>
                }
              />
            </div>
          </div>

          <aside className="grid content-start gap-4 lg:col-span-4">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener"
              data-track="whatsapp_click"
              data-track-label="contact_card"
              className="group/c rounded-panel border border-border bg-surface p-6 transition-shadow hover:shadow-lift"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-whatsapp text-white">
                <WhatsAppIcon size={20} />
              </span>
              <h2 className="mt-5 text-h4 font-semibold">{tc('whatsappTitle')}</h2>
              <p className="mt-1 text-ink-muted">{tc('whatsappBody')}</p>
              <p className="mt-3 font-medium text-primary group-hover/c:underline">{site.whatsapp.display}</p>
            </a>
            <a href={`mailto:${site.email}`} className="group/c rounded-panel border border-border bg-surface p-6 transition-shadow hover:shadow-lift">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-ink text-white">
                <Mail aria-hidden size={20} />
              </span>
              <h2 className="mt-5 text-h4 font-semibold">{tc('emailTitle')}</h2>
              <p className="mt-1 text-ink-muted">{tc('emailBody')}</p>
              <p className="mt-3 font-medium text-primary group-hover/c:underline">{site.email}</p>
            </a>
            <a
              href={site.location.mapsUrl}
              target="_blank"
              rel="noopener"
              className="group/c overflow-hidden rounded-panel border border-border bg-surface transition-shadow hover:shadow-lift"
            >
              <Image src="/images/douala-map.svg" alt="" width={640} height={400} className="h-40 w-full object-cover" />
              <div className="p-6">
                <h2 className="text-h4 font-semibold">{tc('locationTitle')}</h2>
                <p className="mt-1 text-ink-muted">{tc('locationBody')}</p>
                <p className="mt-3 font-medium text-primary group-hover/c:underline">
                  {tc('mapCta')} <span className="sr-only">{t('a11y.newTab')}</span>
                </p>
              </div>
            </a>
            <div className="rounded-panel bg-surface-warm p-6">
              <Clock aria-hidden size={20} />
              <h2 className="mt-4 text-h4 font-semibold">{tc('responseTitle')}</h2>
              <p className="mt-1 text-ink-muted">
                <Ph>{tc('responseBody')}</Ph>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="form-title" className="section-y bg-surface-warm">
        <div className="container-site grid-site gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <h2 id="form-title" className="font-display text-h2">
              {tc('formTitle')}
            </h2>
            <p className="mt-4 text-body-lg text-ink-muted">
              <Ph>{tc('formSub')}</Ph>
            </p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <ContactForm
              services={getServices(locale).map((s) => ({ key: s.key, name: s.name }))}
              privacyHref={pathFor(locale, '/privacy')}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="cfaq-title" className="section-y">
        <div className="container-site grid-site gap-y-10">
          <h2 id="cfaq-title" className="col-span-4 font-display text-h2 md:col-span-8 lg:col-span-4">
            {tc('faqTitle')}
          </h2>
          <div className="col-span-4 md:col-span-8">
            <Faq items={tc.raw('faq') as { q: string; a: string }[]} />
          </div>
        </div>
      </section>

      <CtaBand location="contact_final" />
    </>
  );
}
