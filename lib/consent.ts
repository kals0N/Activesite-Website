/** Cookie consent state, stored in a first-party cookie for 180 days. Client-only. */
export type Consent = { analytics: boolean; marketing: boolean; ts: number; v: 1 };

const NAME = 'as_consent';
const MAX_AGE = 60 * 60 * 24 * 180;
export const CONSENT_EVENT = 'as:consent';
export const OPEN_CONSENT_EVENT = 'as:open-consent';

export function readConsent(): Consent | null {
  if (typeof document === 'undefined') return null;
  const raw = document.cookie.split('; ').find((c) => c.startsWith(`${NAME}=`));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw.slice(NAME.length + 1)));
    return parsed?.v === 1 ? (parsed as Consent) : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: { analytics: boolean; marketing: boolean }) {
  const value: Consent = { ...choice, ts: Date.now(), v: 1 };
  const secure = location.protocol === 'https:' ? '; secure' : '';
  document.cookie = `${NAME}=${encodeURIComponent(JSON.stringify(value))}; path=/; max-age=${MAX_AGE}; samesite=lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
