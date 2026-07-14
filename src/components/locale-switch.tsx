'use client';

import { useLocale } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';

export function LocaleSwitch({ label }: { label: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const next = locale === 'pt' ? 'en' : 'pt';

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => router.replace(pathname, { locale: next })}
      className="border-line text-label text-ink hover:border-primary hover:text-primary h-10 rounded-full border px-4 font-mono font-medium tracking-wide uppercase transition-colors duration-200"
    >
      {next}
    </button>
  );
}
