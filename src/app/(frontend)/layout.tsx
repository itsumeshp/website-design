import React from 'react'

import Header from '@/components/theme/Header'
import Footer from '@/components/theme/Footer'
import AosInit from '@/components/theme/AosInit'
import Preloader from '@/components/theme/Preloader'
import BodyClass from '@/components/theme/BodyClass'
import { getHeader, getFooter, getSiteSettings } from '@/lib/queries'

import type { Metadata } from 'next'

// CMS-driven pages render per request (content changes without a rebuild, and
// the build never needs a live database).
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: {
    default: 'Fexo — IT Solution & Technology',
    template: '%s — Fexo',
  },
  description: 'Fexo — IT Solutions, Technology, Software and Business.',
  icons: { icon: '/assets/images/favicon.png' },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const [header, footer, settings] = await Promise.all([
    getHeader(),
    getFooter(),
    getSiteSettings(),
  ])

  return (
    <html lang="en">
      <head>
        {/* Google fonts (self-hosted by the theme) */}
        <link href="/assets/fonts/google/fonts.css" rel="stylesheet" />
        {/* FontAwesome */}
        <link rel="stylesheet" href="/assets/fonts/fontawesome/css/all.min.css" />
        {/* Plugin CSS */}
        <link rel="stylesheet" href="/assets/css/plugins/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/slick.css" />
        <link rel="stylesheet" href="/assets/css/plugins/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/plugins/aos.css" />
        {/* Theme CSS (must load last) */}
        <link rel="stylesheet" href="/assets/css/spacings.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        {/* Project overrides (must load after theme CSS) */}
        <link rel="stylesheet" href="/assets/css/overrides.css" />
      </head>
      <body className="home-one">
        <Preloader />
        <AosInit />
        <BodyClass />
        <Header header={header} settings={settings} />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main>{children}</main>
            <Footer footer={footer} settings={settings} />
          </div>
        </div>
      </body>
    </html>
  )
}
