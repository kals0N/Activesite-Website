'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from '@/lib/i18n-client';
import { X } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { rememberLocale } from './lang-switch';

/**
 * Suggests the other language when the browser prefers it and the visitor has not chosen yet.
 * A suggestion, never a redirect, so search engine crawlers always see the requested page.
 */
export function LangSuggest() {
  const t = useTranslations('langSuggest');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [target, setTarget] = useState<{ locale: Locale; href: string } | null>(null);

  useEffect(() => {
    if (document.cookie.includes('NEXT_LOCALE=')) return;
    const prefersFr = (navigator.languages?.[0] ?? navigator.language ?? '')
      .toLowerCase()
      .startsWith('fr');
    const other: Locale | null =
      locale === 'en' && prefersFr ? 'fr' : locale === 'fr' && !prefersFr ? 'en' : null;
    if (!other) return;
    // The alternate link rendered in <head> gives the equivalent page without extra data.
    const alt = document.querySelector<HTMLLinkElement>(
      `link[rel="alternate"][hreflang="${other}"]`,
    );
    const href = alt ? new URL(alt.href).pathname : other === 'fr' ? '/fr' : '/';
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only signals (cookie, navigator, <head>)
    setTarget({ locale: other, href });
  }, [locale, pathname]);

  if (!target) return null;
  const dismiss = () => {
    rememberLocale(locale);
    setTarget(null);
  };

  return (
    <div
      role="region"
      aria-label={t('text')}
      className="border-border bg-surface text-small shadow-lift fixed inset-x-4 top-20 z-40 mx-auto flex max-w-md items-center gap-3 rounded-full border py-1.5 pr-1.5 pl-5 lg:top-24"
    >
      <p className="flex-1">{t('text')}</p>
      <a
        href={target.href}
        hrefLang={target.locale}
        lang={target.locale}
        onClick={() => rememberLocale(target.locale)}
        className="bg-ink inline-flex h-10 items-center rounded-full px-4 font-medium text-white"
      >
        {t('switch')}
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t('dismiss')}
        className="hover:bg-ink/5 inline-flex size-10 items-center justify-center rounded-full"
      >
        <X aria-hidden size={16} />
      </button>
    </div>
  );
}
