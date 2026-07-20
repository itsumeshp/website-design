import type { Media } from '@/payload-types'

type MediaLike = number | Media | null | undefined

/** Resolve a Payload upload relation to its URL + alt (safe for `next/image`). */
export const mediaUrl = (m: MediaLike): { url: string; alt: string } | null => {
  if (!m || typeof m === 'number') return null
  if (!m.url) return null
  return { url: m.url, alt: m.alt ?? '' }
}
