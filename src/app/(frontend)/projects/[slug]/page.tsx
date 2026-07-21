import { notFound } from 'next/navigation'
import { getProject, getSiteSettings } from '@/lib/queries'
import PageBanner from '@/components/theme/PageBanner'
import RichText from '@/components/RichText'
import ContactSection from '@/components/theme/ContactSection'
import Img from '@/components/theme/Img'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}
  return buildMetadata({
    seo: project.seo,
    fallbackTitle: project.title,
    fallbackDescription: project.summary ?? undefined,
  })
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [project, settings] = await Promise.all([getProject(slug), getSiteSettings()])
  if (!project) notFound()

  return (
    <>
      <PageBanner
        title={project.title}
        crumbs={[{ label: 'Projects', href: '/projects' }, { label: project.title }]}
      />

      <section className="axis-project-details-sec pt-120 pb-120">
        <div className="container">
          <div className="project-details-wrapper">
            <div className="project-main">
              <div className="project-thumbnail mb-50" data-aos="fade-up" data-aos-duration="1000">
                <Img
                  media={project.coverImage}
                  fallback="/assets/images/infrion/service-ai-agents.jpg"
                  alt="project image"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="project-content">
                <div className="row">
                  <div className="col-xl-8 order-2 order-xl-1" data-aos="fade-up" data-aos-duration="1000">
                    {project.summary ? <h3 className="title">{project.summary}</h3> : null}
                    <RichText data={project.content} />
                  </div>
                  <div className="col-xl-4 order-1 order-xl-2">
                    <div className="project-info-box mb-5 mb-xl-0" data-aos="fade-up" data-aos-duration="1200">
                      <h3>Project Information</h3>
                      <ul>
                        {project.date ? (
                          <li>
                            Completion Date
                            <span>
                              {new Date(project.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </li>
                        ) : null}
                        {project.client ? (
                          <li>
                            Client:<span>{project.client}</span>
                          </li>
                        ) : null}
                        {project.category ? (
                          <li>
                            Category:<span>{project.category}</span>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection settings={settings} />
    </>
  )
}
