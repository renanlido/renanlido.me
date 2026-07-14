import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { site } from '@/lib/site';

import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './icons';

const socials = [
  { href: site.github, label: 'GitHub', Icon: GitHubIcon },
  { href: site.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: site.whatsapp, label: 'WhatsApp', Icon: WhatsAppIcon },
  { href: `mailto:${site.email}`, label: 'E-mail', Icon: Mail },
];

export function Footer() {
  const t = useTranslations('footer');
  const tParty = useTranslations('party');
  const year = new Date().getFullYear();

  return (
    <footer className="border-line bg-surface border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-14 md:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="space-y-2">
            <p className="text-lg font-bold tracking-tight">
              renanlido<span className="text-primary">.me</span>
            </p>
            <p className="text-small text-muted max-w-md">{t('builtWith')}</p>
          </div>

          <ul className="flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="border-line text-ink hover:border-primary hover:text-primary grid size-11 place-items-center rounded-full border transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon className="size-[18px]" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-line text-label text-muted flex flex-col items-start justify-between gap-3 border-t pt-6 md:flex-row md:items-center">
          <p>
            © {year} {site.fullName}. {t('rights')}
          </p>
          <p className="font-mono" title={tParty('toast')}>
            {tParty('hint')}
          </p>
          <p>
            <a
              href={`${site.github}/renanlido.me`}
              target="_blank"
              rel="noopener noreferrer"
              className="decoration-line hover:text-ink underline underline-offset-4 transition-colors"
            >
              {t('sourceHint')}
            </a>
          </p>
        </div>

        <p className="sr-only">
          <Link href="/blog">Blog</Link>
        </p>
      </div>
    </footer>
  );
}
