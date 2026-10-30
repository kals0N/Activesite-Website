import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Instrument_Serif, Inter } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFab } from '@/components/integrations/whatsapp-fab';
import { CookieConsent } from '@/components/integrations/cookie-consent';
import { Analytics } from '@/components/integrations/analytics';
import { CalLoader } from '@/components/integrations/cal-loader';
import { RevealObserver } from '@/components/ui/reveal-observer';
import { LangSuggest } from '@/components/layout/lang-suggest';
import { JsonLd } from '@/components/ui/json-ld';
import { organizationLd } from '@/lib/jsonld';
import { site } from '@/lib/site';

const serif = Instrument_Serif({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

const sans = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

/** Only these message namespaces are needed by client components. */
const CLIENT_NAMESPACES = [
  'a11y',
  'nav',
  'cta',
  'whatsapp',
  'langSuggest',
  'cookie',
  'newsletter',
  'form',
  'blog',
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#FAF8F4',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(site.url),
    title: { default: t('homeTitle'), template: '%s | Activesite' },
    description: t('siteDescription'),
    applicationName: site.name,
    authors: [{ name: site.founder.name }],
    creator: site.name,
    formatDetection: { telephone: false },
    verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
      : undefined,
    alternates: {
      types: { 'application/rss+xml': `/feed/${locale}.xml` },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const clientMessages = Object.fromEntries(
    CLIENT_NAMESPACES.filter((ns) => ns in messages).map((ns) => [ns, messages[ns]]),
  );
  const t = await getTranslations('meta');

  return (
    <html lang={locale} className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before paint, so reveal animations never hide content without JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale as Locale} messages={clientMessages}>
          <SkipLink />
          <Header locale={locale as Locale} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer locale={locale as Locale} />
          <WhatsAppFab />
          <LangSuggest />
          <CookieConsent />
          <Analytics />
          <CalLoader calLink={site.calLink} locale={locale as Locale} />
          <RevealObserver />
        </NextIntlClientProvider>
        <JsonLd data={organizationLd(locale as Locale, t('siteDescription'))} />
      </body>
    </html>
  );
}

async function SkipLink() {
  const t = await getTranslations('a11y');
  return (
    <a
      href="#main"
      className="focus:bg-ink sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:px-5 focus:py-3 focus:text-white"
    >
      {t('skip')}
    </a>
  );
}
