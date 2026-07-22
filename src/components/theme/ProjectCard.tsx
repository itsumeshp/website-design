import Link from 'next/link'
import type { Project } from '@/payload-types'
import Img from './Img'

/**
 * Project card for a 2-column grid: full cover image on top (fits the product
 * mockups), then category, title, and a short tagline. Whole card is a link.
 */
export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const href = `/projects/${project.slug}`
  return (
    <Link
      href={href}
      className="ix-project-card"
      data-aos="fade-up"
      data-aos-duration={800 + (index % 2) * 150}
    >
      <div className="ix-project-media">
        <Img
          media={project.coverImage}
          fallback={
            [
              '/assets/images/infrion/industry-ecommerce.jpg',
              '/assets/images/infrion/industry-fintech.jpg',
              '/assets/images/infrion/industry-healthcare.jpg',
              '/assets/images/infrion/industry-saas.jpg',
            ][index % 4]
          }
          alt={project.title}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="ix-project-body">
        {project.category ? <span className="ix-project-cat">{project.category}</span> : null}
        <h3 className="ix-project-title">{project.title}</h3>
        {project.summary ? <p className="ix-project-desc">{project.summary}</p> : null}
        <span className="ix-project-arrow" aria-hidden>
          <i className="far fa-arrow-right" />
        </span>
      </div>
    </Link>
  )
}
