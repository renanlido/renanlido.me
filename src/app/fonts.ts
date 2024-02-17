/* eslint-disable camelcase */
import { Chivo, DM_Sans, Roboto } from 'next/font/google'

export const chivo = Chivo({ subsets: ['latin'], variable: '--font-chivo' })
export const dmSans = DM_Sans({
  weight: ['100', '200', '500', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
})
export const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})
