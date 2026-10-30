import { NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/schemas';
import { clientIp, rateLimit } from '@/lib/server/rate-limit';
import { subscribe } from '@/lib/server/brevo';

export async function POST(req: Request) {
  if (!rateLimit(`newsletter:${clientIp(req)}`, { limit: 8 })) {
    return NextResponse.json({ error: 'rate' }, { status: 429 });
  }
  const json = await req.json().catch(() => null);
  if (json?.website) return NextResponse.json({ ok: true }); // honeypot
  const parsed = newsletterSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: 'validation' }, { status: 422 });
  try {
    const result = await subscribe(parsed.data);
    return NextResponse.json({ ok: true, delivered: !result.skipped });
  } catch (e) {
    console.error('[newsletter]', e);
    return NextResponse.json({ error: 'server' }, { status: 502 });
  }
}
