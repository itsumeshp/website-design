import type { MetadataRoute } from 'next'
import { getServices, getProjects, getPosts, getTeam } from '@/lib/queries'

export const dynamic = 'force-dynamic'

const BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/about', '/services', '/projects', '/team', '/blog', '/pricing', '/faq', '/contact', '/terms', '/privacy']
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }))

  const [services, projects, posts, team] = await Promise.all([
    getServices(),
    getProjects(),
    getPosts(),
    getTeam(),
  ])

  const dyn = (
    prefix: string,
    docs: { slug?: string | null; updatedAt?: string }[],
  ): MetadataRoute.Sitemap =>
    docs
      .filter((d) => d.slug)
      .map((d) => ({
        url: `${BASE}${prefix}/${d.slug}`,
        lastModified: d.updatedAt ? new Date(d.updatedAt) : undefined,
        changeFrequency: 'weekly',
        priority: 0.6,
      }))

  return [
    ...staticEntries,
    ...dyn('/services', services),
    ...dyn('/projects', projects),
    ...dyn('/blog', posts),
    ...dyn('/team', team),
  ]
}
