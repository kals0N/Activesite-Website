'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/lib/i18n-client';
import { WhatsAppIcon } from '@/components/ui/icons';
import { useConsentStatus } from '@/lib/use-consent';
import { whatsappUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/cn';

/**
 * Floating WhatsApp button. The prefilled message names the page's topic, taken from the
 * page <h1> (e.g. "Ecommerce"), so the team knows the context of each chat.
 */
export function WhatsAppFab() {
  const t = useTranslations('whatsapp');
  const pathname = usePathname();
  const [topic, setTopic] = useState<string | null>(null);
  const bannerOpen = useConsentStatus() === 'unset';

  // The topic lives in the server-rendered page, so it is read from the DOM after each navigation.
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('[data-wa-topic]');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from server-rendered DOM
    setTopic(el?.dataset.waTopic ?? null);
  }, [pathname]);

  const message = t('message', { topic: topic ?? t('defaultTopic') });

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener"
      aria-label={t('label')}
      data-track="whatsapp_click"
      data-track-label="floating"
      className={cn(
        'group/wa bg-whatsapp shadow-float fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex size-14 items-center justify-center rounded-full text-white',
        'motion-safe:animate-wa-pulse transition-transform duration-(--duration-fast) hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6',
        // Stay out of the way while the cookie banner is open on small screens.
        bannerOpen && 'max-sm:hidden',
      )}
    >
      <WhatsAppIcon size={28} />
      <span
        role="tooltip"
        className="bg-ink text-small pointer-events-none absolute right-full mr-3 rounded-full px-3 py-1.5 whitespace-nowrap text-white opacity-0 transition-opacity duration-(--duration-fast) group-hover/wa:opacity-100 group-focus-visible/wa:opacity-100"
      >
        {t('tooltip')}
      </span>
    </a>
  );
}
