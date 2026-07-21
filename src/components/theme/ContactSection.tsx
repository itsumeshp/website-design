import type { SiteSetting } from '@/payload-types'
import ContactForm from './ContactForm'

export default function ContactSection({ settings }: { settings: SiteSetting }) {
  const c = settings.contact
  return (
    <section className="axis-contact_two pt-120 pb-120 p-r z-1">
      <div className="contact-map">
        <img src="/assets/images/innerpage/gallery/map.png" alt="map" />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-10">
            <div className="axis-content-box mb-5 mb-xl-0">
              <div className="section-title">
                <span className="sub-title" data-aos="fade-down" data-aos-duration="800">
                  <span className="line" />
                  Free Assessment
                </span>
                <h2 className="text-anm">Get a free AI opportunity assessment</h2>
              </div>
              <p data-aos="fade-up" data-aos-duration="800">
                Tell us the process that eats your week. We&apos;ll come back within a business day
                with clarifying questions and a practical next step.
              </p>
              <div className="row">
                <div className="col-md-6">
                  <div className="axis-info-box style-three mb-40" data-aos="fade-up" data-aos-duration="1000">
                    <div className="icon">
                      <i className="far fa-map-marker-alt" />
                    </div>
                    <div className="content">
                      <h5>Location</h5>
                      <p>{c?.address ?? '1321 Gateway Atlantic City, Florida, 54012'}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="axis-info-box style-three mb-40" data-aos="fade-up" data-aos-duration="1200">
                    <div className="icon">
                      <i className="far fa-phone-alt" />
                    </div>
                    <div className="content">
                      <h5>Phone</h5>
                      <p>
                        <a href={`tel:${(c?.phone ?? '').replace(/\s+/g, '')}`}>
                          {c?.phone ?? '+91 93289 64742'}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="axis-info-box style-three mb-40" data-aos="fade-up" data-aos-duration="1400">
                    <div className="icon">
                      <i className="far fa-envelope" />
                    </div>
                    <div className="content">
                      <h5>Email</h5>
                      <p>
                        <a href={`mailto:${c?.email ?? 'hello@infriontechnolab.com'}`}>
                          {c?.email ?? 'hello@infriontechnolab.com'}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="axis-info-box style-three mb-40" data-aos="fade-up" data-aos-duration="1600">
                    <div className="icon">
                      <i className="far fa-share-alt" />
                    </div>
                    <div className="content">
                      <h5>Social</h5>
                      <div className="social-box">
                        {(settings.socials && settings.socials.length > 0
                          ? settings.socials.map((s) => ({ platform: s.platform, url: s.url }))
                          : [
                              { platform: 'facebook-f', url: '#' },
                              { platform: 'twitter', url: '#' },
                              { platform: 'instagram', url: '#' },
                              { platform: 'linkedin-in', url: '#' },
                            ]
                        ).map((s, i) => (
                          <a key={i} href={s.url}>
                            <i className={`fab fa-${s.platform}`} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
