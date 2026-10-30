import { getTranslations } from 'next-intl/server';
import { Gauge, Handshake, Target, Timer } from 'lucide-react';
import { Ph } from '@/components/ui/ph';

const icons = [Target, Timer, Gauge, Handshake];

export async function Why() {
  const t = await getTranslations('home.why');
  const items = t.raw('items') as { title: string; body: string }[];
  return (
    <section aria-labelledby="why-title" className="section-y pt-0">
      <div className="container-site grid-site gap-y-12">
        <h2 id="why-title" data-reveal className="col-span-4 font-display text-h2 md:col-span-8 lg:col-span-5">
          {t('title')}
        </h2>
        <ul className="col-span-4 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:col-span-8 lg:col-span-7">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <li key={item.title} data-reveal style={{ '--i': i } as React.CSSProperties} className="border-t border-ink pt-6">
                <Icon aria-hidden size={22} className="text-ink" />
                <h3 className="mt-5 text-h4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-ink-muted">
                  <Ph>{item.body}</Ph>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
