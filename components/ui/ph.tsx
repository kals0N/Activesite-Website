import { Fragment, type ReactNode } from 'react';

const SPLIT = /(\[\[[^\]]+\]\])/g;
const IS_TOKEN = /^\[\[[^\]]+\]\]$/;

/**
 * Render text, wrapping every [[PLACEHOLDER…]] token in a visible marker.
 * Tokens must also be listed in content/PLACEHOLDERS.md (checked by `npm run placeholders:check`).
 */
export function Ph({ children }: { children: string }): ReactNode {
  if (!children.includes('[[')) return children;
  return children.split(SPLIT).map((part, i) =>
    IS_TOKEN.test(part) ? (
      <span key={i} className="ph" data-placeholder>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export function hasPlaceholder(text: string) {
  return text.includes('[[');
}
