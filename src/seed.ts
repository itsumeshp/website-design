import { getPayload } from 'payload'
import config from './payload.config'

/**
 * Dev seed: admin user + realistic placeholder content so the site looks real.
 * Content collections are cleared and re-created on each run (idempotent);
 * the admin user is only created once.
 *
 * Run with:  npm run seed
 */

const p = (text: string) => ({
  type: 'paragraph',
  format: '' as const,
  indent: 0,
  version: 1,
  direction: 'ltr' as const,
  children: [{ type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }],
})

const rich = (...paras: string[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: paras.map(p),
  },
})

const seed = async () => {
  const payload = await getPayload({ config })
  const log = (m: string) => payload.logger.info(m)

  const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@fexo.local'
  const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'changeme123'

  // --- Admin user (once) ---
  if ((await payload.count({ collection: 'users' })).totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: 'Site Admin' },
    })
    log(`Created admin: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
  }

  // --- Clear content collections for a clean re-seed ---
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
  log('Cleared existing content.')

  // --- Categories & Authors ---
  const cat = async (name: string) =>
    (await payload.create({ collection: 'categories', data: { name } })).id
  const catTech = await cat('Technology')
  const catCloud = await cat('Cloud')
  const catSecurity = await cat('Cybersecurity')
  const catBusiness = await cat('Business')

  const author = async (name: string, role: string, bio: string) =>
    (await payload.create({ collection: 'authors', data: { name, role, bio } })).id
  const authAnanya = await author(
    'Ananya Rao',
    'CEO & Founder',
    'Ananya leads Fexo with 15+ years building enterprise technology teams.',
  )
  const authDavid = await author(
    'David Chen',
    'CTO',
    'David writes about cloud architecture, security, and engineering culture.',
  )

  // --- Services ---
  const services = [
    {
      title: 'Cloud Solutions',
      icon: 'fa-cloud',
      shortDesc: 'Scalable, secure cloud infrastructure and seamless migration to AWS, Azure or GCP.',
      content: rich(
        'We design, migrate and manage cloud environments that scale with your business while keeping costs predictable.',
        'From lift-and-shift migrations to cloud-native rebuilds, our engineers handle architecture, security and 24/7 operations.',
      ),
    },
    {
      title: 'Cybersecurity',
      icon: 'fa-shield',
      shortDesc: 'End-to-end security: threat detection, compliance, and incident response.',
      content: rich(
        'Protect your data and systems with proactive monitoring, penetration testing and compliance-ready controls.',
        'We align your security posture with standards like ISO 27001, SOC 2 and GDPR.',
      ),
    },
    {
      title: 'Custom Software Development',
      icon: 'fa-code',
      shortDesc: 'Web and mobile applications built around your exact business needs.',
      content: rich(
        'Our product teams ship reliable, maintainable software using modern stacks and continuous delivery.',
        'We partner with you from discovery through launch and long-term support.',
      ),
    },
    {
      title: 'Data Analytics & AI',
      icon: 'fa-chart-line',
      shortDesc: 'Turn raw data into decisions with dashboards, pipelines and machine learning.',
      content: rich(
        'We build data platforms and ML models that surface insight and automate decisions.',
        'From warehousing to real-time analytics, we make your data work for you.',
      ),
    },
    {
      title: 'IT Consulting',
      icon: 'fa-lightbulb',
      shortDesc: 'Strategy, roadmaps and architecture guidance from senior technologists.',
      content: rich(
        'Our consultants help you choose the right technology and plan a roadmap that fits your budget and goals.',
      ),
    },
    {
      title: 'Managed IT Support',
      icon: 'fa-headset',
      shortDesc: '24/7 proactive monitoring, maintenance and helpdesk for your whole stack.',
      content: rich(
        'Keep your business running with round-the-clock support, patching and performance optimization.',
      ),
    },
  ]
  const serviceIds: number[] = []
  let so = 0
  for (const s of services) {
    const doc = await payload.create({ collection: 'services', data: { ...s, order: so++ } })
    serviceIds.push(doc.id as number)
  }
  log(`Seeded ${serviceIds.length} services.`)

  // --- Projects ---
  const projects = [
    { title: 'FinBank Mobile Platform', client: 'FinBank', category: 'FinTech', summary: 'A secure mobile banking app serving 2M+ customers.' },
    { title: 'HealthSync Cloud Migration', client: 'HealthSync', category: 'Healthcare', summary: 'Zero-downtime migration of patient systems to the cloud.' },
    { title: 'RetailIQ Analytics Dashboard', client: 'RetailIQ', category: 'Retail', summary: 'Real-time sales analytics across 400 stores.' },
    { title: 'SecureGov Cybersecurity Audit', client: 'SecureGov', category: 'Government', summary: 'Full security audit and remediation for a public agency.' },
    { title: 'LogiTrack IoT Fleet System', client: 'LogiTrack', category: 'Logistics', summary: 'IoT tracking for a 1,200-vehicle fleet.' },
    { title: 'EduLearn SaaS Platform', client: 'EduLearn', category: 'Education', summary: 'A multi-tenant learning platform for 50k students.' },
  ]
  const projectIds: number[] = []
  for (const pr of projects) {
    const doc = await payload.create({
      collection: 'projects',
      data: {
        ...pr,
        content: rich(
          `${pr.client} partnered with Fexo to deliver ${pr.title}.`,
          'We led discovery, architecture and delivery, working closely with their team to hit an aggressive timeline.',
          'The result: measurable gains in performance, security and user satisfaction.',
        ),
      },
    })
    projectIds.push(doc.id as number)
  }
  log(`Seeded ${projectIds.length} projects.`)

  // --- Team ---
  const team = [
    { name: 'Ananya Rao', role: 'CEO & Founder', bio: 'Ananya founded Fexo to help businesses adopt technology with confidence. 15+ years in enterprise IT leadership.' },
    { name: 'David Chen', role: 'Chief Technology Officer', bio: 'David leads engineering and architecture, with deep expertise in cloud and security.' },
    { name: 'Maria Gomez', role: 'Head of Design', bio: 'Maria shapes product experience and brand, obsessed with usability and detail.' },
    { name: 'Samuel Okoro', role: 'Lead Software Engineer', bio: 'Samuel builds resilient systems and mentors the engineering team.' },
  ]
  let to = 0
  for (const m of team) {
    await payload.create({ collection: 'team-members', data: { ...m, order: to++ } })
  }
  log(`Seeded ${team.length} team members.`)

  // --- Testimonials ---
  const testimonials = [
    { authorName: 'Michael Carter', authorRole: 'CTO', company: 'FinBank', quote: 'Fexo delivered our mobile platform ahead of schedule and rock solid. Their team feels like an extension of ours.', rating: 5 },
    { authorName: 'Priya Nair', authorRole: 'IT Director', company: 'HealthSync', quote: 'The cloud migration was seamless — zero downtime and our systems are noticeably faster.', rating: 5 },
    { authorName: 'James Wilson', authorRole: 'CEO', company: 'RetailIQ', quote: 'Their analytics dashboard gives us insight we never had before. Game changing for our stores.', rating: 5 },
    { authorName: 'Elena Petrova', authorRole: 'Security Lead', company: 'SecureGov', quote: 'Thorough, professional and clear. The security audit gave us total confidence.', rating: 5 },
  ]
  let tso = 0
  const testimonialIds: number[] = []
  for (const t of testimonials) {
    const doc = await payload.create({ collection: 'testimonials', data: { ...t, order: tso++ } })
    testimonialIds.push(doc.id as number)
  }
  log(`Seeded ${testimonials.length} testimonials.`)

  // --- Clients ---
  const clients = ['FinBank', 'HealthSync', 'RetailIQ', 'SecureGov', 'LogiTrack', 'EduLearn']
  let co = 0
  for (const name of clients) {
    await payload.create({ collection: 'clients', data: { name, url: 'https://example.com', order: co++ } })
  }
  log(`Seeded ${clients.length} clients.`)

  // --- Pricing ---
  const tiers = [
    { name: 'Starter', price: '$499', period: '/month', featured: false, features: ['Up to 5 users', 'Business hours support', 'Cloud monitoring', 'Monthly reports'] },
    { name: 'Business', price: '$1,299', period: '/month', featured: true, features: ['Up to 25 users', '24/7 priority support', 'Advanced security', 'Dedicated engineer', 'Weekly reports'] },
    { name: 'Enterprise', price: 'Custom', period: '', featured: false, features: ['Unlimited users', 'Dedicated team', 'Custom SLAs', 'On-site support', 'Compliance audits'] },
  ]
  let po = 0
  for (const t of tiers) {
    await payload.create({
      collection: 'pricing-tiers',
      data: {
        name: t.name,
        price: t.price,
        period: t.period,
        featured: t.featured,
        order: po++,
        features: t.features.map((f) => ({ feature: f })),
        ctaLabel: 'Get Started',
        ctaHref: '/contact',
      },
    })
  }
  log(`Seeded ${tiers.length} pricing tiers.`)

  // --- FAQs ---
  const faqs = [
    { q: 'What types of IT services do you offer?', a: 'We offer cloud solutions, cybersecurity, custom software, data & AI, IT consulting and managed support.' },
    { q: 'Can you create custom solutions for my business?', a: 'Yes — most of our work is tailored. We start with discovery to understand your goals, then design and build accordingly.' },
    { q: 'Do you work with startups as well as enterprises?', a: 'Absolutely. We scale our engagement to fit teams of any size, from early-stage startups to large enterprises.' },
    { q: 'How do you handle data security?', a: 'Security is built into everything we do — encryption, least-privilege access, monitoring and compliance with ISO 27001, SOC 2 and GDPR.' },
    { q: 'What does support look like after launch?', a: 'We offer ongoing managed support with monitoring, maintenance, upgrades and a responsive helpdesk.' },
    { q: 'How quickly can you get started?', a: 'Most engagements begin within one to two weeks after an initial consultation and scoping call.' },
  ]
  let fo = 0
  for (const f of faqs) {
    await payload.create({
      collection: 'faqs',
      data: { question: f.q, answer: rich(f.a), order: fo++ },
    })
  }
  log(`Seeded ${faqs.length} FAQs.`)

  // --- Posts ---
  const posts = [
    { title: 'The Real Cost of Ignoring Cybersecurity in 2026', cat: catSecurity, author: authDavid, excerpt: 'A single breach can cost more than years of prevention. Here is how to think about security ROI.' },
    { title: 'Cloud Migration: A Practical Playbook for Mid-Size Companies', cat: catCloud, author: authDavid, excerpt: 'Migrating to the cloud without downtime is possible. We break down the steps that work.' },
    { title: 'How Emerging AI Is Reshaping Everyday Business Operations', cat: catTech, author: authAnanya, excerpt: 'From automation to analytics, AI is quietly transforming how companies operate.' },
    { title: 'Building Software That Scales With Your Business', cat: catBusiness, author: authAnanya, excerpt: 'Technical debt kills growth. Here is how to build for the long term from day one.' },
  ]
  let pubDay = 5
  for (const post of posts) {
    await payload.create({
      collection: 'posts',
      data: {
        title: post.title,
        excerpt: post.excerpt,
        category: post.cat,
        author: post.author,
        status: 'published',
        publishedAt: `2026-06-${String(pubDay).padStart(2, '0')}T09:00:00.000Z`,
        content: rich(
          post.excerpt,
          'In this article we explore the practical considerations, common pitfalls, and the approach we recommend based on real client work.',
          'If you would like to discuss how this applies to your business, our team is always happy to help.',
        ),
        tags: [{ tag: 'IT' }, { tag: 'Business' }],
      },
    })
    pubDay += 4
  }
  log(`Seeded ${posts.length} posts.`)

  // --- Globals ---
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Fexo',
      contact: {
        phone: '+1 (480) 123 6789',
        email: 'hello@fexo.com',
        address: '1321 Gateway Blvd, Atlantic City, FL 54012',
      },
      socials: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
        { platform: 'youtube', url: 'https://youtube.com' },
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
            { label: 'Cloud Solutions', url: '/services/cloud-solutions' },
            { label: 'Cybersecurity', url: '/services/cybersecurity' },
          ],
        },
        {
          label: 'Pages',
          url: '/projects',
          sublinks: [
            { label: 'Projects', url: '/projects' },
            { label: 'Our Team', url: '/team' },
            { label: 'Pricing', url: '/pricing' },
            { label: 'FAQ', url: '/faq' },
          ],
        },
        { label: 'Blog', url: '/blog' },
        { label: 'Contact', url: '/contact' },
      ],
      cta: { label: 'Get a Quote', url: '/contact' },
    },
  })
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      copyright: `© ${2026} Fexo. All Rights Reserved.`,
      columns: [
        {
          title: 'Quick Links',
          links: [
            { label: 'Home', url: '/' },
            { label: 'About Us', url: '/about' },
            { label: 'Services', url: '/services' },
            { label: 'Projects', url: '/projects' },
            { label: 'Latest Blog', url: '/blog' },
            { label: 'Contact', url: '/contact' },
          ],
        },
        {
          title: 'Our Services',
          links: [
            { label: 'Cloud Solutions', url: '/services/cloud-solutions' },
            { label: 'Cybersecurity', url: '/services/cybersecurity' },
            { label: 'Custom Software', url: '/services/custom-software-development' },
            { label: 'Data & AI', url: '/services/data-analytics-ai' },
            { label: 'IT Consulting', url: '/services/it-consulting' },
          ],
        },
      ],
    },
  })
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        heading: 'Smart IT Solutions for Growing Businesses',
        subheading:
          'We help companies modernize with cloud, security, data and custom software — from strategy to 24/7 support.',
        ctaLabel: 'View All Services',
        ctaHref: '/services',
      },
      featuredServices: serviceIds.slice(0, 5),
      featuredProjects: projectIds,
      featuredTestimonials: testimonialIds,
    },
  })
  log('Seeded globals + featured selections.')

  log('✅ Seed complete.')
}

try {
  await seed()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
