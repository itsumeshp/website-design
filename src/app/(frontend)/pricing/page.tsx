import Link from 'next/link'
import { getPricingTiers } from '@/lib/queries'
import PageBanner from '@/components/theme/PageBanner'

export const metadata = { title: 'Pricing — Fexo' }

export default async function PricingPage() {
  const tiers = await getPricingTiers()

  return (
    <>
      <PageBanner title="Pricing" crumbs={[{ label: 'Pricing' }]} />

      <section className="axis-pricing-sec pt-120 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-10">
              <div className="section-title text-center mb-50">
                <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                  <span className="line" />
                  Popular Package
                </span>
                <h2 className="text-anm">Flexible Pricing, Powerful Tangible Results</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {tiers.map((t, i) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={t.id}>
                <div
                  className={`axis-pricing-item style-one mb-40${t.featured ? ' popular-plan' : ''}`}
                  data-aos="fade-up"
                  data-aos-duration={1000 + i * 200}
                >
                  {t.featured ? <div className="popular">Popular</div> : null}
                  <div className="pricing-header mb-35">
                    <span className="plan">{t.name}</span>
                    <div className="price">
                      {t.price}
                      {t.period ? <span>{t.period}</span> : null}
                    </div>
                  </div>
                  <div className="pricing-button mb-40">
                    <Link href={t.ctaHref ?? '/contact'} className="theme-btn style-one">
                      {t.ctaLabel ?? 'Join This Plan'}
                      <i className="far fa-arrow-right" />
                    </Link>
                  </div>
                  <div className="pricing-body">
                    <ul className="check-list style-one">
                      {(t.features ?? []).map((f) => (
                        <li className="check" key={f.id ?? f.feature}>
                          <i className="fas fa-badge-check" />
                          {f.feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
