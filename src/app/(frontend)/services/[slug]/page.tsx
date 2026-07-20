import { notFound } from 'next/navigation'
import { getService } from '@/lib/queries'
import { Container, Section, Button } from '@/components/ui'
import PageHeader from '@/components/PageHeader'
import RichText from '@/components/RichText'

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) notFound()

  return (
    <>
      <PageHeader title={service.title} crumb={{ label: 'Services', href: '/services' }} />
      <Section>
        <Container className="max-w-3xl">
          {service.shortDesc ? (
            <p className="mb-6 text-lg text-body-text">{service.shortDesc}</p>
          ) : null}
          <RichText
            data={service.content}
            className="prose max-w-none text-body-text [&_h2]:font-heading [&_h2]:text-heading"
          />
          <div className="mt-10">
            <Button href="/contact">Enquire about this service</Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
