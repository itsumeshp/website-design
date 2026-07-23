'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Header as HeaderGlobal, SiteSetting } from '@/payload-types'
import { mediaUrl } from '@/lib/media'

type MegaService = { title: string; slug: string; icon?: string | null; shortDesc?: string | null }

export default function Header({
  header,
  settings,
  services = [],
}: {
  header: HeaderGlobal
  settings: SiteSetting
  services?: MegaService[]
}) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const variant = isHome ? 'header-two' : 'header-four'

  const [sticky, setSticky] = useState(false)
  const [menuOn, setMenuOn] = useState(false)
  const [openSub, setOpenSub] = useState<string | null>(null)

  // Header becomes a fixed sticky bar once scrolled past 200px. (The original
  // theme only showed it while scrolling up, which made it flicker on layout
  // shifts like tab switches.)
  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 200)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Home header overlays the dark hero → white logo; inner header is on a light
  // background → dark logo. The mobile drawer is always light → dark logo.
  const logo = mediaUrl(isHome ? settings.logo : settings.logoDark)?.url
  const mobileLogo = mediaUrl(settings.logoDark)?.url
  const nav = header.nav ?? []
  const phone = settings.contact?.phone
  // Topbar is a compact single line — show a concise location (last few parts
  // of the address). The full address still appears in the footer/contact.
  const fullAddress = settings.contact?.address
  const shortAddress = fullAddress
    ? fullAddress.split(',').slice(-3).join(',').replace(/\s+/g, ' ').trim()
    : undefined
  const supportIcon = isHome
    ? '/assets/images/home-one/icon/icon1.png'
    : '/assets/images/home-one/icon/icon2.png'

  const closeMenu = () => {
    setMenuOn(false)
    setOpenSub(null)
  }

  return (
    <>
      <header className={`header-area ${variant}${sticky ? ' sticky' : ''}`}>
        {variant === 'header-four' ? (
          <div className="header-topbar">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-4">
                  <div className="top-left">
                    {shortAddress ? (
                      <span>
                        <i className="far fa-map-marker-alt" />
                        {shortAddress}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="top-middle text-center">
                    <p>Our Working Time: 10:00 am To 07:00 pm</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="social-box">
                    {(settings.socials && settings.socials.length > 0
                      ? settings.socials.map((s) => ({ platform: s.platform, url: s.url }))
                      : [
                          { platform: 'facebook-f', url: '#' },
                          { platform: 'twitter', url: '#' },
                          { platform: 'linkedin-in', url: '#' },
                          { platform: 'youtube', url: '#' },
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
        ) : null}

        <div className="header-navigation">
          <div className="container-fluid">
            <div className="primary-menu">
              <div className="site-branding">
                <Link href="/" className="brand-logo">
                  {logo ? (
                    <img src={logo} alt={`${settings.siteName} logo`} />
                  ) : (
                    <span
                      className="brand-text"
                      style={{
                        fontFamily: 'var(--heading-font)',
                        fontSize: '28px',
                        fontWeight: 700,
                        color: isHome ? 'var(--white-color)' : 'var(--heading-color)',
                      }}
                    >
                      {settings.siteName}
                      <span style={{ color: 'var(--primary-color)' }}>.</span>
                    </span>
                  )}
                </Link>
              </div>

              <div className={`theme-nav-menu${menuOn ? ' menu-on' : ''}`}>
                <div className="theme-menu-top d-block d-xl-none">
                  <div className="site-branding">
                    <Link href="/" className="brand-logo" onClick={closeMenu}>
                      {mobileLogo ? (
                        <img src={mobileLogo} alt={`${settings.siteName} logo`} />
                      ) : (
                        <span
                          className="brand-text"
                          style={{
                            fontFamily: 'var(--heading-font)',
                            fontSize: '26px',
                            fontWeight: 700,
                            color: 'var(--heading-color)',
                          }}
                        >
                          {settings.siteName}
                          <span style={{ color: 'var(--primary-color)' }}>.</span>
                        </span>
                      )}
                    </Link>
                  </div>
                  <div className="navbar-close" onClick={closeMenu}>
                    <i className="far fa-times" />
                  </div>
                </div>

                <nav className="main-menu">
                  <ul>
                    {nav.map((item) => {
                      const isServicesMega =
                        services.length > 0 &&
                        (item.url === '/services' || item.label.trim().toLowerCase() === 'services')
                      const hasChildren = isServicesMega || (item.sublinks?.length ?? 0) > 0
                      const key = String(item.id ?? item.label)
                      return (
                        <li
                          key={key}
                          className={`menu-item${hasChildren ? ' has-children' : ''}${
                            isServicesMega ? ' has-mega' : ''
                          }`}
                        >
                          <Link href={item.url} onClick={hasChildren ? undefined : closeMenu}>
                            {item.label}
                          </Link>
                          {hasChildren ? (
                            <>
                              <span
                                className={`dd-trigger${openSub === key ? ' sub-menu-open' : ''}`}
                                onClick={() => setOpenSub(openSub === key ? null : key)}
                              >
                                <i className="far fa-angle-down" />
                              </span>
                              {isServicesMega ? (
                                <ul
                                  className="sub-menu mega-menu"
                                  style={openSub === key ? { display: 'block' } : undefined}
                                >
                                  <li className="mega-inner">
                                    <div className="mega-grid">
                                      {services.map((s) => (
                                        <Link
                                          key={s.slug}
                                          href={`/services/${s.slug}`}
                                          className="mega-card"
                                          onClick={closeMenu}
                                        >
                                          <span className="mega-ico">
                                            <i className={`fas ${s.icon || 'fa-cube'}`} />
                                          </span>
                                          <span className="mega-body">
                                            <span className="mega-title">{s.title}</span>
                                            {s.shortDesc ? (
                                              <span className="mega-desc">{s.shortDesc}</span>
                                            ) : null}
                                          </span>
                                        </Link>
                                      ))}
                                    </div>
                                    <div className="mega-cta">
                                      <div className="mega-cta-text">
                                        <h4>Turn your idea into a shipped product.</h4>
                                        <p>AI-first engineering, built to be owned.</p>
                                      </div>
                                      <Link
                                        href="/contact"
                                        className="theme-btn style-one"
                                        onClick={closeMenu}
                                      >
                                        Start a Project <i className="far fa-arrow-right" />
                                      </Link>
                                    </div>
                                  </li>
                                </ul>
                              ) : (
                                <ul
                                  className="sub-menu"
                                  style={openSub === key ? { display: 'block' } : undefined}
                                >
                                  {item.sublinks!.map((sl) => (
                                    <li key={String(sl.id ?? sl.label)}>
                                      <Link href={sl.url} onClick={closeMenu}>
                                        {sl.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </>
                          ) : null}
                        </li>
                      )
                    })}
                  </ul>
                </nav>

                <div className="theme-nav-button mt-20 d-block d-md-none">
                  <Link href={header.cta?.url ?? '/contact'} className="theme-btn style-one" onClick={closeMenu}>
                    {header.cta?.label ?? 'Get Started'}
                    <i className="far fa-arrow-right" />
                  </Link>
                </div>
              </div>

              <div className="nav-right-item">
                {phone ? (
                  <div className="axis-support-box style-one">
                    <div className="icon">
                      <img src={supportIcon} alt="phone" />
                    </div>
                    <div className="content">
                      <span>Need Help?</span>
                      <h6>
                        <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
                      </h6>
                    </div>
                  </div>
                ) : null}
                <div className="nav-button d-none d-md-block">
                  <Link href={header.cta?.url ?? '/contact'} className="theme-btn style-one">
                    {header.cta?.label ?? 'Get Started'}
                    <i className="far fa-arrow-right" />
                  </Link>
                </div>
                <div
                  className={`navbar-toggler${menuOn ? ' active' : ''}`}
                  onClick={() => setMenuOn((v) => !v)}
                >
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`offcanvas__overlay${menuOn ? ' overlay-open' : ''}`} onClick={closeMenu} />
    </>
  )
}
