import { notFound } from 'next/navigation'
import { getProject } from '@/lib/queries'
import { Container, Section } from '@/components/ui'
import PageHeader from '@/components/PageHeader'
import RichText from '@/components/RichText'

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  return (
    <>
      <PageHeader title={project.title} crumb={{ label: 'Projects', href: '/projects' }} />
      <Section>
        <Container className="max-w-3xl">
          <dl className="mb-8 grid grid-cols-2 gap-4 rounded-2xl border border-border-muted bg-gray-bg p-6 sm:grid-cols-3">
            {project.client ? (
              <div>
                <dt className="text-xs uppercase tracking-wide text-body-text">Client</dt>
                <dd className="font-heading font-semibold text-heading">{project.client}</dd>
              </div>
            ) : null}
            {project.category ? (
              <div>
                <dt className="text-xs uppercase tracking-wide text-body-text">Category</dt>
                <dd className="font-heading font-semibold text-heading">{project.category}</dd>
              </div>
            ) : null}
            {project.date ? (
              <div>
                <dt className="text-xs uppercase tracking-wide text-body-text">Date</dt>
                <dd className="font-heading font-semibold text-heading">
                  {new Date(project.date).getFullYear()}
                </dd>
              </div>
            ) : null}
          </dl>
          {project.summary ? (
            <p className="mb-6 text-lg text-body-text">{project.summary}</p>
          ) : null}
          <RichText
            data={project.content}
            className="prose max-w-none text-body-text [&_h2]:font-heading [&_h2]:text-heading"
          />
        </Container>
      </Section>
    </>
  )
}
