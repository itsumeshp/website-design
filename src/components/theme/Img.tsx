import NextImage from 'next/image'
import type { Media } from '@/payload-types'

/**
 * Renders an optimized next/image when a real CMS upload is available (using
 * the media doc's true dimensions); otherwise falls back to a plain <img> so
 * the theme's placeholder assets keep their exact styling.
 */
export default function Img({
  media,
  fallback,
  alt,
  className,
  sizes,
  priority,
}: {
  media?: number | Media | null
  fallback: string
  alt?: string
  className?: string
  sizes?: string
  priority?: boolean
}) {
  if (media && typeof media === 'object' && media.url && media.width && media.height) {
    return (
      <NextImage
        src={media.url}
        alt={alt ?? media.alt ?? ''}
        width={media.width}
        height={media.height}
        className={className}
        sizes={sizes}
        priority={priority}
      />
    )
  }
  const src = media && typeof media === 'object' && media.url ? media.url : fallback
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt ?? ''} className={className} />
}
