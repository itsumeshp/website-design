import Counter from './Counter'
import PlatformIcon from './PlatformIcon'
import type { HomePage } from '@/payload-types'

export default function WhyChoose({ data }: { data: HomePage['whyChoose'] }) {
  if (!data) return null
  const stats = data.stats ?? []
  const ratings = data.ratings ?? []
  const features = data.features ?? []
  if (!data.heading && stats.length === 0) return null

  return (
    <section className="axis-why-choose pt-90 pb-90">
      <div className="container">
        <div className="row">
          {/* Left: eyebrow + heading + intro + feature points */}
          <div className="col-xl-5 col-lg-6">
            <div className="ix-why-left">
              <div className="section-title" data-aos="fade-up" data-aos-duration="800">
                <h2 className="ix-why-heading">
                  {data.heading}
                  {data.highlight ? (
                    <>
                      {' '}
                      <span>{data.highlight}</span>
                    </>
                  ) : null}
                </h2>
              </div>
              {data.intro ? (
                <p className="ix-why-intro" data-aos="fade-up" data-aos-duration="1000">
                  {data.intro}
                </p>
              ) : null}
              {features.length > 0 ? (
                <div className="ix-why-features" data-aos="fade-up" data-aos-duration="1200">
                  {features.map((f, i) => (
                    <div className="ix-why-feature" key={i}>
                      <span className="ix-why-feature-ico">
                        <i className={`fas ${f.icon || 'fa-check'}`} />
                      </span>
                      <div>
                        <h5>{f.title}</h5>
                        {f.desc ? <p>{f.desc}</p> : null}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* Right: 2x2 stat cards */}
          <div className="col-xl-7 col-lg-6">
            <div className="ix-stat-cards">
              {stats.map((s, i) => {
                const m = /^(\d+)(.*)$/.exec(s.value ?? '')
                return (
                  <div className="ix-stat-card" key={i} data-aos="fade-up" data-aos-duration={800 + i * 120}>
                    <span className="ix-stat-ico">
                      <i className={`fas ${s.icon || 'fa-chart-simple'}`} />
                    </span>
                    <div className="ix-stat-value">
                      {m ? (
                        <>
                          <Counter end={parseInt(m[1], 10)} />
                          {m[2]}
                        </>
                      ) : (
                        s.value
                      )}
                    </div>
                    <div className="ix-stat-label">{s.label}</div>
                    {s.sublabel ? <div className="ix-stat-sub">{s.sublabel}</div> : null}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Review cards row */}
        {ratings.length > 0 ? (
          <div className="ix-review-cards" data-aos="fade-up" data-aos-duration="900">
            {ratings.map((r, i) => {
              const full = Math.round(parseFloat(r.score || '0'))
              const inner = (
                <>
                  <PlatformIcon platform={r.platform} className="ix-review-logo" />
                  <div className="ix-review-body">
                    <span className="ix-review-name">{r.label?.replace(/^On\s+/i, '') || r.platform}</span>
                    <span className="ix-review-score">
                      {r.score}
                      <span className="ix-review-stars">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <i key={s} className={s < full ? 'fas fa-star' : 'far fa-star'} />
                        ))}
                      </span>
                    </span>
                    {r.count ? <span className="ix-review-count">{r.count} reviews</span> : null}
                  </div>
                </>
              )
              return r.url ? (
                <a
                  className="ix-review-card ix-review-card--link"
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <div className="ix-review-card" key={i}>
                  {inner}
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
