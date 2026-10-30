import type { Page } from '@playwright/test';

export const TRACKERS =
  /googletagmanager\.com|google-analytics\.com|connect\.facebook\.net|facebook\.com\/tr|analytics\.tiktok\.com/;

/** Block third-party trackers but record that they were requested. */
export async function recordTrackers(page: Page) {
  const hits: string[] = [];
  await page.route(TRACKERS, (route) => {
    hits.push(route.request().url());
    return route.abort();
  });
  return hits;
}

export async function setConsent(page: Page, value: { analytics: boolean; marketing: boolean }) {
  await page.context().addCookies([
    {
      name: 'as_consent',
      value: encodeURIComponent(JSON.stringify({ ...value, ts: Date.now(), v: 1 })),
      url: page.context().pages()[0]?.url().startsWith('http')
        ? page.url()
        : 'http://localhost:3200',
    },
  ]);
}

export async function sitemapPaths(page: Page) {
  const res = await page.request.get('/sitemap.xml');
  const xml = await res.text();
  return [...xml.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || '/');
}
