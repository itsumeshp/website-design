import Link from 'next/link'
import { getTeam } from '@/lib/queries'
import { Container, Section } from '@/components/ui'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'

export const metadata = { title: 'Team — Fexo' }

export default async function TeamPage() {
  const team = await getTeam()

  return (
    <>
      <PageHeader title="Our Team" />
      <Section>
        <Container>
          {team.length === 0 ? (
            <p className="text-center text-body-text">No team members yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m, i) => (
                <Reveal key={m.id} delay={i * 0.05}>
                  <Link
                    href={`/team/${m.slug}`}
                    className="group block rounded-2xl border border-border-muted bg-white p-6 text-center transition hover:shadow-lg"
                  >
                    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 font-heading text-2xl font-bold text-primary">
                      {m.name.charAt(0)}
                    </div>
                    <h2 className="font-heading text-lg font-semibold text-heading group-hover:text-primary">
                      {m.name}
                    </h2>
                    <p className="text-sm text-body-text">{m.role}</p>
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
