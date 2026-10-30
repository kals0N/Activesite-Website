'use client';

import { useId, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Check, Loader2 } from 'lucide-react';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { buttonClasses } from '@/components/ui/button';

type Status = 'idle' | 'sending' | 'done' | 'error';

/** Brevo newsletter signup (double opt-in). Placed in the footer, blog and CTA bands. */
export function NewsletterForm({
  location,
  tone = 'light',
}: {
  location: string;
  tone?: 'light' | 'ink';
}) {
  const t = useTranslations('newsletter');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const id = useId();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          website: data.get('website'),
          locale,
          source: location,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('done');
      track('newsletter_signup', { location });
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const ink = tone === 'ink';

  if (status === 'done') {
    return (
      <p
        role="status"
        className={cn(
          'text-small mt-4 flex items-center gap-2',
          ink ? 'text-white' : 'text-success',
        )}
      >
        <Check aria-hidden size={18} className={ink ? 'text-accent' : ''} /> {t('success')}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4" noValidate={false}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          {t('label')}
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t('placeholder')}
          aria-describedby={`${id}-note`}
          className={cn(
            'text-body h-12 min-w-0 flex-1 rounded-full border px-5 transition-colors outline-none focus-visible:ring-2',
            ink
              ? 'border-border-ink placeholder:text-ink-soft/70 focus-visible:border-accent focus-visible:ring-accent/40 bg-white/5 text-white'
              : 'border-border bg-surface placeholder:text-ink-muted/70 focus-visible:border-primary focus-visible:ring-primary/25',
          )}
        />
        {/* Honeypot: hidden from people, tempting to bots */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className={buttonClasses(ink ? 'inverse' : 'primary', 'md')}
        >
          {status === 'sending' ? (
            <>
              <Loader2 aria-hidden size={18} className="animate-spin" /> {t('sending')}
            </>
          ) : (
            t('button')
          )}
        </button>
      </div>
      <p
        id={`${id}-note`}
        className={cn('text-small mt-2', ink ? 'text-ink-soft' : 'text-ink-muted')}
        role={status === 'error' ? 'alert' : undefined}
      >
        {status === 'error' ? t('error') : t('note')}
      </p>
    </form>
  );
}
