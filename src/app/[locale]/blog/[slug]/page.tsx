import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { use } from 'react';

import { getPost, posts, type Post } from '@/content/posts';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { blogPostingJsonLd, JsonLd } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const typedLocale = locale as Locale;
  const path = `/blog/${slug}`;

  return {
    title: post.title[typedLocale],
    description: post.description[typedLocale],
    alternates: {
      canonical: locale === 'pt' ? path : `/en${path}`,
      languages: {
        'pt-BR': path,
        en: `/en${path}`,
        'x-default': path,
      },
    },
    openGraph: {
      type: 'article',
      publishedTime: post.date,
      title: post.title[typedLocale],
      description: post.description[typedLocale],
    },
  };
}

function PostBody({ post }: { post: Post }) {
  const locale = useLocale() as Locale;

  return (
    <div className="space-y-6">
      {post.body.map((block, index) => {
        if (block.type === 'h2') {
          return (
            <h2 key={index} className="text-heading text-ink pt-4 font-bold">
              {block.text[locale]}
            </h2>
          );
        }

        if (block.type === 'ul') {
          return (
            <ul key={index} className="space-y-3">
              {block.items[locale].map((item) => (
                <li key={item} className="text-body text-ink flex gap-3">
                  <span
                    aria-hidden
                    className="bg-primary mt-2.5 size-1.5 shrink-0 rounded-full"
                  />
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'code') {
          return (
            <pre
              key={index}
              className="border-line bg-surface text-small text-ink overflow-x-auto rounded-md border p-5 font-mono"
            >
              <code>{block.code}</code>
            </pre>
          );
        }

        return (
          <p key={index} className="text-body text-ink">
            {block.text[locale]}
          </p>
        );
      })}
    </div>
  );
}

function PostView({ post }: { post: Post }) {
  const t = useTranslations('blog');
  const locale = useLocale() as Locale;

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <Link
        href="/blog"
        className="group text-small text-muted hover:text-primary inline-flex items-center gap-2 font-semibold transition-colors"
      >
        <ArrowLeft
          className="size-4 transition-transform duration-200 group-hover:-translate-x-1"
          aria-hidden
        />
        {t('backToBlog')}
      </Link>

      <header className="mt-8">
        <p className="text-label text-muted font-mono">
          {t('publishedAt')} {formatDate(post.date, locale)} ·{' '}
          {t('readingTime', { minutes: post.readingMinutes })}
        </p>
        <h1 className="text-title text-ink mt-3 font-extrabold">
          {post.title[locale]}
        </h1>
        <p className="text-lede text-muted mt-4">{post.description[locale]}</p>
        <p className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="border-line text-label text-muted rounded-full border px-3 py-1 font-mono"
            >
              {tag}
            </span>
          ))}
        </p>
      </header>

      <hr className="border-line my-10" />

      <PostBody post={post} />
    </article>
  );
}

export default function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = use(params);
  setRequestLocale(locale);

  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post, locale as Locale)} />
      <PostView post={post} />
    </>
  );
}
