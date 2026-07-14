'use server';

import { Resend } from 'resend';
import { z } from 'zod';

import { ContactEmail } from '@/emails/contact-email';
import { site } from '@/lib/site';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'nameRequired'),
  email: z.email('emailInvalid'),
  company: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((value) => value || undefined),
  message: z.string().trim().min(10, 'messageTooShort'),
});

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  errors?: Partial<Record<'name' | 'email' | 'message', string>>;
  values?: { name: string; email: string; company: string; message: string };
};

const MIN_SUBMIT_MS = 2500;

export async function sendContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    company: String(formData.get('company') ?? ''),
    message: String(formData.get('message') ?? ''),
  };

  const honeypot = String(formData.get('website') ?? '');
  const startedAt = Number(formData.get('startedAt') ?? 0);
  const tooFast = startedAt > 0 && Date.now() - startedAt < MIN_SUBMIT_MS;

  if (honeypot || tooFast) {
    return { status: 'success' };
  }

  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    const errors: ContactState['errors'] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === 'name' || field === 'email' || field === 'message') {
        errors[field] ??= issue.message;
      }
    }
    return { status: 'error', errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return { status: 'error', values };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from:
      process.env.CONTACT_FROM_EMAIL ??
      'renanlido.me <contato@ntdstech.com.br>',
    to: process.env.CONTACT_TO_EMAIL ?? site.email,
    replyTo: parsed.data.email,
    subject: `Contato via site: ${parsed.data.name}${parsed.data.company ? ` (${parsed.data.company})` : ''}`,
    react: ContactEmail(parsed.data),
  });

  if (error) {
    console.error('Resend error:', error);
    return { status: 'error', values };
  }

  return { status: 'success' };
}
