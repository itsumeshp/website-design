import { getFaqs, getSiteSettings } from '@/lib/queries'
import { extractPlainText } from '@/lib/lexical'
import PageBanner from '@/components/theme/PageBanner'
import FaqAccordion, { type FaqItem } from '@/components/theme/FaqAccordion'
import ContactSection from '@/components/theme/ContactSection'

export const metadata = { title: 'FAQ — Fexo' }

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

      <section className="axis-faq_one pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="section-title text-center mb-55">
                <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                  Frequently Asked Questions<span className="lineTwo" />
                </span>
                <h2 className="text-anm">Discover Our Complete IT Services &amp; Solutions</h2>
              </div>
              <FaqAccordion items={items} />
            </div>
          </div>
        </div>
      </section>

      <ContactSection settings={settings} />
    </>
  )
}
