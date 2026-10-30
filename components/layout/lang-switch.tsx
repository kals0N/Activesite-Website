'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTranslations } from '@/lib/i18n-client';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { locales, type Locale } from '@/i18n/routing';
import type { LocalizedPaths } from '@/lib/routes';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { useCleanPathname } from '@/lib/use-clean-pathname';

const names: Record<Locale, string> = { en: 'English', fr: 'Français' };

/** Find the same page in the other language; falls back to that language's home page. */
export function equivalentPath(pathname: string, target: Locale, alternates: LocalizedPaths[]) {
  const match = alternates.find((p) => locales.some((l) => p[l] === pathname));
  return match ? match[target] : target === 'en' ? '/' : '/fr';
}

export function rememberLocale(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LangSwitch({
  locale,
  alternates,
  variant = 'dropdown',
  tone = 'light',
}: {
  locale: Locale;
  alternates: LocalizedPaths[];
  variant?: 'dropdown' | 'inline';
  tone?: 'light' | 'ink';
}) {
  const t = useTranslations('a11y');
  const pathname = useCleanPathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (
        e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)
      )
        setOpen(false);
    };
    document.addEventListener('keydown', close);
    document.addEventListener('click', close);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('click', close);
    };
  }, [open]);

  const onSwitch = (to: Locale) => {
    rememberLocale(to);
    track('language_switch', { from: locale, to });
  };

  const options = locales.map((l) => ({
    locale: l,
    href: l === locale ? pathname : equivalentPath(pathname, l, alternates),
  }));

  if (variant === 'inline') {
    return (
      <div role="group" aria-label={t('language')} className="flex items-center gap-2">
        <Globe
          aria-hidden
          size={18}
          className={tone === 'ink' ? 'text-ink-soft' : 'text-ink-muted'}
        />
        {options.map((o) => (
          // Full navigation so the <html lang> and every server-rendered string update.
          <a
            key={o.locale}
            href={o.href}
            hrefLang={o.locale}
            lang={o.locale}
            aria-current={o.locale === locale ? 'true' : undefined}
            onClick={() => onSwitch(o.locale)}
            className={cn(
              'text-small inline-flex h-11 items-center rounded-full px-4 font-medium',
              o.locale === locale
                ? tone === 'ink'
                  ? 'text-ink bg-white'
                  : 'bg-ink text-white'
                : tone === 'ink'
                  ? 'border-border-ink border hover:border-white/60'
                  : 'border-border hover:border-ink/40 border',
            )}
          >
            {names[o.locale]}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${t('language')}: ${names[locale]}`}
        onClick={() => setOpen((o) => !o)}
        className="text-small hover:bg-ink/5 inline-flex h-11 items-center gap-1.5 rounded-full px-3 font-medium uppercase"
      >
        <Globe aria-hidden size={18} />
        {locale}
        <ChevronDown
          aria-hidden
          size={14}
          className={cn('transition-transform', open && 'rotate-180')}
        />
      </button>
      <ul
        id={id}
        className={cn(
          'rounded-card border-border bg-surface shadow-lift absolute right-0 mt-2 min-w-44 border p-1.5 transition-[opacity,transform,visibility] duration-200 ease-(--ease-out)',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
        )}
      >
        {options.map((o) => (
          <li key={o.locale}>
            <a
              href={o.href}
              hrefLang={o.locale}
              lang={o.locale}
              aria-current={o.locale === locale ? 'true' : undefined}
              onClick={() => onSwitch(o.locale)}
              className="text-small hover:bg-primary-tint flex h-11 items-center justify-between gap-4 rounded-xl px-3"
            >
              {names[o.locale]}
              {o.locale === locale && <Check aria-hidden size={16} className="text-primary" />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
