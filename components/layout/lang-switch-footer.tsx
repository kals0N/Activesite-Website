import type { Locale } from '@/i18n/routing';
import { allLocalizedPaths } from '@/lib/routes';
import { LangSwitch } from './lang-switch';

export function LangSwitchFooter({ locale }: { locale: Locale }) {
  return <LangSwitch locale={locale} alternates={allLocalizedPaths()} variant="inline" tone="ink" />;
}
