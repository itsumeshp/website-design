import Link from 'next/link'
import { getServices } from '@/lib/queries'
import { Container, Section } from '@/components/ui'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'

export const metadata = { title: 'Services — Fexo' }

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <PageHeader title="Services" />
      <Section>
        <Container>
          {services.length === 0 ? (
            <p className="text-center text-body-text">No services yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <Reveal key={s.id} delay={i * 0.05}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group block h-full rounded-2xl border border-border-muted bg-white p-8 transition hover:border-primary hover:shadow-lg"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-heading text-lg font-bold text-primary">
                      {s.title.charAt(0)}
                    </div>
                    <h2 className="font-heading text-xl font-semibold text-heading group-hover:text-primary">
                      {s.title}
                    </h2>
                    {s.shortDesc ? <p className="mt-3 text-body-text">{s.shortDesc}</p> : null}
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
