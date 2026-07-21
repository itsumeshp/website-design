import Link from 'next/link'
import {
  getHomePage,
  getServices,
  getProjects,
  getTestimonials,
  getClients,
  getPosts,
  getFaqs,
} from '@/lib/queries'
import { mediaUrl } from '@/lib/media'
import AboutTabs from '@/components/theme/AboutTabs'
import ServiceTabs, { type ServiceTab } from '@/components/theme/ServiceTabs'
import Slider from '@/components/theme/Slider'
import FaqAccordion, { type FaqItem } from '@/components/theme/FaqAccordion'
import ContactForm from '@/components/theme/ContactForm'
import ProjectCard from '@/components/theme/ProjectCard'
import { extractPlainText } from '@/lib/lexical'

const THEME_SERVICE_HEADING = 'Software built around how your business actually works'
const THEME_SERVICE_DESC =
  'We map your real workflows first — goals, users, and the exceptions nobody wrote down — then build the AI agents, automation, and platforms on top.'

export default async function HomePage() {
  const [home, allServices, allProjects, allTestimonials, clients, posts, faqs] =
    await Promise.all([
      getHomePage(),
      getServices(5),
      getProjects(6),
      getTestimonials(),
      getClients(),
      getPosts(3),
      getFaqs(),
    ])

  const hero = home.hero

  // Prefer the curated "featured" selections from the Home Page global; fall
  // back to the latest content when none are chosen.
  const onlyObjects = <T,>(arr: unknown): T[] =>
    Array.isArray(arr) ? (arr.filter((x) => x && typeof x === 'object') as T[]) : []

  const featuredServices = onlyObjects<(typeof allServices)[number]>(home.featuredServices)
  const featuredTestimonials = onlyObjects<(typeof allTestimonials)[number]>(
    home.featuredTestimonials,
  )

  const services = featuredServices.length ? featuredServices.slice(0, 5) : allServices
  // Show all case studies on the home slider (few in total); featured curation
  // still applies to services/testimonials.
  const projects = allProjects
  const testimonials = featuredTestimonials.length ? featuredTestimonials : allTestimonials

  const heroImg = mediaUrl(hero?.backgroundImage)?.url
  const heroBg = heroImg
    ? `url('${heroImg}')`
    : 'linear-gradient(135deg, #0a0e24 0%, #14183a 55%, #2b0f16 100%)'

  const serviceTabs: ServiceTab[] = services.map((s, i) => ({
    id: String(s.id),
    title: s.title,
    heading: THEME_SERVICE_HEADING,
    desc: s.shortDesc || THEME_SERVICE_DESC,
    image: mediaUrl(s.image)?.url ?? ['/assets/images/infrion/service-ai-agents.jpg','/assets/images/infrion/service-ai-automation.jpg','/assets/images/infrion/service-mobile.jpg','/assets/images/infrion/service-web.jpg','/assets/images/infrion/service-api.jpg'][i % 5],
    href: `/services/${s.slug}`,
  }))

  const faqItems: FaqItem[] = faqs.map((f) => ({
    id: String(f.id),
    question: f.question,
    answer: extractPlainText(f.answer),
  }))

  return (
    <>
      {/* Hero */}
      <section className="axis-hero">
        <div className="hero-wrapper_two bg_cover" style={{ backgroundImage: heroBg }}>
          <div className="social-box-wrap" data-aos="fade-up" data-aos-duration="2000">
            <div className="social-box">
              <a href="#"><i className="fab fa-facebook-f" /></a>
              <a href="#"><i className="fab fa-twitter" /></a>
              <a href="#"><i className="fab fa-instagram" /></a>
              <a href="#"><i className="fab fa-linkedin-in" /></a>
              <span>Follow Us</span>
            </div>
          </div>
          <div className="container">
            <div className="row align-items-end justify-content-center">
              <div className="col-xl-8 col-lg-8">
                <div className="hero-content">
                  <span className="tag-line" data-aos="fade-down" data-aos-duration="2000">
                    Intelligent Software
                  </span>
                  <h1 className="text-anm">{hero?.heading ?? 'IT Solutions'}</h1>
                  <div className="text-box" data-aos="fade-up" data-aos-duration="2200">
                    <p>
                      {hero?.subheading ??
                        'It is a long established fact that a reader will be distracted the readable content of a page when looking at layout.'}
                    </p>
                    <div className="axis-button">
                      <Link href={hero?.ctaHref ?? '/services'} className="theme-btn style-one">
                        {hero?.ctaLabel ?? 'View All Services'}
                        <i className="far fa-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="axis-avatar-box" data-aos="fade-up" data-aos-duration="2000">
                  <div className="avatar-list">
                    <div className="text">
                      <h5>AI-first</h5>
                      <p>Software Engineering</p>
                    </div>
                  </div>
                  <p>AI Agents · Automation · Mobile · Web Platforms · APIs · Cloud.</p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-8">
                <div className="hero-image-box" data-aos="fade-up" data-aos-duration="2200">
                  <div className="axis-image">
                    <img src="/assets/images/infrion/workspace-code.jpg" alt="hero-image" />
                    <div className="play-button text-center">
                      <a
                        href="https://www.youtube.com/watch?v=SfMT4Agg8Xw"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src="/assets/images/home-two/hero/play-btn.png" alt="play-button" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="axis-about_one pt-120 pb-120 p-r z-1">
        <div className="shape">
          <img src="/assets/images/home-one/about/shape.png" alt="shape" />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-8">
              <div className="axis-image-box mb-5 mb-xl-0">
                <div className="axis-image image-one" data-aos="fade-up" data-aos-duration="1000">
                  <img src="/assets/images/infrion/industry-saas.jpg" alt="about image" />
                </div>
                <div className="axis-image image-two" data-aos="fade-up" data-aos-duration="1200">
                  <img src="/assets/images/infrion/service-ai-agents.jpg" alt="chart image" />
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-8">
              <div className="axis-content-box">
                <div className="section-title mb-30">
                  <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                    <span className="line" />
                    Who We Are
                  </span>
                  <h2 className="text-anm">An AI-first software engineering team built around your logic</h2>
                </div>
                <AboutTabs />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="axis-service_one pt-115">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center mb-55">
                <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                  <span className="line" />
                  What We Build
                </span>
                <h2 className="text-anm">AI agents, automation, and platforms that ship</h2>
              </div>
            </div>
          </div>
          <ServiceTabs services={serviceTabs} />
        </div>
        {/* Clients — only when real logos exist in the CMS */}
        {clients.length > 0 ? (
          <div className="clients-wrapper pt-110 pb-120">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title text-center mb-30" data-aos="fade-up" data-aos-duration="1000">
                    <h3>Built with a modern, production-ready stack</h3>
                    <span className="circle" />
                  </div>
                </div>
              </div>
              <Slider
                perView={6}
                gap={30}
                breakpoints={[
                  { minWidth: 1450, perView: 6 },
                  { minWidth: 1200, perView: 4 },
                  { minWidth: 992, perView: 3 },
                  { minWidth: 600, perView: 2 },
                  { minWidth: 0, perView: 1 },
                ]}
              >
                {clients.map((c, i) => (
                  <div className="axis-client-item" key={i}>
                    <div className="client-img">
                      <img src={mediaUrl(c.logo)?.url ?? ''} alt="client logo" />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ) : null}
      </section>

      {/* Choose */}
      <section className="axis-choose_one pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="axis-image-box mb-5 mb-xl-0" data-aos="fade-up" data-aos-duration="1400">
                <div className="shape">
                  <img src="/assets/images/home-one/gallery/cta-shape1.png" alt="shape" />
                </div>
                <div className="axis-image image_one">
                  <img src="/assets/images/infrion/service-cloud.jpg" alt="choose image" />
                </div>
                <div className="axis-image image_two">
                  <img src="/assets/images/infrion/service-web.jpg" alt="choose image" />
                </div>
                <div className="axis-experience-box">
                  <div className="content">
                    <h2>AI</h2>
                    <p>First By Design</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="axis-content-box">
                <div className="section-title mb-20">
                  <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                    <span className="line" />
                    Why Infrion
                  </span>
                  <h2 className="text-anm">Engineering you can hand off and trust in production</h2>
                </div>
                <p data-aos="fade-up" data-aos-duration="1200">
                  We build systems around how your business actually works — then leave you with
                  documentation, monitoring, and a codebase your team can confidently own and extend.
                </p>
                <div className="axix-iconic-list" data-aos="fade-up" data-aos-duration="1400">
                  <div className="axis-iconic-box-wrap mb-30">
                    <div className="axis-iconic-left-box style-one">
                      <div className="icon">
                        <img src="/assets/images/home-one/icon/icon3.png" alt="icon" />
                      </div>
                      <div className="content">
                        <h5>Engineering Quality</h5>
                      </div>
                    </div>
                    <div className="content-wrap">
                      <p>Code reviews, testing where it matters, and clear acceptance criteria — no surprises late in delivery.</p>
                    </div>
                  </div>
                  <div className="axis-iconic-box-wrap mb-30">
                    <div className="axis-iconic-left-box style-one">
                      <div className="icon">
                        <img src="/assets/images/home-one/icon/icon4.png" alt="icon" />
                      </div>
                      <div className="content">
                        <h5>Production Readiness</h5>
                      </div>
                    </div>
                    <div className="content-wrap">
                      <p>Monitoring, error handling, and clear handoff so the system runs reliably long after launch.</p>
                    </div>
                  </div>
                </div>
                <h5 data-aos="fade-up" data-aos-duration="1400">
                  Secure defaults, permission checks, and performance hygiene from day one — without
                  adding friction.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section
        className="axis-work_one bg_cover p-r z-1 pt-115 pb-80"
        style={{ backgroundImage: "linear-gradient(135deg, #0a0e24 0%, #14183a 55%, #2b0f16 100%)" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="section-title text-white mb-55">
                <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                  <span className="line" />
                  How We Work
                </span>
                <h2 className="text-anm">
                  From your business logic
                  <br /> to production software
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {[
              { icon: 'icon5', title: 'Map your logic', text: 'We map how work actually flows through your business — goals, users, systems, and the exceptions nobody wrote down.' },
              { icon: 'icon6', title: 'Design & build', text: 'We design for today and tomorrow, then build in iterative cycles with tests where they matter and regular demos.' },
              { icon: 'icon7', title: 'Deploy & support', text: 'We deploy with low-downtime, monitor with alerting, and hand off with docs so your team can own the codebase.' },
            ].map((w, i) => (
              <div className="col-xl-4 col-md-6" key={w.icon}>
                <div className="axis-iconic-box style-one mb-40" data-aos="fade-up" data-aos-duration={1000 + i * 200}>
                  <div className="icon">
                    <img src={`/assets/images/home-one/icon/${w.icon}.png`} alt="icon" />
                  </div>
                  <div className="content">
                    <h5 className="title">{w.title}</h5>
                    <p>{w.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="axis-project_one pt-115 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="section-title text-center mb-55">
                <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                  <span className="line" />
                  Our Projects
                </span>
                <h2 className="text-anm">Featured projects we’re proud to share</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <Slider
            perView={4}
            gap={30}
            autoplay={false}
            breakpoints={[
              { minWidth: 1500, perView: 4 },
              { minWidth: 1200, perView: 3 },
              { minWidth: 768, perView: 2 },
              { minWidth: 0, perView: 1 },
            ]}
          >
            {projects.map((p, i) => (
              <ProjectCard project={p} index={i} key={p.id} />
            ))}
          </Slider>
        </div>
      </section>

      {/* Contact */}
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
                      <div className="icon"><i className="far fa-map-marker-alt" /></div>
                      <div className="content">
                        <h5>Location</h5>
                        <p>Nikol, Ahmedabad – 382350, Gujarat, India</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="axis-info-box style-three mb-40" data-aos="fade-up" data-aos-duration="1200">
                      <div className="icon"><i className="far fa-phone-alt" /></div>
                      <div className="content">
                        <h5>Phone</h5>
                        <p><a href="tel:+919328964742">+91 93289 64742</a></p>
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

      {/* Testimonials */}
      {testimonials.length > 0 ? (
        <section className="axis-testimonial_two pt-120 pb-120">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-6">
                <div className="section-title mb-55">
                  <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                    Client Stories<span className="lineTwo" />
                  </span>
                  <h2 className="text-anm">Trusted by teams shipping real software</h2>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ratings-box float-lg-end mb-55" data-aos="fade-up" data-aos-duration="1000">
                  <div className="content">
                    <div className="ratings-count">
                      <h2>4.9</h2>
                      <div className="ratings">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <i className="fas fa-star" key={i} />
                        ))}
                      </div>
                    </div>
                    <h5>From client feedback</h5>
                  </div>
                </div>
              </div>
            </div>
            <Slider
              perView={2}
              gap={30}
              breakpoints={[
                { minWidth: 1200, perView: 2 },
                { minWidth: 0, perView: 1 },
              ]}
            >
              {testimonials.map((t) => (
                <div className="axis-testimonial-item style-two" key={t.id}>
                  <div className="testimonial-content">
                    <div className="ratings">
                      {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                        <i className="fas fa-star" key={i} />
                      ))}
                    </div>
                    <p>{t.quote}</p>
                    <div className="author-thumb-item">
                      <div className="author-thumb">
                        {mediaUrl(t.avatar)?.url ? (
                          <img src={mediaUrl(t.avatar)!.url} alt="author image" />
                        ) : (
                          <span className="ix-avatar-initials">
                            {(t.authorName ?? '?')
                              .split(' ')
                              .map((w) => w[0])
                              .slice(0, 2)
                              .join('')
                              .toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="author-info">
                        <h4>{t.authorName}</h4>
                        <span className="position">
                          {[t.authorRole, t.company].filter(Boolean).join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {faqItems.length > 0 ? (
        <section className="axis-faq_one pt-115 pb-85">
          <div
            className="faq-image bg_cover d-none d-xl-block"
            style={{ backgroundImage: "linear-gradient(135deg, #0a0e24 0%, #14183a 55%, #2b0f16 100%)" }}
          >
            <div className="axis-explore-box" data-aos="fade-up" data-aos-duration="1000">
              <div className="content">
                <p>Common questions about working with Infrion Technolab. Still unsure?</p>
                <p>
                  <Link href="/contact">Contact us</Link> — we respond within a business day.
                </p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row justify-content-end">
              <div className="col-xl-6">
                <div className="axis-content-box">
                  <div className="section-title">
                    <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                      Frequently Asked Questions<span className="lineTwo" />
                    </span>
                    <h2 className="text-anm">Answers before you get in touch</h2>
                  </div>
                  <FaqAccordion items={faqItems} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Blog */}
      {posts.length > 0 ? (
        <section className="axis-blog-sec pt-120 pb-80">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6">
                <div className="section-title text-center mb-55">
                  <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                    <span className="line" />
                    News &amp; Insights
                  </span>
                  <h2 className="text-anm">Read our latest blog</h2>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              {posts.map((post, i) => {
                const cat = typeof post.category === 'object' ? post.category : null
                return (
                  <div className="col-xl-4 col-md-6 col-sm-6" key={post.id}>
                    <div className="axis-blog-post-item style-one mb-40" data-aos="fade-up" data-aos-duration={1000 + i * 200}>
                      <div className="post-thumbnail">
                        <img
                          src={mediaUrl(post.coverImage)?.url ?? ['/assets/images/infrion/workspace-code.jpg','/assets/images/infrion/service-cloud.jpg','/assets/images/infrion/industry-saas.jpg'][i % 3]}
                          alt="blog image"
                        />
                      </div>
                      <div className="post-content">
                        <div className="post-meta">
                          {cat ? (
                            <span>
                              <i className="far fa-tags" />
                              {cat.name}
                            </span>
                          ) : null}
                          {post.publishedAt ? (
                            <span>
                              <i className="far fa-calendar-alt" />
                              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          ) : null}
                        </div>
                        <h4 className="title">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h4>
                        <div className="post-bottom">
                          <Link href={`/blog/${post.slug}`} className="read-more style-one">
                            Read Details
                            <i className="far fa-arrow-right" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
