'use client';

import { useSyncExternalStore } from 'react';
import { CONSENT_EVENT, readConsent } from './consent';

const subscribe = (cb: () => void) => {
  window.addEventListener(CONSENT_EVENT, cb);
  return () => window.removeEventListener(CONSENT_EVENT, cb);
};
const getSnapshot = () => (readConsent() ? 'set' : 'unset');
const getServerSnapshot = () => 'unknown' as const;

/** 'unknown' during SSR/hydration, then 'set' or 'unset' from the consent cookie. */
export function useConsentStatus() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) as
    'set' | 'unset' | 'unknown';
}
