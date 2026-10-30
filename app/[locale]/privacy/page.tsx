import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { localized } from '@/lib/routes';
import { LegalPage, legalMetadata } from '@/components/sections/legal-page';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = await legalMetadata(locale, 'privacy');
  return buildMetadata({ locale, paths: localized(() => '/privacy'), ...m });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage locale={locale} docKey="privacy" pathname="/privacy" />;
}
