import type { MetadataRoute } from 'next';

import { posts } from '@/content/posts';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = posts
    .map((post) => post.date)
    .sort()
    .at(-1);

  const entries: MetadataRoute.Sitemap = [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          'pt-BR': site.url,
          en: `${site.url}/en`,
        },
      },
    },
    {
      url: `${site.url}/blog`,
      lastModified: latestPost ? new Date(latestPost) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          'pt-BR': `${site.url}/blog`,
          en: `${site.url}/en/blog`,
        },
      },
    },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          'pt-BR': `${site.url}/blog/${post.slug}`,
          en: `${site.url}/en/blog/${post.slug}`,
        },
      },
    })),
  ];

  return entries;
}
