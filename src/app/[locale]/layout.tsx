import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { EasterEggs } from '@/components/easter-eggs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { routing, type Locale } from '@/i18n/routing';
import { bricolage, jetbrains } from '@/lib/fonts';
import { JsonLd, personJsonLd, websiteJsonLd } from '@/lib/seo';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t('title'),
      template: `%s — ${site.name}`,
    },
    description: t('description'),
    alternates: {
      canonical: locale === 'pt' ? '/' : '/en',
      languages: {
        'pt-BR': '/',
        en: '/en',
        'x-default': '/',
      },
    },
    openGraph: {
      type: 'website',
      url: locale === 'pt' ? '/' : '/en',
      siteName: 'renanlido.me',
      title: t('title'),
      description: t('description'),
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const tParty = await getTranslations({ locale, namespace: 'party' });

  return (
    <html
      lang={locale === 'pt' ? 'pt-BR' : 'en'}
      suppressHydrationWarning
      className={cn(bricolage.variable, jetbrains.variable)}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <JsonLd
          data={[
            personJsonLd(locale as Locale),
            websiteJsonLd(locale as Locale),
          ]}
        />
      </head>
      <body className="min-h-svh">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider>
            <Header />
            <main id="conteudo">{children}</main>
            <Footer />
            <EasterEggs
              partyToast={tParty('toast')}
              awayTitle={tParty('awayTitle')}
            />
          </NextIntlClientProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && (
          <>
            <SpeedInsights />
            <Analytics />
          </>
        )}
      </body>
    </html>
  );
}
