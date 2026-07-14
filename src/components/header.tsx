import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

import { LocaleSwitch } from './locale-switch';
import { NavLinks } from './nav-links';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  const t = useTranslations('nav');

  return (
    <header className="border-line bg-bg sticky top-0 z-40 border-b">
      <a
        href="#conteudo"
        className="focus:bg-primary focus:text-on-primary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2"
      >
        {t('skipToContent')}
      </a>

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link
          href="/"
          className="text-ink hover:text-primary text-lg font-bold tracking-tight transition-colors"
        >
          renanlido<span className="text-primary">.me</span>
        </Link>

        <nav
          aria-label={t('menu')}
          className="hidden items-center gap-7 md:flex"
        >
          <NavLinks
            labels={{
              cases: t('cases'),
              stack: t('stack'),
              blog: t('blog'),
              contact: t('contact'),
            }}
          />
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitch label={t('switchToEnglish')} />
          <ThemeToggle label={t('toggleTheme')} />
        </div>
      </div>
    </header>
  );
}
