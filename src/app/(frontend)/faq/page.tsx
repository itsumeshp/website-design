import { getFaqs } from '@/lib/queries'
import { Container, Section } from '@/components/ui'
import PageHeader from '@/components/PageHeader'
import Accordion from '@/components/Accordion'
import RichText from '@/components/RichText'

export const metadata = { title: 'FAQ — Fexo' }

export default async function FaqPage() {
  const faqs = await getFaqs()

  const items = faqs.map((f) => ({
    id: String(f.id),
    question: f.question,
    answer: <RichText data={f.answer} />,
  }))

  return (
    <>
      <PageHeader title="FAQ" />
      <Section>
        <Container>
          {items.length === 0 ? (
            <p className="text-center text-body-text">No FAQs yet.</p>
          ) : (
            <Accordion items={items} />
          )}
        </Container>
      </Section>
    </>
  )
}
