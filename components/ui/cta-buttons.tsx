import { getLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { pathFor } from '@/lib/routes';
import { whatsappUrl } from '@/lib/whatsapp';
import { Button } from './button';

/**
 * Primary CTA. Without JS it links to /contact#book; with JS the Cal.com loader
 * intercepts [data-book] clicks and opens the booking popup instead.
 */
export async function BookButton({
  location,
  label,
  size = 'lg',
  variant = 'primary',
  fullOnMobile = true,
  className,
}: {
  location: string;
  label?: string;
  size?: 'md' | 'lg' | 'sm';
  variant?: 'primary' | 'inverse';
  fullOnMobile?: boolean;
  className?: string;
}) {
  const t = await getTranslations('cta');
  const locale = (await getLocale()) as Locale;
  return (
    <Button
      href={`${pathFor(locale, '/contact')}#book`}
      book
      variant={variant}
      size={size}
      arrow
      fullOnMobile={fullOnMobile}
      track="cta_click"
      trackLabel={location}
      className={className}
    >
      {label ?? t('book')}
    </Button>
  );
}

export async function WhatsAppButton({
  location,
  topic,
  size = 'lg',
  variant = 'secondary',
  fullOnMobile = true,
  className,
}: {
  location: string;
  /** What the visitor is interested in; becomes part of the prefilled message */
  topic?: string;
  size?: 'md' | 'lg' | 'sm';
  variant?: 'secondary' | 'whatsapp';
  fullOnMobile?: boolean;
  className?: string;
}) {
  const t = await getTranslations();
  const message = t('whatsapp.message', { topic: topic ?? t('whatsapp.defaultTopic') });
  return (
    <Button
      href={whatsappUrl(message)}
      external
      variant={variant}
      size={size}
      fullOnMobile={fullOnMobile}
      track="whatsapp_click"
      trackLabel={location}
      className={className}
    >
      <span className="inline-flex items-center gap-2">
        {variant === 'secondary' && <WaDot />}
        {t('cta.whatsapp')}
      </span>
    </Button>
  );
}

function WaDot() {
  return <span aria-hidden className="bg-whatsapp size-2 rounded-full" />;
}
