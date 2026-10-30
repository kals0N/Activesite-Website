import { NextResponse } from 'next/server';
import { contactRequestSchema } from '@/lib/schemas';
import { getService, serviceKeys, type ServiceKey } from '@/lib/services';
import { clientIp, rateLimit } from '@/lib/server/rate-limit';
import { verifyTurnstile } from '@/lib/server/turnstile';
import { sendContactEmails } from '@/lib/server/mailer';
import { subscribe } from '@/lib/server/brevo';

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`contact:${ip}`, { limit: 5 })) {
    return NextResponse.json({ error: 'rate' }, { status: 429 });
  }

  const json = await req.json().catch(() => null);
  const parsed = contactRequestSchema.safeParse(json);
  if (!parsed.success) {
    // A filled honeypot means a bot: answer like a success so it learns nothing.
    if (json && typeof json === 'object' && 'website' in json && json.website) {
      return NextResponse.json({ ok: true });
    }
    const fields = Object.fromEntries(
      parsed.error.issues.map((i) => [i.path.join('.'), i.message]),
    );
    return NextResponse.json({ error: 'validation', fields }, { status: 422 });
  }

  const { turnstileToken, ...rest } = parsed.data;
  const input = { ...rest, website: undefined };
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ error: 'turnstile' }, { status: 400 });
  }

  const serviceName =
    input.service && (serviceKeys as readonly string[]).includes(input.service)
      ? getService(input.locale, input.service as ServiceKey).name
      : input.service === 'unsure'
        ? 'Not sure yet'
        : undefined;

  try {
    const { sent } = await sendContactEmails(input, serviceName);
    if (input.marketing) {
      await subscribe({ email: input.email, locale: input.locale, source: 'contact_form' }).catch(
        (e) => console.error('[contact] brevo', e),
      );
    }
    return NextResponse.json({ ok: true, delivered: sent });
  } catch (e) {
    console.error('[contact] send failed', e);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}
