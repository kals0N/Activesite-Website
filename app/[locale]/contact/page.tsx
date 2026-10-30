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
import { ClientMessages } from '@/components/ui/client-messages';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return buildMetadata({
    locale,
    paths: localized(() => '/contact'),
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
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

      <section
        id="book"
        aria-labelledby="book-title"
        className="scroll-mt-24 pb-[clamp(64px,10vw,160px)]"
      >
        <div className="container-site grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 id="book-title" className="text-h3 font-semibold">
              {tc('bookTitle')}
            </h2>
            <p className="text-ink-muted mt-2">{tc('bookNote')}</p>
            <div className="mt-6">
              <CalInline
                calLink={site.calLink}
                loadingLabel={tc('bookLoading')}
                fallback={
                  <div className="rounded-panel border-border bg-surface border border-dashed p-8">
                    <p className="text-body-lg">{tc('bookFallback')}</p>
                    <p className="text-small text-ink-muted mt-2">
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
              className="group/c rounded-panel border-border bg-surface hover:shadow-lift border p-6 transition-shadow"
            >
              <span className="bg-whatsapp inline-flex size-11 items-center justify-center rounded-full text-white">
                <WhatsAppIcon size={20} />
              </span>
              <h2 className="text-h4 mt-5 font-semibold">{tc('whatsappTitle')}</h2>
              <p className="text-ink-muted mt-1">{tc('whatsappBody')}</p>
              <p className="text-primary mt-3 font-medium group-hover/c:underline">
                {site.whatsapp.display}
              </p>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="group/c rounded-panel border-border bg-surface hover:shadow-lift border p-6 transition-shadow"
            >
              <span className="bg-ink inline-flex size-11 items-center justify-center rounded-full text-white">
                <Mail aria-hidden size={20} />
              </span>
              <h2 className="text-h4 mt-5 font-semibold">{tc('emailTitle')}</h2>
              <p className="text-ink-muted mt-1">{tc('emailBody')}</p>
              <p className="text-primary mt-3 font-medium group-hover/c:underline">{site.email}</p>
            </a>
            <a
              href={site.location.mapsUrl}
              target="_blank"
              rel="noopener"
              className="group/c rounded-panel border-border bg-surface hover:shadow-lift overflow-hidden border transition-shadow"
            >
              <Image
                src="/images/douala-map.svg"
                alt=""
                width={640}
                height={400}
                className="h-40 w-full object-cover"
              />
              <div className="p-6">
                <h2 className="text-h4 font-semibold">{tc('locationTitle')}</h2>
                <p className="text-ink-muted mt-1">{tc('locationBody')}</p>
                <p className="text-primary mt-3 font-medium group-hover/c:underline">
                  {tc('mapCta')} <span className="sr-only">{t('a11y.newTab')}</span>
                </p>
              </div>
            </a>
            <div className="rounded-panel bg-surface-warm p-6">
              <Clock aria-hidden size={20} />
              <h2 className="text-h4 mt-4 font-semibold">{tc('responseTitle')}</h2>
              <p className="text-ink-muted mt-1">
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
            <p className="text-body-lg text-ink-muted mt-4">
              <Ph>{tc('formSub')}</Ph>
            </p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <ClientMessages namespaces={['form', 'cta']}>
              <ContactForm
                services={getServices(locale).map((s) => ({ key: s.key, name: s.name }))}
                privacyHref={pathFor(locale, '/privacy')}
              />
            </ClientMessages>
          </div>
        </div>
      </section>

      <section aria-labelledby="cfaq-title" className="section-y">
        <div className="container-site grid-site gap-y-10">
          <h2
            id="cfaq-title"
            className="font-display text-h2 col-span-4 md:col-span-8 lg:col-span-4"
          >
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
