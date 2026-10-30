/** Single source of truth for company facts. Keep NAP (name, address, phone) identical everywhere. */
export const site = {
  name: 'Activesite',
  legalName: 'Activesite',
  domain: 'activesite.cc',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://activesite.cc',
  email: 'contact@activesite.cc',
  whatsapp: {
    display: '+237 6 51 20 49 73',
    e164: '+237651204973',
    number: '237651204973',
  },
  location: {
    city: 'Douala',
    country: 'Cameroon',
    countryFr: 'Cameroun',
    countryCode: 'CM',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Douala%2C+Cameroon',
    geo: { lat: 4.0511, lng: 9.7679 },
  },
  founder: {
    name: 'Tanwi Kalson',
    role: 'Founder',
    roleFr: 'Fondateur',
  },
  social: {
    facebook: 'https://web.facebook.com/profile.php?id=61591966885070',
    linkedin: 'https://linkedin.com/company/activesite.cc',
    instagram: 'https://www.instagram.com/activesite.cc',
  },
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? '',
} as const;

export const sameAs = Object.values(site.social);
