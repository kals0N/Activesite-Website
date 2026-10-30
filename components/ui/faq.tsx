import { Plus } from 'lucide-react';
import { Ph } from './ph';
import { JsonLd } from './json-ld';
import { faqLd } from '@/lib/jsonld';

/**
 * Accessible FAQ built on <details>/<summary>: keyboard and screen-reader friendly with no JS.
 * Height animates where the browser supports ::details-content (progressive enhancement).
 */
export function Faq({ items, schema = true }: { items: { q: string; a: string }[]; schema?: boolean }) {
  return (
    <>
      <div className="divide-y divide-border border-y border-border">
        {items.map((item) => (
          <details key={item.q} className="faq group/faq">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-h4 font-semibold [&::-webkit-details-marker]:hidden">
              <h3 className="text-[inherit] font-[inherit]">{item.q}</h3>
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border transition-[transform,background-color] duration-(--duration-base) ease-(--ease-in-out) group-open/faq:rotate-45 group-open/faq:bg-primary-tint">
                <Plus aria-hidden size={18} />
              </span>
            </summary>
            <div className="measure pb-6 text-body-lg text-ink-muted">
              <Ph>{item.a}</Ph>
            </div>
          </details>
        ))}
      </div>
      {schema && <JsonLd data={faqLd(items)} />}
    </>
  );
}
