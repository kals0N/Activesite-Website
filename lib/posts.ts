import { getFormatter, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import type { BlogPost } from './content';
import { postPaths } from './routes';
import type { PostSummary } from '@/components/ui/post-card';

export async function toSummary(locale: Locale, p: BlogPost): Promise<PostSummary> {
  const t = await getTranslations({ locale, namespace: 'blog' });
  const format = await getFormatter({ locale });
  return {
    key: p.key,
    href: postPaths(p.key)[locale],
    title: p.title,
    description: p.description,
    category: p.category,
    categoryLabel: t(`categories.${p.category}`),
    dateLabel: format.dateTime(new Date(p.date), { dateStyle: 'long' }),
    readLabel: t('minRead', { minutes: p.readingMinutes }),
    draft: p.status === 'draft',
    draftLabel: t('draft'),
  };
}
