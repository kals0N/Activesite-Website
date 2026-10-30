import fs from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { ARC_BOTTOM, ARC_TOP } from '@/components/ui/icons';

export const runtime = 'nodejs';

const fontDir = path.join(process.cwd(), 'node_modules/@fontsource');
const fonts = Promise.all([
  fs.readFile(path.join(fontDir, 'instrument-serif/files/instrument-serif-latin-400-normal.woff')),
  fs.readFile(path.join(fontDir, 'inter/files/inter-latin-500-normal.woff')),
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
        background: '#FAF8F4',
        position: 'relative',
        fontFamily: 'Inter',
      }}
    >
      <svg
        viewBox="2 3 36 35"
        width="560"
        height="560"
        style={{ position: 'absolute', right: -90, top: 35 }}
      >
        <path d={ARC_TOP} fill="#0058FB" />
        <path d={ARC_BOTTOM} fill="#000B30" />
      </svg>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          width: 820,
        }}
      >
        <div style={{ fontSize: 30, color: '#000B30', letterSpacing: -0.5 }}>Activesite</div>
        <div
          style={{
            fontFamily: 'Instrument Serif',
            fontSize: title.length > 60 ? 64 : 80,
            lineHeight: 1.02,
            color: '#000B30',
            letterSpacing: -1.5,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 24, color: '#4A5170' }}>
          {fr ? 'activesite.cc · Douala, Cameroun' : 'activesite.cc · Douala, Cameroon'}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Instrument Serif', data: serif, weight: 400, style: 'normal' },
        { name: 'Inter', data: sans, weight: 500, style: 'normal' },
      ],
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable' },
    },
  );
}
