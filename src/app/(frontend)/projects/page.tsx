import { getProjects, getSiteSettings } from '@/lib/queries'
import PageBanner from '@/components/theme/PageBanner'
import ContactSection from '@/components/theme/ContactSection'
import ProjectCard from '@/components/theme/ProjectCard'

export const metadata = { title: 'Projects' }

export default async function ProjectsPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSiteSettings()])

  return (
    <>
      <PageBanner title="Projects" crumbs={[{ label: 'Projects' }]} />

      <section className="pt-120 pb-120">
        <div className="container">
          <div className="row">
            {projects.map((p, i) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-30" key={p.id}>
                <ProjectCard project={p} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection settings={settings} />
    </>
  )
}
