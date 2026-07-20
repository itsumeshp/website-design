'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Sets the theme's body class per route: home vs inner pages. */
export default function BodyClass() {
  const pathname = usePathname()
  useEffect(() => {
    const cls = pathname === '/' ? 'home-one' : 'axis-innerpage'
    document.body.classList.remove('home-one', 'axis-innerpage')
    document.body.classList.add(cls)
  }, [pathname])
  return null
}
