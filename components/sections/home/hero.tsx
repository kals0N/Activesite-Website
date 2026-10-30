import { getTranslations } from 'next-intl/server';
import { BookButton, WhatsAppButton } from '@/components/ui/cta-buttons';
import { Ph } from '@/components/ui/ph';

export async function Hero() {
  const t = await getTranslations('home.hero');

  return (
    <section
      className="relative overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-48 lg:pb-32"
      aria-labelledby="hero-title"
    >
      <div className="container-site relative">
        <div className="grid-site items-end gap-y-10">
          <div className="relative z-10 col-span-4 md:col-span-8 lg:col-span-10 xl:col-span-9">
            <h1 id="hero-title" className="hero-title font-display text-display">
              {t('titleStart')} {t('titleEmphasis')}
            </h1>
            <p
              className="hero-follow text-body-lg text-ink-muted mt-7 max-w-[38ch] lg:mt-9"
              style={{ '--d': 0 } as React.CSSProperties}
            >
              {t('sub')}
            </p>
            <div
              className="hero-follow mt-8 flex flex-col gap-3 sm:flex-row lg:mt-10"
              style={{ '--d': 1 } as React.CSSProperties}
            >
              <BookButton location="hero" />
              <WhatsAppButton location="hero" />
            </div>
            <p
              className="hero-follow text-small text-ink-muted mt-6"
              style={{ '--d': 2 } as React.CSSProperties}
            >
              <Ph>{t('trust')}</Ph>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
