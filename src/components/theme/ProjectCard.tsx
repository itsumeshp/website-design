import Link from 'next/link'
import type { Project } from '@/payload-types'
import Img from './Img'

/**
 * Theme project card (axis-project-item style-one): thumbnail on top, then a
 * category tag, title, and a "View Details" link — matching the Fexo design.
 */
export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const href = `/projects/${project.slug}`
  return (
    <div
      className="axis-project-item style-one mb-30"
      data-aos="fade-up"
      data-aos-duration={800 + (index % 4) * 200}
    >
      <div className="project-thumbnail">
        <Img
          media={project.coverImage}
          fallback={
            [
              '/assets/images/infrion/industry-ecommerce.jpg',
              '/assets/images/infrion/industry-fintech.jpg',
              '/assets/images/infrion/industry-healthcare.jpg',
              '/assets/images/infrion/industry-saas.jpg',
              '/assets/images/infrion/service-ai-agents.jpg',
              '/assets/images/infrion/service-cloud.jpg',
            ][index % 6]
          }
          alt="project image"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      <div className="project-content">
        {project.category ? (
          <Link href="/projects" className="tag">
            {project.category}
          </Link>
        ) : null}
        <h4 className="title">
          <Link href={href}>{project.title}</Link>
        </h4>
        <Link href={href} className="read-more style-one">
          View Details
          <i className="far fa-arrow-right" />
        </Link>
      </div>
    </div>
  )
}
