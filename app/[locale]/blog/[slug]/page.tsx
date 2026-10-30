import type { Metadata } from 'next';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import { locales, type Locale } from '@/i18n/routing';
import { getPost, getPosts } from '@/lib/content';
import { getService } from '@/lib/services';
import { toSummary } from '@/lib/posts';
import { buildMetadata } from '@/lib/seo';
import { blogPostingLd } from '@/lib/jsonld';
import { pathFor, postPaths, servicePaths } from '@/lib/routes';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { JsonLd } from '@/components/ui/json-ld';
import { Mdx } from '@/components/ui/mdx';
import { Mark } from '@/components/ui/icons';
import { PostCard } from '@/components/ui/post-card';
import { Ph } from '@/components/ui/ph';
import { BookButton } from '@/components/ui/cta-buttons';
import { NewsletterForm } from '@/components/integrations/newsletter-form';
import { CtaBand } from '@/components/sections/cta-band';

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => getPosts(locale).map((p) => ({ locale, slug: p.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getPost(locale, slug);
  if (!p) return {};
  return buildMetadata({
    locale,
    paths: postPaths(p.key),
    title: `${p.title} | Activesite`,
    description: p.description,
    type: 'article',
    publishedTime: p.date,
    modifiedTime: p.updated ?? p.date,
    // Drafts stay out of the index until status is set to "published".
    noindex: p.status === 'draft',
  });
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(locale, slug);
  if (!post) notFound();
  const t = await getTranslations();
  const tb = await getTranslations('blog');
  const format = await getFormatter();
  const path = postPaths(post.key)[locale];
  const service = getService(locale, post.relatedService);
  const related = await Promise.all(
    getPosts(locale)
      .filter((p) => p.key !== post.key)
      .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
      .slice(0, 2)
      .map((p) => toSummary(locale, p)),
  );

  return (
    <>
      <article>
        <header className="pt-24 sm:pt-28 lg:pt-36">
          <div className="container-site">
            <Breadcrumbs
              items={[
                { name: t('breadcrumbs.home'), href: pathFor(locale, '/') },
                { name: t('nav.blog'), href: pathFor(locale, '/blog') },
                { name: post.title, href: path },
              ]}
            />
            <div className="mt-10 max-w-4xl">
              <p className="text-small flex flex-wrap items-center gap-2">
                <span className="bg-surface-warm inline-flex h-8 items-center rounded-full px-3 font-medium">
                  {tb(`categories.${post.category}`)}
                </span>
                {post.status === 'draft' && (
                  <span className="bg-accent inline-flex h-8 items-center rounded-full px-3 font-medium">
                    {tb('draft')}
                  </span>
                )}
              </p>
              <h1 className="hero-title font-display text-h1 mt-6">{post.title}</h1>
              <p
                className="hero-follow text-body-lg text-ink-muted mt-6 max-w-2xl"
                style={{ '--d': 0 } as React.CSSProperties}
              >
                {post.description}
              </p>
              <div className="border-border text-small mt-8 flex items-center gap-3 border-t pt-6">
                <span className="bg-surface inline-flex size-11 items-center justify-center rounded-full">
                  <Mark size={24} />
                </span>
                <span>
                  <span className="block font-semibold">{tb('by', { author: post.author })}</span>
                  <span className="text-ink-muted block">
                    <time dateTime={post.date}>
                      {format.dateTime(new Date(post.date), { dateStyle: 'long' })}
                    </time>
                    {' · '}
                    {tb('minRead', { minutes: post.readingMinutes })}
                    {post.updated && (
                      <>
                        {' '}
                        ·{' '}
                        {tb('updated', {
                          date: format.dateTime(new Date(post.updated), { dateStyle: 'long' }),
                        })}
                      </>
                    )}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="container-site section-y">
          <div className="grid-site gap-y-10">
            {post.toc.length > 1 && (
              <nav
                aria-labelledby="toc-title"
                className="col-span-4 md:col-span-8 lg:col-span-3 lg:row-span-2"
              >
                <div className="rounded-card border-border bg-surface border p-5 lg:sticky lg:top-28">
                  <h2 id="toc-title" className="text-small font-semibold">
                    {tb('toc')}
                  </h2>
                  <ol className="text-small mt-3 space-y-2">
                    {post.toc
                      .filter((h) => h.depth === 2)
                      .map((h) => (
                        <li key={h.id}>
                          <a href={`#${h.id}`} className="text-ink-muted hover:text-primary">
                            {h.text}
                          </a>
                        </li>
                      ))}
                  </ol>
                </div>
              </nav>
            )}
            <div className="prose-site col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5">
              <Mdx source={post.body} />
            </div>

            <aside className="col-span-4 space-y-4 md:col-span-8 lg:col-span-8 lg:col-start-5">
              <div className="rounded-panel bg-primary-tint p-6 sm:p-8">
                <h2 className="text-h4 font-semibold">{t('newsletter.title')}</h2>
                <p className="text-ink-muted mt-2">
                  <Ph>{t('newsletter.body')}</Ph>
                </p>
                <NewsletterForm location="blog_post" />
              </div>
              <NextLink
                href={servicePaths(service.key)[locale]}
                className="group/rs rounded-panel border-border bg-surface hover:shadow-lift flex items-center justify-between gap-6 border p-6 transition-shadow sm:p-8"
              >
                <span>
                  <span className="text-small text-ink-muted block">{tb('relatedService')}</span>
                  <span className="text-h4 group-hover/rs:text-primary mt-1 block font-semibold">
                    {service.outcome}
                  </span>
                </span>
                <ArrowUpRight aria-hidden size={20} className="shrink-0" />
              </NextLink>
              <div className="rounded-panel border-border bg-surface flex flex-col gap-4 border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <p className="text-h4 font-semibold">{t('home.final.title')}</p>
                <BookButton location="blog_post_inline" size="md" />
              </div>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="pb-[clamp(64px,10vw,160px)]">
          <div className="container-site">
            <h2 id="related-title" className="font-display text-h2">
              {tb('related')}
            </h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {related.map((p) => (
                <li key={p.key}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand location="blog_post_final" newsletter />
      <JsonLd
        data={blogPostingLd({
          title: post.title,
          description: post.description,
          path,
          date: post.date,
          updated: post.updated,
          locale,
          keyword: post.keyword,
        })}
      />
    </>
  );
}
