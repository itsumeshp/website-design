'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Header as HeaderGlobal, SiteSetting } from '@/payload-types'
import { mediaUrl } from '@/lib/media'

export default function Header({
  header,
  settings,
}: {
  header: HeaderGlobal
  settings: SiteSetting
}) {
  const [sticky, setSticky] = useState(false)
  const [menuOn, setMenuOn] = useState(false)
  const [openSub, setOpenSub] = useState<string | null>(null)

  useEffect(() => {
    let last = 0
    const onScroll = () => {
      const y = window.scrollY
      setSticky(y > 200 && y < last)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const logo = mediaUrl(settings.logo)?.url ?? '/assets/images/innerpage/logo/logo-white.png'
  const nav = header.nav ?? []
  const phone = settings.contact?.phone

  const closeMenu = () => {
    setMenuOn(false)
    setOpenSub(null)
  }

  return (
    <>
      <header className={`header-area header-two${sticky ? ' sticky' : ''}`}>
        <div className="header-navigation">
          <div className="container-fluid">
            <div className="primary-menu">
              <div className="site-branding">
                <Link href="/" className="brand-logo">
                  <img src={logo} alt="Brand Logo" />
                </Link>
              </div>

              <div className={`theme-nav-menu${menuOn ? ' menu-on' : ''}`}>
                <div className="theme-menu-top d-block d-xl-none">
                  <div className="site-branding">
                    <Link href="/" className="brand-logo" onClick={closeMenu}>
                      <img src="/assets/images/innerpage/logo/logo-main.png" alt="Brand Logo" />
                    </Link>
                  </div>
                  <div className="navbar-close" onClick={closeMenu}>
                    <i className="far fa-times" />
                  </div>
                </div>

                <nav className="main-menu">
                  <ul>
                    {nav.map((item) => {
                      const hasChildren = (item.sublinks?.length ?? 0) > 0
                      const key = String(item.id ?? item.label)
                      return (
                        <li
                          key={key}
                          className={`menu-item${hasChildren ? ' has-children' : ''}`}
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

                {settings.socials && settings.socials.length > 0 ? (
                  <div className="theme-menu-bottom mt-50 d-block d-xl-none">
                    <h5>Follow Us</h5>
                    <ul className="social-link">
                      {settings.socials.map((s) => (
                        <li key={String(s.id ?? s.url)}>
                          <a href={s.url}>
                            <i className={`fab fa-${s.platform}`} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="nav-right-item">
                {phone ? (
                  <div className="axis-support-box style-one">
                    <div className="icon">
                      <img src="/assets/images/home-one/icon/icon1.png" alt="phone" />
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
      <div
        className={`offcanvas__overlay${menuOn ? ' overlay-open' : ''}`}
        onClick={closeMenu}
      />
    </>
  )
}
