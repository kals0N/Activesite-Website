import { routing, type AppPathname, type Locale } from './routing';

type Pathnames = typeof routing.pathnames;
type Href = AppPathname | { pathname: AppPathname; params?: Record<string, string>; hash?: string };

/**
 * Localized public path for an internal pathname, e.g.
 * getPathname({ locale: 'fr', href: '/about' }) → '/fr/a-propos'.
 * Implemented locally (instead of next-intl's createNavigation) so no next-intl client code ships.
 */
export function getPathname({ locale, href }: { locale: Locale; href: Href }) {
  const { pathname, params, hash } =
    typeof href === 'string' ? { pathname: href, params: undefined, hash: undefined } : href;
  const entry = (routing.pathnames as Pathnames)[pathname] as string | Record<Locale, string>;
  let path = typeof entry === 'string' ? entry : entry[locale];
  for (const [k, v] of Object.entries(params ?? {}))
    path = path.replace(`[${k}]`, encodeURIComponent(v));
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  const full = prefix + (path === '/' && prefix ? '' : path);
  return (full || '/') + (hash ? `#${hash}` : '');
}
