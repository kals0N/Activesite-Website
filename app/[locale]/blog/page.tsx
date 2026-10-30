import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { blogCategories, getPosts } from '@/lib/content';
import { toSummary } from '@/lib/posts';
import { buildMetadata } from '@/lib/seo';
import { localized, pathFor } from '@/lib/routes';
import { PageHero } from '@/components/sections/page-hero';
import { CtaBand } from '@/components/sections/cta-band';
import { BlogList } from '@/components/sections/blog-list';
import { PostCard } from '@/components/ui/post-card';
import { NewsletterForm } from '@/components/integrations/newsletter-form';
import { Ph } from '@/components/ui/ph';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return buildMetadata({
    locale,
    paths: localized(() => '/blog'),
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const posts = getPosts(locale);
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const summaries = await Promise.all(posts.map((p) => toSummary(locale, p)));
  const featuredSummary = summaries.find((s) => s.key === featured?.key);

  return (
    <>
      <PageHero
        title={t('blog.title')}
        sub={t('blog.sub')}
        location="blog_hero"
        crumbs={[
          { name: t('breadcrumbs.home'), href: pathFor(locale, '/') },
          { name: t('nav.blog'), href: pathFor(locale, '/blog') },
        ]}
      />
      <section aria-label={t('nav.blog')} className="pb-[clamp(64px,10vw,160px)]">
        <div className="container-site">
          {featuredSummary && (
            <div className="mb-16">
              <h2 className="text-small text-ink-muted mb-4 font-medium">{t('blog.featured')}</h2>
              <PostCard post={featuredSummary} featured headingLevel="h3" />
            </div>
          )}
          <BlogList
            posts={summaries}
            categories={blogCategories.map((c) => ({ key: c, label: t(`blog.categories.${c}`) }))}
          />

          <div className="rounded-panel bg-primary-tint mt-16 grid gap-6 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-h3 font-semibold">{t('newsletter.title')}</h2>
              <p className="text-ink-muted mt-2">
                <Ph>{t('newsletter.body')}</Ph>
              </p>
            </div>
            <NewsletterForm location="blog_index" />
          </div>
        </div>
      </section>
      <CtaBand location="blog_final" />
    </>
  );
}
