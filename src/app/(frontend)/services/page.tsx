import Link from 'next/link'
import { getServices, getSiteSettings } from '@/lib/queries'
import PageBanner from '@/components/theme/PageBanner'
import ContactSection from '@/components/theme/ContactSection'

export const metadata = { title: 'Services' }

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSiteSettings()])

  return (
    <>
      <PageBanner title="Services" crumbs={[{ label: 'Services' }]} />

      <section className="axis-service_two pt-120 pb-90">
        <div className="container">
          <div className="row justify-content-center">
            {services.map((s, i) => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={s.id}>
                <div className="axis-iconic-box style-two mb-30" data-aos="fade-up" data-aos-duration={800 + i * 200}>
                  <div className="icon">
                    <img src="/assets/images/innerpage/icon/icon3.png" alt="icon" />
                  </div>
                  <div className="content">
                    <h4 className="title">
                      <Link href={`/services/${s.slug}`}>{s.title}</Link>
                    </h4>
                    <p>
                      {s.shortDesc ??
                        'It is a long established fact that a reader will be distracted the readable content of a page'}
                    </p>
                    <Link href={`/services/${s.slug}`} className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection settings={settings} />
    </>
  )
}
