import 'server-only';
import { env, integrations } from './env';

/**
 * Add a contact with Brevo double opt-in. Brevo sends the confirmation email and only adds
 * the contact to the list once confirmed. Language is stored as the LANGUAGE attribute too.
 */
export async function subscribe({
  email,
  locale,
  source,
}: {
  email: string;
  locale: 'en' | 'fr';
  source?: string;
}) {
  if (!integrations.brevo) return { ok: true, skipped: true } as const;
  const listId = locale === 'fr' ? env.BREVO_LIST_ID_FR : env.BREVO_LIST_ID_EN;
  const templateId = locale === 'fr' ? env.BREVO_DOI_TEMPLATE_ID_FR : env.BREVO_DOI_TEMPLATE_ID_EN;
  if (!listId || !templateId)
    throw new Error('Brevo list or double opt-in template is not configured');

  const res = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
    method: 'POST',
    headers: {
      'api-key': env.BREVO_API_KEY!,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      includeListIds: [listId],
      templateId,
      redirectionUrl: `${env.NEXT_PUBLIC_SITE_URL}${locale === 'fr' ? '/fr' : ''}?subscribed=1`,
      attributes: { LANGUAGE: locale.toUpperCase(), SOURCE: source ?? 'website' },
    }),
  });
  if (!res.ok) {
    // An existing contact is still a success for the visitor.
    const err = (await res.json().catch(() => ({}))) as { code?: string };
    if (err.code !== 'duplicate_parameter')
      throw new Error(`Brevo error ${res.status} ${err.code ?? ''}`);
  }
  return { ok: true, skipped: false } as const;
}
