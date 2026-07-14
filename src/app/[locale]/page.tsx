import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { ArsenalSection } from '@/components/arsenal-section';
import { BlogSection } from '@/components/blog-section';
import { CasesSection } from '@/components/cases-section';
import { ContactSection } from '@/components/contact-section';
import { Hero } from '@/components/hero';
import { profilePageJsonLd, JsonLd } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={profilePageJsonLd(locale as Locale)} />
      <Hero />
      <CasesSection />
      <ArsenalSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
