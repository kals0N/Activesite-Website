import type { Redirect } from 'next/dist/lib/load-custom-routes';

/**
 * 301 redirect map. Add an entry whenever a URL changes so links and rankings are kept.
 * `permanent: true` sends a 308, which search engines treat like a 301.
 */
export const redirects: Redirect[] = [
  { source: '/home', destination: '/', permanent: true },
  { source: '/portfolio', destination: '/work', permanent: true },
  { source: '/fr/portfolio', destination: '/fr/realisations', permanent: true },
  { source: '/fr/about', destination: '/fr/a-propos', permanent: true },
  { source: '/fr/work', destination: '/fr/realisations', permanent: true },
];
