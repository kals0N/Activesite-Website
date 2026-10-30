import { getTranslations } from 'next-intl/server';
import { Stat } from '@/components/ui/stat';

export async function Stats() {
  const t = await getTranslations('home.stats');
  const items = t.raw('items') as { value: string; label: string }[];
  return (
    <section aria-labelledby="stats-title" className="section-y">
      <div className="container-site">
        <h2 id="stats-title" data-reveal className="font-display text-h2 max-w-2xl">
          {t('title')}
        </h2>
        <dl className="rounded-panel border-border bg-border mt-14 grid grid-cols-1 gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              style={{ '--i': i } as React.CSSProperties}
              className="bg-surface p-7 sm:p-8"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <Stat value={s.value} label={s.label} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
