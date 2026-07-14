import type { Post } from '@/content/posts';
import type { Locale } from '@/i18n/routing';

import { site } from './site';

export function personJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/#person`,
    name: site.fullName,
    alternateName: site.handle,
    url: site.url,
    jobTitle: site.jobTitle[locale],
    email: `mailto:${site.email}`,
    worksFor: {
      '@type': 'Organization',
      name: site.company,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Três Rios',
      addressRegion: 'RJ',
      addressCountry: 'BR',
    },
    sameAs: [site.github, site.linkedin],
    knowsAbout: [
      'TypeScript',
      'Node.js',
      'React',
      'Next.js',
      'Go',
      'Event-driven architecture',
      'Computer vision',
      'OCR/ALPR',
      'NVIDIA DeepStream',
      'RabbitMQ',
      'AWS Lambda',
      'Clean Architecture',
      'Domain-driven design',
      'Microservices',
    ],
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: 'renanlido.me',
    inLanguage: locale === 'pt' ? 'pt-BR' : 'en',
    publisher: { '@id': `${site.url}/#person` },
  };
}

export function profilePageJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: personJsonLd(locale),
  };
}

export function blogPostingJsonLd(post: Post, locale: Locale) {
  const path = locale === 'pt' ? `/blog/${post.slug}` : `/en/blog/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title[locale],
    description: post.description[locale],
    datePublished: post.date,
    inLanguage: locale === 'pt' ? 'pt-BR' : 'en',
    url: `${site.url}${path}`,
    keywords: post.tags.join(', '),
    author: { '@id': `${site.url}/#person` },
    publisher: { '@id': `${site.url}/#person` },
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
