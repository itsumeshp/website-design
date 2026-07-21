import { notFound } from 'next/navigation'
import { getService, getSiteSettings } from '@/lib/queries'
import PageBanner from '@/components/theme/PageBanner'
import RichText from '@/components/RichText'
import ContactSection from '@/components/theme/ContactSection'
import Img from '@/components/theme/Img'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return {}
  return buildMetadata({
    seo: service.seo,
    fallbackTitle: service.title,
    fallbackDescription: service.shortDesc ?? undefined,
  })
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [service, settings] = await Promise.all([getService(slug), getSiteSettings()])
  if (!service) notFound()

  return (
    <>
      <PageBanner title={service.title} crumbs={[{ label: 'Services', href: '/services' }, { label: service.title }]} />

      <section className="service-details-sec pt-120 pb-100">
        <div className="container">
          <div className="service-details-wrapper">
            <div className="service-item-main mb-60">
              <div className="service-thumbnail mb-30" data-aos="fade-up" data-aos-duration="800">
                <Img
                  media={service.image}
                  fallback="/assets/images/infrion/service-cloud.jpg"
                  alt="service image"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="service-content" data-aos="fade-up" data-aos-duration="800">
                {service.shortDesc ? <h4 className="title">{service.shortDesc}</h4> : null}
                <RichText data={service.content} />
                <div className="row">
                  <div className="col-lg-4">
                    <ul className="check-list style-one mb-30">
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Grounded in your data
                      </li>
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Production-ready systems
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-4">
                    <ul className="check-list style-one mb-30">
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Monitoring & support
                      </li>
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Clear handoff & docs
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-4">
                    <ul className="check-list style-one mb-30">
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Security by default
                      </li>
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        You own the IP
                      </li>
                    </ul>
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
