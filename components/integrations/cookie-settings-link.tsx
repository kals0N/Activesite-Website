'use client';

import { openConsentSettings } from '@/lib/consent';

export function CookieSettingsLink({ label }: { label: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className="link-draw">
      {label}
    </button>
  );
}
