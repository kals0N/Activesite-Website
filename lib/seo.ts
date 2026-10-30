import type { Metadata } from 'next';
import type { Locale } from '@/i18n/routing';
import { absolute, type LocalizedPaths } from './routes';
import { site } from './site';

const ogLocale: Record<Locale, string> = { en: 'en_US', fr: 'fr_FR' };

/** Metadata with canonical, hreflang (en, fr, x-default), Open Graph and Twitter cards. */
export function buildMetadata({
  locale,
  paths,
  title,
  description,
  noindex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
}: {
  locale: Locale;
  paths: LocalizedPaths;
  title: string;
  description: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const url = absolute(paths[locale]);
  const og = `${site.url}/og?title=${encodeURIComponent(title.replace(/\s*\|\s*Activesite$/, ''))}&locale=${locale}`;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { en: absolute(paths.en), fr: absolute(paths.fr), 'x-default': absolute(paths.en) },
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: ogLocale[locale],
      alternateLocale: ogLocale[locale === 'en' ? 'fr' : 'en'],
      images: [{ url: og, width: 1200, height: 630, alt: title }],
      ...(type === 'article' ? { publishedTime, modifiedTime, authors: [site.founder.name] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [og] },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
