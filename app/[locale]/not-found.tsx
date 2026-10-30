import NextLink from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { pathFor } from '@/lib/routes';
import { BookButton } from '@/components/ui/cta-buttons';
import { Button } from '@/components/ui/button';
import { ArcField } from '@/components/sections/arc-art';

export default async function NotFound() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const links = [
    { label: t('nav.services'), href: pathFor(locale, '/services') },
    { label: t('nav.work'), href: pathFor(locale, '/work') },
    { label: t('nav.about'), href: pathFor(locale, '/about') },
    { label: t('nav.blog'), href: pathFor(locale, '/blog') },
    { label: t('nav.contact'), href: pathFor(locale, '/contact') },
  ];
  return (
    <section className="relative overflow-hidden pt-32 pb-24 lg:pt-44">
      <ArcField
        tone="light"
        className="pointer-events-none absolute -top-10 -right-40 w-[32rem] opacity-15"
      />
      <div className="container-site relative">
        <p
          className="font-display text-ink/10 text-[clamp(6rem,20vw,14rem)] leading-none"
          aria-hidden
        >
          404
        </p>
        <h1 className="font-display text-h1 -mt-6 max-w-3xl">{t('notFound.title')}</h1>
        <p className="text-body-lg text-ink-muted mt-6 max-w-xl">{t('notFound.body')}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <BookButton location="404" />
          <Button href={pathFor(locale, '/')} variant="secondary" size="lg" fullOnMobile>
            {t('cta.backHome')}
          </Button>
        </div>
        <nav aria-label={t('notFound.links')} className="mt-14">
          <h2 className="text-small text-ink-muted font-medium">{t('notFound.links')}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <NextLink
                  href={l.href}
                  className="border-border bg-surface text-small hover:border-ink/40 inline-flex h-11 items-center rounded-full border px-5 font-medium"
                >
                  {l.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
