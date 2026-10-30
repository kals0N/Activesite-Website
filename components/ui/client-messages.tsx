import type { ReactNode } from 'react';
import { MessagesProvider } from '@/lib/i18n-client';
import { getMessages } from 'next-intl/server';

/**
 * Sends extra message namespaces to the client for one subtree only (e.g. the contact form),
 * so every other page keeps a small JS payload.
 */
export async function ClientMessages({
  namespaces,
  children,
}: {
  namespaces: string[];
  children: ReactNode;
}) {
  const messages = await getMessages();
  const picked = Object.fromEntries(
    namespaces.filter((n) => n in messages).map((n) => [n, messages[n]]),
  );
  return <MessagesProvider messages={picked}>{children}</MessagesProvider>;
}
