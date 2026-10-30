import { getTranslations } from 'next-intl/server';
import { Ph } from '@/components/ui/ph';

export async function Testimonials() {
  const t = await getTranslations('home.testimonials');
  const items = t.raw('items') as { quote: string; name: string; role: string; result: string }[];
  return (
    <section aria-labelledby="testimonials-title" className="section-y bg-surface-warm">
      <div className="container-site">
        <h2 id="testimonials-title" data-reveal className="max-w-2xl font-display text-h2">
          {t('title')}
        </h2>
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={i} data-reveal style={{ '--i': i } as React.CSSProperties}>
              <figure className="flex h-full flex-col rounded-card border border-border bg-surface p-7">
                <p className="inline-flex self-start rounded-full bg-accent/25 px-3 py-1 text-small font-medium text-ink">
                  <Ph>{item.result}</Ph>
                </p>
                <blockquote className="mt-6 flex-1 font-display text-h3 leading-snug">
                  <p>
                    <Ph>{item.quote}</Ph>
                  </p>
                </blockquote>
                <figcaption className="mt-8 border-t border-border pt-5 text-small">
                  <span className="block font-semibold">
                    <Ph>{item.name}</Ph>
                  </span>
                  <span className="mt-0.5 block text-ink-muted">
                    <Ph>{item.role}</Ph>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
