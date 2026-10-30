import 'server-only';
import nodemailer from 'nodemailer';
import type { ContactInput } from '@/lib/schemas';
import { site } from '@/lib/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { env, integrations } from './env';

const transport = integrations.smtp
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    })
  : null;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function layout(body: string) {
  return `<!doctype html><html><body style="margin:0;background:#FAF8F4;font-family:Inter,Arial,sans-serif;color:#000B30">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border:1px solid #E4DED3;border-radius:16px">
<tr><td style="padding:32px">
<p style="margin:0 0 24px;font-size:20px;font-weight:600;letter-spacing:-0.03em">Activesite</p>
${body}
<p style="margin:32px 0 0;font-size:13px;color:#4A5170">Activesite · ${site.location.city}, ${site.location.country} · <a href="mailto:${site.email}" style="color:#0058FB">${site.email}</a></p>
</td></tr></table></td></tr></table></body></html>`;
}

const copy = {
  en: {
    subject: 'We received your project details',
    hi: (n: string) => `Hi ${n},`,
    body: 'Thank you for contacting Activesite. We have your message and will reply personally soon.',
    wa: 'Want a faster answer? Message us on WhatsApp',
    sign: 'Tanwi Kalson, Founder',
    summary: 'Your message',
  },
  fr: {
    subject: 'Nous avons bien reçu votre projet',
    hi: (n: string) => `Bonjour ${n},`,
    body: 'Merci d’avoir contacté Activesite. Nous avons bien reçu votre message et vous répondrons personnellement très bientôt.',
    wa: 'Besoin d’une réponse plus rapide ? Écrivez-nous sur WhatsApp',
    sign: 'Tanwi Kalson, Fondateur',
    summary: 'Votre message',
  },
};

export type SendResult = { sent: boolean };

/** Sends the lead to the team and a branded auto-reply in the visitor's language. */
export async function sendContactEmails(input: ContactInput & { locale: 'en' | 'fr' }, serviceName?: string): Promise<SendResult> {
  if (!transport) return { sent: false };
  const c = copy[input.locale];
  const rows: [string, string | undefined][] = [
    ['Name', input.name],
    ['Email', input.email],
    ['WhatsApp', input.whatsapp || undefined],
    ['Company', input.company || undefined],
    ['Service', serviceName],
    ['Timeline', input.timeline || undefined],
    ['Language', input.locale.toUpperCase()],
    ['Marketing consent', input.marketing ? 'Yes' : 'No'],
  ];
  const table = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#4A5170;font-size:14px">${k}</td><td style="padding:6px 0;font-size:14px">${esc(v!)}</td></tr>`)
    .join('');

  await transport.sendMail({
    from: env.CONTACT_FROM,
    to: env.CONTACT_TO,
    replyTo: input.email,
    subject: `New lead: ${input.name}${serviceName ? ` · ${serviceName}` : ''}`,
    text: `${rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${input.message}`,
    html: layout(`<table>${table}</table><p style="margin:24px 0 0;font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(input.message)}</p>`),
  });

  await transport.sendMail({
    from: env.CONTACT_FROM,
    to: input.email,
    subject: c.subject,
    text: `${c.hi(input.name)}\n\n${c.body}\n\n${c.wa}: ${whatsappUrl()}\n\n${c.sign}`,
    html: layout(`<p style="margin:0 0 16px;font-size:16px">${esc(c.hi(input.name))}</p>
<p style="margin:0 0 16px;font-size:16px;line-height:1.6">${c.body}</p>
<p style="margin:0 0 24px"><a href="${whatsappUrl()}" style="display:inline-block;background:#128C4B;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:999px;font-size:15px">${c.wa}</a></p>
<p style="margin:0 0 8px;font-size:14px;color:#4A5170">${c.summary}</p>
<blockquote style="margin:0;padding:12px 16px;border-left:2px solid #E8B04B;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(input.message)}</blockquote>
<p style="margin:24px 0 0;font-size:16px">${c.sign}</p>`),
  });

  return { sent: true };
}
