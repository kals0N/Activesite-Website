'use client';

import { useEffect, useState, type ReactNode } from 'react';

const session = { mounted: false };

/**
 * Re-mounts on every client-side navigation. The first page load is left alone (so LCP is not
 * delayed); later navigations get a short cross-fade with a slight upward shift.
 */
export default function Template({ children }: { children: ReactNode }) {
  const [animate] = useState(() => session.mounted);
  useEffect(() => {
    session.mounted = true;
  }, []);
  return <div className={animate ? 'page-enter' : undefined}>{children}</div>;
}
