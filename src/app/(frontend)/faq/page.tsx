import Link from 'next/link'
import { getFaqs, getSiteSettings } from '@/lib/queries'
import { extractPlainText } from '@/lib/lexical'
import PageBanner from '@/components/theme/PageBanner'
import FaqAccordion, { type FaqItem } from '@/components/theme/FaqAccordion'
import ContactSection from '@/components/theme/ContactSection'

export const metadata = { title: 'FAQ' }

export default async function FaqPage() {
  const [faqs, settings] = await Promise.all([getFaqs(), getSiteSettings()])
  const items: FaqItem[] = faqs.map((f) => ({
    id: String(f.id),
    question: f.question,
    answer: extractPlainText(f.answer),
  }))

  return (
    <>
      <PageBanner title="FAQ" crumbs={[{ label: 'FAQ' }]} />

      {/* Theme layout: left content/CTA, right accordion (axis-faq-sec) */}
      <section className="axis-faq-sec pt-120 pb-95">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="axis-content-box">
                <div className="section-title">
                  <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                    <span className="line" />
                    Frequently Asked Questions
                  </span>
                  <h2 className="text-anm">Answers to common questions about how we work.</h2>
                </div>
                <p className="mb-30" data-aos="fade-up" data-aos-duration="1000">
                  Still unsure about something — scope, timelines, ownership, or how we apply AI to
                  your workflow? Reach out and we&apos;ll walk you through it.
                </p>
                <div className="axis-button" data-aos="fade-up" data-aos-duration="1200">
                  <Link href="/contact" className="theme-btn style-one">
                    Contact Us <i className="far fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <FaqAccordion items={items} />
            </div>
          </div>
        </div>
      </section>

      <ContactSection settings={settings} />
    </>
  )
}
