import fs from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

const fontDir = path.join(process.cwd(), 'node_modules/@fontsource');
const fonts = Promise.all([
  fs.readFile(path.join(fontDir, 'urbanist/files/urbanist-latin-700-normal.woff')),
  fs.readFile(path.join(fontDir, 'urbanist/files/urbanist-latin-500-normal.woff')),
]);

/** Auto-generated Open Graph image: /og?title=…&locale=en|fr */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('title') ?? 'Activesite').slice(0, 110);
  const fr = searchParams.get('locale') === 'fr';
  const [serif, sans] = await fonts;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#FFFFFF',
        position: 'relative',
        fontFamily: 'Urbanist',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          width: 1100,
        }}
      >
        <div style={{ fontSize: 30, color: '#111318', letterSpacing: -0.5 }}>Activesite</div>
        <div
          style={{
            fontFamily: 'Display',
            fontWeight: 700,
            fontSize: title.length > 60 ? 64 : 80,
            lineHeight: 1.02,
            color: '#111318',
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 24, color: '#5B6170' }}>
          {fr ? 'activesite.cc · Douala, Cameroun' : 'activesite.cc · Douala, Cameroon'}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Display', data: serif, weight: 700, style: 'normal' },
        { name: 'Urbanist', data: sans, weight: 500, style: 'normal' },
      ],
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable' },
    },
  );
}
