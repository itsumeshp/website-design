'use client'

import { useState } from 'react'

// Authentic full-colour logos we host locally (Simple Icons are monochrome, so
// Google would render as a flat blue "G" and Clutch has no icon at all).
const LOCAL: Record<string, string> = {
  google: '/assets/images/reviews/google.svg',
  clutch: '/assets/images/reviews/clutch.png',
}
// Simple Icons slugs for platforms whose single-colour mark already looks right.
const SLUG: Record<string, string> = {
  upwork: 'upwork',
  freelancer: 'freelancer',
  trustpilot: 'trustpilot',
  g2: 'g2',
  linkedin: 'linkedin',
}
const COLOR: Record<string, string> = {
  clutch: '#ff3d2e',
  google: '#4285f4',
  upwork: '#14a800',
  freelancer: '#29b2fe',
  trustpilot: '#00b67a',
  g2: '#ff492c',
  linkedin: '#0a66c2',
  other: '#e10600',
}

export default function PlatformIcon({
  platform,
  className,
}: {
  platform?: string | null
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const local = platform ? LOCAL[platform] : undefined
  const slug = platform ? SLUG[platform] : undefined

  if (local && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img className={className} src={local} alt={platform ?? ''} onError={() => setFailed(true)} />
    )
  }
  if (!slug || failed) {
    return (
      <span
        className={`ix-plat-mono ${className ?? ''}`}
        style={{ background: COLOR[platform ?? 'other'] ?? 'var(--primary-color)' }}
        aria-hidden="true"
      >
        {(platform ?? '?').charAt(0).toUpperCase()}
      </span>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={`https://cdn.simpleicons.org/${slug}`}
      alt={platform ?? ''}
      onError={() => setFailed(true)}
    />
  )
}
