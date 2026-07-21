import Link from 'next/link'
import type { Project } from '@/payload-types'
import Img from './Img'

/**
 * Modern case-study card: contained image on top, title + summary, tech chips,
 * and a corner arrow (inspired by the reference design).
 */
export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const chips = (project.techStack ?? []).map((t) => t.label)
  return (
    <Link href={`/projects/${project.slug}`} className="ix-project-card" data-aos="fade-up" data-aos-duration={800 + (index % 3) * 150}>
      <div className="ix-project-media">
        <Img
          media={project.coverImage}
          fallback={`/assets/images/innerpage/project/project-img${(index % 6) + 1}.jpg`}
          alt={project.title}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="ix-project-body">
        {project.category ? <span className="ix-project-cat">{project.category}</span> : null}
        <h3 className="ix-project-title">{project.title}</h3>
        {project.summary ? <p className="ix-project-desc">{project.summary}</p> : null}
        {chips.length > 0 ? (
          <div className="ix-chips">
            {chips.map((c) => (
              <span className="ix-chip" key={c}>
                {c}
              </span>
            ))}
          </div>
        ) : null}
        <span className="ix-project-arrow" aria-hidden>
          <i className="far fa-arrow-right" />
        </span>
      </div>
    </Link>
  )
}
