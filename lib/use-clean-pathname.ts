'use client';

import { usePathname } from 'next/navigation';

/** Strip the default-locale prefix that the proxy rewrite adds during static rendering (/en/about → /about). */
export function cleanPathname(pathname: string) {
  const p = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return p.length > 1 ? p.replace(/\/$/, '') : p;
}

/** The public URL path, identical on the server and in the browser. */
export function useCleanPathname() {
  return cleanPathname(usePathname());
}
