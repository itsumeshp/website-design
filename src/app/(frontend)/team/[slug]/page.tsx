import { notFound } from 'next/navigation'
import { getMember, getSiteSettings } from '@/lib/queries'
import PageBanner from '@/components/theme/PageBanner'
import ContactSection from '@/components/theme/ContactSection'
import Img from '@/components/theme/Img'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const member = await getMember(slug)
  if (!member) return {}
  return buildMetadata({
    fallbackTitle: member.name,
    fallbackDescription: member.bio ?? `${member.name} — ${member.role}`,
  })
}

export default async function TeamDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [member, settings] = await Promise.all([getMember(slug), getSiteSettings()])
  if (!member) notFound()

  const socials =
    member.socials && member.socials.length > 0
      ? member.socials.map((s) => ({ platform: s.platform, url: s.url }))
      : [
          { platform: 'facebook-f', url: '#' },
          { platform: 'twitter', url: '#' },
          { platform: 'linkedin-in', url: '#' },
          { platform: 'youtube', url: '#' },
        ]

  return (
    <>
      <PageBanner
        title={member.name}
        crumbs={[{ label: 'Team', href: '/team' }, { label: member.name }]}
      />

      <section className="axis-team-details-sec pt-120 pb-120">
        <div className="container">
          <div className="team-details-wrapper">
            <div className="row justify-content-center">
              <div className="col-xl-4 col-lg-10">
                <div className="member-image-wrap mb-5 mb-lg-0" data-aos="fade-up" data-aos-duration="1000">
                  <div className="member-image">
                    <Img
                      media={member.photo}
                      fallback="/assets/images/infrion/industry-saas.jpg"
                      alt="team single"
                      sizes="(max-width: 992px) 100vw, 33vw"
                      priority
                    />
                  </div>
                  <div className="member-info">
                    <h4>{member.name}</h4>
                    <span className="position">{member.role}</span>
                    <div className="info-list">
                      <h6>Social Media</h6>
                      <div className="social-box">
                        {socials.map((s, i) => (
                          <a key={i} href={s.url}>
                            <i className={`fab fa-${s.platform}`} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-lg-10">
                <div className="team-details-content">
                  <div className="content-box" data-aos="fade-up" data-aos-duration="1000">
                    <h3>About Me</h3>
                    <p>
                      {member.bio ??
                        `${member.name} is part of our leadership team, bringing deep expertise and a passion for delivering great technology outcomes.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection settings={settings} />
    </>
  )
}
