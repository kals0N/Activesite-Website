import NextLink from 'next/link';
import { cn } from '@/lib/cn';

export type PostSummary = {
  key: string;
  href: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  dateLabel: string;
  readLabel: string;
  draft: boolean;
  draftLabel: string;
};

/** Blog card with a quiet typographic cover (no stock photos or illustrations). */
export function PostCard({
  post,
  featured = false,
  headingLevel = 'h3',
}: {
  post: PostSummary;
  featured?: boolean;
  headingLevel?: 'h2' | 'h3';
}) {
  const H = headingLevel;
  return (
    <NextLink
      href={post.href}
      className={cn(
        'group/post rounded-panel border-border bg-surface hover:shadow-lift flex h-full flex-col overflow-hidden border transition-[transform,box-shadow] duration-(--duration-base) ease-(--ease-out) hover:-translate-y-1',
        featured && 'lg:flex-row',
      )}
    >
      <div
        className={cn(
          'relative aspect-[16/9] overflow-hidden',
          'bg-surface-warm',
          featured && 'lg:aspect-auto lg:w-1/2',
        )}
      >
        <span className="font-display text-h3 text-ink/85 absolute bottom-5 left-6 transition-transform duration-(--duration-base) ease-(--ease-out) group-hover/post:-translate-y-1">
          {post.categoryLabel}
        </span>
        {post.draft && (
          <span className="bg-surface border-border text-small text-ink absolute top-4 right-4 inline-flex h-8 items-center rounded-full border px-3 font-medium">
            {post.draftLabel}
          </span>
        )}
      </div>
      <div
        className={cn('flex flex-1 flex-col p-6 sm:p-7', featured && 'lg:justify-center lg:p-10')}
      >
        <H
          className={cn(
            'group-hover/post:text-primary font-semibold tracking-[-0.02em]',
            featured ? 'text-h3' : 'text-h4',
          )}
        >
          {post.title}
        </H>
        <p className="text-ink-muted mt-3">{post.description}</p>
        <p className="text-small text-ink-muted mt-auto pt-6">
          {post.dateLabel} · {post.readLabel}
        </p>
      </div>
    </NextLink>
  );
}
