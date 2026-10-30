import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getServicesByGroup } from '@/lib/services';
import { allLocalizedPaths, pathFor, servicePaths } from '@/lib/routes';
import { HeaderClient, type NavData } from './header-client';

export async function Header({ locale }: { locale: Locale }) {
  const t = await getTranslations('nav');
  const path = (href: Parameters<typeof pathFor>[1]) => pathFor(locale, href);

  const data: NavData = {
    home: path('/'),
    links: [
      { label: t('work'), href: path('/work') },
      { label: t('about'), href: path('/about') },
      { label: t('blog'), href: path('/blog') },
    ],
    servicesHref: path('/services'),
    contactHref: `${path('/contact')}#book`,
    groups: getServicesByGroup(locale).map(({ group, services }) => ({
      key: group,
      label: t(`groups.${group}`),
      line: t(`groupLines.${group}`),
      items: services.map((s) => ({ label: s.name, line: s.card, href: servicePaths(s.key)[locale], key: s.key })),
    })),
    alternates: allLocalizedPaths(),
  };

  return <HeaderClient data={data} locale={locale} />;
}
