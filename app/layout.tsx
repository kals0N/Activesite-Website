import type { ReactNode } from 'react';
import './globals.css';

// The real root layout (with <html>) lives in app/[locale]/layout.tsx so `lang` matches the page.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
