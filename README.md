# Activesite website

The bilingual (EN/FR) marketing website for [Activesite](https://activesite.cc), built to turn visitors into booked strategy calls and WhatsApp conversations.

- **Stack:** Next.js 16 (App Router, TypeScript), Tailwind CSS v4, next-intl, MDX, React Hook Form + Zod, Nodemailer, Brevo, Cal.com, Cloudflare Turnstile.
- **Rendering:** every page is statically generated (SSG) in both languages. Only `/api/contact`, `/api/newsletter` and `/og` run on the server.
- **Hosting:** Hostinger Node.js Web App. See [DEPLOY.md](./DEPLOY.md).

## Getting started

```bash
npm install
cp .env.example .env.local   # all values optional for local work
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm run start` | Production build and server |
| `npm run lint` / `npm run typecheck` | ESLint and TypeScript |
| `npm run placeholders` | Regenerate `content/PLACEHOLDERS.md` from every `[[PLACEHOLDER]]` token |
| `npm run check` | Lint + typecheck + placeholder list up to date (run before every push) |
| `npm run test:e2e` | Playwright smoke tests (builds and starts the site) |

## Project map

```
app/[locale]/…            Pages. English at the root, French under /fr (translated slugs)
app/api/contact|newsletter Form handlers (Zod validation, honeypot, Turnstile, rate limit)
app/og                    Generated Open Graph images (/og?title=…)
app/sitemap.ts robots.ts llms.txt feed/[file]   SEO and AI-search files
i18n/routing.ts           Locales and translated pathnames (/about ↔ /fr/a-propos)
proxy.ts                  Locale routing (Next 16's renamed middleware)
messages/en.json fr.json  Interface and page copy
content/services/*.ts     The 11 services (typed, per language)
content/work|blog|legal   MDX case studies, posts and legal pages, per language
components/ui             Design-system primitives (Button, Faq, Stat, cards…)
components/sections       Page sections (Hero, CTA band, bento, process…)
components/integrations   Cal.com, contact form, newsletter, cookie consent, analytics, WhatsApp
lib/                      Site facts (site.ts), routes, SEO/JSON-LD, content loaders, schemas
```

Design tokens live in `app/globals.css` (`@theme`) and are documented at `/styleguide` (not indexed).

## Content

See [CONTENT-GUIDE.md](./CONTENT-GUIDE.md) for adding a case study, blog post or service, and
[content/PLACEHOLDERS.md](./content/PLACEHOLDERS.md) for everything still waiting on real data.

## Analytics events

All events go through `track()` in `lib/analytics.ts` and reach GA4, Meta and TikTok only after consent.

| Event | Fires when |
| --- | --- |
| `cta_click` | Any "Book a call" button is clicked (`location` param) |
| `booking_opened` | The Cal.com popup or inline calendar opens |
| `booking_completed` | A Cal.com booking succeeds (then redirects to /thank-you) |
| `form_submit` | The contact form is sent |
| `whatsapp_click` | Any WhatsApp link or button is clicked |
| `newsletter_signup` | A Brevo signup succeeds |
| `case_study_view` | A case study page is viewed |
| `language_switch` | The visitor changes language |

For QA, every event is also pushed to `window.__asEvents` in the browser (never sent anywhere).
