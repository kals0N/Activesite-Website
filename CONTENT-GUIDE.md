# Editing content

All content lives in the repository, so every change is versioned and reviewed like code. After editing, run `npm run placeholders` (if you added or removed a placeholder) and `npm run check`.

## Golden rules

- **No prices** anywhere. Use: "Every project is scoped to your goals — get a tailored plan on a free call."
- **No invented results, names or quotes.** Until real, client-approved data exists, use a visible token: `[[PLACEHOLDER: what is missing]]`.
- Lead with the outcome. Sentences under 20 words. Plain words.
- Every English change needs its French counterpart (formal "vous"). Mark new French copy `review: pending`.

## Add a case study

1. Copy `content/work/en/lead-generation-website.mdx` to a new file, e.g. `content/work/en/my-client.mdx`.
2. Edit the frontmatter:
   - `key`: a stable id shared by the EN and FR versions (e.g. `my-client`)
   - `slug`: the URL part (`/work/<slug>`)
   - `order`: position in lists (1 shows first and largest on Home)
   - `tone`: cover colour, `blue`, `navy` or `gold`
   - `metric` + `metricLabel`: the headline result, e.g. `+48% leads` / `in 60 days after launch`
   - `client`, `industry`, `services` (service keys from `lib/services.ts`), `timeline`, `results`, `quote`
3. Write the body with `## The challenge` and `## Strategy and solution` sections.
4. Create the French version in `content/work/fr/` with the **same `key`** and a French `slug`. The language switcher and hreflang tags pair them automatically.
5. Screenshots: put images in `public/images/work/` and pass `src` to `DeviceFrame` (see `components/ui/device-frame.tsx`).

## Add a blog post

1. Create `content/blog/en/<slug>.mdx` (and `content/blog/fr/<slug-fr>.mdx` with the same `key`).
2. Frontmatter: `key`, `slug`, `title`, `description` (≤ 155 characters), `date`, optional `updated`, `category` (`websites`, `conversion`, `seo-ai`, `branding`, `growth`), `tags`, `author`, `keyword`, `status` (`draft` or `published`), optional `featured: true`, `relatedService` (a service key), `relatedWork` (a case study key).
3. Structure for AI search: use question-style `##` headings and answer each one directly in the first 40–60 words.
4. Link to at least one service page and one case study inside the text.
5. `status: draft` posts are visible with a Draft badge but are `noindex` and left out of the sitemap. Switch to `published` when ready.

Reading time, the table of contents (from `##` headings), the RSS feeds (`/feed/en.xml`, `/feed/fr.xml`) and Open Graph images are generated automatically.

## Edit or add a service

Services are typed data, so mistakes are caught at build time.

- Copy lives in `content/services/en.ts` and `content/services/fr.ts` (who it is for, problems, outcomes, deliverables, FAQs, SEO title and description, slug).
- Grouping (Design · Build · Grow), icon, related services and the related case study are in `lib/services.ts`.
- To add a service: add its key to `serviceKeys` and `meta` in `lib/services.ts`, then add the entry to both language files. The page, navigation, footer, sitemap and structured data update automatically.

## Edit page copy

Home, About, Contact, navigation, buttons and form labels are in `messages/en.json` and `messages/fr.json` (same keys in both). Company facts (email, WhatsApp, social links, founder) are in `lib/site.ts` only.

## Legal pages

`content/legal/{en,fr}/{privacy,terms,cookies}.mdx`. They are drafts for a qualified lawyer. Update `updated:` when you change them.
