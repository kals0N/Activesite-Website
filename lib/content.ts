import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import readingTime from 'reading-time';
import type { Locale } from '@/i18n/routing';
import type { ServiceKey } from './services';

const ROOT = path.join(process.cwd(), 'content');

export const blogCategories = ['websites', 'conversion', 'seo-ai', 'branding', 'growth'] as const;
export type BlogCategory = (typeof blogCategories)[number];

export type BlogPost = {
  key: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: BlogCategory;
  tags: string[];
  cover?: string;
  author: string;
  keyword: string;
  status: 'draft' | 'published';
  featured?: boolean;
  review?: string;
  relatedService: ServiceKey;
  relatedWork: string;
  body: string;
  readingMinutes: number;
  toc: { id: string; text: string; depth: 2 | 3 }[];
};

export type CaseStudy = {
  key: string;
  slug: string;
  title: string;
  summary: string;
  metric: string;
  metricLabel: string;
  client: string;
  industry: string;
  services: ServiceKey[];
  timeline: string;
  order: number;
  cover?: string;
  tone: 'blue' | 'navy' | 'gold';
  results: { value: string; label: string }[];
  quote: { text: string; name: string; role: string };
  review?: string;
  body: string;
};

export type LegalDoc = {
  key: 'privacy' | 'terms' | 'cookies';
  title: string;
  description: string;
  updated: string;
  body: string;
};

function readDir(collection: string, locale: Locale) {
  const dir = path.join(ROOT, collection, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      return { file, data, content };
    });
}

function extractToc(markdown: string): BlogPost['toc'] {
  const slugger = new GithubSlugger();
  const toc: BlogPost['toc'] = [];
  for (const line of markdown.split('\n')) {
    const m = /^(##|###)\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, '');
    toc.push({ id: slugger.slug(text), text, depth: m[1].length as 2 | 3 });
  }
  return toc;
}

export const getPosts = cache((locale: Locale): BlogPost[] =>
  readDir('blog', locale)
    .map(({ data, content }) => ({
      ...(data as Omit<BlogPost, 'body' | 'readingMinutes' | 'toc'>),
      date: String(data.date),
      updated: data.updated ? String(data.updated) : undefined,
      tags: (data.tags as string[]) ?? [],
      body: content,
      readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
      toc: extractToc(content),
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1)),
);

export function getPost(locale: Locale, slug: string) {
  return getPosts(locale).find((p) => p.slug === slug);
}

export const getCaseStudies = cache((locale: Locale): CaseStudy[] =>
  readDir('work', locale)
    .map(({ data, content }) => ({ ...(data as Omit<CaseStudy, 'body'>), body: content }))
    .sort((a, b) => a.order - b.order),
);

export function getCaseStudy(locale: Locale, slug: string) {
  return getCaseStudies(locale).find((c) => c.slug === slug);
}

export function getCaseStudyByKey(locale: Locale, key: string) {
  return getCaseStudies(locale).find((c) => c.key === key);
}

export const getLegal = cache((locale: Locale, key: LegalDoc['key']): LegalDoc => {
  const file = path.join(ROOT, 'legal', locale, `${key}.mdx`);
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return { key, title: data.title, description: data.description, updated: String(data.updated), body: content };
});
