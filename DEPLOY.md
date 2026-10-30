# Deploying Activesite on Hostinger

The site runs as a **Node.js Web App** on Hostinger (Business Web Hosting or a Cloud plan), connected to this GitHub repository. Every page is pre-rendered at build time; Node only serves the files plus three small endpoints (`/api/contact`, `/api/newsletter`, `/og`).

> hPanel menus change from time to time. If a label below differs, look for the equivalent option.

## 1. Create the Node.js app

1. hPanel → **Websites** → **Add website** → **Node.js Apps** (or **Deploy Node.js app**).
2. Choose **Import Git repository**, connect GitHub and select `kals0N/Activesite-Website`, branch `main`.
3. Build settings:
   - Framework preset: **Next.js** (or "Other")
   - Node.js version: **22.x** (24.x also works)
   - Install command: `npm ci`
   - Build command: `npm run build`
   - Start command: `npm run start`
   - Root directory: `/`
4. Add the **environment variables** from [`.env.example`](./.env.example) (at least `NEXT_PUBLIC_SITE_URL=https://activesite.cc`). `NEXT_PUBLIC_*` values are read at build time, so **redeploy after changing them**.
5. Deploy. The first build takes a few minutes.

## 2. Domain, SSL and CDN

1. In the app → **Domains**, attach `activesite.cc` and `www.activesite.cc`.
   - Domain registered at Hostinger: DNS is set automatically.
   - Domain registered elsewhere: point the nameservers to Hostinger, or create the A/CNAME records hPanel shows.
2. **SSL**: hPanel → Security → SSL → install the free certificate for both hosts and turn on **Force HTTPS**.
3. Make `www` redirect to the apex (`https://activesite.cc`), which is the canonical host used in the sitemap.
4. Turn on **Hostinger CDN** (Performance → CDN) and confirm HTTP/2 or HTTP/3 is enabled. Brotli/gzip compression is handled by the CDN; Next.js also compresses responses.

## 3. Business email and deliverability (contact@activesite.cc)

1. hPanel → **Emails** → create the mailbox `contact@activesite.cc`.
2. In **DNS / Email settings** make sure these records exist (Hostinger offers a one-click "Fix" for each):
   - **MX** records pointing to Hostinger mail.
   - **SPF** (TXT on `@`): `v=spf1 include:_spf.mail.hostinger.com ~all`. If Brevo sends from your domain too, add `include:spf.brevo.com` inside the same record. There must be only one SPF record.
   - **DKIM**: enable it in the email settings; Hostinger adds the `hostingermail` TXT records. Add Brevo's DKIM record too (Brevo → Senders & domains → Authenticate).
   - **DMARC** (TXT on `_dmarc`): start with `v=DMARC1; p=none; rua=mailto:contact@activesite.cc`, then move to `p=quarantine` once reports look clean.
3. Put the SMTP details in the app's environment variables (`SMTP_HOST=smtp.hostinger.com`, `SMTP_PORT=465`, `SMTP_USER`, `SMTP_PASS`).
4. Test: send the contact form from the live site. You should receive the lead **and** the sender should get the auto-reply in their language. Check headers for `spf=pass`, `dkim=pass`, `dmarc=pass` (or use mail-tester.com).

## 4. Integrations checklist

| Integration | What to set | How to verify |
| --- | --- | --- |
| Cal.com | Create the event "Free 30-minute strategy call", set `NEXT_PUBLIC_CAL_LINK` | Any "Book a free call" button opens the popup; `/contact` shows the calendar; a test booking lands on `/thank-you` |
| Brevo | API key, list IDs and double opt-in template IDs per language | Subscribe from the footer → confirmation email arrives → contact appears in the right list |
| Turnstile | Site key + secret for `activesite.cc` | Widget appears when you start typing in the contact form |
| GA4 | `NEXT_PUBLIC_GA4_ID` | GA4 DebugView shows events only **after** accepting cookies |
| Meta / TikTok pixels | Pixel IDs | Meta Pixel Helper / TikTok Pixel Helper fire only after accepting marketing cookies |
| Search Console | Verify by DNS TXT (recommended) or `NEXT_PUBLIC_GSC_VERIFICATION` | Submit `https://activesite.cc/sitemap.xml` |

## 5. After every deploy

1. Open `/`, `/fr`, a service page and a case study on a phone.
2. Run Lighthouse (mobile) on those pages: targets ≥ 95 Performance, 100 Accessibility, Best Practices and SEO.
3. Check structured data in Google's [Rich Results Test](https://search.google.com/test/rich-results) for the home page, a service page and a blog post.
4. Confirm no analytics requests fire before cookie consent (browser DevTools → Network).

## Redeploying

- **Automatic:** every push to `main` triggers a new build (enable auto-deploy in the app settings).
- **Manual:** hPanel → your Node.js app → **Redeploy**.
- **Rollback:** redeploy a previous deployment from the app's deployment history, or revert the commit on GitHub.

## Fallback: static hosting (no Node.js)

If the plan cannot run Node.js apps, the site can be exported as static files. This removes server features, so:

1. Move form handling off the site: point the contact form at a small serverless endpoint (for example a Cloudflare Worker running the same code as `app/api/contact/route.ts`), and use Brevo's hosted form for the newsletter.
2. Delete `app/api`, `app/og` (use a static `public/og.png` in `lib/seo.ts`) and `proxy.ts`.
3. In `i18n/routing.ts` set `localePrefix: 'always'` and add `app/page.tsx` that redirects `/` to `/en` (static exports cannot rewrite `/` to `/en`). Add redirects from the old root URLs in `.htaccess`.
4. In `next.config.ts` add `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true`, and remove `headers()`/`redirects()` (recreate them in `.htaccess`).
5. `npm run build` produces `out/`. Upload its contents to `public_html` with the File Manager or Git deployment.

Keep the Node.js setup if at all possible: it keeps English at the root URL, which is better for SEO.

## Local SEO tasks (outside the code)

- Create and verify the **Google Business Profile**: "Activesite", Douala, categories *Website designer*, *Marketing agency*, *Software company*. Use exactly the same name, location, email and WhatsApp number as the site.
- List the business on Maligah, Sortlist, Clutch, GoodFirms and DesignRush with identical details.
- After every project, ask the client for a Google review.
