import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // We never auto-redirect (crawler-safe). A client banner suggests French instead.
  localeDetection: false,
  localeCookie: { name: 'NEXT_LOCALE', maxAge: 60 * 60 * 24 * 365 },
  pathnames: {
    '/': '/',
    '/about': { en: '/about', fr: '/a-propos' },
    '/services': '/services',
    '/services/[slug]': '/services/[slug]',
    '/work': { en: '/work', fr: '/realisations' },
    '/work/[slug]': { en: '/work/[slug]', fr: '/realisations/[slug]' },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/contact': '/contact',
    '/thank-you': { en: '/thank-you', fr: '/merci' },
    '/privacy': { en: '/privacy', fr: '/confidentialite' },
    '/terms': { en: '/terms', fr: '/conditions' },
    '/cookies': '/cookies',
    '/styleguide': '/styleguide',
  },
});

export type AppPathname = keyof typeof routing.pathnames;
