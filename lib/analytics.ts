/**
 * One tracking helper for GA4, Meta Pixel and TikTok Pixel.
 * Third-party scripts only exist after consent (see components/integrations/analytics.tsx),
 * so calling track() before consent sends nothing to them.
 */
export type EventName =
  | 'cta_click'
  | 'booking_opened'
  | 'booking_completed'
  | 'form_submit'
  | 'whatsapp_click'
  | 'newsletter_signup'
  | 'case_study_view'
  | 'language_switch';

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, params?: Params) => void; page: () => void };
    /** Local event log for QA and Playwright tests. Never sent anywhere. */
    __asEvents?: { name: EventName; params: Params }[];
  }
}

// Map our events to the ad platforms' standard events where one exists.
const metaStandard: Partial<Record<EventName, string>> = {
  booking_completed: 'Schedule',
  form_submit: 'Lead',
  newsletter_signup: 'CompleteRegistration',
  whatsapp_click: 'Contact',
};
const tiktokStandard: Partial<Record<EventName, string>> = {
  booking_completed: 'Schedule',
  form_submit: 'SubmitForm',
  newsletter_signup: 'CompleteRegistration',
  whatsapp_click: 'Contact',
};

export function track(name: EventName, params: Params = {}) {
  if (typeof window === 'undefined') return;
  const payload = { ...params, page_path: location.pathname };
  (window.__asEvents ??= []).push({ name, params: payload });
  window.gtag?.('event', name, payload);
  if (window.fbq) {
    const std = metaStandard[name];
    if (std) window.fbq('track', std, payload);
    else window.fbq('trackCustom', name, payload);
  }
  window.ttq?.track(tiktokStandard[name] ?? name, payload);
}
