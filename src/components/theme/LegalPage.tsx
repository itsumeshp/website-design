import type { ReactNode } from 'react'
import PageBanner from './PageBanner'

export default function LegalPage({
  title,
  description,
  lastUpdated,
  children,
}: {
  title: string
  description: string
  lastUpdated: string
  children: ReactNode
}) {
  return (
    <>
      <PageBanner title={title} crumbs={[{ label: title }]} />
      <section className="pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-11">
              <div className="legal-content">
                <p className="legal-lead">{description}</p>
                <p className="legal-updated">Last updated: {lastUpdated}</p>
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/** A titled legal section (heading + body). */
export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="legal-section" data-aos="fade-up" data-aos-duration="600">
      <h3>{heading}</h3>
      {children}
    </div>
  )
}
