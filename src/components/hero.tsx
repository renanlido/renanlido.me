import { ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { site } from '@/lib/site';

import { AvatarGlyph } from './avatar-glyph';
import { PulseLine } from './pulse-line';

const clients = ['Embraer', 'Heineken', 'Priime', 'Bilheteria Digital'];

export function Hero() {
  const t = useTranslations('hero');
  const years = new Date().getFullYear() - site.codingSince;

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 pt-14 pb-16 md:px-8 md:pt-24 md:pb-24">
        <div className="flex items-start justify-between gap-8">
          <div className="max-w-3xl">
            <p
              className="hero-rise border-line bg-surface text-label text-ink inline-flex items-center gap-2.5 rounded-full border px-4 py-2 font-mono font-medium"
              style={{ animationDelay: '0ms' }}
            >
              <span className="relative flex size-2.5">
                <span className="bg-ok absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none" />
                <span className="bg-ok relative inline-flex size-2.5 rounded-full" />
              </span>
              {t('status')}
            </p>

            <h1
              className="hero-rise text-display text-ink mt-7 font-extrabold"
              style={{ animationDelay: '90ms' }}
            >
              {t('titleA')} <mark>{t('titleB')}</mark>
            </h1>

            <p
              className="hero-rise text-lede text-muted mt-6 max-w-[62ch]"
              style={{ animationDelay: '180ms' }}
            >
              {t('lede')}
            </p>

            <div
              className="hero-rise mt-9 flex flex-wrap items-center gap-4"
              style={{ animationDelay: '270ms' }}
            >
              <a
                href="#contato"
                className="bg-accent text-body text-on-accent hover:bg-accent-strong inline-flex h-13 items-center rounded-full px-7 font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
              >
                {t('ctaPrimary')}
              </a>
              <a
                href="#provas"
                className="group border-line text-body text-ink hover:border-primary hover:text-primary inline-flex h-13 items-center gap-2 rounded-full border px-7 font-semibold transition-colors duration-200"
              >
                {t('ctaSecondary')}
                <ArrowDown
                  className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden
                />
              </a>
            </div>

            <div
              className="hero-rise mt-12 flex flex-wrap items-baseline gap-x-5 gap-y-2"
              style={{ animationDelay: '360ms' }}
            >
              <span className="text-label text-muted">{t('clientsLabel')}</span>
              <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                {clients.map((client) => (
                  <li
                    key={client}
                    className="text-body text-ink font-bold tracking-tight"
                  >
                    {client}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="hero-rise hidden shrink-0 lg:block"
            style={{ animationDelay: '240ms' }}
          >
            <AvatarGlyph className="size-40 xl:size-48" />
          </div>
        </div>
      </div>

      <div className="border-line bg-surface border-y">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-4 md:px-8">
          <PulseLine className="text-primary h-10 w-full" />
          <p className="text-label text-muted font-mono">
            {t('uptimeLabel', { years })}
          </p>
        </div>
      </div>
    </section>
  );
}
