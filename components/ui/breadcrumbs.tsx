import NextLink from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ChevronRight } from 'lucide-react';
import { breadcrumbLd } from '@/lib/jsonld';
import { JsonLd } from './json-ld';

export type Crumb = { name: string; href: string };

/** Visible breadcrumb trail plus BreadcrumbList structured data. The last crumb is the current page. */
export async function Breadcrumbs({ items }: { items: Crumb[] }) {
  const t = await getTranslations('a11y');
  return (
    <>
      <nav aria-label={t('breadcrumb')}>
        <ol className="text-small text-ink-muted flex flex-wrap items-center gap-1.5">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.href} className="inline-flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <NextLink href={c.href} className="link-draw">
                      {c.name}
                    </NextLink>
                    <ChevronRight aria-hidden size={14} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(items.map((c) => ({ name: c.name, path: c.href })))} />
    </>
  );
}
