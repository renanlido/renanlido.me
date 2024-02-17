import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'

import { cn } from '@/lib/utils'

import { chivo, dmSans, roboto } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meu portfólio pessoal',
  description: 'Em construção...',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn([dmSans.variable, roboto.variable, chivo.variable])}>
        {children}
        {process.env.NODE_ENV === 'production' && (
          <>
            <SpeedInsights />
            <Analytics />
          </>
        )}
      </body>
    </html>
  )
}
