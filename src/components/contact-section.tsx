import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { site } from '@/lib/site';

import { ContactForm } from './contact-form';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './icons';
import { Reveal } from './reveal';

const channels = [
  { href: `mailto:${site.email}`, label: site.email, Icon: Mail },
  {
    href: site.linkedin,
    label: 'linkedin.com/in/renanlido',
    Icon: LinkedInIcon,
  },
  { href: site.github, label: 'github.com/renanlido', Icon: GitHubIcon },
  { href: site.whatsapp, label: 'WhatsApp', Icon: WhatsAppIcon },
];

export function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section
      id="contato"
      className="border-line bg-surface scroll-mt-20 border-t"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <Reveal>
          <h2 className="text-title text-ink font-extrabold">{t('title')}</h2>
          <p className="text-lede text-muted mt-4 max-w-[52ch]">{t('intro')}</p>

          <div className="mt-10 space-y-1">
            <p className="text-label text-muted font-mono">{t('orDirect')}</p>
            <ul className="divide-line divide-y">
              {channels.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={
                      href.startsWith('mailto:')
                        ? undefined
                        : 'noopener noreferrer'
                    }
                    className="group text-body text-ink hover:text-primary flex items-center gap-3 py-3.5 font-medium transition-colors"
                  >
                    <Icon
                      className="text-muted group-hover:text-primary size-[18px] transition-colors"
                      aria-hidden
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
