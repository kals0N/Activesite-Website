'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';

/**
 * A tiny client-side stand-in for next-intl's hooks. Server components keep using next-intl;
 * client components receive only the message namespaces they need, and this avoids shipping
 * the ICU runtime to the browser. Supports `{name}` placeholders only (client strings use no plurals).
 */
type Messages = Record<string, unknown>;
const Ctx = createContext<{ locale: string; messages: Messages }>({ locale: 'en', messages: {} });

export function MessagesProvider({
  locale,
  messages,
  children,
}: {
  locale?: string;
  messages: Messages;
  children: ReactNode;
}) {
  const parent = useContext(Ctx);
  const value = useMemo(
    () => ({ locale: locale ?? parent.locale, messages: { ...parent.messages, ...messages } }),
    [locale, messages, parent],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

function get(obj: unknown, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Messages)[k] : undefined), obj);
}

export function useLocale() {
  return useContext(Ctx).locale;
}

export function useTranslations(namespace?: string) {
  const { messages } = useContext(Ctx);
  const base = namespace ? get(messages, namespace) : messages;
  const t = (key: string, vars?: Record<string, string | number>) => {
    const value = get(base, key);
    if (typeof value !== 'string') return namespace ? `${namespace}.${key}` : key;
    return vars ? value.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? '')) : value;
  };
  return Object.assign(t, { raw: (key: string) => get(base, key) });
}
