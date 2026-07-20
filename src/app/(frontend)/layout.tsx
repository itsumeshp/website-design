import React from 'react'
import { DM_Sans, Ubuntu } from 'next/font/google'
import './styles.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getHeader, getFooter, getSiteSettings } from '@/lib/queries'

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ubuntu',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Fexo — Company Website',
  description: 'Company website built with Next.js and Payload CMS.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const [header, footer, settings] = await Promise.all([
    getHeader(),
    getFooter(),
    getSiteSettings(),
  ])

  return (
    <html lang="en" className={`${ubuntu.variable} ${dmSans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header siteName={settings.siteName} nav={header.nav ?? []} cta={header.cta} />
        <main className="flex-1">{children}</main>
        <Footer footer={footer} settings={settings} />
      </body>
    </html>
  )
}
