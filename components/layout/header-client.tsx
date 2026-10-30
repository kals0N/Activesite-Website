'use client';

import { useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import type { LocalizedPaths } from '@/lib/routes';
import { cn } from '@/lib/cn';
import { Logo } from '@/components/ui/logo';
import { buttonClasses } from '@/components/ui/button';
import { LangSwitch } from './lang-switch';

export type NavData = {
  home: string;
  links: { label: string; href: string }[];
  servicesHref: string;
  contactHref: string;
  groups: {
    key: string;
    label: string;
    line: string;
    items: { key: string; label: string; line: string; href: string }[];
  }[];
  alternates: LocalizedPaths[];
};

export function HeaderClient({ data, locale }: { data: NavData; locale: Locale }) {
  const t = useTranslations();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  // Hide on scroll down, reveal on scroll up. Blur background after 24px.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (Math.abs(y - last) > 6) {
          setHidden(y > last && y > 120);
          last = y;
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus when the route changes (state adjusted during render, dialog closed in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMegaOpen(false);
  }
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  // Escape and outside click close the mega menu.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        document.getElementById('mega-trigger')?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!megaRef.current?.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [megaOpen]);

  const hover = (open: boolean) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(open), open ? 80 : 160);
  };

  const isActive = (href: string) => pathname === href || (href !== data.home && pathname.startsWith(href + '/'));

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-(--duration-base) ease-(--ease-out)',
          hidden && !megaOpen ? '-translate-y-full' : 'translate-y-0',
          scrolled || megaOpen
            ? 'bg-canvas/80 shadow-[0_1px_0_var(--color-border)] backdrop-blur-xl backdrop-saturate-150'
            : 'bg-transparent',
        )}
      >
        <div className="container-site flex h-16 items-center gap-6 lg:h-20" ref={megaRef}>
          <NextLink href={data.home} className="-ml-1 shrink-0 rounded-md p-1" aria-label={t('a11y.logoHome')}>
            <Logo className="h-11 w-auto lg:h-12" />
          </NextLink>

          <nav aria-label={t('a11y.mainNav')} className="hidden flex-1 lg:block">
            <ul className="flex items-center gap-1">
              <li onPointerEnter={(e) => e.pointerType === 'mouse' && hover(true)} onPointerLeave={(e) => e.pointerType === 'mouse' && hover(false)}>
                <button
                  id="mega-trigger"
                  type="button"
                  aria-expanded={megaOpen}
                  aria-controls="mega-menu"
                  onClick={() => setMegaOpen((o) => !o)}
                  className={cn(
                    'inline-flex h-11 items-center gap-1 rounded-full px-4 text-[0.9375rem] font-medium transition-colors hover:bg-ink/5',
                    (megaOpen || isActive(data.servicesHref)) && 'bg-ink/5',
                  )}
                >
                  {t('nav.services')}
                  <ChevronDown
                    aria-hidden
                    size={16}
                    className={cn('transition-transform duration-(--duration-base)', megaOpen && 'rotate-180')}
                  />
                </button>
                <MegaMenu data={data} open={megaOpen} onNavigate={() => setMegaOpen(false)} />
              </li>
              {data.links.map((l) => (
                <li key={l.href}>
                  <NextLink
                    href={l.href}
                    aria-current={isActive(l.href) ? 'page' : undefined}
                    className={cn(
                      'inline-flex h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors hover:bg-ink/5',
                      isActive(l.href) && 'bg-ink/5',
                    )}
                  >
                    {l.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden lg:block">
              <LangSwitch locale={locale} alternates={data.alternates} />
            </div>
            <a
              href={data.contactHref}
              data-book=""
              data-track="cta_click"
              data-track-label="header"
              className={cn(buttonClasses('primary', 'sm'), 'px-4 lg:h-11 lg:px-5')}
            >
              <span>{t('cta.book')}</span>
              <ArrowRight aria-hidden size={16} className="hidden transition-transform group-hover/btn:translate-x-1 lg:block" />
            </a>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full hover:bg-ink/5 lg:hidden"
              aria-label={t('a11y.openMenu')}
              aria-haspopup="dialog"
              onClick={() => dialogRef.current?.showModal()}
            >
              <Menu aria-hidden size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileSheet ref={dialogRef} data={data} locale={locale} />
    </>
  );
}

function MegaMenu({ data, open, onNavigate }: { data: NavData; open: boolean; onNavigate: () => void }) {
  const t = useTranslations();
  return (
    <div
      id="mega-menu"
      className={cn(
        'absolute inset-x-0 top-full transition-[opacity,transform,visibility] duration-200 ease-(--ease-out)',
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
      )}
    >
      <div className="container-site pt-2">
        <div className="rounded-panel border border-border bg-surface p-3 shadow-float">
          <div className="grid grid-cols-3 gap-2">
            {data.groups.map((g) => (
              <div key={g.key} className="rounded-card p-5">
                <p className="text-h4 font-semibold">{g.label}</p>
                <p className="mt-1 text-small text-ink-muted">{g.line}</p>
                <ul className="mt-4 space-y-1">
                  {g.items.map((s) => (
                    <li key={s.key}>
                      <NextLink
                        href={s.href}
                        onClick={onNavigate}
                        className="group/item -mx-3 block rounded-xl px-3 py-2.5 transition-colors hover:bg-primary-tint"
                      >
                        <span className="block text-[0.9375rem] font-medium group-hover/item:text-primary">{s.label}</span>
                        <span className="mt-0.5 block text-small text-ink-muted">{s.line}</span>
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between gap-4 rounded-card bg-surface-warm px-5 py-4">
            <p className="text-small text-ink-muted">{t('nav.menuFoot')}</p>
            <NextLink href={data.servicesHref} onClick={onNavigate} className="link-draw text-small font-medium text-primary">
              {t('nav.allServices')}
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileSheet({
  ref,
  data,
  locale,
}: {
  ref: React.RefObject<HTMLDialogElement | null>;
  data: NavData;
  locale: Locale;
}) {
  const t = useTranslations();
  const close = () => ref.current?.close();
  return (
    <dialog
      ref={ref}
      aria-label={t('a11y.mainNav')}
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-md bg-canvas p-0 text-ink backdrop:bg-ink/40 backdrop:backdrop-blur-sm open:animate-none lg:hidden"
      onClick={(e) => e.target === ref.current && close()}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4">
          <NextLink href={data.home} onClick={close} aria-label={t('a11y.logoHome')} className="rounded-md p-1">
            <Logo className="h-11 w-auto" />
          </NextLink>
          <button
            type="button"
            onClick={close}
            aria-label={t('a11y.closeMenu')}
            className="inline-flex size-11 items-center justify-center rounded-full hover:bg-ink/5"
          >
            <X aria-hidden size={22} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 pb-6">
          <p className="pt-2 pb-2 text-small font-medium text-ink-muted">{t('nav.services')}</p>
          <ul className="divide-y divide-border border-y border-border">
            {data.groups.map((g) => (
              <li key={g.key}>
                <details className="group/acc">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between text-h4 font-semibold [&::-webkit-details-marker]:hidden">
                    {g.label}
                    <ChevronDown aria-hidden size={18} className="transition-transform group-open/acc:rotate-180" />
                  </summary>
                  <ul className="pb-4">
                    {g.items.map((s) => (
                      <li key={s.key}>
                        <NextLink href={s.href} onClick={close} className="block rounded-xl py-2.5 pr-2 text-body">
                          {s.label}
                        </NextLink>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
            <li>
              <NextLink href={data.servicesHref} onClick={close} className="flex min-h-14 items-center text-h4 font-semibold">
                {t('nav.allServices')}
              </NextLink>
            </li>
            {data.links.map((l) => (
              <li key={l.href}>
                <NextLink href={l.href} onClick={close} className="flex min-h-14 items-center text-h4 font-semibold">
                  {l.label}
                </NextLink>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <LangSwitch locale={locale} alternates={data.alternates} variant="inline" />
          </div>
        </nav>
        <div className="border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a
            href={data.contactHref}
            data-book=""
            data-track="cta_click"
            data-track-label="mobile_menu"
            onClick={close}
            className={cn(buttonClasses('primary', 'lg'), 'w-full')}
          >
            <span>{t('cta.bookLong')}</span>
            <ArrowRight aria-hidden size={18} />
          </a>
        </div>
      </div>
    </dialog>
  );
}
