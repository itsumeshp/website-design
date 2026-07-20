import { getSiteSettings } from '@/lib/queries'
import { Container, Section } from '@/components/ui'
import PageHeader from '@/components/PageHeader'
import ContactForm from '@/components/ContactForm'

export const metadata = { title: 'Contact — Fexo' }

export default async function ContactPage() {
  const settings = await getSiteSettings()
  const c = settings.contact

  return (
    <>
      <PageHeader title="Contact Us" />
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <h2 className="font-heading text-2xl font-bold text-heading">Get in touch</h2>
              <p className="mt-3 text-body-text">
                Have a project in mind? Send us a message and we&apos;ll respond as soon as possible.
              </p>
              <dl className="mt-8 space-y-4">
                {c?.email ? (
                  <div>
                    <dt className="text-sm uppercase tracking-wide text-body-text">Email</dt>
                    <dd className="font-heading font-semibold text-heading">{c.email}</dd>
                  </div>
                ) : null}
                {c?.phone ? (
                  <div>
                    <dt className="text-sm uppercase tracking-wide text-body-text">Phone</dt>
                    <dd className="font-heading font-semibold text-heading">{c.phone}</dd>
                  </div>
                ) : null}
                {c?.address ? (
                  <div>
                    <dt className="text-sm uppercase tracking-wide text-body-text">Address</dt>
                    <dd className="font-heading font-semibold text-heading">{c.address}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  )
}
