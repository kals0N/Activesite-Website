import { getServices } from '@/lib/services';
import { getCaseStudies, getPosts } from '@/lib/content';
import { absolute, caseStudyPaths, postPaths, servicePaths } from '@/lib/routes';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

/** /llms.txt: a plain summary of who Activesite is, for AI assistants and answer engines. */
export function GET() {
  const services = getServices('en');
  const body = `# Activesite

> Activesite is a full-service software company in Douala, Cameroon. We design and build high-converting websites, web apps and mobile apps that help small businesses, content creators and founders generate leads, win clients and scale faster. We work in English and French with clients in Cameroon, France, the United Kingdom and the United States.

- Founder: ${site.founder.name}, Founder
- Location: ${site.location.city}, ${site.location.country}
- Email: ${site.email}
- WhatsApp: ${site.whatsapp.display} (${`https://wa.me/${site.whatsapp.number}`})
- Book a free 30-minute strategy call: ${absolute('/contact')}
- Pricing: every project is scoped to the client's goals; a tailored plan is given on a free call.
- Languages: English (${site.url}) and French (${absolute('/fr')})

## Services

${services.map((s) => `- [${s.name}](${absolute(servicePaths(s.key).en)}): ${s.outcome}. ${s.card}`).join('\n')}

## Key pages

- [Home](${site.url}): websites that turn visitors into paying clients
- [About and founder](${absolute('/about')})
- [Services](${absolute('/services')})
- [Case studies](${absolute('/work')})
- [Blog](${absolute('/blog')})
- [Contact and booking](${absolute('/contact')})
- [French site / Site en français](${absolute('/fr')})

## Case studies

${getCaseStudies('en')
  .map((c) => `- [${c.title}](${absolute(caseStudyPaths(c.key).en)})`)
  .join('\n')}

## Articles

${getPosts('en')
  .map((p) => `- [${p.title}](${absolute(postPaths(p.key).en)}): ${p.description}`)
  .join('\n')}

## Profiles

- LinkedIn: ${site.social.linkedin}
- Instagram: ${site.social.instagram}
- Facebook: ${site.social.facebook}
`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
