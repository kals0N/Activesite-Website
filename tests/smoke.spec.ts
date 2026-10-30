import { expect, test } from '@playwright/test';
import { recordTrackers, setConsent, sitemapPaths } from './helpers';

const KEY_PAGES = [
  '/',
  '/fr',
  '/services/ecommerce-development',
  '/fr/services/creation-site-ecommerce',
  '/work/lead-generation-website',
  '/contact',
  '/about',
  '/blog/website-cost-cameroon',
];
const WIDTHS = [360, 768, 1024, 1440, 1536];
const PRICE = /(\bXAF\b|\bFCFA\b|[$€£]\s?\d|\d\s?(€|\$|£)\b|\bUSD\b|\bEUR\b)/;

test('every sitemap page returns 200, has one H1, valid JSON-LD and no prices', async ({
  page,
}) => {
  const paths = [
    ...(await sitemapPaths(page)),
    '/thank-you',
    '/fr/merci',
    '/blog/website-cost-cameroon',
    '/fr/blog/prix-site-internet-cameroun',
  ];
  expect(paths.length).toBeGreaterThan(40);
  for (const p of paths) {
    const res = await page.request.get(p);
    expect(res.status(), p).toBe(200);
    const html = await res.text();
    expect(html.match(/<h1[\s>]/g)?.length, `one h1 on ${p}`).toBe(1);
    const text = html
      .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '')
      .replace(/<[^>]+>/g, ' ');
    expect(PRICE.test(text), `no price on ${p}`).toBe(false);
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      expect(() => JSON.parse(m[1]), `JSON-LD on ${p}`).not.toThrow();
    }
  }
});

test('unknown pages return a localized 404', async ({ page }) => {
  expect((await page.goto('/does-not-exist'))?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('does not exist');
  expect((await page.goto('/fr/inexistant'))?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('n’existe pas');
});

for (const width of WIDTHS) {
  test(`no horizontal scroll at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const p of KEY_PAGES) {
      await page.goto(p);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `${p} at ${width}px`).toBeLessThanOrEqual(0);
    }
  });
}

test('a booking CTA is visible above the fold at 360px on every page', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  const paths = await sitemapPaths(page);
  for (const p of paths) {
    await page.goto(p);
    // The compact header CTA is on every page…
    await expect(page.locator('header [data-book]'), `header CTA on ${p}`).toBeInViewport();
    // …and every page except the legal ones also has one in its hero.
    if (!/privacy|terms|cookies|confidentialite|conditions/.test(p)) {
      const firstBox = await page
        .locator('main [data-book], main a[href*="wa.me"]')
        .first()
        .boundingBox();
      expect(firstBox, `CTA on ${p}`).not.toBeNull();
      expect(firstBox!.y, `hero CTA above the fold on ${p}`).toBeLessThan(740);
    }
    // …and every page ends with a CTA block.
    await expect(
      page.locator('main section[aria-labelledby^="cta-"]').first(),
      `CTA band on ${p}`,
    ).toBeAttached();
  }
});

test('hreflang and canonical are set', async ({ page }) => {
  await page.goto('/fr/a-propos');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://activesite.cc/fr/a-propos',
  );
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
    'href',
    'https://activesite.cc/about',
  );
  await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute(
    'href',
    'https://activesite.cc/about',
  );
});

test('language switch keeps the equivalent page and remembers the choice', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await setConsent(page, { analytics: false, marketing: false });
  await page.goto('/services/ecommerce-development');
  await page.getByRole('button', { name: /Language/ }).click();
  await page.getByRole('link', { name: 'Français' }).first().click();
  await expect(page).toHaveURL(/\/fr\/services\/creation-site-ecommerce$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  const cookies = await page.context().cookies();
  expect(cookies.find((c) => c.name === 'NEXT_LOCALE')?.value).toBe('fr');
});

test('no trackers load before consent; they load after accepting', async ({ page }) => {
  const hits = await recordTrackers(page);
  await page.goto('/');
  await page.waitForTimeout(1500);
  expect(hits, 'tracker requests before consent').toEqual([]);
  await page.getByRole('button', { name: 'Accept all' }).click();
  await expect.poll(() => hits.length, { timeout: 5000 }).toBeGreaterThan(0);
});

test('reject all keeps trackers off', async ({ page }) => {
  const hits = await recordTrackers(page);
  await page.goto('/');
  await page.getByRole('button', { name: 'Reject all' }).click();
  await page.reload();
  await page.waitForTimeout(1500);
  expect(hits).toEqual([]);
});

test('tracking events fire with consistent names', async ({ page }) => {
  await setConsent(page, { analytics: false, marketing: false });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/services/ecommerce-development');
  const events = () => page.evaluate(() => (window.__asEvents ?? []).map((e) => e.name));

  await page.locator('main [data-book]').first().click(); // no Cal link in tests → navigates to /contact
  await expect.poll(events).toContain('cta_click');

  await page.goto('/work/lead-generation-website');
  await expect.poll(events).toContain('case_study_view');

  const popup = page.waitForEvent('popup');
  await page.locator('a[data-track-label="floating"]').click();
  await (await popup).close();
  await expect.poll(events).toContain('whatsapp_click');
});

test('floating WhatsApp message names the service', async ({ page }) => {
  await setConsent(page, { analytics: false, marketing: false });
  await page.goto('/services/ecommerce-development');
  const fab = page.locator('a[data-track-label="floating"]');
  await expect
    .poll(async () => decodeURIComponent((await fab.getAttribute('href')) ?? ''))
    .toContain('interested in Ecommerce');
});

test('contact form validates inline and the API rejects bad input', async ({ page }) => {
  await setConsent(page, { analytics: false, marketing: false });
  await page.goto('/contact');
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Send my project details' }).click();
  await expect(page.getByText('Enter your full name.')).toBeVisible();
  await expect(page.getByText('Tick this box so we can reply to you.')).toBeVisible();
  await expect(page.getByLabel(/Full name/)).toBeFocused();

  const bad = await page.request.post('/api/contact', {
    data: { name: 'A', email: 'nope', message: 'short', locale: 'en' },
  });
  expect(bad.status()).toBe(422);

  // Honeypot: bots get a quiet "ok" and nothing is sent.
  const bot = await page.request.post('/api/contact', {
    data: {
      name: 'Bot',
      email: 'bot@example.com',
      message: 'Buy cheap things now please',
      consent: true,
      locale: 'en',
      website: 'http://spam',
    },
  });
  expect(bot.status()).toBe(200);
  expect(await bot.json()).toEqual({ ok: true });
});

test('contact form succeeds and offers WhatsApp with a summary', async ({ page }) => {
  await setConsent(page, { analytics: false, marketing: false });
  await page.goto('/contact');
  await page.waitForLoadState('networkidle');
  const form = page
    .locator('form')
    .filter({ has: page.getByRole('button', { name: 'Send my project details' }) });
  await form.getByLabel(/Full name/).fill('Test Person');
  await form.getByLabel(/^Email/).fill('test@example.com');
  await form.getByLabel(/Your project/).fill('We need a new website that brings leads.');
  await form.getByLabel(/I agree/).check();
  await form.getByRole('button', { name: 'Send my project details' }).click();
  await expect(page.getByRole('status')).toContainText('Thank you');
  const wa = await page.getByRole('link', { name: 'Continue on WhatsApp' }).getAttribute('href');
  expect(decodeURIComponent(wa!)).toContain('Test Person');
  expect(await page.evaluate(() => (window.__asEvents ?? []).map((e) => e.name))).toContain(
    'form_submit',
  );
});

test('reduced motion shows final stat values immediately', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/styleguide');
  await page.getByText('Counts up when in view').scrollIntoViewIfNeeded();
  await expect(page.getByText('120+', { exact: true })).toBeVisible();
  await context.close();
});

test('mobile menu opens as a dialog and closes with Escape', async ({ page }) => {
  await setConsent(page, { analytics: false, marketing: false });
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  const dialog = page.getByRole('dialog', { name: 'Main' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('mega menu is keyboard accessible', async ({ page }) => {
  await setConsent(page, { analytics: false, marketing: false });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Services' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mega-menu').getByRole('link', { name: /Ecommerce/ })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
});

test('SEO files are served', async ({ page }) => {
  const robots = await (await page.request.get('/robots.txt')).text();
  expect(robots).toContain('GPTBot');
  expect(robots).toContain('Sitemap: https://activesite.cc/sitemap.xml');
  expect(await (await page.request.get('/llms.txt')).text()).toContain('# Activesite');
  expect(await (await page.request.get('/feed/fr.xml')).text()).toContain(
    '<language>fr</language>',
  );
  const og = await page.request.get('/og?title=Test');
  expect(og.headers()['content-type']).toBe('image/png');
});
