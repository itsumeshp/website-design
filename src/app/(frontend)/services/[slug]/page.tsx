import { notFound } from 'next/navigation'
import { getService, getSiteSettings } from '@/lib/queries'
import { mediaUrl } from '@/lib/media'
import PageBanner from '@/components/theme/PageBanner'
import RichText from '@/components/RichText'
import ContactSection from '@/components/theme/ContactSection'

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [service, settings] = await Promise.all([getService(slug), getSiteSettings()])
  if (!service) notFound()

  const thumb = mediaUrl(service.image)?.url ?? '/assets/images/innerpage/service/service-single1.jpg'

  return (
    <>
      <PageBanner title={service.title} crumbs={[{ label: 'Services', href: '/services' }, { label: service.title }]} />

      <section className="service-details-sec pt-120 pb-100">
        <div className="container">
          <div className="service-details-wrapper">
            <div className="service-item-main mb-60">
              <div className="service-thumbnail mb-30" data-aos="fade-up" data-aos-duration="800">
                <img src={thumb} alt="service image" />
              </div>
              <div className="service-content" data-aos="fade-up" data-aos-duration="800">
                {service.shortDesc ? <h4 className="title">{service.shortDesc}</h4> : null}
                <RichText data={service.content} />
                <div className="row">
                  <div className="col-lg-4">
                    <ul className="check-list style-one mb-30">
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Enterprise-Grade Security
                      </li>
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Expert, Proven Team
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-4">
                    <ul className="check-list style-one mb-30">
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        24/7 Proactive Support
                      </li>
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Transparent Communication
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-4">
                    <ul className="check-list style-one mb-30">
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Big Data Consulting
                      </li>
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Digital Transformation
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="counter-wrapper pt-50 mb-60">
              <div className="row">
                {[
                  { n: '40k', label: 'Clients Served Globally' },
                  { n: '45k+', label: 'Projects Successfully' },
                  { n: '36k', label: 'Industry Categories' },
                  { n: '40k', label: 'Years of Trusted Experience' },
                ].map((c, i) => (
                  <div className="col-xl-3 col-md-6 col-sm-12 item-border" key={i}>
                    <div className="axis-counter-item">
                      <div className="content">
                        <h2>
                          <span>{c.n}</span>
                        </h2>
                        <p>{c.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection settings={settings} />
    </>
  )
}
