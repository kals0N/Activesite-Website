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

/** Blog card. Covers are drawn from the brand arcs (no stock photos), tinted per category. */
export function PostCard({ post, featured = false, headingLevel = 'h3' }: { post: PostSummary; featured?: boolean; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  const tint: Record<string, string> = {
    websites: 'bg-primary-tint',
    conversion: 'bg-surface-warm',
    'seo-ai': 'bg-[#E9F3EE]',
    branding: 'bg-[#F7EBD3]',
    growth: 'bg-[#ECEAF4]',
  };
  return (
    <NextLink
      href={post.href}
      className={cn(
        'group/post flex h-full flex-col overflow-hidden rounded-panel border border-border bg-surface transition-[transform,box-shadow] duration-(--duration-base) ease-(--ease-out) hover:-translate-y-1 hover:shadow-lift',
        featured && 'lg:flex-row',
      )}
    >
      <div className={cn('relative aspect-[16/9] overflow-hidden', tint[post.category], featured && 'lg:aspect-auto lg:w-1/2')}>
        <svg viewBox="0 0 40 40" aria-hidden className="absolute -right-[10%] -bottom-[30%] w-[70%] transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/post:scale-105">
          <path d="M13.7083 11.4395C7.86068 11.947 4.91168 17.804 4.17268 23.0572C3.51668 18.6599 4.76368 14.3587 7.33968 11.0565C9.50798 8.27668 12.6181 6.20539 16.3277 5.37959C24.816 3.48998 33.2289 8.83948 35.1184 17.3276C35.6178 19.5711 35.2171 22.2494 33.3633 23.3897C31.7596 24.3763 27.2189 24.4714 25.3941 19.9404C23.286 14.7055 19.127 10.9691 13.7083 11.4395Z" fill="var(--color-primary)" />
          <path d="M25.6074 29.5015C31.455 28.994 34.404 23.137 35.143 17.8838C35.799 22.2811 34.552 26.5823 31.976 29.8845C29.8077 32.6643 26.6976 34.7356 22.988 35.5614C14.4997 37.451 6.0868 32.1015 4.1973 23.6134C3.6979 21.3699 4.0986 18.6916 5.9524 17.5513C7.5561 16.5647 12.0968 16.4696 13.9216 21.0006C16.0297 26.2355 20.1887 29.9719 25.6074 29.5015Z" fill="var(--color-ink)" />
        </svg>
        <span className="absolute top-4 left-4 inline-flex h-8 items-center rounded-full bg-surface/90 px-3 text-small font-medium backdrop-blur-sm">
          {post.categoryLabel}
        </span>
        {post.draft && (
          <span className="absolute top-4 right-4 inline-flex h-8 items-center rounded-full bg-accent px-3 text-small font-medium text-ink">
            {post.draftLabel}
          </span>
        )}
      </div>
      <div className={cn('flex flex-1 flex-col p-6 sm:p-7', featured && 'lg:justify-center lg:p-10')}>
        <H className={cn('font-semibold tracking-[-0.03em] group-hover/post:text-primary', featured ? 'text-h3' : 'text-h4')}>{post.title}</H>
        <p className="mt-3 text-ink-muted">{post.description}</p>
        <p className="mt-auto pt-6 text-small text-ink-muted">
          {post.dateLabel} · {post.readLabel}
        </p>
      </div>
    </NextLink>
  );
}
