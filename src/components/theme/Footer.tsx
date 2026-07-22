import Link from 'next/link'
import type { Footer as FooterGlobal, SiteSetting } from '@/payload-types'
import { mediaUrl } from '@/lib/media'

const fallbackColumns = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', url: '/' },
      { label: 'About Us', url: '/about' },
      { label: 'Services', url: '/services' },
      { label: 'Projects', url: '/projects' },
      { label: 'Latest Blog', url: '/blog' },
      { label: 'Contact', url: '/contact' },
    ],
  },
  {
    title: 'Our Services',
    links: [
      { label: 'AI-Powered Solutions', url: '/services' },
      { label: 'Custom Technology', url: '/services' },
      { label: 'Machine Learning', url: '/services' },
      { label: 'Language Processing', url: '/services' },
      { label: 'Computer Vision', url: '/services' },
    ],
  },
]

export default function Footer({
  footer,
  settings,
}: {
  footer: FooterGlobal
  settings: SiteSetting
}) {
  const logo = mediaUrl(settings.logo)?.url
  const columns =
    footer.columns && footer.columns.length > 0
      ? footer.columns.map((c) => ({
          title: c.title,
          links: (c.links ?? []).map((l) => ({ label: l.label, url: l.url })),
        }))
      : fallbackColumns
  const c = settings.contact

  return (
    <footer
      className="main-footer footer-v1 bg_cover"
      style={{ backgroundImage: "url('/assets/images/footer/footer-bg.jpg')" }}
    >
      <div className="container">
        <div className="footer-widget-area pt-100 pb-55">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget footer-about-widget mb-40" data-aos="fade-up" data-aos-duration="800">
                <div className="widget-content">
                  <div className="footer-logo mb-30">
                    <Link href="/">
                      {logo ? (
                        <img src={logo} alt={`${settings.siteName} logo`} />
                      ) : (
                        <span
                          style={{
                            fontFamily: 'var(--heading-font)',
                            fontSize: '30px',
                            fontWeight: 700,
                            color: '#fff',
                          }}
                        >
                          {settings.siteName}
                          <span style={{ color: 'var(--primary-color)' }}>.</span>
                        </span>
                      )}
                    </Link>
                  </div>
                  <p>
                    Our operations are centered on data protection and security, guaranteeing
                    adherence to international regulations.
                  </p>
                  {settings.socials && settings.socials.length > 0 ? (
                    <div className="social-box">
                      {settings.socials.map((s) => (
                        <a key={String(s.id ?? s.url)} href={s.url}>
                          <i className={`fab fa-${s.platform}`} />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="social-box">
                      <a href="#"><i className="fab fa-facebook-f" /></a>
                      <a href="#"><i className="fab fa-twitter" /></a>
                      <a href="#"><i className="fab fa-linkedin-in" /></a>
                      <a href="#"><i className="fab fa-youtube" /></a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {columns.map((col, idx) => (
              <div className="col-lg-3 col-md-6" key={col.title}>
                <div
                  className={`footer-widget footer-nav-widget mb-40${idx === 0 ? ' ms-0 ms-xl-5' : ''}`}
                  data-aos="fade-up"
                  data-aos-duration={1000 + idx * 200}
                >
                  <div className="widget-content">
                    <h4 className="widget-title">{col.title}</h4>
                    <div className="line-wrap">
                      <span />
                      <span />
                      <span />
                    </div>
                    <ul className="widget-nav">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <Link href={l.url}>{l.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            <div className="col-lg-3 col-md-6">
              <div className="footer-widget footer-contact-info-widget mb-40" data-aos="fade-up" data-aos-duration="1400">
                <div className="widget-content">
                  <h4 className="widget-title">Get in Touch</h4>
                  <div className="line-wrap">
                    <span />
                    <span />
                    <span />
                  </div>
                  {c?.address ? (
                    <div className="axis-info-box style-two mb-20">
                      <div className="icon">
                        <i className="far fa-map-marker-alt" />
                      </div>
                      <div className="info">
                        <p>{c.address}</p>
                      </div>
                    </div>
                  ) : null}
                  {c?.email ? (
                    <div className="axis-info-box style-two mb-20">
                      <div className="icon">
                        <i className="far fa-envelope" />
                      </div>
                      <div className="info">
                        <p>
                          <a href={`mailto:${c.email}`}>{c.email}</a>
                        </p>
                      </div>
                    </div>
                  ) : null}
                  {c?.phone ? (
                    <div className="axis-info-box style-two mb-20">
                      <div className="icon">
                        <i className="far fa-phone-alt" />
                      </div>
                      <div className="info">
                        <p>
                          <a href={`tel:${c.phone.replace(/\s+/g, '')}`}>{c.phone}</a>
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright-area">
          <div className="row">
            <div className="col-lg-6">
              <div className="copyright-text text-lg-start text-center">
                <p>
                  {footer.copyright ??
                    `© ${new Date().getFullYear()} Infrion Technolab. All rights reserved.`}
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="copyright-link text-lg-end text-center">
                <Link href="/terms">Terms &amp; Conditions</Link>
                <Link href="/privacy">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
