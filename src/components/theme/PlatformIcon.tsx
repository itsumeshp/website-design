'use client'

import { useState } from 'react'

// Simple Icons slugs (some platforms — e.g. Clutch — aren't in the set, so we
// fall back to a coloured monogram badge).
const SLUG: Record<string, string> = {
  google: 'google',
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
  const slug = platform ? SLUG[platform] : undefined

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
