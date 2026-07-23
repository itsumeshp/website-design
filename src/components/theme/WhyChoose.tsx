import Link from 'next/link'
import Counter from './Counter'
import type { HomePage } from '@/payload-types'

// Brand-logo slugs (Simple Icons CDN, already used by the tech strip).
const ICON: Record<string, string> = {
  google: 'google',
  clutch: 'clutch',
  upwork: 'upwork',
  freelancer: 'freelancer',
  trustpilot: 'trustpilot',
  g2: 'g2',
  linkedin: 'linkedin',
}
const iconUrl = (p?: string | null) =>
  p && ICON[p] ? `https://cdn.simpleicons.org/${ICON[p]}` : null

export default function WhyChoose({ data }: { data: HomePage['whyChoose'] }) {
  if (!data) return null
  const stats = data.stats ?? []
  const ratings = data.ratings ?? []
  const ctas = data.ctas ?? []
  if (!data.heading && stats.length === 0) return null

  return (
    <section className="axis-why-choose pt-120 pb-120">
      <div className="container">
        <div className="row align-items-center">
          {/* Left: heading + intro + review ratings */}
          <div className="col-xl-5 col-lg-6">
            <div className="section-title mb-25" data-aos="fade-up" data-aos-duration="800">
              <span className="sub-title">
                <span className="line" />
                Why Infrion
              </span>
              <h2>
                {data.heading}
                {data.highlight ? (
                  <>
                    {' '}
                    <span style={{ color: 'var(--primary-color)' }}>{data.highlight}</span>
                  </>
                ) : null}
              </h2>
            </div>
            {data.intro ? (
              <p className="ix-why-intro" data-aos="fade-up" data-aos-duration="1000">
                {data.intro}
              </p>
            ) : null}
            {ratings.length > 0 ? (
              <div className="ix-rating-card" data-aos="fade-up" data-aos-duration="1200">
                {ratings.map((r, i) => (
                  <div className="ix-rating" key={i}>
                    {iconUrl(r.platform) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="ix-rating-logo" src={iconUrl(r.platform)!} alt={r.platform} />
                    ) : null}
                    <div className="ix-rating-body">
                      <div className="ix-rating-score">
                        <i className="fas fa-star" />
                        {r.score}
                        {r.count ? <span className="ix-rating-count"> / {r.count}</span> : null}
                      </div>
                      {r.label ? <div className="ix-rating-label">{r.label}</div> : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Right: stat grid + platform buttons */}
          <div className="col-xl-7 col-lg-6">
            <div className="ix-why-stats">
              {stats.map((s, i) => {
                const m = /^(\d+)(.*)$/.exec(s.value ?? '')
                return (
                  <div
                    className="ix-why-stat"
                    key={i}
                    data-aos="fade-up"
                    data-aos-duration={800 + i * 150}
                  >
                    <h3>
                      {m ? (
                        <>
                          <Counter end={parseInt(m[1], 10)} />
                          {m[2]}
                        </>
                      ) : (
                        s.value
                      )}
                    </h3>
                    <p>{s.label}</p>
                  </div>
                )
              })}
            </div>
            {ctas.length > 0 ? (
              <div className="ix-why-ctas" data-aos="fade-up" data-aos-duration="1200">
                {ctas.map((c, i) => (
                  <Link
                    key={i}
                    href={c.url}
                    className="ix-plat-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {iconUrl(c.platform) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={iconUrl(c.platform)!} alt="" />
                    ) : null}
                    <span>{c.label}</span>
                    <i className="far fa-arrow-right" />
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
