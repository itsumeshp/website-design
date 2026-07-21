import type { Metadata } from 'next'

const SITE_NAME = 'Infrion Technolab'

type SeoGroup = {
  title?: string | null
  description?: string | null
  image?: unknown
} | null | undefined

/** Build page Metadata from a CMS `seo` group with sensible fallbacks. */
export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
}: {
  seo?: SeoGroup
  fallbackTitle: string
  fallbackDescription?: string
}): Metadata {
  const title = seo?.title || fallbackTitle
  const description =
    seo?.description || fallbackDescription || `${fallbackTitle} — ${SITE_NAME}`

  const ogImage =
    seo?.image && typeof seo.image === 'object' && 'url' in seo.image
      ? (seo.image as { url?: string }).url
      : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type: 'website',
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
