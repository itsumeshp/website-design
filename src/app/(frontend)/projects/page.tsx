import Link from 'next/link'
import { getProjects, getSiteSettings } from '@/lib/queries'
import { mediaUrl } from '@/lib/media'
import PageBanner from '@/components/theme/PageBanner'
import ContactSection from '@/components/theme/ContactSection'

export const metadata = { title: 'Projects' }

export default async function ProjectsPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSiteSettings()])

  return (
    <>
      <PageBanner title="Projects" crumbs={[{ label: 'Projects' }]} />

      <section className="axis-project_five pt-120 pb-120">
        <div className="container-fluid">
          <div className="row justify-content-center">
            {projects.map((p, i) => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={p.id}>
                <div className="axis-project-item style-one mb-30" data-aos="fade-up" data-aos-duration={800 + i * 200}>
                  <div className="project-thumbnail">
                    <img
                      src={mediaUrl(p.coverImage)?.url ?? `/assets/images/innerpage/project/project-img${(i % 6) + 1}.jpg`}
                      alt="project image"
                    />
                  </div>
                  <div className="project-content">
                    {p.category ? <span className="tag">{p.category}</span> : null}
                    <h4 className="title">
                      <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                    </h4>
                    <Link href={`/projects/${p.slug}`} className="read-more style-one">
                      View Details
                      <i className="far fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection settings={settings} />
    </>
  )
}
