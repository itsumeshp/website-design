import Link from 'next/link'

export default function PageBanner({
  title,
  crumbs = [],
}: {
  title: string
  crumbs?: { label: string; href?: string }[]
}) {
  return (
    <section
      className="page-hero bg_cover p-r z-1"
      style={{ backgroundImage: "linear-gradient(135deg, #0a0e24 0%, #14183a 55%, #2b0f16 100%)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="page-content text-center">
              <h1>{title}</h1>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                {crumbs.map((c) =>
                  c.href ? (
                    <li key={c.label}>
                      <Link href={c.href}>{c.label}</Link>
                    </li>
                  ) : (
                    <li key={c.label}>{c.label}</li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
