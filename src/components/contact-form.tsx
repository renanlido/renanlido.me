'use client';

import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useRef } from 'react';

import { sendContact, type ContactState } from '@/actions/contact';
import { cn } from '@/lib/utils';

const initialState: ContactState = { status: 'idle' };

const fieldClass =
  'w-full rounded-md border border-line bg-bg px-4 py-3 text-body text-ink placeholder:text-muted/70 transition-colors duration-200 focus:border-primary';

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-small text-primary mt-1.5 font-medium">
      {message}
    </p>
  );
}

export function ContactForm() {
  const t = useTranslations('contact');
  const [state, formAction, pending] = useActionState(
    sendContact,
    initialState,
  );
  const startedAtRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startedAtRef.current) {
      startedAtRef.current.value = String(Date.now());
    }
  }, [state.status]);

  if (state.status === 'success') {
    return (
      <div
        role="status"
        className="border-line bg-tint flex h-full min-h-80 flex-col items-start justify-center gap-4 rounded-lg border p-8 md:p-10"
      >
        <p className="text-heading text-ink font-extrabold">
          {t('successTitle')}
        </p>
        <p className="text-body text-muted max-w-[48ch]">{t('successBody')}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="border-line text-small text-ink hover:border-primary hover:text-primary mt-2 inline-flex h-11 items-center rounded-full border px-5 font-semibold transition-colors"
        >
          {t('sendAnother')}
        </button>
      </div>
    );
  }

  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <input
        ref={startedAtRef}
        type="hidden"
        name="startedAt"
        defaultValue="0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="text-small text-ink mb-1.5 block font-semibold"
          >
            {t('nameLabel')}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            defaultValue={state.values?.name}
            placeholder={t('namePlaceholder')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={cn(fieldClass, errors.name && 'border-primary')}
          />
          <FieldError
            id="contact-name-error"
            message={
              errors.name ? t(`validation.${errors.name}` as never) : undefined
            }
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="text-small text-ink mb-1.5 block font-semibold"
          >
            {t('emailLabel')}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            defaultValue={state.values?.email}
            placeholder={t('emailPlaceholder')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={cn(fieldClass, errors.email && 'border-primary')}
          />
          <FieldError
            id="contact-email-error"
            message={
              errors.email
                ? t(`validation.${errors.email}` as never)
                : undefined
            }
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-company"
          className="text-small text-ink mb-1.5 block font-semibold"
        >
          {t('companyLabel')}
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          defaultValue={state.values?.company}
          placeholder={t('companyPlaceholder')}
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="text-small text-ink mb-1.5 block font-semibold"
        >
          {t('messageLabel')}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          defaultValue={state.values?.message}
          placeholder={t('messagePlaceholder')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? 'contact-message-error' : undefined
          }
          className={cn(
            fieldClass,
            'resize-y',
            errors.message && 'border-primary',
          )}
        />
        <FieldError
          id="contact-message-error"
          message={
            errors.message
              ? t(`validation.${errors.message}` as never)
              : undefined
          }
        />
      </div>

      {state.status === 'error' && !state.errors && (
        <p
          role="alert"
          className="border-primary/40 bg-tint text-small text-ink rounded-md border px-4 py-3"
        >
          {t('errorGeneric')}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-accent text-body text-on-accent hover:bg-accent-strong inline-flex h-13 items-center gap-2.5 rounded-full px-8 font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:translate-y-0 disabled:opacity-60"
      >
        <Send className="size-[18px]" aria-hidden />
        {pending ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}
