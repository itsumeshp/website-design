import Link from 'next/link'
import Counter from './Counter'
import PlatformIcon from './PlatformIcon'
import type { HomePage } from '@/payload-types'

export default function WhyChoose({ data }: { data: HomePage['whyChoose'] }) {
  if (!data) return null
  const stats = data.stats ?? []
  const ratings = data.ratings ?? []
  const ctas = data.ctas ?? []
  if (!data.heading && stats.length === 0) return null

  return (
    <section className="axis-why-choose pt-100 pb-100">
      <div className="container">
        <div className="row align-items-center">
          {/* Left: heading + intro + rating strip */}
          <div className="col-xl-6 col-lg-6">
            <div className="section-title mb-25">
              <span className="sub-title" data-aos="fade-up" data-aos-duration="700">
                <span className="line" />
                {data.eyebrow || 'Proven Results'}
              </span>
              {data.heading ? (
                <h2 data-aos="fade-up" data-aos-duration="800">
                  {data.heading}
                  {data.highlight ? (
                    <>
                      {' '}
                      <span>{data.highlight}</span>
                    </>
                  ) : null}
                </h2>
              ) : null}
            </div>
            {data.intro ? (
              <p className="ix-why-intro" data-aos="fade-up" data-aos-duration="1000">
                {data.intro}
              </p>
            ) : null}
            {ratings.length > 0 ? (
              <div className="ix-rating-card" data-aos="fade-up" data-aos-duration="1200">
                {ratings.map((r, i) => {
                  const inner = (
                    <>
                      <PlatformIcon platform={r.platform} className="ix-rating-logo" />
                      <span className={`ix-rating-body${r.score ? '' : ' ix-rating-body--plain'}`}>
                        {r.score ? (
                          <>
                            <span className="ix-rating-score">
                              <i className="fas fa-star" />
                              {r.score}
                              {r.count ? <span className="ix-rating-count"> / {r.count}</span> : null}
                            </span>
                            {r.label ? <span className="ix-rating-label">{r.label}</span> : null}
                          </>
                        ) : (
                          <span className="ix-rating-plain">
                            {(r.label || r.platform || '').replace(/^On\s+/i, '')}
                            {r.url ? <i className="far fa-arrow-right" /> : null}
                          </span>
                        )}
                      </span>
                    </>
                  )
                  return r.url ? (
                    <a
                      className="ix-rating ix-rating--link"
                      key={i}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {inner}
                    </a>
                  ) : (
                    <span className="ix-rating" key={i}>
                      {inner}
                    </span>
                  )
                })}
              </div>
            ) : null}
          </div>

          {/* Right: plain 2x2 stats + platform buttons */}
          <div className="col-xl-6 col-lg-6">
            <div className="ix-why-stats">
              {stats.map((s, i) => {
                const m = /^(\d+)(.*)$/.exec(s.value ?? '')
                return (
                  <div className="ix-why-stat" key={i} data-aos="fade-up" data-aos-duration={800 + i * 120}>
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
                    {s.sublabel ? <span className="ix-why-stat-sub">{s.sublabel}</span> : null}
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
                    <PlatformIcon platform={c.platform} />
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
