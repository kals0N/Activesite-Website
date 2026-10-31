import { getTranslations } from 'next-intl/server';
import { Clock } from 'lucide-react';

/** Six steps in one compact grid: the whole journey is visible at a glance, no long scroll. */
export async function Process() {
  const t = await getTranslations('home.process');
  const steps = t.raw('steps') as { name: string; body: string }[];
  return (
    <section aria-labelledby="process-title" className="section-y bg-surface-warm">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div data-reveal className="max-w-2xl">
            <h2 id="process-title" className="font-display text-h2">
              {t('title')}
            </h2>
            <p className="text-body-lg text-ink-muted mt-5">{t('sub')}</p>
          </div>
          <p className="border-border bg-surface text-small inline-flex shrink-0 items-center gap-2 self-start rounded-full border px-4 py-2 md:self-auto">
            <Clock aria-hidden size={16} className="text-ink-muted" />
            {t('time')}
          </p>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.name}
              data-reveal
              style={{ '--i': i } as React.CSSProperties}
              className="rounded-card bg-surface flex flex-col p-6 sm:p-7"
            >
              <span className="text-small text-ink-muted tabular font-medium">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-h4 mt-6 font-semibold">{s.name}</h3>
              <p className="text-ink-muted mt-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
