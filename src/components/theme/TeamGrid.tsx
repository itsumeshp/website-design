import Link from 'next/link'
import type { TeamMember } from '@/payload-types'
import { mediaUrl } from '@/lib/media'

export default function TeamGrid({
  members,
  showTitle = true,
}: {
  members: TeamMember[]
  showTitle?: boolean
}) {
  if (members.length === 0) return null
  return (
    <section className="axis-team-sec pt-120 pb-90">
      <div className="container">
        {showTitle ? (
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-10">
              <div className="section-title text-center mb-50">
                <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                  <span className="line" />
                  Expert Team
                </span>
                <h2 className="text-anm">Meet the leadership team</h2>
              </div>
            </div>
          </div>
        ) : null}
        <div className="row">
          {members.map((m, i) => (
            <div className="col-xl-3 col-md-6 col-sm-12" key={m.id}>
              <div className="axis-team-item style-one mb-30" data-aos="fade-up" data-aos-duration={1000 + i * 200}>
                <div className="member-image">
                  <img
                    src={mediaUrl(m.photo)?.url ?? `/assets/images/innerpage/team/team-img${(i % 4) + 1}.jpg`}
                    alt="team image"
                  />
                </div>
                <div className="member-info">
                  <h4 className="title">
                    <Link href={`/team/${m.slug}`}>{m.name}</Link>
                  </h4>
                  <span className="position">{m.role}</span>
                  <div className="social-box">
                    {(m.socials && m.socials.length > 0
                      ? m.socials.map((s) => ({ platform: s.platform, url: s.url }))
                      : [
                          { platform: 'facebook-f', url: '#' },
                          { platform: 'twitter', url: '#' },
                          { platform: 'linkedin-in', url: '#' },
                          { platform: 'youtube', url: '#' },
                        ]
                    ).map((s, idx) => (
                      <a key={idx} href={s.url}>
                        <i className={`fab fa-${s.platform}`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
