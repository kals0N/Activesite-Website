import Link from 'next/link';

// Fallback for requests that never reach a locale (rare: the proxy rewrites almost everything).
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{ fontFamily: 'system-ui, sans-serif', padding: '4rem 1rem', textAlign: 'center' }}
      >
        <h1>Page not found</h1>
        <p>
          <Link href="/">Back to Activesite</Link>
        </p>
      </body>
    </html>
  );
}
