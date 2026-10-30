import NextLink from 'next/link';
import type { ComponentProps } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { rehypePlaceholders } from '@/lib/rehype-placeholders';

const components = {
  a: ({ href = '', ...props }: ComponentProps<'a'>) =>
    href.startsWith('/') ? (
      <NextLink href={href} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noopener" {...props} />
    ),
};

/** Renders trusted MDX from /content at build time. */
export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, rehypePlaceholders] } }}
    />
  );
}
