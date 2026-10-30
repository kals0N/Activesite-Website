import { getPathname } from '@/i18n/navigation';
import { locales, type AppPathname, type Locale } from '@/i18n/routing';
import { getCaseStudies, getPosts } from './content';
import { serviceKeys, serviceSlugIn } from './services';
import { site } from './site';

export type LocalizedPaths = Record<Locale, string>;

export const staticPathnames = [
  '/',
  '/about',
  '/services',
  '/work',
  '/blog',
  '/contact',
  '/thank-you',
  '/privacy',
  '/terms',
  '/cookies',
] as const satisfies readonly AppPathname[];

type Href = Parameters<typeof getPathname>[0]['href'];

/** Locale-specific href for each locale, e.g. for a service or post with translated slugs. */
export function localized(make: (locale: Locale) => Href): LocalizedPaths {
  return Object.fromEntries(
    locales.map((locale) => [locale, getPathname({ locale, href: make(locale) })]),
  ) as LocalizedPaths;
}

export const absolute = (p: string) => `${site.url}${p === '/' ? '' : p}`;

export function servicePaths(key: (typeof serviceKeys)[number]) {
  return localized((locale) => ({
    pathname: '/services/[slug]',
    params: { slug: serviceSlugIn(locale, key) },
  }));
}

/** Pair translated content by its shared `key` frontmatter. */
function pairByKey<T extends { key: string; slug: string }>(
  get: (l: Locale) => T[],
  pathname: '/work/[slug]' | '/blog/[slug]',
) {
  const keys = new Set(locales.flatMap((l) => get(l).map((i) => i.key)));
  return [...keys].map((key) =>
    localized((locale) => {
      const item = get(locale).find((i) => i.key === key);
      return item
        ? { pathname, params: { slug: item.slug } }
        : pathname === '/work/[slug]'
          ? '/work'
          : '/blog';
    }),
  );
}

export function caseStudyPaths(key: string) {
  return localized((locale) => {
    const c = getCaseStudies(locale).find((i) => i.key === key);
    return c ? { pathname: '/work/[slug]', params: { slug: c.slug } } : '/work';
  });
}

export function postPaths(key: string) {
  return localized((locale) => {
    const p = getPosts(locale).find((i) => i.key === key);
    return p ? { pathname: '/blog/[slug]', params: { slug: p.slug } } : '/blog';
  });
}

/** Every page in both languages: used by the sitemap, the language switcher and tests. */
export function allLocalizedPaths(): LocalizedPaths[] {
  return [
    ...staticPathnames.map((pathname) => localized(() => pathname)),
    ...serviceKeys.map(servicePaths),
    ...pairByKey(getCaseStudies, '/work/[slug]'),
    ...pairByKey(getPosts, '/blog/[slug]'),
  ];
}

/** Localized URL path for one locale, e.g. pathFor('fr', '/about') → '/fr/a-propos'. */
export function pathFor(locale: Locale, href: Href) {
  return getPathname({ locale, href });
}
