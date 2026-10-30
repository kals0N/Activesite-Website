import 'server-only';
import { z } from 'zod';

/** Server environment. Every value is optional so the site builds and runs without integrations. */
const schema = z.object({
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().default(465),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  CONTACT_TO: z.string().email().default('contact@activesite.cc'),
  CONTACT_FROM: z.string().default('Activesite <contact@activesite.cc>'),
  BREVO_API_KEY: z.string().optional(),
  BREVO_LIST_ID_EN: z.coerce.number().optional(),
  BREVO_LIST_ID_FR: z.coerce.number().optional(),
  BREVO_DOI_TEMPLATE_ID_EN: z.coerce.number().optional(),
  BREVO_DOI_TEMPLATE_ID_FR: z.coerce.number().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('https://activesite.cc'),
});

export const env = schema.parse(process.env);

export const integrations = {
  smtp: Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS),
  brevo: Boolean(env.BREVO_API_KEY),
  turnstile: Boolean(env.TURNSTILE_SECRET_KEY),
};
