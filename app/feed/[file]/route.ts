import { notFound } from 'next/navigation';
import { getPosts } from '@/lib/content';
import { absolute, postPaths } from '@/lib/routes';
import { site } from '@/lib/site';

export const dynamic = 'force-static';
export function generateStaticParams() {
  return [{ file: 'en.xml' }, { file: 'fr.xml' }];
}

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);

/** RSS feed per language: /feed/en.xml and /feed/fr.xml */
export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const locale = file === 'fr.xml' ? 'fr' : file === 'en.xml' ? 'en' : null;
  if (!locale) notFound();
  const posts = getPosts(locale);
  const home = absolute(locale === 'fr' ? '/fr/blog' : '/blog');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(locale === 'fr' ? 'Blog Activesite' : 'Activesite blog')}</title>
<link>${home}</link>
<description>${esc(locale === 'fr' ? 'Sites internet, conversion, SEO et recherche IA pour PME.' : 'Websites, conversion, SEO and AI search for small businesses.')}</description>
<language>${locale}</language>
<atom:link href="${site.url}/feed/${file}" rel="self" type="application/rss+xml"/>
${posts
  .map((p) => {
    const url = absolute(postPaths(p.key)[locale]);
    return `<item><title>${esc(p.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.description)}</description><author>${site.email} (${esc(p.author)})</author></item>`;
  })
  .join('\n')}
</channel>
</rss>`;
  return new Response(xml, { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } });
}
