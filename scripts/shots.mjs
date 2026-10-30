// Usage: node scripts/shots.mjs <outDir> <path> [widths...]
import { chromium } from '@playwright/test';
const [out, path = '/', ...w] = process.argv.slice(2);
const widths = w.length ? w.map(Number) : [360, 768, 1024, 1440];
const browser = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM ?? '/opt/pw-browsers/chromium',
});
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: width < 700 ? 760 : 900 } });
  await page.goto(`http://localhost:3100${path}`, { waitUntil: 'networkidle' });
  // Dismiss cookie banner for clean shots; reveal everything.
  await page.evaluate(() => {
    document.cookie =
      'as_consent=' +
      encodeURIComponent(JSON.stringify({ analytics: false, marketing: false, ts: 1, v: 1 })) +
      '; path=/';
    document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-in'));
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-in'));
  });
  await page.waitForTimeout(1500);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  const name = `${out}/${path.replace(/\//g, '_') || 'home'}-${width}.png`;
  await page.screenshot({ path: name, fullPage: true });
  await page.screenshot({ path: name.replace('.png', '-fold.png') });
  console.log(width, 'overflow', overflow, name);
  await page.close();
}
await browser.close();
