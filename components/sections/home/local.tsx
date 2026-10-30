import { getTranslations } from 'next-intl/server';
import { MapPin } from 'lucide-react';

/** Local SEO block: "Web design agency in Douala" / "Agence web à Douala". */
export async function LocalSeo() {
  const t = await getTranslations('home.local');
  return (
    <section aria-labelledby="local-title" className="pb-[clamp(64px,10vw,160px)]">
      <div className="container-site">
        <div
          data-reveal
          className="grid-site rounded-panel border-border bg-surface items-center gap-y-6 border p-6 sm:p-10"
        >
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <span className="bg-surface-warm text-ink inline-flex size-12 items-center justify-center rounded-full">
              <MapPin aria-hidden size={22} />
            </span>
            <h2 id="local-title" className="text-h3 mt-5 font-semibold">
              {t('title')}
            </h2>
          </div>
          <p className="text-body-lg text-ink-muted col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            {t('body')}
          </p>
        </div>
      </div>
    </section>
  );
}
