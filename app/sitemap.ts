import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/content';
import { absolute, allLocalizedPaths } from '@/lib/routes';

const EXCLUDE = ['/thank-you', '/fr/merci'];

/** Every indexable page in both languages, with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const drafts = new Set(
    (['en', 'fr'] as const).flatMap((l) =>
      getPosts(l)
        .filter((p) => p.status === 'draft')
        .map((p) => p.slug),
    ),
  );
  return allLocalizedPaths()
    .filter((p) => !EXCLUDE.includes(p.en))
    .flatMap((p) =>
      (['en', 'fr'] as const)
        .filter((l) => !drafts.has(p[l].split('/').pop() ?? ''))
        .map((l) => ({
          url: absolute(p[l]),
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: p.en === '/' ? 1 : p.en.split('/').length > 2 ? 0.7 : 0.8,
          alternates: {
            languages: { en: absolute(p.en), fr: absolute(p.fr), 'x-default': absolute(p.en) },
          },
        })),
    );
}
