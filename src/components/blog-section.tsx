import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { posts } from '@/content/posts';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { formatDate } from '@/lib/utils';

import { Reveal } from './reveal';

export function BlogSection() {
  const t = useTranslations('blog');
  const locale = useLocale() as Locale;
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section id="blog" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-title text-ink font-extrabold">{t('title')}</h2>
            <p className="text-lede text-muted mt-4 max-w-[58ch]">
              {t('intro')}
            </p>
          </div>
          <Link
            href="/blog"
            className="group text-body text-primary hover:text-primary-strong inline-flex items-center gap-2 font-semibold transition-colors"
          >
            {t('allPosts')}
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </Reveal>

        <div className="divide-line border-line mt-10 divide-y border-y md:mt-14">
          {latest.map((post, index) => (
            <Reveal key={post.slug} delay={index * 90}>
              <article>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-2 py-8 md:grid-cols-[10rem_minmax(0,1fr)_auto] md:items-baseline md:gap-8"
                >
                  <p className="text-label text-muted font-mono">
                    {formatDate(post.date, locale)}
                  </p>
                  <div>
                    <h3 className="text-heading text-ink group-hover:text-primary font-bold transition-colors duration-200">
                      {post.title[locale]}
                    </h3>
                    <p className="text-body text-muted mt-2 max-w-[65ch]">
                      {post.description[locale]}
                    </p>
                  </div>
                  <p className="text-label text-muted font-mono">
                    {t('readingTime', { minutes: post.readingMinutes })}
                  </p>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
