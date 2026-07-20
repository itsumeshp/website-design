'use client'

import { useEffect, useState } from 'react'

/** Full-screen loader that fades out after mount (replaces the theme's jQuery fade). */
export default function Preloader() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="preloader"
      style={{
        opacity: hidden ? 0 : 1,
        visibility: hidden ? 'hidden' : 'visible',
        transition: 'opacity 0.5s ease, visibility 0.5s ease',
      }}
    >
      <div className="loading-wrapper">
        <div className="loading" />
        <div id="loading-icon">
          <img src="/assets/images/loader.png" alt="loader" />
        </div>
      </div>
    </div>
  )
}
