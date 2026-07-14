import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { PulseLine } from '@/components/pulse-line';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-6 px-5 py-24 md:px-8 md:py-36">
      <PulseLine className="text-primary h-12 w-full max-w-sm" />
      <h1 className="text-title text-ink font-extrabold">{t('title')}</h1>
      <p className="text-lede text-muted max-w-[55ch]">{t('body')}</p>
      <Link
        href="/"
        className="bg-accent text-body text-on-accent hover:bg-accent-strong inline-flex h-13 items-center rounded-full px-7 font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      >
        {t('cta')}
      </Link>
    </div>
  );
}
