'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Header as HeaderGlobal, SiteSetting } from '@/payload-types'
import { mediaUrl } from '@/lib/media'

type MegaService = { title: string; slug: string; icon?: string | null; shortDesc?: string | null }

// The theme ships Font Awesome 5 Free; some CMS icon values are FA6 names (or
// Pro-only glyphs) that render as empty boxes. Map them to FA5-solid-free names.
const FA5_ICON: Record<string, string> = {
  'fa-arrows-rotate': 'fa-sync-alt',
  'fa-mobile-screen': 'fa-mobile-alt',
  'fa-window-maximize': 'fa-laptop-code',
}
const faIcon = (icon?: string | null) => (icon ? FA5_ICON[icon] ?? icon : 'fa-cube')

// Infrion's AI capabilities — our own offering (not copied from anywhere).
// Each links to the closest real page; AI-specific ones without a dedicated
// page route to contact.
const AI_IMG = (n: string) => `/assets/images/infrion/ai/${n}.jpg`
const AI_ITEMS: { label: string; icon: string; href: string; img: string }[] = [
  { label: 'AI Agents', icon: 'fa-robot', href: '/services/ai-agents', img: AI_IMG('agents') },
  { label: 'Chatbots & Copilots', icon: 'fa-comments', href: '/services/ai-agents', img: AI_IMG('chatbots') },
  { label: 'Workflow Automation', icon: 'fa-sync-alt', href: '/services/ai-automation', img: AI_IMG('automation') },
  { label: 'RAG & Knowledge Search', icon: 'fa-search', href: '/services/ai-agents', img: AI_IMG('rag') },
  { label: 'Voice AI Agents', icon: 'fa-microphone', href: '/contact', img: AI_IMG('voice') },
  { label: 'Document Intelligence', icon: 'fa-file-alt', href: '/services/ai-automation', img: AI_IMG('documents') },
  { label: 'LLM Integration & APIs', icon: 'fa-plug', href: '/services/apis--integrations', img: AI_IMG('llm') },
  { label: 'Generative AI', icon: 'fa-magic', href: '/contact', img: AI_IMG('generative') },
]

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
  const [aiImg, setAiImg] = useState(AI_ITEMS[0].img)

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
                    <li className="menu-item has-children has-mega ai-pill" key="ai-menu">
                      <span className="ai-pill-inner">
                        <Link href="/services" className="ai-pill-link">
                          <svg
                            className="ai-icon"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            {/* custom Infrion "AI spark" — a main four-point star
                                with a small accent spark */}
                            <path d="M11 2c.5 4.6 1.4 5.9 4.6 6.7 1 .2 1 .9 0 1.1-3.2.8-4.1 2.1-4.6 6.7-.1.8-.9.8-1 0-.5-4.6-1.4-5.9-4.6-6.7-1-.2-1-.9 0-1.1C8.6 7.9 9.5 6.6 10 2c.1-.8.9-.8 1 0Z" />
                            <path d="M18.4 13.2c.28 2.1.7 2.7 2.2 3.1.5.13.5.55 0 .68-1.5.4-1.92 1-2.2 3.1-.06.44-.54.44-.6 0-.28-2.1-.7-2.7-2.2-3.1-.5-.13-.5-.55 0-.68 1.5-.4 1.92-1 2.2-3.1.06-.44.54-.44.6 0Z" />
                          </svg>{' '}
                          <span className="ai-text">AI</span>
                        </Link>
                        <span className="ai-spark s1" aria-hidden>
                          ✦
                        </span>
                        <span className="ai-spark s2" aria-hidden>
                          ✦
                        </span>
                        <span className="ai-spark s3" aria-hidden>
                          ✦
                        </span>
                      </span>
                      <span
                        className={`dd-trigger${openSub === 'ai' ? ' sub-menu-open' : ''}`}
                        onClick={() => setOpenSub(openSub === 'ai' ? null : 'ai')}
                      >
                        <i className="far fa-angle-down" />
                      </span>
                      <ul
                        className="sub-menu mega-menu mega-ai"
                        style={openSub === 'ai' ? { display: 'block' } : undefined}
                      >
                        <li className="mega-inner">
                          <div className="mega-top">
                            <div className="mega-grid">
                              {AI_ITEMS.map((a) => (
                                <Link
                                  key={a.label}
                                  href={a.href}
                                  className="mega-card mega-card--sm"
                                  onClick={closeMenu}
                                  onMouseEnter={() => setAiImg(a.img)}
                                >
                                  <span className="mega-ico">
                                    <i className={`fas ${a.icon}`} />
                                  </span>
                                  <span className="mega-body">
                                    <span className="mega-title">{a.label}</span>
                                  </span>
                                </Link>
                              ))}
                            </div>
                            <div className="mega-feature">
                              <img src={aiImg} alt="Infrion AI" />
                            </div>
                          </div>
                          <div className="mega-cta">
                            <div className="mega-cta-text">
                              <h4>Put AI to work on real problems.</h4>
                              <p>Grounded in your data, shipped to production.</p>
                            </div>
                            <Link href="/contact" className="theme-btn style-one" onClick={closeMenu}>
                              Talk to us <i className="far fa-arrow-right" />
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </li>
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
                                            <i className={`fas ${faIcon(s.icon)}`} />
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
                                        <h4>Have a bold idea? Let’s ship it.</h4>
                                        <p>Production-ready software, built to be owned.</p>
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
