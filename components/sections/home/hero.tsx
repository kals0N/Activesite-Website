import { getTranslations } from 'next-intl/server';
import { BookButton, WhatsAppButton } from '@/components/ui/cta-buttons';
import { Ph } from '@/components/ui/ph';
import { HeroVisual } from './hero-visual';

export async function Hero() {
  const t = await getTranslations('home.hero');
  const words = t('titleStart').split(' ');

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-44 lg:pb-28" aria-labelledby="hero-title">
      <div className="container-site relative">
        <div className="grid-site items-end gap-y-10">
          <div className="relative z-10 col-span-4 md:col-span-8 lg:col-span-9">
            <h1 id="hero-title" className="font-display text-display">
              {words.map((w, i) => (
                <span key={i} className="hero-word" style={{ '--w': i } as React.CSSProperties}>
                  {w}&nbsp;
                </span>
              ))}
              <em className="hero-word font-display italic" style={{ '--w': words.length } as React.CSSProperties}>
                {t('titleEmphasis')}
              </em>
            </h1>
            <p className="hero-follow mt-7 max-w-[38ch] text-body-lg text-ink-muted lg:mt-9" style={{ '--d': 0 } as React.CSSProperties}>
              {t('sub')}
            </p>
            <div className="hero-follow mt-8 flex flex-col gap-3 sm:flex-row lg:mt-10" style={{ '--d': 1 } as React.CSSProperties}>
              <BookButton location="hero" />
              <WhatsAppButton location="hero" />
            </div>
            <p className="hero-follow mt-6 text-small text-ink-muted" style={{ '--d': 2 } as React.CSSProperties}>
              <Ph>{t('trust')}</Ph>
            </p>
          </div>
        </div>
      </div>
      <HeroVisual />
    </section>
  );
}
