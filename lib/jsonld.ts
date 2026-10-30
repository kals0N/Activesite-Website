import type { Locale } from '@/i18n/routing';
import { absolute } from './routes';
import { sameAs, site } from './site';

const ORG_ID = `${site.url}/#organization`;
const PERSON_ID = `${site.url}/#founder`;
const WEBSITE_ID = `${site.url}/#website`;

export function organizationLd(locale: Locale, description: string) {
  return [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': ORG_ID,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      logo: `${site.url}/brand/logo.png`,
      image: `${site.url}/brand/logo.png`,
      description,
      email: site.email,
      telephone: site.whatsapp.e164,
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.location.city,
        addressCountry: site.location.countryCode,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: site.location.geo.lat,
        longitude: site.location.geo.lng,
      },
      areaServed: ['Cameroon', 'France', 'United Kingdom', 'United States'],
      knowsLanguage: ['en', 'fr'],
      founder: { '@id': PERSON_ID },
      sameAs,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: site.email,
          telephone: site.whatsapp.e164,
          availableLanguage: ['English', 'French'],
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: site.url,
      name: site.name,
      inLanguage: locale,
      publisher: { '@id': ORG_ID },
    },
    personLd(locale),
  ];
}

export function personLd(locale: Locale) {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.founder.name,
    jobTitle: locale === 'fr' ? site.founder.roleFr : site.founder.role,
    worksFor: { '@id': ORG_ID },
    url: absolute(locale === 'fr' ? '/fr/a-propos' : '/about'),
    sameAs: [site.social.linkedin],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function serviceLd({
  name,
  description,
  path,
  locale,
}: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
}) {
  return {
    '@type': 'Service',
    name,
    description,
    url: absolute(path),
    inLanguage: locale,
    provider: { '@id': ORG_ID },
    areaServed: ['Cameroon', 'France', 'United Kingdom', 'United States'],
  };
}

export function blogPostingLd(p: {
  title: string;
  description: string;
  path: string;
  date: string;
  updated?: string;
  locale: Locale;
  keyword: string;
}) {
  return {
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    url: absolute(p.path),
    mainEntityOfPage: absolute(p.path),
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    inLanguage: p.locale,
    keywords: p.keyword,
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    image: `${site.url}/og?title=${encodeURIComponent(p.title)}&locale=${p.locale}`,
  };
}

export function creativeWorkLd(p: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
}) {
  return {
    '@type': 'CreativeWork',
    name: p.title,
    description: p.description,
    url: absolute(p.path),
    inLanguage: p.locale,
    creator: { '@id': ORG_ID },
  };
}
