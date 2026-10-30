import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// AI crawlers are explicitly welcome, so Activesite can be cited in AI answers (GEO).
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/styleguide', '/fr/styleguide'] },
      ...aiBots.map((userAgent) => ({ userAgent, allow: '/', disallow: ['/api/'] })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
