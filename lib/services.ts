import type { Locale } from '@/i18n/routing';
import { servicesEn } from '@/content/services/en';
import { servicesFr } from '@/content/services/fr';

export const serviceGroups = ['design', 'build', 'grow'] as const;
export type ServiceGroup = (typeof serviceGroups)[number];

export const serviceKeys = [
  'brand-identity',
  'graphic-design',
  'ui-ux-design',
  'website-development',
  'ecommerce-development',
  'saas-development',
  'portfolio-websites',
  'sales-funnels',
  'seo-aeo-geo',
  'digital-marketing',
  'hosting-maintenance',
] as const;
export type ServiceKey = (typeof serviceKeys)[number];

export type ServiceFaq = { q: string; a: string };

export type ServiceContent = {
  slug: string;
  name: string;
  /** Outcome headline: the result the client gets */
  outcome: string;
  /** One line under the outcome */
  promise: string;
  /** Short line for cards and menus */
  card: string;
  metaTitle: string;
  metaDescription: string;
  keyword: string;
  whoFor: string[];
  problems: string[];
  outcomes: { metric: string; label: string }[];
  deliverables: string[];
  processNote: string;
  faqs: ServiceFaq[];
};

export type Service = ServiceContent & {
  key: ServiceKey;
  group: ServiceGroup;
  related: ServiceKey[];
  /** Case study key shown on the page */
  caseStudy: string;
  icon: ServiceIcon;
};

export type ServiceIcon =
  | 'badge'
  | 'palette'
  | 'layout'
  | 'monitor'
  | 'cart'
  | 'boxes'
  | 'user'
  | 'funnel'
  | 'search'
  | 'megaphone'
  | 'shield';

const meta: Record<
  ServiceKey,
  { group: ServiceGroup; related: ServiceKey[]; caseStudy: string; icon: ServiceIcon }
> = {
  'brand-identity': { group: 'design', related: ['graphic-design', 'website-development', 'portfolio-websites'], caseStudy: 'brand-launch', icon: 'badge' },
  'graphic-design': { group: 'design', related: ['brand-identity', 'digital-marketing', 'sales-funnels'], caseStudy: 'brand-launch', icon: 'palette' },
  'ui-ux-design': { group: 'design', related: ['saas-development', 'website-development', 'ecommerce-development'], caseStudy: 'saas-mvp', icon: 'layout' },
  'website-development': { group: 'build', related: ['seo-aeo-geo', 'hosting-maintenance', 'brand-identity'], caseStudy: 'lead-gen-website', icon: 'monitor' },
  'ecommerce-development': { group: 'build', related: ['digital-marketing', 'seo-aeo-geo', 'hosting-maintenance'], caseStudy: 'lead-gen-website', icon: 'cart' },
  'saas-development': { group: 'build', related: ['ui-ux-design', 'hosting-maintenance', 'sales-funnels'], caseStudy: 'saas-mvp', icon: 'boxes' },
  'portfolio-websites': { group: 'build', related: ['brand-identity', 'seo-aeo-geo', 'sales-funnels'], caseStudy: 'brand-launch', icon: 'user' },
  'sales-funnels': { group: 'grow', related: ['digital-marketing', 'website-development', 'graphic-design'], caseStudy: 'lead-gen-website', icon: 'funnel' },
  'seo-aeo-geo': { group: 'grow', related: ['website-development', 'hosting-maintenance', 'digital-marketing'], caseStudy: 'lead-gen-website', icon: 'search' },
  'digital-marketing': { group: 'grow', related: ['sales-funnels', 'graphic-design', 'ecommerce-development'], caseStudy: 'lead-gen-website', icon: 'megaphone' },
  'hosting-maintenance': { group: 'grow', related: ['website-development', 'seo-aeo-geo', 'ecommerce-development'], caseStudy: 'saas-mvp', icon: 'shield' },
};

const byLocale: Record<Locale, Record<ServiceKey, ServiceContent>> = {
  en: servicesEn,
  fr: servicesFr,
};

export function getService(locale: Locale, key: ServiceKey): Service {
  return { key, ...meta[key], ...byLocale[locale][key] };
}

export function getServices(locale: Locale): Service[] {
  return serviceKeys.map((key) => getService(locale, key));
}

export function getServicesByGroup(locale: Locale) {
  const all = getServices(locale);
  return serviceGroups.map((group) => ({ group, services: all.filter((s) => s.group === group) }));
}

export function getServiceBySlug(locale: Locale, slug: string): Service | undefined {
  return getServices(locale).find((s) => s.slug === slug);
}

/** The equivalent slug in the other locale, for the language switcher and hreflang. */
export function serviceSlugIn(locale: Locale, key: ServiceKey) {
  return byLocale[locale][key].slug;
}
