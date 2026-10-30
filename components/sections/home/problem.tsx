import { getTranslations } from 'next-intl/server';
import { EyeOff, MousePointerClick, Hourglass } from 'lucide-react';

const icons = [EyeOff, MousePointerClick, Hourglass];

/** PAS: names the problem, agitates the cost, then states our answer. */
export async function Problem() {
  const t = await getTranslations('home.problem');
  const items = t.raw('items') as { title: string; body: string }[];
  return (
    <section aria-labelledby="problem-title" className="section-y">
      <div className="container-site grid-site gap-y-12">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <h2 id="problem-title" data-reveal className="font-display text-h2 lg:sticky lg:top-32">
            {t('title')}
          </h2>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
          <ul className="space-y-4">
            {items.map((item, i) => {
              const Icon = icons[i];
              return (
                <li
                  key={item.title}
                  data-reveal
                  style={{ '--i': i } as React.CSSProperties}
                  className="rounded-card border-border bg-surface flex gap-5 border p-6 sm:p-8"
                >
                  <span className="bg-surface-warm text-ink inline-flex size-11 shrink-0 items-center justify-center rounded-full">
                    <Icon aria-hidden size={20} />
                  </span>
                  <div>
                    <h3 className="text-h4 font-semibold">{item.title}</h3>
                    <p className="text-ink-muted mt-2">{item.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p data-reveal className="border-primary text-h3 mt-10 border-l-2 pl-6 font-semibold">
            {t('solution')}
          </p>
        </div>
      </div>
    </section>
  );
}
