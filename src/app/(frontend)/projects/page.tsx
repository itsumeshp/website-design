import Link from 'next/link'
import { getProjects } from '@/lib/queries'
import { Container, Section } from '@/components/ui'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'

export const metadata = { title: 'Projects — Fexo' }

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <PageHeader title="Projects" />
      <Section>
        <Container>
          {projects.length === 0 ? (
            <p className="text-center text-body-text">No projects yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group block h-full overflow-hidden rounded-2xl border border-border-muted bg-white transition hover:shadow-lg"
                  >
                    <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 font-heading text-2xl font-bold text-heading/30">
                      {p.title.charAt(0)}
                    </div>
                    <div className="p-6">
                      {p.category ? (
                        <span className="text-xs font-medium uppercase tracking-wide text-primary">
                          {p.category}
                        </span>
                      ) : null}
                      <h2 className="mt-1 font-heading text-lg font-semibold text-heading group-hover:text-primary">
                        {p.title}
                      </h2>
                      {p.summary ? (
                        <p className="mt-2 text-sm text-body-text">{p.summary}</p>
                      ) : null}
                    </div>
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
