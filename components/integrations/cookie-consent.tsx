'use client';

import { useEffect, useId, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { OPEN_CONSENT_EVENT, readConsent, writeConsent } from '@/lib/consent';
import { useConsentStatus } from '@/lib/use-consent';
import { buttonClasses } from '@/components/ui/button';
import { cn } from '@/lib/cn';

export function CookieConsent() {
  const t = useTranslations('cookie');
  const locale = useLocale();
  const status = useConsentStatus();
  const [reopened, setReopened] = useState(false);
  const open = status === 'unset' || reopened;
  const [prefs, setPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const reopen = () => {
      const c = readConsent();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setPrefs(true);
      setReopened(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const save = (choice: { analytics: boolean; marketing: boolean }) => {
    writeConsent(choice);
    setReopened(false);
    setPrefs(false);
  };

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-panel border border-border bg-surface p-5 shadow-float sm:inset-x-auto sm:left-6 sm:bottom-6 sm:p-6"
    >
      <h2 id={titleId} className="text-h4 font-semibold">
        {t('title')}
      </h2>
      <p className="mt-2 text-small text-ink-muted">
        {t('body')}{' '}
        <a href={locale === 'fr' ? '/fr/cookies' : '/cookies'} className="text-primary underline underline-offset-2">
          {t('policy')}
        </a>
      </p>

      {prefs && (
        <fieldset className="mt-4 space-y-3 border-t border-border pt-4">
          <legend className="sr-only">{t('preferences')}</legend>
          <Toggle label={t('necessary')} body={t('necessaryBody')} checked disabled hint={t('alwaysOn')} />
          <Toggle label={t('analytics')} body={t('analyticsBody')} checked={analytics} onChange={setAnalytics} />
          <Toggle label={t('marketing')} body={t('marketingBody')} checked={marketing} onChange={setMarketing} />
        </fieldset>
      )}

      {/* Accept and reject carry equal weight, as GDPR guidance expects. */}
      <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <button type="button" className={buttonClasses('primary', 'sm')} onClick={() => save({ analytics: true, marketing: true })}>
          {t('acceptAll')}
        </button>
        <button type="button" className={buttonClasses('secondary', 'sm')} onClick={() => save({ analytics: false, marketing: false })}>
          {t('rejectAll')}
        </button>
        {prefs ? (
          <button type="button" className={cn(buttonClasses('ghost', 'sm'), 'col-span-2 underline underline-offset-2')} onClick={() => save({ analytics, marketing })}>
            {t('save')}
          </button>
        ) : (
          <button type="button" className={cn(buttonClasses('ghost', 'sm'), 'col-span-2 underline underline-offset-2')} onClick={() => setPrefs(true)}>
            {t('preferences')}
          </button>
        )}
      </div>
    </section>
  );
}

function Toggle({
  label,
  body,
  checked,
  disabled,
  hint,
  onChange,
}: {
  label: string;
  body: string;
  checked: boolean;
  disabled?: boolean;
  hint?: string;
  onChange?: (v: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4">
      <label htmlFor={id} className="cursor-pointer">
        <span className="block text-small font-medium">{label}</span>
        <span className="block text-small text-ink-muted">{body}</span>
      </label>
      <span className="flex shrink-0 items-center gap-2 pt-0.5">
        {hint && <span className="text-small text-ink-muted">{hint}</span>}
        <input
          id={id}
          type="checkbox"
          role="switch"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer h-6 w-11 cursor-pointer appearance-none rounded-full bg-border transition-colors before:block before:size-5 before:translate-x-0.5 before:translate-y-0.5 before:rounded-full before:bg-white before:shadow-soft before:transition-transform checked:bg-primary checked:before:translate-x-[22px] disabled:cursor-not-allowed disabled:opacity-70"
        />
      </span>
    </div>
  );
}
