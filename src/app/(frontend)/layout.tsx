import React from 'react'
import { DM_Sans, Ubuntu } from 'next/font/google'
import './styles.css'

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

  return (
    <html lang="en" className={`${ubuntu.variable} ${dmSans.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
