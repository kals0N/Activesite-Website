import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { BookButton, WhatsAppButton } from '@/components/ui/cta-buttons';

/** Hero image lives at public/images/hero.jpg (AI-generated). The hero renders cleanly without it. */
const HERO_IMAGE = '/images/hero.jpg';
const hasHeroImage = fs.existsSync(path.join(process.cwd(), 'public', HERO_IMAGE));

export async function Hero() {
  const t = await getTranslations('home.hero');

  return (
    <section
      className="relative pt-32 pb-16 sm:pt-36 lg:pt-44 lg:pb-24"
      aria-labelledby="hero-title"
    >
      <div className="container-site flex flex-col items-center text-center">
        <p
          className="hero-follow border-border bg-surface text-small text-ink-muted inline-flex items-center gap-2 rounded-full border py-1.5 pr-4 pl-3 font-medium"
          style={{ '--d': 0 } as React.CSSProperties}
        >
          <span aria-hidden className="bg-success size-2 rounded-full" />
          {t('badge')}
        </p>
        <h1 id="hero-title" className="hero-title font-display text-display mt-7 max-w-5xl">
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
