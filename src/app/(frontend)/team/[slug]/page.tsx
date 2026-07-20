import { notFound } from 'next/navigation'
import { getMember } from '@/lib/queries'
import { Container, Section } from '@/components/ui'
import PageHeader from '@/components/PageHeader'

export default async function TeamDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const member = await getMember(slug)
  if (!member) notFound()

  return (
    <>
      <PageHeader title={member.name} crumb={{ label: 'Team', href: '/team' }} />
      <Section>
        <Container className="max-w-3xl">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-heading text-4xl font-bold text-primary">
              {member.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-heading">{member.name}</h2>
              <p className="text-primary">{member.role}</p>
              {member.bio ? <p className="mt-4 text-body-text">{member.bio}</p> : null}
              {member.socials && member.socials.length > 0 ? (
                <div className="mt-6 flex gap-4">
                  {member.socials.map((s) => (
                    <a
                      key={s.id ?? s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm capitalize text-body-text transition hover:text-primary"
                    >
                      {s.platform}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
