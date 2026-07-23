import { getPayload } from 'payload'
import config from './payload.config'

/**
 * Rewrites the CMS content to Infrion Technolab's real offering (AI-first
 * software). Targeted: replaces services, FAQs, pricing (engagement models)
 * and testimonials, and updates hero text + contact info — WITHOUT touching
 * projects (case studies), the uploaded hero image, blog, team or logos.
 * Run with:  npm run seed:infrion
 */

const para = (t: string) => ({
  type: 'paragraph',
  format: '' as const,
  indent: 0,
  version: 1,
  direction: 'ltr' as const,
  children: [{ type: 'text', text: t, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }],
})
const heading = (t: string) => ({
  type: 'heading',
  tag: 'h3',
  format: '' as const,
  indent: 0,
  version: 1,
  direction: 'ltr' as const,
  children: [{ type: 'text', text: t, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }],
})
const doc = (...n: any[]) => ({
  root: { type: 'root', format: '' as const, indent: 0, version: 1, direction: 'ltr' as const, children: n },
})
const rt = (t: string) => doc(para(t))

const run = async () => {
  const payload = await getPayload({ config })

  // --- Services (Infrion's real offering) ---
  await payload.delete({ collection: 'services', where: { id: { exists: true } } })
  const services = [
    {
      title: 'AI Agents',
      icon: 'fa-robot',
      shortDesc:
        'AI agents that do real work, not just chat — grounded in your data, with guardrails and human handoff.',
      content: doc(
        para(
          'AI agents that do real work, not just chat. They answer customers, qualify leads, triage support, and search your knowledge — grounded in your data, with guardrails, evaluation, and human handoff built in.',
        ),
        heading('What you get'),
        para('A working agent grounded in your data, an evaluation setup, and a clear escalation flow. Typical timeline: 2–6 weeks.'),
      ),
    },
    {
      title: 'AI Automation',
      icon: 'fa-arrows-rotate',
      shortDesc:
        'Your workflows, automated end to end — AI where judgment is needed, plain code where it isn’t.',
      content: doc(
        para(
          'Your workflows, automated end to end. We map approvals, follow-ups, document handling, and data sync — then automate them with AI where judgment is needed and plain code where it isn’t.',
        ),
        heading('What you get'),
        para('An automated workflow with monitoring, fallback paths, and handover docs. Typical timeline: 2–8 weeks.'),
      ),
    },
    {
      title: 'Mobile App Development',
      icon: 'fa-mobile-screen',
      shortDesc:
        'Mobile reach without a second codebase — installable, offline-capable apps sharing one backend.',
      content: doc(
        para(
          'Mobile reach without a second codebase. Installable, offline-capable apps that share one backend with your web platform and put the same AI capabilities — assistants, smart search, automation — in your users’ pockets.',
        ),
      ),
    },
    {
      title: 'Web Platform Development',
      icon: 'fa-window-maximize',
      shortDesc:
        'Web platforms built AI-ready from the first commit — portals, internal tools, and SaaS products.',
      content: doc(
        para(
          'Web platforms built AI-ready from the first commit. Customer portals, internal tools, and SaaS products — so intelligence is a feature you add later, not a rebuild you fund.',
        ),
      ),
    },
    {
      title: 'APIs & Integrations',
      icon: 'fa-plug',
      shortDesc:
        'APIs that make your systems talk — CRM, ERP, payments, WhatsApp, and legacy databases.',
      content: doc(
        para(
          'APIs that make your systems talk. We connect CRM, ERP, payments, WhatsApp, and legacy databases — so data flows automatically and your AI tools see the full picture.',
        ),
      ),
    },
    {
      title: 'Cloud Architecture',
      icon: 'fa-cloud',
      shortDesc:
        'Cloud foundations that scale — secure, automated, and cost-aware from day one.',
      content: doc(
        para(
          'Cloud foundations that are boring in the best way: predictable costs, automated delivery, secure defaults, and monitoring that only alerts when it matters. Built to scale with your product, not ahead of it.',
        ),
      ),
    },
  ]
  const serviceIds: number[] = []
  let so = 0
  for (const s of services) {
    const c = await payload.create({ collection: 'services', data: { ...s, order: so++ } })
    serviceIds.push(c.id as number)
  }

  // --- FAQs (Infrion's real FAQ) ---
  await payload.delete({ collection: 'faqs', where: { id: { exists: true } } })
  const faqs = [
    ['How fast do you respond?', 'We typically respond within 1 business day with clarifying questions and next steps.'],
    ['Do you work with startups and enterprises?', 'Yes. We can work from a lightweight MVP scope to larger, multi-team deliveries.'],
    ['Do you sign NDAs?', 'Yes. We can sign an NDA before discussing sensitive details.'],
    ['Who owns the IP?', 'You do. Deliverables, source code, and documentation are yours once paid as agreed.'],
    ['How do you communicate?', 'Weekly updates plus async communication (email/Slack) with transparent progress tracking.'],
    ['Do you provide post-launch support?', 'Yes. We offer maintenance and iteration support based on your needs.'],
  ]
  let fo = 0
  for (const [q, a] of faqs) {
    await payload.create({ collection: 'faqs', data: { question: q, answer: rt(a), order: fo++ } })
  }

  // --- Pricing → engagement models ---
  await payload.delete({ collection: 'pricing-tiers', where: { id: { exists: true } } })
  const models = [
    {
      name: 'Fixed-scope project',
      price: 'Quote',
      period: '',
      featured: false,
      features: ['Clear requirements & delivery plan', 'Predictable timeline & cost', 'Defined acceptance criteria', 'Handoff docs included'],
    },
    {
      name: 'Embedded product team',
      price: "Let's talk",
      period: '/monthly',
      featured: true,
      features: ['Senior team that owns outcomes', 'Weekly demos & roadmap reviews', 'Design + engineering + delivery lead', 'Scales with your roadmap'],
    },
    {
      name: 'Architecture & code review',
      price: 'Quote',
      period: '',
      featured: false,
      features: ['Expert guidance before building', 'Architecture & security review', 'Actionable written recommendations', 'Refactor roadmap'],
    },
  ]
  let po = 0
  for (const m of models) {
    await payload.create({
      collection: 'pricing-tiers',
      data: {
        name: m.name,
        price: m.price,
        period: m.period,
        featured: m.featured,
        order: po++,
        ctaLabel: 'Talk to us',
        ctaHref: '/contact',
        features: m.features.map((feature) => ({ feature })),
      },
    })
  }

  // --- Testimonials (anonymized) ---
  await payload.delete({ collection: 'testimonials', where: { id: { exists: true } } })
  const testimonials = [
    { authorName: 'Head of Support', company: 'SaaS platform', quote: 'They shipped a working AI agent in weeks, grounded in our own docs. Ticket volume dropped and answers got more consistent.', rating: 5 },
    { authorName: 'Founder & CTO', company: 'Fintech startup', quote: 'Infrion rebuilt the core of our product without pausing the business. Senior, calm, and honest about trade-offs.', rating: 5 },
    { authorName: 'Operations Lead', company: 'Logistics company', quote: 'They automated the process that ate our week. Now it runs itself, with monitoring and fallbacks we can trust.', rating: 5 },
    { authorName: 'Engineering Manager', company: 'Healthcare product', quote: 'Clear handoff and real documentation. Our team owns and extends the system with confidence.', rating: 5 },
  ]
  let to = 0
  for (const t of testimonials) {
    await payload.create({ collection: 'testimonials', data: { ...t, order: to++ } })
  }

  // --- Hero text (preserve uploaded background image) ---
  const home = await payload.findGlobal({ slug: 'home-page', depth: 0 })
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        ...(home.hero ?? {}),
        heading: 'AI That Understands',
        subheading:
          'We build AI agents, automation, and platforms around your business logic — so the systems you run on actually understand how you operate.',
        ctaLabel: 'Get a free assessment',
        ctaHref: '/contact',
      },
      featuredServices: serviceIds.slice(0, 5),
      whyChoose: {
        heading: 'Why teams choose',
        highlight: 'Infrion Technolab',
        intro:
          'From first-time founders to established brands, teams work with us because we map how their business actually runs, talk in plain language, and ship software they can fully own and extend.',
        stats: [
          { value: '14+', label: 'Products Shipped' },
          { value: '6', label: 'Core Services' },
          { value: '4', label: 'Industries Served' },
          { value: '100%', label: 'You Own the IP' },
        ],
        // ratings + ctas intentionally left empty — add real review profiles
        // (Clutch/Upwork/etc.) in the admin once they exist.
      },
    },
  })

  // --- Contact info (preserve other settings) ---
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      contact: {
        ...(settings.contact ?? {}),
        phone: '+91 93289 64742',
        email: 'hello@infriontechnolab.com',
        address: '611, Hilltown Square, Near Ganesh Opera, Nikol, Ahmedabad – 382350, Gujarat, India',
      },
    },
  })

  payload.logger.info('✅ Infrion content loaded (services, FAQ, pricing, testimonials, hero, contact).')
}

try {
  await run()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
