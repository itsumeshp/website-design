import { getPayload } from 'payload'
import config from './payload.config'

/**
 * Dev seed: creates the first admin user and a small set of sample content so
 * the admin panel and (later) the frontend have something to show.
 *
 * Run with:  npm run seed
 * Idempotent-ish: skips creation when a collection already has documents.
 */

const richText = (text: string) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [
      {
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        children: [{ type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }],
      },
    ],
  },
})

const seed = async () => {
  const payload = await getPayload({ config })

  const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@fexo.local'
  const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'changeme123'

  // --- Admin user ---
  const { totalDocs: userCount } = await payload.count({ collection: 'users' })
  if (userCount === 0) {
    await payload.create({
      collection: 'users',
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: 'Site Admin' },
    })
    payload.logger.info(`Created admin user: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
  } else {
    payload.logger.info('Users already exist — skipping admin creation.')
  }

  // --- Categories ---
  const { totalDocs: catCount } = await payload.count({ collection: 'categories' })
  if (catCount === 0) {
    for (const name of ['Technology', 'Business', 'Design']) {
      await payload.create({ collection: 'categories', data: { name } })
    }
    payload.logger.info('Seeded categories.')
  }

  const firstCategory = (await payload.find({ collection: 'categories', limit: 1 })).docs[0]

  // --- Author ---
  const { totalDocs: authorCount } = await payload.count({ collection: 'authors' })
  if (authorCount === 0) {
    await payload.create({
      collection: 'authors',
      data: { name: 'Jane Doe', role: 'Content Lead', bio: 'Writes about tech and product.' },
    })
    payload.logger.info('Seeded author.')
  }
  const firstAuthor = (await payload.find({ collection: 'authors', limit: 1 })).docs[0]

  // --- Posts ---
  if ((await payload.count({ collection: 'posts' })).totalDocs === 0) {
    for (let i = 1; i <= 2; i++) {
      await payload.create({
        collection: 'posts',
        data: {
          title: `Sample blog post ${i}`,
          excerpt: 'A short summary of this sample post.',
          content: richText('This is sample post content. Replace it in the admin.'),
          category: firstCategory?.id,
          author: firstAuthor?.id,
          status: 'published',
          publishedAt: '2026-01-15T00:00:00.000Z',
        },
      })
    }
    payload.logger.info('Seeded posts.')
  }

  // --- Services ---
  if ((await payload.count({ collection: 'services' })).totalDocs === 0) {
    const services = [
      { title: 'Web Development', icon: 'fa-code', shortDesc: 'Modern, fast web apps.' },
      { title: 'Cloud Solutions', icon: 'fa-cloud', shortDesc: 'Scalable cloud infrastructure.' },
      { title: 'UI/UX Design', icon: 'fa-pen-ruler', shortDesc: 'Clean, usable interfaces.' },
    ]
    let order = 0
    for (const s of services) {
      await payload.create({
        collection: 'services',
        data: { ...s, content: richText(`${s.title} details go here.`), order: order++ },
      })
    }
    payload.logger.info('Seeded services.')
  }

  // --- Testimonials ---
  if ((await payload.count({ collection: 'testimonials' })).totalDocs === 0) {
    await payload.create({
      collection: 'testimonials',
      data: {
        authorName: 'Sam Client',
        authorRole: 'CTO',
        company: 'Acme Inc',
        quote: 'Great team, delivered on time.',
        rating: 5,
        order: 0,
      },
    })
    payload.logger.info('Seeded testimonials.')
  }

  // --- Clients ---
  if ((await payload.count({ collection: 'clients' })).totalDocs === 0) {
    for (const name of ['Acme', 'Globex']) {
      await payload.create({ collection: 'clients', data: { name, url: 'https://example.com' } })
    }
    payload.logger.info('Seeded clients.')
  }

  // --- Team ---
  if ((await payload.count({ collection: 'team-members' })).totalDocs === 0) {
    await payload.create({
      collection: 'team-members',
      data: { name: 'Alex Founder', role: 'CEO', bio: 'Leads the company.', order: 0 },
    })
    payload.logger.info('Seeded team member.')
  }

  // --- Projects ---
  if ((await payload.count({ collection: 'projects' })).totalDocs === 0) {
    await payload.create({
      collection: 'projects',
      data: {
        title: 'Sample Project',
        client: 'Acme Inc',
        category: 'Web App',
        summary: 'A sample case study.',
        content: richText('Project details go here.'),
      },
    })
    payload.logger.info('Seeded project.')
  }

  // --- Pricing ---
  if ((await payload.count({ collection: 'pricing-tiers' })).totalDocs === 0) {
    const tiers = [
      { name: 'Starter', price: '$29', period: '/mo', featured: false, order: 0 },
      { name: 'Pro', price: '$79', period: '/mo', featured: true, order: 1 },
      { name: 'Enterprise', price: 'Custom', period: '', featured: false, order: 2 },
    ]
    for (const t of tiers) {
      await payload.create({
        collection: 'pricing-tiers',
        data: { ...t, features: [{ feature: 'Feature A' }, { feature: 'Feature B' }] },
      })
    }
    payload.logger.info('Seeded pricing tiers.')
  }

  // --- FAQs ---
  if ((await payload.count({ collection: 'faqs' })).totalDocs === 0) {
    for (let i = 1; i <= 3; i++) {
      await payload.create({
        collection: 'faqs',
        data: { question: `Sample question ${i}?`, answer: richText('Sample answer.'), order: i },
      })
    }
    payload.logger.info('Seeded FAQs.')
  }

  // --- Globals ---
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Fexo',
      contact: { phone: '+1 234 567 890', email: 'hello@fexo.local', address: '123 Main St' },
    },
  })
  await payload.updateGlobal({
    slug: 'header',
    data: {
      nav: [
        { label: 'Home', url: '/' },
        { label: 'About', url: '/about' },
        { label: 'Services', url: '/services' },
        { label: 'Blog', url: '/blog' },
        { label: 'Contact', url: '/contact' },
      ],
      cta: { label: 'Get a Quote', url: '/contact' },
    },
  })
  await payload.updateGlobal({
    slug: 'footer',
    data: { copyright: '© 2026 Fexo. All rights reserved.' },
  })
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        heading: 'IT Solutions & Technology',
        subheading: 'We build modern software for growing businesses.',
        ctaLabel: 'Get Started',
        ctaHref: '/contact',
      },
    },
  })
  payload.logger.info('Seeded globals.')

  payload.logger.info('✅ Seed complete.')
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
