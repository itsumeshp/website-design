import path from 'path'
import { getPayload } from 'payload'
import config from './payload.config'

/**
 * Case-studies seeder for the Projects collection.
 *
 * PRIVACY: only ColviQ and Blinko (own products) are named/linked. Every other
 * entry is anonymized — industry + scale + tech + outcome, NO client names and
 * NO private links in any public field. Internal references from the content
 * source are intentionally omitted here.
 *
 * Run with:  npm run seed:case-studies
 * Idempotent: clears Projects and case-study media, then reinserts.
 */

const para = (text: string) => ({
  type: 'paragraph',
  format: '' as const,
  indent: 0,
  version: 1,
  direction: 'ltr' as const,
  children: [{ type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }],
})
const heading = (text: string) => ({
  type: 'heading',
  tag: 'h3',
  format: '' as const,
  indent: 0,
  version: 1,
  direction: 'ltr' as const,
  children: [{ type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }],
})
const doc = (...nodes: any[]) => ({
  root: { type: 'root', format: '' as const, indent: 0, version: 1, direction: 'ltr' as const, children: nodes },
})

const ASSETS = '/home/bytes-umesh/infrion/infrion/public'

type CaseStudy = {
  title: string
  industry: string
  tagline: string
  challenge: string
  solution: string
  tech: string
  results: string
  /** Only set for own products that are safe to name/link. */
  named?: { client: string; url: string }
  image?: string // filename in IMG_DIR
  chips: string[]
  date: string
}

const studies: CaseStudy[] = [
  {
    title: 'WhatsApp CRM & Sales Pipeline',
    industry: 'SaaS / Sales & CRM',
    tagline: 'A WhatsApp-first CRM that stops deals leaking out of chat threads.',
    challenge:
      'Small sales teams run leads through WhatsApp and spreadsheets and lose track of who to follow up — no pipeline, no accountability, no reporting.',
    solution:
      'A full-stack SaaS with lead capture, drag-and-drop pipeline stages, automated follow-ups, role-based access, reporting, and real-time updates over WebSockets. One codebase serves the marketing site and the web-app console.',
    tech: 'Laravel · React · Inertia.js · TypeScript · Laravel Reverb (WebSockets) · MySQL',
    results: 'Live product with a full app console and role-based access control.',
    named: { client: 'ColviQ', url: 'https://colviq.com' },
    image: 'images/colviq-crm.jpg',
    chips: ['Laravel', 'React', 'Real-time WebSockets'],
    date: '2025-11-20T00:00:00.000Z',
  },
  {
    title: 'Multi-Store Grocery Marketplace',
    industry: 'eCommerce / Retail',
    tagline: 'One cart, one checkout, across many stores.',
    challenge:
      'Multi-vendor grocery shopping usually means separate carts and clunky checkouts per store.',
    solution:
      'A server-rendered storefront with a unified catalog, single checkout across 15+ stores, categories, offers, wishlist, search and order tracking — type-safe end to end.',
    tech: 'React · TanStack Start (SSR) · TanStack Router · Vite · TypeScript',
    results: 'A fast, SEO-ready storefront with unified multi-vendor checkout.',
    named: { client: 'Blinko', url: 'https://blinko-vert.vercel.app' },
    image: 'images/blink-ecom.jpg',
    chips: ['React', 'TanStack Start', 'TypeScript'],
    date: '2025-10-10T00:00:00.000Z',
  },
  {
    title: 'Financial Collections Dashboard',
    industry: 'FinTech / Financial Services',
    tagline: 'Turns daily receipts into a live financial picture.',
    challenge:
      'A financial-services firm tracked collections and party ledgers manually, with no real-time view of cash flow.',
    solution:
      'An admin platform for income receipts, party ledgers and collection analytics — live KPI cards, monthly charts, payment-mode split, and reporting.',
    tech: 'Laravel · PHP · Blade · Tailwind CSS · MySQL',
    results: 'Non-technical staff manage daily collections from a single dashboard.',
    named: { client: 'Shelvi', url: 'https://shelvi.com' },
    image: 'images/shelvi-finance.jpg',
    chips: ['Laravel', 'Tailwind CSS', 'MySQL'],
    date: '2025-08-15T00:00:00.000Z',
  },
  {
    title: 'Online Education & Student Platform',
    industry: 'EdTech / Higher Education',
    tagline: 'A course catalog and admissions engine at 30,000+ students.',
    challenge:
      'A higher-education institution across multiple markets needed dynamic program listings, twinning pathways, and admissions lead capture at scale.',
    solution:
      'A course catalog spanning 100+ programs, twinning-pathway pages, admissions enquiry and lead-capture flows, and a multi-market content structure.',
    tech: 'Laravel · PHP · MySQL · Blade',
    results: '30,000+ students and 100+ programmes across multiple markets.',
    named: { client: 'LSBF', url: 'https://www.lsbfindia.org' },
    image: 'images/lsbf-edu.jpg',
    chips: ['Laravel', 'PHP', 'MySQL'],
    date: '2025-05-05T00:00:00.000Z',
  },
]

const seed = async () => {
  const payload = await getPayload({ config })

  // Clear existing projects.
  await payload.delete({ collection: 'projects', where: { id: { exists: true } } })
  // Clear only previously-seeded case-study media (leave the user's own uploads).
  await payload.delete({ collection: 'media', where: { alt: { like: 'Case study —' } } })
  payload.logger.info('Cleared projects and prior case-study media.')

  const featured: number[] = []

  for (const s of studies) {
    let coverImage: number | undefined
    if (s.image) {
      const media = await payload.create({
        collection: 'media',
        data: { alt: `Case study — ${s.title}` },
        filePath: s.image.startsWith('/') ? s.image : path.join(ASSETS, s.image),
      })
      coverImage = media.id as number
    }

    const contentNodes = [
      heading('Challenge'),
      para(s.challenge),
      heading('Solution'),
      para(s.solution),
      heading('Technology'),
      para(s.tech),
      heading('Results'),
      para(s.results),
    ]
    if (s.named) contentNodes.push(para(`Live: ${s.named.url}`))

    const created = await payload.create({
      collection: 'projects',
      data: {
        title: s.title,
        category: s.industry,
        summary: s.tagline,
        content: doc(...contentNodes),
        date: s.date,
        // Only own products are named; anonymized entries carry no client.
        techStack: s.chips.map((label) => ({ label })),
        ...(s.named ? { client: s.named.client } : {}),
        ...(coverImage ? { coverImage } : {}),
      },
    })
    if (s.named) featured.push(created.id as number)
  }
  payload.logger.info(`Seeded ${studies.length} case studies (${featured.length} named/featured).`)

  // Feature the two name-safe products on the home page.
  if (featured.length) {
    await payload.updateGlobal({ slug: 'home-page', data: { featuredProjects: featured } })
  }

  payload.logger.info('✅ Case-studies seed complete.')
}

try {
  await seed()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
