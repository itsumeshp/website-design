import Link from 'next/link'
import {
  getHomePage,
  getServices,
  getProjects,
  getTestimonials,
  getClients,
  getPosts,
  getFaqs,
  getSiteSettings,
} from '@/lib/queries'
import { mediaUrl } from '@/lib/media'
import AboutTabs from '@/components/theme/AboutTabs'
import ServiceTabs, { type ServiceTab } from '@/components/theme/ServiceTabs'
import Slider from '@/components/theme/Slider'
import FaqAccordion, { type FaqItem } from '@/components/theme/FaqAccordion'
import ContactForm from '@/components/theme/ContactForm'
import ProjectCard from '@/components/theme/ProjectCard'
import WhyChoose from '@/components/theme/WhyChoose'
import { extractPlainText } from '@/lib/lexical'

const THEME_SERVICE_HEADING = 'Software built around how your business actually works'
const THEME_SERVICE_DESC =
  'We map your real workflows first — goals, users, and the exceptions nobody wrote down — then build the AI agents, automation, and platforms on top.'

export default async function HomePage() {
  const [home, allServices, allProjects, allTestimonials, clients, posts, faqs, settings] =
    await Promise.all([
      getHomePage(),
      getServices(5),
      getProjects(6),
      getTestimonials(),
      getClients(),
      getPosts(3),
      getFaqs(),
      getSiteSettings(),
    ])

  const hero = home.hero

  // CMS-editable section copy, with fallback to the built-in text.
  const headers = home.copy?.sectionHeaders ?? []
  const eb = (key: string, fb: string) => headers.find((h) => h.key === key)?.eyebrow || fb
  const hd = (key: string, fb: string) => headers.find((h) => h.key === key)?.heading || fb
  const chooseFeatures = home.copy?.chooseFeatures ?? []
  const workStepsCms = home.copy?.workSteps ?? []

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

  const heroBg =
    mediaUrl(hero?.backgroundImage)?.url ?? '/assets/images/home-two/hero/hero-bg.jpg'

  // Shorter labels just for the tab nav so they fit at the theme's 24px font
  // (the full service title is still used everywhere else).
  const SHORT_TAB_LABEL: Record<string, string> = {
    'Mobile App Development': 'Mobile Apps',
    'Web Platform Development': 'Web Platforms',
  }

  const serviceTabs: ServiceTab[] = services.map((s, i) => ({
    id: String(s.id),
    title: SHORT_TAB_LABEL[s.title] ?? s.title,
    heading: THEME_SERVICE_HEADING,
    desc: s.shortDesc || THEME_SERVICE_DESC,
    image: mediaUrl(s.image)?.url ?? ['/assets/images/infrion/svc-ai-agents.jpg','/assets/images/infrion/svc-automation.jpg','/assets/images/infrion/svc-mobile.jpg','/assets/images/infrion/svc-web.jpg','/assets/images/infrion/svc-api.jpg'][i % 5],
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
        <div className="hero-wrapper_two bg_cover" style={{ backgroundImage: `url('${heroBg}')` }}>
          {settings.socials && settings.socials.length > 0 ? (
            <div className="social-box-wrap" data-aos="fade-up" data-aos-duration="2000">
              <div className="social-box">
                {settings.socials.map((s) => (
                  <a key={String(s.id ?? s.url)} href={s.url} target="_blank" rel="noopener noreferrer">
                    <i className={`fab fa-${s.platform}`} />
                  </a>
                ))}
                <span>Follow Us</span>
              </div>
            </div>
          ) : null}
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
                      <h5>Built to ship</h5>
                      <p>Production-ready, day one</p>
                    </div>
                  </div>
                  <p>AI Agents · Automation · Mobile · Web Platforms · APIs · Cloud.</p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-8">
                <div className="hero-image-box" data-aos="fade-up" data-aos-duration="2200">
                  <div className="axis-image">
                    <img src="/assets/images/infrion/hero-side.jpg" alt="hero-image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="axis-about_one pt-120 pb-120 p-r z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-8">
              <div className="axis-image-box mb-5 mb-xl-0">
                <div className="axis-image image-one" data-aos="fade-up" data-aos-duration="1000">
                  <img src="/assets/images/infrion/who-team.jpg" alt="about image" />
                </div>
                <div className="axis-image image-two" data-aos="fade-up" data-aos-duration="1200">
                  <img src="/assets/images/infrion/who-stat.jpg" alt="chart image" />
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-8">
              <div className="axis-content-box">
                <div className="section-title mb-30">
                  <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                    <span className="line" />
                    {eb('about', 'Who We Are')}
                  </span>
                  <h2 className="text-anm">
                    {hd('about', 'We build software around how your business actually works')}
                  </h2>
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
                  {eb('services', 'What We Build')}
                </span>
                <h2 className="text-anm">{hd('services', 'AI agents, automation, and platforms that ship')}</h2>
              </div>
            </div>
          </div>
          <ServiceTabs services={serviceTabs} />
        </div>
        {/* Tech stack — real tools we build with. Shows client logos instead
            if any are added in the CMS; otherwise an honest tech-stack strip. */}
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
              {clients.length > 0
                ? clients.map((c, i) => (
                    <div className="axis-client-item" key={i}>
                      <div className="client-img">
                        <img src={mediaUrl(c.logo)?.url ?? ''} alt="client logo" />
                      </div>
                    </div>
                  ))
                : [
                    { name: 'React', icon: 'react' },
                    { name: 'Next.js', icon: 'nextjs' },
                    { name: 'TypeScript', icon: 'typescript' },
                    { name: 'Tailwind CSS', icon: 'tailwindcss' },
                    { name: 'Node.js', icon: 'nodejs' },
                    { name: 'PHP', icon: 'php' },
                    { name: 'Laravel', icon: 'laravel' },
                    { name: 'Python', icon: 'python' },
                    { name: 'PostgreSQL', icon: 'postgresql' },
                    { name: 'MySQL', icon: 'mysql' },
                    { name: 'Docker', icon: 'docker' },
                  ].map((t) => (
                    <div className="axis-client-item" key={t.name}>
                      <span className="ix-tech-item">
                        <img
                          src={`/assets/images/tech/${t.icon}.svg`}
                          alt={t.name}
                          className="ix-tech-icon"
                        />
                        <span className="ix-tech-name">{t.name}</span>
                      </span>
                    </div>
                  ))}
            </Slider>
          </div>
        </div>
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
                  <img src="/assets/images/infrion/choose-cloud.jpg" alt="Why Infrion" />
                </div>
                <div className="axis-image image_two">
                  <img src="/assets/images/infrion/choose-code.jpg" alt="Why Infrion" />
                </div>
                <div className="axis-experience-box">
                  <div className="content">
                    <h2>14+</h2>
                    <p>Products Shipped</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="axis-content-box">
                <div className="section-title mb-20">
                  <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                    <span className="line" />
                    {eb('choose', 'Why Infrion')}
                  </span>
                  <h2 className="text-anm">{hd('choose', 'Engineering you can hand off and trust in production')}</h2>
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
                        <h5>{chooseFeatures[0]?.title || 'Engineering Quality'}</h5>
                      </div>
                    </div>
                    <div className="content-wrap">
                      <p>
                        {chooseFeatures[0]?.text ||
                          'Code reviews, testing where it matters, and clear acceptance criteria — no surprises late in delivery.'}
                      </p>
                    </div>
                  </div>
                  <div className="axis-iconic-box-wrap mb-30">
                    <div className="axis-iconic-left-box style-one">
                      <div className="icon">
                        <img src="/assets/images/home-one/icon/icon4.png" alt="icon" />
                      </div>
                      <div className="content">
                        <h5>{chooseFeatures[1]?.title || 'Production Readiness'}</h5>
                      </div>
                    </div>
                    <div className="content-wrap">
                      <p>
                        {chooseFeatures[1]?.text ||
                          'Monitoring, error handling, and clear handoff so the system runs reliably long after launch.'}
                      </p>
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

      {/* Why Choose */}
      <WhyChoose data={home.whyChoose} />

      {/* Work */}
      <section
        className="axis-work_one bg_cover p-r z-1 pt-115 pb-80"
        style={{ backgroundImage: "url('/assets/images/home-one/bg/work-bg.jpg')" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="section-title text-white mb-55">
                <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                  <span className="line" />
                  {eb('work', 'How We Work')}
                </span>
                <h2 className="text-anm">{hd('work', 'From your business logic to production software')}</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {[
              { icon: 'icon5', title: workStepsCms[0]?.title || 'Map your logic', text: workStepsCms[0]?.text || 'We map how work actually flows through your business — goals, users, systems, and the exceptions nobody wrote down.' },
              { icon: 'icon6', title: workStepsCms[1]?.title || 'Design & build', text: workStepsCms[1]?.text || 'We design for today and tomorrow, then build in iterative cycles with tests where they matter and regular demos.' },
              { icon: 'icon7', title: workStepsCms[2]?.title || 'Deploy & support', text: workStepsCms[2]?.text || 'We deploy with low-downtime, monitor with alerting, and hand off with docs so your team can own the codebase.' },
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
                  {eb('projects', 'Our Projects')}
                </span>
                <h2 className="text-anm">{hd('projects', 'Featured projects we’re proud to share')}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <Slider
            perView={2}
            gap={30}
            autoplay={false}
            breakpoints={[
              { minWidth: 992, perView: 2 },
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
                    {eb('contact', 'Free Assessment')}
                  </span>
                  <h2 className="text-anm">{hd('contact', 'Get a free AI opportunity assessment')}</h2>
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
                    {eb('testimonials', 'Client Stories')}
                    <span className="lineTwo" />
                  </span>
                  <h2 className="text-anm">{hd('testimonials', 'Trusted by teams shipping real software')}</h2>
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
            style={{ backgroundImage: "url('/assets/images/home-three/gallery/faq-img1.jpg')" }}
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
                      {eb('faq', 'Frequently Asked Questions')}
                      <span className="lineTwo" />
                    </span>
                    <h2 className="text-anm">{hd('faq', 'Answers before you get in touch')}</h2>
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
                    {eb('blog', 'News & Insights')}
                  </span>
                  <h2 className="text-anm">{hd('blog', 'Read our latest blog')}</h2>
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
                          src={mediaUrl(post.coverImage)?.url ?? ['/assets/images/infrion/service-web.jpg','/assets/images/infrion/service-cloud.jpg','/assets/images/infrion/industry-saas.jpg'][i % 3]}
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
