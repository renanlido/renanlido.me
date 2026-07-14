import { useLocale, useTranslations } from 'next-intl';

import { cases, type CaseStudy } from '@/content/cases';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import { Reveal } from './reveal';

function StackChips({
  items,
  inverted = false,
}: {
  items: string[];
  inverted?: boolean;
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((tool) => (
        <li
          key={tool}
          className={cn(
            'text-label rounded-full border px-3 py-1 font-mono',
            inverted
              ? 'border-on-primary/25 text-on-primary/90'
              : 'border-line text-muted',
          )}
        >
          {tool}
        </li>
      ))}
    </ul>
  );
}

function Metrics({
  caseStudy,
  locale,
  inverted = false,
}: {
  caseStudy: CaseStudy;
  locale: Locale;
  inverted?: boolean;
}) {
  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-4">
      {caseStudy.metrics.map((metric) => (
        <div key={metric.value}>
          <dt
            className={cn(
              'text-label font-mono',
              inverted ? 'text-on-primary/70' : 'text-muted',
            )}
          >
            {metric.label[locale]}
          </dt>
          <dd
            className={cn(
              'text-heading font-extrabold tracking-tight',
              inverted ? 'text-on-primary' : 'text-ink',
            )}
          >
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function FlagshipCase({
  caseStudy,
  locale,
}: {
  caseStudy: CaseStudy;
  locale: Locale;
}) {
  const t = useTranslations('cases');

  return (
    <Reveal>
      <article className="bg-primary text-on-primary rounded-lg px-6 py-10 md:px-12 md:py-14">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-heading font-extrabold tracking-tight">
            {caseStudy.client}
          </p>
          <p className="text-label text-on-primary/70 font-mono">
            {caseStudy.role[locale]} · {caseStudy.period[locale]}
          </p>
        </div>

        <h3 className="text-title mt-6 max-w-2xl font-extrabold">
          {caseStudy.headline[locale]}
        </h3>

        <p className="text-lede text-on-primary/85 mt-5 max-w-[65ch]">
          {caseStudy.context[locale]}
        </p>

        <ul className="mt-8 max-w-3xl space-y-3">
          {caseStudy.bullets[locale].map((bullet) => (
            <li
              key={bullet}
              className="text-body text-on-primary/90 flex gap-3"
            >
              <span
                aria-hidden
                className="bg-accent mt-2.5 size-1.5 shrink-0 rounded-full"
              />
              {bullet}
            </li>
          ))}
        </ul>

        <div className="border-on-primary/20 mt-10 flex flex-col gap-8 border-t pt-8 md:flex-row md:items-end md:justify-between">
          <Metrics caseStudy={caseStudy} locale={locale} inverted />
          <div className="max-w-md space-y-2">
            <p className="text-label text-on-primary/70 font-mono">
              {t('stack')}
            </p>
            <StackChips items={caseStudy.stack} inverted />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function SupportingCase({
  caseStudy,
  locale,
  className,
  delay,
  tinted = false,
}: {
  caseStudy: CaseStudy;
  locale: Locale;
  className?: string;
  delay?: number;
  tinted?: boolean;
}) {
  const t = useTranslations('cases');

  return (
    <Reveal className={className} delay={delay}>
      <article
        className={cn(
          'border-line flex h-full flex-col rounded-lg border px-6 py-8 md:px-9 md:py-10',
          tinted ? 'bg-tint' : 'bg-bg',
        )}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-heading text-ink font-extrabold tracking-tight">
            {caseStudy.client}
          </p>
          <p className="text-label text-muted font-mono">
            {caseStudy.role[locale]}
          </p>
        </div>

        <h3 className="text-heading text-ink mt-4 font-bold">
          {caseStudy.headline[locale]}
        </h3>

        <p className="text-body text-muted mt-3 max-w-[62ch]">
          {caseStudy.context[locale]}
        </p>

        <ul className="mt-6 space-y-2.5">
          {caseStudy.bullets[locale].map((bullet) => (
            <li key={bullet} className="text-body text-ink flex gap-3">
              <span
                aria-hidden
                className="bg-primary mt-2.5 size-1.5 shrink-0 rounded-full"
              />
              {bullet}
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-6 pt-8">
          <Metrics caseStudy={caseStudy} locale={locale} />
          <div className="border-line space-y-2 border-t pt-5">
            <p className="text-label text-muted font-mono">{t('stack')}</p>
            <StackChips items={caseStudy.stack} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function CasesSection() {
  const t = useTranslations('cases');
  const locale = useLocale() as Locale;
  const [flagship, ...supporting] = cases;

  return (
    <section id="provas" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="text-title text-ink font-extrabold">{t('title')}</h2>
          <p className="text-lede text-muted mt-4 max-w-[58ch]">{t('intro')}</p>
        </Reveal>

        <div className="mt-12 space-y-6 md:mt-16">
          <FlagshipCase caseStudy={flagship} locale={locale} />

          <SupportingCase caseStudy={supporting[0]} locale={locale} />

          <div className="grid gap-6 lg:grid-cols-2">
            <SupportingCase caseStudy={supporting[1]} locale={locale} tinted />
            <SupportingCase
              caseStudy={supporting[2]}
              locale={locale}
              delay={120}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
