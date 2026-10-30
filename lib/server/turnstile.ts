import 'server-only';
import { env, integrations } from './env';

/** Verify a Cloudflare Turnstile token. Passes when Turnstile is not configured (local/dev). */
export async function verifyTurnstile(token: string | undefined, ip: string) {
  if (!integrations.turnstile) return true;
  if (!token) return false;
  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY!,
    response: token,
    remoteip: ip,
  });
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}
