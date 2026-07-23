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
    <section className="ix-proof">
      <span className="ix-proof-glow" aria-hidden="true" />
      <span className="ix-proof-grid" aria-hidden="true" />
      <div className="container">
        {/* Statement */}
        <div className="ix-proof-head" data-aos="fade-up" data-aos-duration="800">
          {data.eyebrow ? (
            <span className="ix-proof-eyebrow">
              <span className="bar" />
              {data.eyebrow}
            </span>
          ) : null}
          {data.heading ? (
            <h2 className="ix-proof-title">
              {data.heading}
              {data.highlight ? (
                <>
                  {' '}
                  <span>{data.highlight}</span>
                </>
              ) : null}
            </h2>
          ) : null}
          {data.intro ? <p className="ix-proof-intro">{data.intro}</p> : null}
          {features.length > 0 ? (
            <div className="ix-proof-chips">
              {features.map((f, i) => (
                <span className="ix-proof-chip" key={i}>
                  <i className={`fas ${f.icon || 'fa-check'}`} />
                  {f.title}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* Counter ribbon */}
        {stats.length > 0 ? (
          <div className="ix-proof-stats" data-aos="fade-up" data-aos-duration="1000">
            {stats.map((s, i) => {
              const m = /^(\d+)(.*)$/.exec(s.value ?? '')
              return (
                <div className="ix-proof-stat" key={i}>
                  <div className="ix-proof-num">
                    {m ? (
                      <>
                        <Counter end={parseInt(m[1], 10)} />
                        <span className="suffix">{m[2]}</span>
                      </>
                    ) : (
                      s.value
                    )}
                  </div>
                  <div className="ix-proof-stat-label">{s.label}</div>
                  {s.sublabel ? <div className="ix-proof-stat-sub">{s.sublabel}</div> : null}
                </div>
              )
            })}
          </div>
        ) : null}

        {/* Review bar */}
        {ratings.length > 0 ? (
          <div className="ix-proof-reviews" data-aos="fade-up" data-aos-duration="1200">
            {ratings.map((r, i) => {
              const full = Math.round(parseFloat(r.score || '0'))
              const inner = (
                <>
                  <PlatformIcon platform={r.platform} className="ix-proof-logo" />
                  <span className="ix-proof-rev-body">
                    <span className="ix-proof-rev-top">
                      <span className="ix-proof-rev-name">
                        {r.label?.replace(/^On\s+/i, '') || r.platform}
                      </span>
                      <span className="ix-proof-rev-score">{r.score}</span>
                    </span>
                    <span className="ix-proof-rev-bottom">
                      <span className="ix-proof-rev-stars">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <i key={s} className={s < full ? 'fas fa-star' : 'far fa-star'} />
                        ))}
                      </span>
                      {r.count ? <span className="ix-proof-rev-count">{r.count} reviews</span> : null}
                    </span>
                  </span>
                </>
              )
              return r.url ? (
                <a
                  className="ix-proof-review ix-proof-review--link"
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <div className="ix-proof-review" key={i}>
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
