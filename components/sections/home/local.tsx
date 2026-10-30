import { getTranslations } from 'next-intl/server';
import { MapPin } from 'lucide-react';

/** Local SEO block: "Web design agency in Douala" / "Agence web à Douala". */
export async function LocalSeo() {
  const t = await getTranslations('home.local');
  return (
    <section aria-labelledby="local-title" className="pb-[clamp(64px,10vw,160px)]">
      <div className="container-site">
        <div data-reveal className="grid-site items-center gap-y-6 rounded-panel border border-border bg-surface p-6 sm:p-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-surface-warm text-ink">
              <MapPin aria-hidden size={22} />
            </span>
            <h2 id="local-title" className="mt-5 text-h3 font-semibold">
              {t('title')}
            </h2>
          </div>
          <p className="col-span-4 text-body-lg text-ink-muted md:col-span-8 lg:col-span-6 lg:col-start-7">{t('body')}</p>
        </div>
      </div>
    </section>
  );
}
