'use client';

import { useEffect } from 'react';
import type { Locale } from '@/i18n/routing';
import { track } from '@/lib/analytics';

export const CAL_NAMESPACE = 'strategy';
export const thankYouPath = (locale: Locale) => (locale === 'fr' ? '/fr/merci' : '/thank-you');

type CalApi = (...args: unknown[]) => void;
let apiPromise: Promise<CalApi> | null = null;

/** Loads Cal.com's embed script once, on demand, and wires the booking success event. */
export function loadCal(locale: Locale): Promise<CalApi> {
  apiPromise ??= import('@calcom/embed-react').then(async ({ getCalApi }) => {
    const cal = (await getCalApi({ namespace: CAL_NAMESPACE })) as unknown as CalApi;
    cal('ui', {
      theme: 'light',
      cssVarsPerTheme: { light: { 'cal-brand': '#0058FB' } },
      hideEventTypeDetails: false,
    });
    cal('on', {
      action: 'bookingSuccessful',
      callback: () => {
        track('booking_completed');
        window.location.assign(thankYouPath(locale));
      },
    });
    return cal;
  });
  return apiPromise;
}

/**
 * Every "Book a free call" button links to /contact#book and carries [data-book].
 * When a Cal.com link is configured, clicks open the booking popup instead (the script
 * is fetched on first hover or focus, so third-party code never loads on page view).
 * On the contact page itself the link scrolls to the inline calendar.
 */
export function CalLoader({ calLink, locale }: { calLink: string; locale: Locale }) {
  useEffect(() => {
    if (!calLink) return;
    const isBook = (t: EventTarget | null) => (t as Element | null)?.closest?.('[data-book]');
    const warm = (e: Event) => {
      if (isBook(e.target)) void loadCal(locale);
    };
    const onClick = async (e: MouseEvent) => {
      if (!isBook(e.target) || e.metaKey || e.ctrlKey || e.shiftKey) return;
      if (document.getElementById('book')) return; // contact page: scroll to the inline calendar
      e.preventDefault();
      const cal = await loadCal(locale);
      cal('modal', { calLink, config: { layout: 'month_view', locale } });
      track('booking_opened', { mode: 'popup' });
    };
    document.addEventListener('pointerover', warm, { passive: true });
    document.addEventListener('focusin', warm);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('pointerover', warm);
      document.removeEventListener('focusin', warm);
      document.removeEventListener('click', onClick);
    };
  }, [calLink, locale]);

  return null;
}
