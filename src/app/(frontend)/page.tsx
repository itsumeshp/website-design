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
import { extractPlainText } from '@/lib/lexical'

const THEME_SERVICE_HEADING =
  'Scale effortlessly with secure cloud platforms and hybrid solutions'
const THEME_SERVICE_DESC =
  'Our job doesn’t stop. We provide continuous monitoring, maintenance, and optimization to ensure seamless operation and peak'

export default async function HomePage() {
  const [home, services, projects, testimonials, clients, posts, faqs] = await Promise.all([
    getHomePage(),
    getServices(5),
    getProjects(6),
    getTestimonials(),
    getClients(),
    getPosts(3),
    getFaqs(),
  ])

  const hero = home.hero

  const serviceTabs: ServiceTab[] = services.map((s, i) => ({
    id: String(s.id),
    title: s.title,
    heading: THEME_SERVICE_HEADING,
    desc: s.shortDesc || THEME_SERVICE_DESC,
    image: mediaUrl(s.image)?.url ?? `/assets/images/home-one/service/service-img${(i % 5) + 1}.jpg`,
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
        <div
          className="hero-wrapper_two bg_cover"
          style={{ backgroundImage: "url('/assets/images/home-two/hero/hero-bg.jpg')" }}
        >
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
                    Expert - Driven
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
                    <ul>
                      <li><img src="/assets/images/home-two/gallery/avatar-img1.jpg" alt="avatar" /></li>
                      <li><img src="/assets/images/home-two/gallery/avatar-img2.jpg" alt="avatar" /></li>
                      <li><img src="/assets/images/home-two/gallery/avatar-img3.jpg" alt="avatar" /></li>
                      <li><img src="/assets/images/home-two/gallery/avatar-img4.jpg" alt="avatar" /></li>
                    </ul>
                    <div className="text">
                      <h5>870k+</h5>
                      <p>Brands Transformed</p>
                    </div>
                  </div>
                  <p>#1 &amp; Certified Award IT Solution &amp; Services The World.</p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-8">
                <div className="hero-image-box" data-aos="fade-up" data-aos-duration="2200">
                  <div className="axis-image">
                    <img src="/assets/images/home-two/hero/hero-img1.jpg" alt="hero-image" />
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
                  <img src="/assets/images/home-one/about/about-img1.jpg" alt="about image" />
                </div>
                <div className="axis-image image-two" data-aos="fade-up" data-aos-duration="1200">
                  <img src="/assets/images/home-one/about/chart-img1.jpg" alt="chart image" />
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-8">
              <div className="axis-content-box">
                <div className="section-title mb-30">
                  <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                    <span className="line" />
                    Our Trusted Support
                  </span>
                  <h2 className="text-anm">Building the Future with State of the Art IT Solutions</h2>
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
                  Our Best Services
                </span>
                <h2 className="text-anm">Best Innovative Solution for Businesses</h2>
              </div>
            </div>
          </div>
          <ServiceTabs services={serviceTabs} />
        </div>
        {/* Clients */}
        <div className="clients-wrapper pt-110 pb-120">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center mb-30" data-aos="fade-up" data-aos-duration="1000">
                  <h3>Trusted by millions of customers</h3>
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
              {(clients.length > 0
                ? clients.map((c) => mediaUrl(c.logo)?.url ?? '/assets/images/home-one/client/client-img1.png')
                : [1, 2, 3, 4, 5, 6].map((n) => `/assets/images/home-one/client/client-img${n}.png`)
              ).map((src, i) => (
                <div className="axis-client-item" key={i}>
                  <div className="client-img">
                    <img src={src} alt="client logo" />
                  </div>
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
                  <img src="/assets/images/home-one/gallery/choose-img1.jpg" alt="choose image" />
                </div>
                <div className="axis-image image_two">
                  <img src="/assets/images/home-one/gallery/choose-img2.jpg" alt="choose image" />
                </div>
                <div className="axis-experience-box">
                  <div className="content">
                    <h2>25+</h2>
                    <p>Year Of Working Experience</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="axis-content-box">
                <div className="section-title mb-20">
                  <span className="sub-title" data-aos="fade-down" data-aos-duration="1000">
                    <span className="line" />
                    Businesses Trust Our IT Expertise
                  </span>
                  <h2 className="text-anm">Our Digital Solutions Are The Most Innovative</h2>
                </div>
                <p data-aos="fade-up" data-aos-duration="1200">
                  It is a long established fact that a reader will be distracted the readable content
                  of a page when looking at layout the point of using lorem.
                </p>
                <div className="axix-iconic-list" data-aos="fade-up" data-aos-duration="1400">
                  <div className="axis-iconic-box-wrap mb-30">
                    <div className="axis-iconic-left-box style-one">
                      <div className="icon">
                        <img src="/assets/images/home-one/icon/icon3.png" alt="icon" />
                      </div>
                      <div className="content">
                        <h5>Security-First Approach</h5>
                      </div>
                    </div>
                    <div className="content-wrap">
                      <p>Advanced cybersecurity and compliance to protect your data and systems.</p>
                    </div>
                  </div>
                  <div className="axis-iconic-box-wrap mb-30">
                    <div className="axis-iconic-left-box style-one">
                      <div className="icon">
                        <img src="/assets/images/home-one/icon/icon4.png" alt="icon" />
                      </div>
                      <div className="content">
                        <h5>Scalable &amp; Flexible Solutions</h5>
                      </div>
                    </div>
                    <div className="content-wrap">
                      <p>Years of experience delivering enterprise-level IT solutions across industries.</p>
                    </div>
                  </div>
                </div>
                <h5 data-aos="fade-up" data-aos-duration="1400">
                  We work diligently and responsibly on our assignments, producing high-quality
                  results.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  How We Work
                </span>
                <h2 className="text-anm">
                  How We Work to Deliver
                  <br /> IT Excellence
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {[
              { icon: 'icon5', title: 'Discovery & Consultation', text: 'We analyze your business needs and identify the right IT solutions.' },
              { icon: 'icon6', title: 'Strategy & Planning', text: 'A tailored IT roadmap designed for scalability, security, and efficiency.' },
              { icon: 'icon7', title: 'Support & Optimization', text: 'Ongoing monitoring, support, and upgrades to keep your business future-ready.' },
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
            breakpoints={[
              { minWidth: 1500, perView: 4 },
              { minWidth: 1200, perView: 3 },
              { minWidth: 768, perView: 2 },
              { minWidth: 0, perView: 1 },
            ]}
          >
            {(projects.length > 0
              ? projects
              : []
            ).map((p, i) => (
              <div className="axis-project-item style-one" key={p.id}>
                <div className="project-thumbnail">
                  <img
                    src={mediaUrl(p.coverImage)?.url ?? `/assets/images/home-one/project/project-img${(i % 4) + 1}.jpg`}
                    alt="project image"
                  />
                </div>
                <div className="project-content">
                  {p.category ? (
                    <span className="tag">{p.category}</span>
                  ) : null}
                  <h4 className="title">
                    <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                  </h4>
                  <Link href={`/projects/${p.slug}`} className="read-more style-one">
                    View Details
                    <i className="far fa-arrow-right" />
                  </Link>
                </div>
              </div>
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
                    Free Consultation
                  </span>
                  <h2 className="text-anm">Book A Free IT Consultation</h2>
                </div>
                <p data-aos="fade-up" data-aos-duration="800">
                  It is a long established fact that a reader will be distracted the readable content
                  of a page when looking at layout.
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <div className="axis-info-box style-three mb-40" data-aos="fade-up" data-aos-duration="1000">
                      <div className="icon"><i className="far fa-map-marker-alt" /></div>
                      <div className="content">
                        <h5>Location</h5>
                        <p>1321 Gateway Atlantic City, Florida, 54012</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="axis-info-box style-three mb-40" data-aos="fade-up" data-aos-duration="1200">
                      <div className="icon"><i className="far fa-phone-alt" /></div>
                      <div className="content">
                        <h5>Phone</h5>
                        <p><a href="tel:(+256)214203215">(+256) 214 203 215</a></p>
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
                    Our client’s<span className="lineTwo" />
                  </span>
                  <h2 className="text-anm">Here’s What Customer our clients say</h2>
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
                    <h5>Based on 150 reviews</h5>
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
                        <img
                          src={mediaUrl(t.avatar)?.url ?? '/assets/images/home-three/testimonial/author-img1.jpg'}
                          alt="author image"
                        />
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
                <p>Explore common queries about working with us. Still unsure?</p>
                <p>
                  <Link href="/contact">Contact us</Link> — we’re happy to help.
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
                    <h2 className="text-anm">Discover Our Complete IT Services &amp; Solutions</h2>
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
                          src={mediaUrl(post.coverImage)?.url ?? `/assets/images/home-one/blog/blog-img${(i % 3) + 1}.jpg`}
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
