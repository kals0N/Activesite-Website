import { getFormatter, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getLegal, type LegalDoc } from '@/lib/content';
import { pathFor } from '@/lib/routes';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Mdx } from '@/components/ui/mdx';
import { CtaBand } from './cta-band';

export async function LegalPage({
  locale,
  docKey,
  pathname,
}: {
  locale: Locale;
  docKey: LegalDoc['key'];
  pathname: '/privacy' | '/terms' | '/cookies';
}) {
  const doc = getLegal(locale, docKey);
  const t = await getTranslations();
  const format = await getFormatter();
  return (
    <>
      <section className="pt-24 pb-[clamp(64px,10vw,160px)] sm:pt-28 lg:pt-36">
        <div className="container-site">
          <Breadcrumbs
            items={[
              { name: t('breadcrumbs.home'), href: pathFor(locale, '/') },
              { name: doc.title, href: pathFor(locale, pathname) },
            ]}
          />
          <h1 className="font-display text-h1 mt-10">{doc.title}</h1>
          <p className="text-small text-ink-muted mt-4">
            <time dateTime={doc.updated}>
              {format.dateTime(new Date(doc.updated), { dateStyle: 'long' })}
            </time>
          </p>
          <div className="prose-site mt-12">
            <Mdx source={doc.body} />
          </div>
        </div>
      </section>
      <CtaBand location={`legal_${docKey}`} />
    </>
  );
}

export async function legalMetadata(locale: Locale, docKey: LegalDoc['key']) {
  const doc = getLegal(locale, docKey);
  return { title: `${doc.title} | Activesite`, description: doc.description };
}
