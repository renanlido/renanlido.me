import { useLocale, useTranslations } from 'next-intl';

import { arsenal } from '@/content/arsenal';
import type { Locale } from '@/i18n/routing';

import { Reveal } from './reveal';

export function ArsenalSection() {
  const t = useTranslations('arsenal');
  const locale = useLocale() as Locale;

  return (
    <section
      id="arsenal"
      className="border-line bg-surface scroll-mt-20 border-y"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="text-title text-ink font-extrabold">{t('title')}</h2>
          <p className="text-lede text-muted mt-4 max-w-[58ch]">{t('intro')}</p>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <dl className="divide-line border-line divide-y border-y">
            {arsenal.map((layer) => (
              <div
                key={layer.id}
                className="grid gap-3 py-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10"
              >
                <div>
                  <dt className="text-heading text-ink font-bold">
                    {layer.name[locale]}
                  </dt>
                  <p className="text-small text-muted mt-1">
                    {layer.quip[locale]}
                  </p>
                </div>
                <dd className="flex flex-wrap content-start items-start gap-2">
                  {layer.tools.map((tool) => (
                    <span
                      key={tool}
                      className="border-line bg-bg text-label text-ink rounded-full border px-3 py-1 font-mono"
                    >
                      {tool}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="mt-10 max-w-[65ch] space-y-5" delay={80}>
          <p className="text-body text-ink">{t('architecture')}</p>
          <p className="text-body text-muted">{t('bio')}</p>
        </Reveal>
      </div>
    </section>
  );
}
