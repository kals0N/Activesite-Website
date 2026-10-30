'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { useForm, type FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from '@/lib/i18n-client';
import { AlertCircle, Check, Loader2 } from 'lucide-react';
import { contactSchema, timelines, type ContactInput } from '@/lib/schemas';
import { track } from '@/lib/analytics';
import { whatsappUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/cn';
import { buttonClasses } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/ui/icons';
import { Ph } from '@/components/ui/ph';

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

type Status =
  | { state: 'idle' }
  | { state: 'sending' }
  | { state: 'error'; key: string }
  | { state: 'done'; delivered: boolean; wa: string };

export function ContactForm({
  services,
  privacyHref,
}: {
  services: { key: string; name: string }[];
  privacyHref: string;
}) {
  const t = useTranslations('form');
  const locale = useLocale() as 'en' | 'fr';
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const turnstileRef = useRef<HTMLDivElement>(null);
  const tokenRef = useRef<string | undefined>(undefined);
  const widgetRef = useRef<string | undefined>(undefined);
  const hpRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    shouldFocusError: false,
    defaultValues: { whatsapp: '', company: '', service: '', timeline: '', marketing: false },
  });

  // Pre-fill service and timeline when arriving from the hero planner (?service=…&timeline=…).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const service = q.get('service');
    const timeline = q.get('timeline');
    if (service && services.some((s) => s.key === service))
      setValue('service', service as ContactInput['service']);
    if (timeline && (timelines as readonly string[]).includes(timeline))
      setValue('timeline', timeline as ContactInput['timeline']);
  }, [services, setValue]);

  // Turnstile loads on first interaction with the form, never on page view.
  const loadTurnstile = () => {
    if (!TURNSTILE_KEY || widgetRef.current || document.getElementById('cf-turnstile')) return;
    const s = document.createElement('script');
    s.id = 'cf-turnstile';
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = () => {
      if (!turnstileRef.current || !window.turnstile) return;
      widgetRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_KEY,
        language: locale,
        callback: (token: string) => (tokenRef.current = token),
      });
    };
    document.head.appendChild(s);
  };

  const onSubmit = async (data: ContactInput) => {
    setStatus({ state: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...data,
          locale,
          website: hpRef.current?.value ?? '',
          turnstileToken: tokenRef.current,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; delivered?: boolean };
      if (!res.ok) {
        setStatus({
          state: 'error',
          key: body.error === 'rate' || body.error === 'turnstile' ? body.error : 'server',
        });
        if (widgetRef.current) window.turnstile?.reset(widgetRef.current);
        return;
      }
      const serviceName = services.find((s) => s.key === data.service)?.name ?? t('serviceUnsure');
      const summary = t('waSummary', {
        name: data.name,
        service: serviceName,
        message: data.message.slice(0, 400),
      });
      track('form_submit', { service: data.service || 'none' });
      setStatus({ state: 'done', delivered: body.delivered !== false, wa: whatsappUrl(summary) });
    } catch {
      setStatus({ state: 'error', key: 'server' });
    }
  };

  // Move focus to the first invalid field on submit, in the order fields appear on screen.
  const FIELD_ORDER: (keyof ContactInput)[] = [
    'name',
    'email',
    'whatsapp',
    'company',
    'service',
    'timeline',
    'message',
    'consent',
  ];
  const onInvalid = (errs: Partial<Record<keyof ContactInput, unknown>>) => {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (first) setFocus(first);
  };

  if (status.state === 'done') {
    return <Success wa={status.wa} delivered={status.delivered} />;
  }

  const err = (e?: FieldError) =>
    e?.message ? t(`errors.${e.message}` as 'errors.name') : undefined;

  return (
    <form
      onSubmit={(e) => handleSubmit(onSubmit, onInvalid)(e)}
      onFocus={loadTurnstile}
      noValidate
      className="grid gap-4 sm:grid-cols-2"
    >
      <Field label={t('name')} error={err(errors.name)} required requiredLabel={t('required')}>
        {(p) => <input {...p} {...register('name')} autoComplete="name" />}
      </Field>
      <Field label={t('email')} error={err(errors.email)} required requiredLabel={t('required')}>
        {(p) => (
          <input
            {...p}
            {...register('email')}
            type="email"
            autoComplete="email"
            inputMode="email"
          />
        )}
      </Field>
      <Field label={t('whatsapp')} hint={t('whatsappHint')} error={err(errors.whatsapp)}>
        {(p) => (
          <input {...p} {...register('whatsapp')} type="tel" autoComplete="tel" inputMode="tel" />
        )}
      </Field>
      <Field label={t('company')} error={err(errors.company)}>
        {(p) => <input {...p} {...register('company')} autoComplete="organization" />}
      </Field>
      <Field label={t('service')} error={err(errors.service)} select>
        {(p) => (
          <select {...p} {...register('service')}>
            <option value="">{t('servicePlaceholder')}</option>
            {services.map((s) => (
              <option key={s.key} value={s.key}>
                {s.name}
              </option>
            ))}
            <option value="unsure">{t('serviceUnsure')}</option>
          </select>
        )}
      </Field>
      <Field label={t('timeline')} error={err(errors.timeline)} select>
        {(p) => (
          <select {...p} {...register('timeline')}>
            <option value="">{t('timelinePlaceholder')}</option>
            {timelines.map((v) => (
              <option key={v} value={v}>
                {t(`timelines.${v}`)}
              </option>
            ))}
          </select>
        )}
      </Field>
      <div className="sm:col-span-2">
        <Field
          label={t('message')}
          hint={t('messageHint')}
          error={err(errors.message)}
          required
          requiredLabel={t('required')}
          textarea
        >
          {(p) => <textarea {...p} {...register('message')} rows={5} />}
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input ref={hpRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="space-y-3 sm:col-span-2">
        <Check_ id="consent" error={err(errors.consent)} {...register('consent')}>
          {t('consent')}{' '}
          <a href={privacyHref} className="text-primary underline underline-offset-2">
            {t('consentLink')}
          </a>
          .
        </Check_>
        <Check_ id="marketing" {...register('marketing')}>
          {t('marketing')}
        </Check_>
      </div>

      {TURNSTILE_KEY && <div ref={turnstileRef} className="sm:col-span-2" />}

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status.state === 'sending'}
          className={cn(buttonClasses('primary', 'lg'), 'w-full sm:w-auto')}
        >
          {status.state === 'sending' ? (
            <>
              <Loader2 aria-hidden size={18} className="animate-spin" /> {t('sending')}
            </>
          ) : (
            t('submit')
          )}
        </button>
        <p role="alert" aria-live="assertive" className="text-small text-error">
          {status.state === 'error' && t(`errors.${status.key}` as 'errors.server')}
        </p>
      </div>
    </form>
  );
}

function Success({ wa, delivered }: { wa: string; delivered: boolean }) {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      className="success-in rounded-panel border-border bg-surface border p-8 outline-none"
    >
      <span className="bg-success inline-flex size-12 items-center justify-center rounded-full text-white">
        <Check aria-hidden size={24} className="check-draw" />
      </span>
      <h3 className="text-h3 mt-6 font-semibold">{t('form.successTitle')}</h3>
      <p className="text-body-lg text-ink-muted mt-3">
        <Ph>{t('form.successBody')}</Ph>
      </p>
      {!delivered && <p className="text-small text-warning mt-3">{t('form.devNotice')}</p>}
      <a
        href={wa}
        target="_blank"
        rel="noopener"
        data-track="whatsapp_click"
        data-track-label="form_success"
        className={cn(buttonClasses('whatsapp', 'lg'), 'mt-8 w-full sm:w-auto')}
      >
        <WhatsAppIcon size={18} /> <span>{t('cta.continueWhatsapp')}</span>
      </a>
    </div>
  );
}

type FieldRenderProps = {
  id: string;
  className: string;
  placeholder: string;
  'aria-invalid': boolean;
  'aria-describedby'?: string;
  'aria-required'?: boolean;
};

/** Floating-label field. Label, hint and error are tied to the control for screen readers. */
function Field({
  label,
  hint,
  error,
  required,
  requiredLabel,
  select,
  textarea,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  requiredLabel?: string;
  select?: boolean;
  textarea?: boolean;
  children: (p: FieldRenderProps) => ReactNode;
}) {
  const id = useId();
  const describedBy =
    [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <div className="relative">
        {children({
          id,
          placeholder: ' ',
          'aria-invalid': Boolean(error),
          'aria-describedby': describedBy,
          'aria-required': required || undefined,
          className: cn(
            'peer block w-full rounded-input border bg-surface px-4 text-body text-ink outline-none transition-[border-color,box-shadow] duration-(--duration-fast)',
            'focus:border-primary focus:ring-4 focus:ring-primary/15',
            textarea ? 'min-h-36 resize-y pt-7 pb-3' : 'h-14 pt-5',
            select &&
              'appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27none%27 stroke=%27%234A5170%27 stroke-width=%272%27%3E%3Cpath d=%27m4 6 4 4 4-4%27/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10',
            error ? 'border-error' : 'border-border hover:border-ink/30',
          ),
        })}
        <label
          htmlFor={id}
          className={cn(
            'text-ink-muted pointer-events-none absolute left-4 origin-left transition-all duration-(--duration-fast) ease-(--ease-out)',
            select
              ? 'top-2 text-[0.75rem]'
              : 'peer-placeholder-shown:text-body top-2 text-[0.75rem] peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-[0.75rem]',
          )}
        >
          {label}
          {required && (
            <>
              <span aria-hidden className="text-error">
                {' '}
                *
              </span>
              <span className="sr-only"> ({requiredLabel})</span>
            </>
          )}
        </label>
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="text-small text-ink-muted mt-1.5">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="text-small text-error mt-1.5 flex items-center gap-1.5">
          <AlertCircle aria-hidden size={14} /> {error}
        </p>
      )}
    </div>
  );
}

function Check_({
  id,
  error,
  children,
  ...input
}: {
  id: string;
  error?: string;
  children: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement> & {
    ref?: React.Ref<HTMLInputElement>;
  }) {
  const uid = `${useId()}-${id}`;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={uid}
          type="checkbox"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${uid}-err` : undefined}
          className="accent-primary mt-0.5 size-5 shrink-0 cursor-pointer rounded"
          {...input}
        />
        <label htmlFor={uid} className="text-small text-ink-muted cursor-pointer">
          {children}
        </label>
      </div>
      {error && (
        <p
          id={`${uid}-err`}
          className="text-small text-error mt-1.5 ml-8 flex items-center gap-1.5"
        >
          <AlertCircle aria-hidden size={14} /> {error}
        </p>
      )}
    </div>
  );
}
