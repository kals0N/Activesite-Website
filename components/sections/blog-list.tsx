'use client';

import { useState } from 'react';
import { useTranslations } from '@/lib/i18n-client';
import { cn } from '@/lib/cn';
import { PostCard, type PostSummary } from '@/components/ui/post-card';

/** Category filter chips (no search). Without JS every post stays listed. */
export function BlogList({
  posts,
  categories,
}: {
  posts: PostSummary[];
  categories: { key: string; label: string }[];
}) {
  const t = useTranslations('blog');
  const [active, setActive] = useState<string>('all');
  const shown = active === 'all' ? posts : posts.filter((p) => p.category === active);
  const chips = [{ key: 'all', label: t('all') }, ...categories];

  return (
    <>
      <div
        role="group"
        aria-label={t('title')}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {chips.map((c) => (
          <button
            key={c.key}
            type="button"
            aria-pressed={active === c.key}
            onClick={() => setActive(c.key)}
            className={cn(
              'text-small inline-flex h-11 shrink-0 items-center rounded-full border px-5 font-medium transition-colors',
              active === c.key
                ? 'border-ink bg-ink text-white'
                : 'border-border bg-surface hover:border-ink/40',
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {shown.length}
      </p>
      {shown.length ? (
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.key}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      ) : (
        <button
          type="button"
          onClick={() => setActive('all')}
          className="text-body-lg text-primary mt-8 underline underline-offset-2"
        >
          {t('empty')}
        </button>
      )}
    </>
  );
}
