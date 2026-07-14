import type { Metadata } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { Reveal } from '@/components/reveal';
import { posts } from '@/content/posts';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { formatDate } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('blogTitle'),
    description: t('blogDescription'),
    alternates: {
      canonical: locale === 'pt' ? '/blog' : '/en/blog',
      languages: {
        'pt-BR': '/blog',
        en: '/en/blog',
        'x-default': '/blog',
      },
    },
  };
}

function BlogList() {
  const t = useTranslations('blog');
  const locale = useLocale() as Locale;
  const ordered = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-16 md:px-8 md:py-24">
      <Reveal>
        <h1 className="text-title text-ink font-extrabold">{t('title')}</h1>
        <p className="text-lede text-muted mt-4 max-w-[58ch]">{t('intro')}</p>
      </Reveal>

      <div className="divide-line border-line mt-12 divide-y border-y">
        {ordered.map((post, index) => (
          <Reveal key={post.slug} delay={index * 80}>
            <article>
              <Link href={`/blog/${post.slug}`} className="group block py-8">
                <p className="text-label text-muted font-mono">
                  {formatDate(post.date, locale)} ·{' '}
                  {t('readingTime', { minutes: post.readingMinutes })}
                </p>
                <h2 className="text-heading text-ink group-hover:text-primary mt-2 font-bold transition-colors duration-200">
                  {post.title[locale]}
                </h2>
                <p className="text-body text-muted mt-2 max-w-[65ch]">
                  {post.description[locale]}
                </p>
                <p className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border-line text-label text-muted rounded-full border px-3 py-1 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </p>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <BlogList />;
}
