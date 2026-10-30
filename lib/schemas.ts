import { z } from 'zod';
import { serviceKeys } from './services';

export const timelines = ['asap', '1-3', '3-6', 'exploring'] as const;

/** Shared by the contact form (client) and the route handler (server). Messages are i18n keys. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'name').max(120, 'name'),
  email: z.string().trim().email('email').max(200, 'email'),
  whatsapp: z
    .string()
    .trim()
    .max(25, 'whatsapp')
    .regex(/^$|^\+?[0-9][0-9\s().-]{6,22}$/, 'whatsapp')
    .optional()
    .or(z.literal('')),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  service: z
    .enum([...serviceKeys, 'unsure'])
    .optional()
    .or(z.literal('')),
  timeline: z.enum(timelines).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'message').max(5000, 'message'),
  consent: z.literal(true, { message: 'consent' }),
  marketing: z.boolean().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const contactRequestSchema = contactSchema.extend({
  locale: z.enum(['en', 'fr']),
  website: z.string().max(0).optional().or(z.literal('')), // honeypot must stay empty
  turnstileToken: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email().max(200),
  locale: z.enum(['en', 'fr']),
  source: z.string().max(40).optional(),
  website: z.string().max(0).optional().or(z.literal('')).nullable(),
});
