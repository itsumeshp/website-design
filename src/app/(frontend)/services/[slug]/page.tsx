import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getService, getSiteSettings, getFaqs } from '@/lib/queries'
import PageBanner from '@/components/theme/PageBanner'
import RichText from '@/components/RichText'
import ContactSection from '@/components/theme/ContactSection'
import FaqAccordion, { type FaqItem } from '@/components/theme/FaqAccordion'
import Counter from '@/components/theme/Counter'
import Img from '@/components/theme/Img'
import { extractPlainText } from '@/lib/lexical'
import { buildMetadata } from '@/lib/seo'

// Mid-content feature image + closing note per service. Images live in
// public/assets/images/infrion and are distinct from the svc-* thumbnails.
const SERVICE_EXTRA: Record<string, { img: string; heading: string; body: string }> = {
  'ai-agents': {
    img: 'service-ai-agents.jpg',
    heading: 'Agents that hold up in production',
    body: 'We ship agents with an evaluation harness, guardrails, and a human-handoff path — so you can see how they behave on real inputs before they ever touch a customer, and keep them honest as your data changes.',
  },
  'ai-automation': {
    img: 'service-ai-automation.jpg',
    heading: 'Automation that survives the edge cases',
    body: 'The happy path is easy. We design for the approvals that stall, the documents that arrive malformed, and the sync that fails at 2am — with fallbacks, retries, and monitoring so a broken step pages someone instead of silently dropping work.',
  },
  'mobile-app-development': {
    img: 'service-mobile.jpg',
    heading: 'One codebase, from phone to desktop',
    body: 'Installable, offline-capable apps that share a single backend with your web platform. Your users get the same AI features in their pocket, and you maintain one system instead of three.',
  },
  'web-platform-development': {
    img: 'service-web.jpg',
    heading: 'A platform that is AI-ready before you need it',
    body: 'We build the data model, auth, and API layer so intelligence is a feature you switch on later — not a rebuild you fund. Customer portals, internal tools, and SaaS products that scale with the business.',
  },
  'apis--integrations': {
    img: 'service-api.jpg',
    heading: 'Your systems, finally speaking the same language',
    body: 'CRM, ERP, payments, WhatsApp, and the legacy database nobody wants to touch — connected with typed contracts, retries, and observability, so data flows automatically and your AI tools see the full picture.',
  },
  'cloud-architecture': {
    img: 'service-cloud.jpg',
    heading: 'Infrastructure that stays boring',
    body: 'Predictable costs, automated delivery, secure defaults, and alerting that only fires when it matters. Built to scale with your product, not years ahead of it — so the bill and the on-call load both stay sane.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return {}
  return buildMetadata({
    seo: service.seo,
    fallbackTitle: service.title,
    fallbackDescription: service.shortDesc ?? undefined,
  })
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [service, settings, faqs] = await Promise.all([
    getService(slug),
    getSiteSettings(),
    getFaqs(),
  ])
  if (!service) notFound()

  const extra = SERVICE_EXTRA[slug]

  const faqItems: FaqItem[] = faqs.map((f) => ({
    id: String(f.id),
    question: f.question,
    answer: extractPlainText(f.answer),
  }))

  return (
    <>
      <PageBanner title={service.title} crumbs={[{ label: 'Services', href: '/services' }, { label: service.title }]} />

      <section className="service-details-sec pt-120 pb-100">
        <div className="container">
          <div className="service-details-wrapper">
            <div className="service-item-main mb-60">
              <div className="service-thumbnail mb-30" data-aos="fade-up" data-aos-duration="800">
                <Img
                  media={service.image}
                  fallback="/assets/images/infrion/svc-cloud.jpg"
                  alt="service image"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="service-content" data-aos="fade-up" data-aos-duration="800">
                <RichText data={service.content} className="ix-service-rte" />
                <h3>How we deliver</h3>
                <div className="row">
                  <div className="col-lg-4">
                    <ul className="check-list style-one mb-30">
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Grounded in your data
                      </li>
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Production-ready systems
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-4">
                    <ul className="check-list style-one mb-30">
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Monitoring & support
                      </li>
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Clear handoff & docs
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-4">
                    <ul className="check-list style-one mb-30">
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Security by default
                      </li>
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        You own the IP
                      </li>
                    </ul>
                  </div>
                </div>
                {extra ? (
                  <div className="ix-service-extra">
                    <h3>{extra.heading}</h3>
                    <p>{extra.body}</p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="counter-wrapper pt-50 mb-60">
              <div className="row">
                {[
                  { n: 14, suffix: '+', label: 'Products shipped' },
                  { n: 6, suffix: '', label: 'Core services' },
                  { n: 4, suffix: '', label: 'Industries served' },
                  { n: 100, suffix: '%', label: 'You own the IP' },
                ].map((c, i) => (
                  <div className="col-xl-3 col-md-6 col-sm-12 item-border" key={i}>
                    <div className="axis-counter-item">
                      <div className="content">
                        <h2>
                          <Counter end={c.n} />
                          {c.suffix}
                        </h2>
                        <p>{c.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {faqItems.length > 0 ? (
              <div className="faq-wrapper pt-30">
                <div className="row">
                  <div className="col-xl-6">
                    <div className="section-title">
                      <span className="sub-title">
                        <span className="line" />
                        FAQ
                      </span>
                      <h2 className="text-anm">Answers before you get in touch</h2>
                    </div>
                    <div className="axis-button mt-40 mb-5 mb-xl-0">
                      <Link href="/faq" className="theme-btn style-one">
                        See all FAQs <i className="far fa-arrow-right" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <FaqAccordion items={faqItems} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <ContactSection settings={settings} />
    </>
  )
}
