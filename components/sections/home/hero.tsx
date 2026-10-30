import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getService, type ServiceKey } from '@/lib/services';
import { pathFor, servicePaths } from '@/lib/routes';
import { ProjectPlanner, type Need, type PlannerCopy } from './project-planner';
import { BookButton, WhatsAppButton } from '@/components/ui/cta-buttons';

/** Hero image lives at public/images/hero.jpg (AI-generated). The hero renders cleanly without it. */
const HERO_IMAGE = '/images/hero.jpg';
const hasHeroImage = fs.existsSync(path.join(process.cwd(), 'public', HERO_IMAGE));

/** What each planner choice recommends; the first key also pre-selects the contact form. */
const PLANS: Record<Need, ServiceKey[]> = {
  website: ['website-development', 'seo-aeo-geo', 'hosting-maintenance'],
  store: ['ecommerce-development', 'digital-marketing', 'hosting-maintenance'],
  app: ['saas-development', 'ui-ux-design', 'hosting-maintenance'],
  brand: ['brand-identity', 'graphic-design', 'portfolio-websites'],
  grow: ['sales-funnels', 'seo-aeo-geo', 'digital-marketing'],
};

export async function Hero() {
  const t = await getTranslations('home.hero');
  const tp = await getTranslations('home');
  const locale = (await getLocale()) as Locale;
  const plans = Object.fromEntries(
    Object.entries(PLANS).map(([need, keys]) => [
      need,
      {
        primary: keys[0],
        services: keys.map((k) => ({
          key: k,
          name: getService(locale, k).name,
          href: servicePaths(k)[locale],
        })),
      },
    ]),
  ) as Record<Need, { primary: string; services: { key: string; name: string; href: string }[] }>;

  return (
    <section
      className="relative pt-32 pb-16 sm:pt-36 lg:pt-44 lg:pb-24"
      aria-labelledby="hero-title"
    >
      <div className="container-site flex flex-col items-center text-center">
        <h1 id="hero-title" className="hero-title font-display text-display max-w-5xl">
          {t('titleStart')} {t('titleEmphasis')}
        </h1>
        <p
          className="hero-follow text-body-lg text-ink-muted mt-7 max-w-[44ch]"
          style={{ '--d': 0 } as React.CSSProperties}
        >
          {t('sub')}
        </p>
        <div
          className="hero-follow mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row"
          style={{ '--d': 1 } as React.CSSProperties}
        >
          <BookButton location="hero" />
          <WhatsAppButton location="hero" />
        </div>
        <p
          className="hero-follow text-small text-ink-muted mt-6 max-w-2xl"
          style={{ '--d': 2 } as React.CSSProperties}
        >
          {t('trust')}
        </p>

        <ProjectPlanner
          copy={tp.raw('planner') as PlannerCopy}
          plans={plans}
          contactHref={pathFor(locale, '/contact')}
        />

        {hasHeroImage && (
          <div
            className="hero-follow rounded-panel border-border shadow-lift mt-14 w-full max-w-6xl overflow-hidden border lg:mt-20"
            style={{ '--d': 3 } as React.CSSProperties}
          >
            <Image
              src={HERO_IMAGE}
              alt={t('imageAlt')}
              width={1920}
              height={1080}
              sizes="(min-width: 1280px) 1152px, 100vw"
              priority
              className="h-auto w-full"
            />
          </div>
        )}
      </div>
    </section>
  );
}
