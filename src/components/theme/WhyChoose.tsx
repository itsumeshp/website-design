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
    <section className="axis-why-choose pt-115 pb-90">
      <div className="container">
        {/* Theme section header: red sub-title + heading + intro */}
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="section-title text-center mb-50">
              <span className="sub-title" data-aos="fade-down" data-aos-duration="800">
                <span className="line" />
                {data.eyebrow || 'Why Infrion'}
              </span>
              {data.heading ? (
                <h2 className="text-anm">
                  {data.heading}
                  {data.highlight ? (
                    <>
                      {' '}
                      <span>{data.highlight}</span>
                    </>
                  ) : null}
                </h2>
              ) : null}
              {data.intro ? (
                <p data-aos="fade-up" data-aos-duration="1000">
                  {data.intro}
                </p>
              ) : null}
              {features.length > 0 ? (
                <div className="ix-why-checks" data-aos="fade-up" data-aos-duration="1200">
                  {features.map((f, i) => (
                    <span className="ix-why-check" key={i}>
                      <i className={`fas ${f.icon || 'fa-check-circle'}`} />
                      {f.title}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Stat cards row */}
        {stats.length > 0 ? (
          <div className="row">
            {stats.map((s, i) => {
              const m = /^(\d+)(.*)$/.exec(s.value ?? '')
              return (
                <div className="col-xl-3 col-md-6" key={i}>
                  <div
                    className="ix-stat-card mb-30"
                    data-aos="fade-up"
                    data-aos-duration={800 + i * 120}
                  >
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
                </div>
              )
            })}
          </div>
        ) : null}

        {/* Review cards row */}
        {ratings.length > 0 ? (
          <div className="row ix-review-row">
            {ratings.map((r, i) => {
              const full = Math.round(parseFloat(r.score || '0'))
              const inner = (
                <>
                  <PlatformIcon platform={r.platform} className="ix-review-logo" />
                  <div className="ix-review-body">
                    <span className="ix-review-name">
                      {r.label?.replace(/^On\s+/i, '') || r.platform}
                    </span>
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
              return (
                <div className="col-xl-3 col-md-6" key={i}>
                  {r.url ? (
                    <a
                      className="ix-review-card ix-review-card--link mb-30"
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="ix-review-card mb-30">{inner}</div>
                  )}
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
