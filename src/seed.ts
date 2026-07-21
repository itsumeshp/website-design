import { getPayload } from 'payload'
import config from './payload.config'

/**
 * Dev/content seed for the Infrion Technolab brand. Wipes content
 * collections and reinserts a fresh, coherent set so the site feels real.
 * The admin user is preserved. Run with:  npm run seed
 *
 * NOTE: all of this is invented placeholder content — rename/replace it in
 * the admin panel (Site Settings → siteName, etc.).
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
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: nodes,
  },
})
const richText = (text: string) => doc(para(text))

const seed = async () => {
  const payload = await getPayload({ config })

  const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@infriontechnolab.com'
  const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'changeme123'

  // --- Admin user (preserve if present) ---
  if ((await payload.count({ collection: 'users' })).totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: 'Infrion Admin' },
    })
    payload.logger.info(`Created admin user: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
  }

  // --- Wipe content collections for a clean reseed ---
  const contentCollections = [
    'posts',
    'categories',
    'authors',
    'projects',
    'services',
    'pricing-tiers',
    'faqs',
    'testimonials',
    'clients',
    'team-members',
  ] as const
  for (const collection of contentCollections) {
    await payload.delete({ collection, where: { id: { exists: true } } })
  }
  payload.logger.info('Cleared content collections.')

  // --- Categories ---
  const catNames = ['Engineering', 'Cloud', 'Data & AI', 'Design', 'Company']
  const categories: Record<string, number> = {}
  for (const name of catNames) {
    const c = await payload.create({ collection: 'categories', data: { name } })
    categories[name] = c.id as number
  }

  // --- Authors ---
  const aarav = await payload.create({
    collection: 'authors',
    data: {
      name: 'Aarav Menon',
      role: 'Founder & CEO',
      bio: 'Started Infrion Technolab after a decade of building platforms that outlived their rewrites.',
      socials: [{ platform: 'linkedin', url: 'https://linkedin.com' }],
    },
  })
  const priya = await payload.create({
    collection: 'authors',
    data: {
      name: 'Priya Nair',
      role: 'Head of Design',
      bio: 'Designs interfaces that get out of the way. Ex-fintech, recovering perfectionist.',
      socials: [{ platform: 'twitter', url: 'https://x.com' }],
    },
  })
  const lena = await payload.create({
    collection: 'authors',
    data: {
      name: 'Lena Fischer',
      role: 'Head of Engineering',
      bio: 'Believes the best code is the code you didn’t have to write.',
      socials: [{ platform: 'github', url: 'https://github.com' }],
    },
  })

  // --- Services ---
  const serviceData = [
    {
      title: 'Product Engineering',
      icon: 'fa-code',
      shortDesc: 'Ship polished web and mobile products with a team that owns outcomes, not tickets.',
      content: doc(
        para(
          'We embed with your team and build product end to end — from the first prototype to the version millions of people rely on. Small teams, tight feedback loops, and code that the next engineer will thank you for.',
        ),
        heading('What you get'),
        para(
          'Senior engineers, a designer, and a delivery lead working as one pod. Weekly demos, no status theatre, and a roadmap you can actually steer.',
        ),
      ),
    },
    {
      title: 'Cloud & DevOps',
      icon: 'fa-cloud',
      shortDesc: 'Right-sized cloud, automated delivery, and infrastructure that sleeps through traffic spikes.',
      content: doc(
        para(
          'We set up cloud foundations that are boring in the best way: predictable costs, one-command deploys, and alerts that only fire when they matter. AWS, GCP, or Azure — no dogma.',
        ),
      ),
    },
    {
      title: 'Data & AI',
      icon: 'fa-chart-network',
      shortDesc: 'Turn scattered data into decisions — pipelines, dashboards, and practical AI you can trust.',
      content: doc(
        para(
          'From the first clean pipeline to AI features your users actually keep. We focus on the unglamorous 90% — data quality, evaluation, guardrails — that makes the demo survive contact with reality.',
        ),
      ),
    },
    {
      title: 'Platform Modernization',
      icon: 'fa-arrows-rotate',
      shortDesc: 'Retire the fragile monolith without pausing the business.',
      content: doc(
        para(
          'We modernize in slices, not big-bang rewrites. The lights stay on, the team keeps shipping, and the scary parts get smaller every sprint.',
        ),
      ),
    },
    {
      title: 'Security & Compliance',
      icon: 'fa-shield-halved',
      shortDesc: 'Build trust in by default — hardening, audits, and SOC 2 / ISO readiness.',
      content: doc(
        para(
          'Security that engineers don’t route around. We bake controls into the pipeline and get you audit-ready without turning every deploy into a ceremony.',
        ),
      ),
    },
    {
      title: 'Managed Support',
      icon: 'fa-headset',
      shortDesc: '24×7 eyes on your stack so your team can focus on shipping.',
      content: doc(
        para(
          'On-call, monitoring, and steady improvements handled by people who know your system. You get calmer weekends and a changelog that keeps moving.',
        ),
      ),
    },
  ]
  const serviceIds: number[] = []
  let sOrder = 0
  for (const s of serviceData) {
    const created = await payload.create({ collection: 'services', data: { ...s, order: sOrder++ } })
    serviceIds.push(created.id as number)
  }

  // --- Projects ---
  const projectData = [
    {
      title: 'Real-time Credit Engine',
      client: 'Finlark',
      category: 'Fintech',
      summary: 'Cut loan decisioning from days to under two seconds with a rebuilt risk engine.',
      date: '2025-11-02T00:00:00.000Z',
    },
    {
      title: 'Retail App Rebuild',
      client: 'Marndi Retail',
      category: 'Retail',
      summary: 'A ground-up mobile rebuild that lifted checkout conversion 23%.',
      date: '2025-09-18T00:00:00.000Z',
    },
    {
      title: 'Logistics Data Platform',
      client: 'Portway',
      category: 'Logistics',
      summary: 'One source of truth across 40 warehouses, updated in near real time.',
      date: '2025-07-30T00:00:00.000Z',
    },
    {
      title: 'Telehealth From Scratch',
      client: 'Caretap',
      category: 'Healthcare',
      summary: 'Secure video, scheduling, and records — launched in fourteen weeks.',
      date: '2025-06-11T00:00:00.000Z',
    },
    {
      title: 'Cloud Cost Overhaul',
      client: 'Bloomstack',
      category: 'SaaS',
      summary: 'Right-sized infrastructure and autoscaling without a single outage.',
      date: '2025-04-22T00:00:00.000Z',
    },
    {
      title: 'Factory Vision QA',
      client: 'Ferrous Works',
      category: 'Manufacturing',
      summary: 'On-line defect detection that caught 3× more faults than manual QA.',
      date: '2025-02-14T00:00:00.000Z',
    },
  ]
  const projectIds: number[] = []
  for (const p of projectData) {
    const created = await payload.create({
      collection: 'projects',
      data: {
        ...p,
        content: doc(
          para(`${p.client} came to us with a clear goal and a messy reality. We started small, shipped something real in weeks, and iterated from there.`),
          heading('The result'),
          para(p.summary),
        ),
      },
    })
    projectIds.push(created.id as number)
  }

  // --- Team ---
  const team = [
    { name: 'Aarav Menon', role: 'Founder & CEO', bio: 'Keeps the company pointed at problems worth solving.' },
    { name: 'Lena Fischer', role: 'Head of Engineering', bio: 'Turns ambiguous briefs into systems that scale.' },
    { name: 'Priya Nair', role: 'Head of Design', bio: 'Makes complex products feel obvious.' },
    { name: 'Marcus Reyes', role: 'Cloud & Platform Lead', bio: 'Automates the things nobody enjoys doing twice.' },
    { name: 'Sana Kapoor', role: 'Data & AI Lead', bio: 'Ships AI that survives real users.' },
    { name: 'Diego Alvarez', role: 'Delivery Lead', bio: 'Protects the team’s focus and the client’s timeline.' },
  ]
  let tOrder = 0
  for (const m of team) {
    await payload.create({
      collection: 'team-members',
      data: {
        ...m,
        order: tOrder++,
        socials: [
          { platform: 'linkedin', url: 'https://linkedin.com' },
          { platform: 'twitter', url: 'https://x.com' },
        ],
      },
    })
  }

  // --- Testimonials ---
  const testimonials = [
    { authorName: 'Rhea Sharma', authorRole: 'CTO', company: 'Finlark', quote: 'Infrion Technolab shipped in ten weeks what our last vendor couldn’t in a year. They think like owners.', rating: 5 },
    { authorName: 'Tom Becker', authorRole: 'VP Engineering', company: 'Bloomstack', quote: 'They cut our cloud bill almost in half and we didn’t have a single outage doing it.', rating: 5 },
    { authorName: 'Ananya Rao', authorRole: 'Head of Product', company: 'Marndi Retail', quote: 'The rebuild paid for itself in one quarter. Conversion is up and the app finally feels fast.', rating: 5 },
    { authorName: 'David Owens', authorRole: 'Founder', company: 'Caretap', quote: 'Calm, senior, and refreshingly honest about trade-offs. Exactly what an early team needs.', rating: 5 },
  ]
  let teOrder = 0
  for (const t of testimonials) {
    await payload.create({ collection: 'testimonials', data: { ...t, order: teOrder++ } })
  }

  // --- Clients ---
  const clients = ['Finlark', 'Portway', 'Bloomstack', 'Caretap', 'Marndi Retail', 'Ferrous Works']
  let cOrder = 0
  for (const name of clients) {
    await payload.create({
      collection: 'clients',
      data: { name, url: 'https://example.com', order: cOrder++ },
    })
  }

  // --- Posts ---
  const posts = [
    {
      title: 'The boring infrastructure that lets you move fast',
      excerpt: 'Speed doesn’t come from heroics. It comes from foundations so dull you forget they’re there.',
      category: categories['Cloud'],
      author: aarav.id,
      tags: ['infrastructure', 'devops'],
      body: doc(
        para('Every fast team we’ve worked with shares an unglamorous secret: their infrastructure is boring. Deploys are one command. Rollbacks are one command. Nobody is a hero at 2am because nobody needs to be.'),
        heading('Boring is a feature'),
        para('When the plumbing is predictable, engineers spend their attention on the product instead of the pipeline. That’s where speed actually comes from.'),
      ),
    },
    {
      title: 'We deleted 40% of our code. The product got better.',
      excerpt: 'A story about the modernization nobody puts on a slide: taking things away.',
      category: categories['Engineering'],
      author: lena.id,
      tags: ['refactoring', 'modernization'],
      body: doc(
        para('The most valuable pull requests we shipped last quarter were red, not green. Removing dead paths made the system easier to reason about, faster to test, and cheaper to run.'),
      ),
    },
    {
      title: 'A practical guide to AI features users actually keep',
      excerpt: 'The demo is easy. The 90% that makes it survive real users is the work.',
      category: categories['Data & AI'],
      author: aarav.id,
      tags: ['ai', 'product'],
      body: doc(
        para('Shipping an AI feature that people keep using is less about the model and more about the guardrails around it: evaluation, fallbacks, and honest UX about what it can and can’t do.'),
      ),
    },
    {
      title: 'Design systems for teams that hate maintaining design systems',
      excerpt: 'Consistency without the bureaucracy. Build the smallest system that pays for itself.',
      category: categories['Design'],
      author: priya.id,
      tags: ['design', 'frontend'],
      body: doc(
        para('A design system should remove decisions, not add meetings. Start with the components you actually repeat, document them where engineers already look, and let it grow only when it earns its keep.'),
      ),
    },
  ]
  const dates = [
    '2026-02-10T00:00:00.000Z',
    '2026-01-20T00:00:00.000Z',
    '2025-12-08T00:00:00.000Z',
    '2025-11-15T00:00:00.000Z',
  ]
  let pi = 0
  for (const p of posts) {
    await payload.create({
      collection: 'posts',
      data: {
        title: p.title,
        excerpt: p.excerpt,
        content: p.body,
        category: p.category,
        author: p.author,
        tags: p.tags.map((tag) => ({ tag })),
        status: 'published',
        publishedAt: dates[pi++],
      },
    })
  }

  // --- Pricing ---
  const tiers = [
    {
      name: 'Launch',
      price: '$6k',
      period: '/mo',
      featured: false,
      order: 0,
      features: ['1 focused product pod', 'Weekly demos', 'Cloud setup included', 'Email & chat support'],
    },
    {
      name: 'Scale',
      price: '$14k',
      period: '/mo',
      featured: true,
      order: 1,
      features: [
        'Multi-pod delivery',
        'Dedicated delivery lead',
        'CI/CD + observability',
        'On-call support',
        'Quarterly roadmap reviews',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      featured: false,
      order: 2,
      features: [
        'Everything in Scale',
        'Security & compliance program',
        'SLA-backed 24×7 support',
        'Dedicated account team',
      ],
    },
  ]
  for (const t of tiers) {
    await payload.create({
      collection: 'pricing-tiers',
      data: {
        name: t.name,
        price: t.price,
        period: t.period,
        featured: t.featured,
        order: t.order,
        ctaLabel: 'Book a call',
        ctaHref: '/contact',
        features: t.features.map((feature) => ({ feature })),
      },
    })
  }

  // --- FAQs ---
  const faqs = [
    ['How do engagements usually start?', 'With a short discovery — usually a week — where we map the problem, agree on the first slice of value, and give you a plan you can steer.'],
    ['Do you work fixed-price or monthly?', 'Most work is a monthly pod so we can adapt as we learn. We’ll scope fixed-price work when the requirements are genuinely stable.'],
    ['Who owns the code and IP?', 'You do. Everything we build is yours, in your repositories, from day one.'],
    ['How fast can we see something real?', 'Usually within the first two to three weeks. We’d rather show you a working slice than a slide deck.'],
    ['Can you work with our existing team?', 'Yes — most of our engagements are alongside an in-house team. We embed, share context, and leave things better documented than we found them.'],
    ['What happens after launch?', 'We can hand off cleanly or stay on for managed support. Either way you won’t be stranded.'],
  ]
  let fOrder = 0
  for (const [q, a] of faqs) {
    await payload.create({
      collection: 'faqs',
      data: { question: q, answer: richText(a), order: fOrder++ },
    })
  }

  // --- Globals ---
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Infrion Technolab',
      contact: {
        phone: '+91 79 4102 8890',
        email: 'hello@infriontechnolab.com',
        address: 'Level 6, Beacon Square, Prahlad Nagar, Ahmedabad 380015, India',
      },
      socials: [
        { platform: 'linkedin', url: 'https://linkedin.com' },
        { platform: 'twitter', url: 'https://x.com' },
        { platform: 'github', url: 'https://github.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
      ],
    },
  })
  await payload.updateGlobal({
    slug: 'header',
    data: {
      nav: [
        { label: 'Home', url: '/' },
        { label: 'About', url: '/about' },
        {
          label: 'Services',
          url: '/services',
          sublinks: [
            { label: 'Our Services', url: '/services' },
            { label: 'Pricing', url: '/pricing' },
            { label: 'FAQ', url: '/faq' },
          ],
        },
        { label: 'Projects', url: '/projects' },
        { label: 'Blog', url: '/blog' },
        { label: 'Contact', url: '/contact' },
      ],
      cta: { label: 'Book a call', url: '/contact' },
    },
  })
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      columns: [
        {
          title: 'Company',
          links: [
            { label: 'About', url: '/about' },
            { label: 'Projects', url: '/projects' },
            { label: 'Blog', url: '/blog' },
            { label: 'Contact', url: '/contact' },
          ],
        },
        {
          title: 'Services',
          links: [
            { label: 'Product Engineering', url: '/services' },
            { label: 'Cloud & DevOps', url: '/services' },
            { label: 'Data & AI', url: '/services' },
            { label: 'Managed Support', url: '/services' },
          ],
        },
      ],
      copyright: '© 2026 Infrion Technolab All rights reserved.',
    },
  })
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        // Short heading — the hero renders it at a very large size (one/two
        // words, like the theme's "IT Solutions").
        heading: 'Calm Systems',
        subheading:
          'Software for ambitious teams. Infrion Technolab designs, builds, and runs the product, cloud, and data systems behind fast-growing companies.',
        ctaLabel: 'Start a project',
        ctaHref: '/contact',
      },
      featuredServices: serviceIds.slice(0, 5),
      featuredProjects: projectIds.slice(0, 6),
    },
  })

  payload.logger.info('✅ Seed complete — Infrion Technolab content loaded.')
}

// Top-level await so `payload run` (which does `await import(file)`) waits for
// the async work to finish before the process exits.
try {
  await seed()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
