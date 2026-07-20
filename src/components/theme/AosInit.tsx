'use client'

import { useEffect } from 'react'
import AOS from 'aos'

/** Initialises AOS scroll animations (the theme's own library) once on mount. */
export default function AosInit() {
  useEffect(() => {
    AOS.init({ offset: 0, once: true })
    // Recalculate after images/layout settle.
    const t = setTimeout(() => AOS.refresh(), 300)
    return () => clearTimeout(t)
  }, [])
  return null
}
