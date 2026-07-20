'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Header as HeaderGlobal, SiteSetting } from '@/payload-types'
import { Container } from './ui'

type Props = {
  siteName: string
  nav: NonNullable<HeaderGlobal['nav']>
  cta?: HeaderGlobal['cta']
}

export default function Header({ siteName, nav, cta }: Props) {
  const [sticky, setSticky] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Sticky shadow when scrolling up past 200px (mirrors the theme behaviour).
  useEffect(() => {
    let last = 0
    const onScroll = () => {
      const y = window.scrollY
      setSticky(y > 200 && y < last)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border-muted/60 bg-white/95 backdrop-blur transition-shadow ${
        sticky ? 'shadow-md' : ''
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="font-heading text-2xl font-bold text-heading">
          {siteName}
          <span className="text-primary">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <div key={item.id ?? item.label} className="group relative">
              <Link
                href={item.url}
                className="font-heading text-sm font-medium text-heading transition hover:text-primary"
              >
                {item.label}
              </Link>
              {item.sublinks && item.sublinks.length > 0 ? (
                <div className="invisible absolute left-0 top-full min-w-48 rounded-lg border border-border-muted bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                  {item.sublinks.map((sl) => (
                    <Link
                      key={sl.id ?? sl.label}
                      href={sl.url}
                      className="block rounded px-3 py-2 text-sm text-body-text transition hover:bg-gray-bg hover:text-primary"
                    >
                      {sl.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {cta?.label && cta.url ? (
            <Link
              href={cta.url}
              className="hidden rounded-full bg-primary px-6 py-2.5 font-heading text-sm font-medium text-white transition hover:bg-heading sm:inline-block"
            >
              {cta.label}
            </Link>
          ) : null}
          <button
            type="button"
            aria-label="Toggle menu"
            className="lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-heading" />
            <span className="mt-1.5 block h-0.5 w-6 bg-heading" />
            <span className="mt-1.5 block h-0.5 w-6 bg-heading" />
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {menuOpen ? (
        <nav className="border-t border-border-muted bg-white lg:hidden">
          <Container className="flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.id ?? item.label}
                href={item.url}
                className="py-2 font-heading text-sm font-medium text-heading"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      ) : null}
    </header>
  )
}
