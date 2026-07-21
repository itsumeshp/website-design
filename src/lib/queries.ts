import type { CollectionSlug, DataFromCollectionSlug } from 'payload'
import { getPayloadClient } from './payload'

// --- Globals ---
export const getSiteSettings = async () => {
  const p = await getPayloadClient()
  return p.findGlobal({ slug: 'site-settings', depth: 1 })
}

export const getHeader = async () => {
  const p = await getPayloadClient()
  return p.findGlobal({ slug: 'header', depth: 1 })
}

export const getFooter = async () => {
  const p = await getPayloadClient()
  return p.findGlobal({ slug: 'footer', depth: 1 })
}

export const getHomePage = async () => {
  const p = await getPayloadClient()
  return p.findGlobal({ slug: 'home-page', depth: 2 })
}

// --- Collections (lists), generic so the return type narrows per collection ---
const listFactory =
  <T extends CollectionSlug>(collection: T) =>
  async (limit = 100): Promise<DataFromCollectionSlug<T>[]> => {
    const p = await getPayloadClient()
    const res = await p.find({ collection, limit, depth: 1, sort: 'order' })
    return res.docs as DataFromCollectionSlug<T>[]
  }

export const getServices = listFactory('services')
export const getTeam = listFactory('team-members')
export const getTestimonials = listFactory('testimonials')
export const getClients = listFactory('clients')
export const getPricingTiers = listFactory('pricing-tiers')
export const getFaqs = listFactory('faqs')

// Projects (case studies) are ordered newest-first by their date.
export const getProjects = async (limit = 100) => {
  const p = await getPayloadClient()
  const res = await p.find({ collection: 'projects', limit, depth: 1, sort: '-date' })
  return res.docs
}

export const getPosts = async (limit = 100) => {
  const p = await getPayloadClient()
  const res = await p.find({
    collection: 'posts',
    limit,
    depth: 1,
    sort: '-publishedAt',
    where: { status: { equals: 'published' } },
  })
  return res.docs
}

// --- Single docs by slug ---
const bySlugFactory =
  <T extends CollectionSlug>(collection: T) =>
  async (slug: string): Promise<DataFromCollectionSlug<T> | null> => {
    const p = await getPayloadClient()
    const res = await p.find({ collection, where: { slug: { equals: slug } }, depth: 2, limit: 1 })
    return (res.docs[0] as DataFromCollectionSlug<T>) ?? null
  }

export const getService = bySlugFactory('services')
export const getProject = bySlugFactory('projects')
export const getPost = bySlugFactory('posts')
export const getMember = bySlugFactory('team-members')
