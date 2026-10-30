import { getTranslations } from 'next-intl/server';
import { Ph } from '@/components/ui/ph';

export async function Testimonials() {
  const t = await getTranslations('home.testimonials');
  const items = t.raw('items') as { quote: string; name: string; role: string; result: string }[];
  return (
    <section aria-labelledby="testimonials-title" className="section-y bg-surface-warm">
      <div className="container-site">
        <h2 id="testimonials-title" data-reveal className="font-display text-h2 max-w-2xl">
          {t('title')}
        </h2>
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={i} data-reveal style={{ '--i': i } as React.CSSProperties}>
              <figure className="rounded-card border-border bg-surface flex h-full flex-col border p-7">
                <p className="bg-accent/25 text-small text-ink inline-flex self-start rounded-full px-3 py-1 font-medium">
                  <Ph>{item.result}</Ph>
                </p>
                <blockquote className="font-display text-h3 mt-6 flex-1 leading-snug">
                  <p>
                    <Ph>{item.quote}</Ph>
                  </p>
                </blockquote>
                <figcaption className="border-border text-small mt-8 border-t pt-5">
                  <span className="block font-semibold">
                    <Ph>{item.name}</Ph>
                  </span>
                  <span className="text-ink-muted mt-0.5 block">
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
