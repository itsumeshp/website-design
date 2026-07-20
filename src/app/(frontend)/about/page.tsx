import Link from 'next/link'
import { getSiteSettings, getTeam } from '@/lib/queries'
import PageBanner from '@/components/theme/PageBanner'
import Counter from '@/components/theme/Counter'
import TeamGrid from '@/components/theme/TeamGrid'
import ContactSection from '@/components/theme/ContactSection'

export const metadata = { title: 'About Us' }

export default async function AboutPage() {
  const [settings, team] = await Promise.all([getSiteSettings(), getTeam(4)])

  return (
    <>
      <PageBanner title="About Us" crumbs={[{ label: 'About Us' }]} />

      {/* About */}
      <section className="axis-about_four pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-8">
              <div className="axis-image-box mb-5 mb-xl-0">
                <div className="axis-image image_one" data-aos="fade-up" data-aos-duration="800">
                  <img src="/assets/images/innerpage/about/about-img1.jpg" alt="about image" />
                </div>
                <div className="axis-image image_two" data-aos="fade-up" data-aos-duration="1000">
                  <img src="/assets/images/innerpage/about/about-img2.jpg" alt="about image" />
                </div>
                <div className="shape">
                  <span />
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-8">
              <div className="axis-content-box">
                <div className="section-title" data-aos="fade-up" data-aos-duration="800">
                  <span className="sub-title">
                    <span className="line" />
                    More About Us
                  </span>
                  <h2>Empowering Businesses with Innovative IT Solutions</h2>
                </div>
                <p data-aos="fade-up" data-aos-duration="1000">
                  We are a trusted IT solutions provider dedicated to helping businesses thrive in the
                  digital age. With a team of technology experts, we deliver end-to-end services
                  including cloud solutions, cybersecurity, IT infrastructure, and custom software
                  development.
                </p>
                <div className="axis-content-wrap">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="axis-iconic-left-box style-one mb-30" data-aos="fade-up" data-aos-duration="1200">
                        <div className="icon">
                          <img src="/assets/images/innerpage/icon/icon1.png" alt="icon" />
                        </div>
                        <div className="content">
                          <h5>Security-First Approach</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="axis-iconic-left-box style-one mb-30" data-aos="fade-up" data-aos-duration="1400">
                        <div className="icon">
                          <img src="/assets/images/innerpage/icon/icon2.png" alt="icon" />
                        </div>
                        <div className="content">
                          <h5>Scalable &amp; Flexible Solutions</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="experience-content-box" data-aos="fade-up" data-aos-duration="1600">
                    <div className="experience-box mb-30">
                      <div className="content">
                        <h3>25+</h3>
                        <p>
                          Years <br /> Experience
                        </p>
                      </div>
                    </div>
                    <ul className="check-list style-three mb-30">
                      <li>Seamlessly conceptualize go forward total linkage</li>
                      <li>Whiteboard multifunctional applications rather than</li>
                      <li>Applications rather than lived reliable functionale</li>
                      <li>Leverage other quality ideas synergistic outsourcing</li>
                    </ul>
                  </div>
                  <div className="axis-button-wrap" data-aos="fade-up" data-aos-duration="1800">
                    <div className="axis-button">
                      <Link href="/about" className="theme-btn style-one">
                        Explore More
                        <i className="far fa-arrow-right" />
                      </Link>
                    </div>
                    <div className="axis-support-box style-one">
                      <div className="icon">
                        <img src="/assets/images/home-one/icon/icon2.png" alt="phone" />
                      </div>
                      <div className="content">
                        <span>Need Help?</span>
                        <h6>
                          <a href="tel:(+480)123678900">(+480) 123 678 900</a>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counter */}
      <section
        className="axis-counter_one bg_cover pt-105 pb-80 p-r z-1"
        style={{ backgroundImage: "url('/assets/images/innerpage/bg/counter-bg.jpg')" }}
      >
        <div className="container">
          <div className="row">
            {[
              { n: 540, suffix: '+', label: 'AI Scientists & AI Developers' },
              { n: 245, suffix: 'k+', label: 'Projects Completed' },
              { n: 98, suffix: '+', label: 'Awards Won' },
              { n: 420, suffix: 'm+', label: 'Lines of Code' },
            ].map((c, i) => (
              <div className="col-lg-3 col-md-6 col-sm-12" key={i}>
                <div className="axis-counter-item style-one mb-40 text-center" data-aos="fade-up" data-aos-duration={800 + i * 200}>
                  <div className="content">
                    <h2>
                      <Counter end={c.n} />
                      {c.suffix}
                    </h2>
                    <h5>{c.label}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="axis-process_one pt-110 pb-75">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="section-title text-center mb-55">
                <span className="sub-title" data-aos="fade-down" data-aos-duration="800">
                  <span className="line" />
                  Working Process
                </span>
                <h2 className="text-anm">Get your IT solutions in 4 easy steps</h2>
              </div>
            </div>
          </div>
          <div className="process-wrapper" data-aos="fade-up" data-aos-duration="800">
            <div className="row">
              {[
                { step: 'step-one', n: '01', title: 'Consultation & Strategy', text: 'We understand your business needs, challenges, and IT goals to design a tailored strategy.', arrow: true },
                { step: 'step-two', n: '02', title: 'Planning & Design', text: 'We map out the architecture and design a solution built for scale and security.', arrow: true },
                { step: 'step-three', n: '03', title: 'Implementation & Development', text: 'We build and deploy the solution—cloud, cybersecurity, software, or infrastructure.', arrow: true },
                { step: 'step-four', n: '04', title: 'Support & Optimization', text: 'Continuous monitoring, maintenance, and upgrades for long-term performance.', arrow: false },
              ].map((p) => (
                <div className="col-xl-3 col-md-6 process-column" key={p.n}>
                  {p.arrow ? (
                    <div className="arrow-shape">
                      <img src="/assets/images/innerpage/gallery/arrow.png" alt="arrow" />
                    </div>
                  ) : null}
                  <div className="axis-progress-item mb-40">
                    <div className={`step ${p.step}`}>{p.n}</div>
                    <div className="content">
                      <h5>{p.title}</h5>
                      <p>{p.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intro video */}
      <section
        className="axis-intro_one bg_cover pt-300 pb-300"
        style={{ backgroundImage: "url('/assets/images/innerpage/bg/intro-bg1.jpg')" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="play-button text-center">
                <a href="https://www.youtube.com/watch?v=SfMT4Agg8Xw" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/images/innerpage/gallery/play-btn.png" alt="play-button" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="axis-features_three pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8">
              <div className="axis-content-box mb-5 mb-xl-0">
                <div className="section-title">
                  <span className="sub-title" data-aos="fade-down" data-aos-duration="800">
                    <span className="line" />
                    Managed IT Services
                  </span>
                  <h2 className="text-anm">Your Journey to Enhanced Managed IT Services.</h2>
                </div>
                <p data-aos="fade-up" data-aos-duration="1000">
                  We help businesses bypass the traditional sales process and quickly identify leading
                  unified solutions by understanding your needs, challenges, and IT goals.
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="check-list style-one mb-30" data-aos="fade-up" data-aos-duration="1200">
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Enterprise-Grade Security and Compliance
                      </li>
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Expert Team with Proven Experience
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="check-list style-one mb-30" data-aos="fade-up" data-aos-duration="1400">
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        24/7 Proactive Support and Monitoring
                      </li>
                      <li>
                        <img src="/assets/images/innerpage/service/icon1.png" alt="icon" />
                        Transparent Communication &amp; Dedicated
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="axis-button" data-aos="fade-up" data-aos-duration="1600">
                  <Link href="/services" className="theme-btn style-one">
                    More Services
                    <i className="far fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-8">
              <div className="axis-image" data-aos="fade-up" data-aos-duration="1000">
                <img src="/assets/images/innerpage/gallery/feature-img4.jpg" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="axis-cta_three bg_cover p-r z-1 pt-100 pb-100"
        style={{ backgroundImage: "url('/assets/images/innerpage/bg/cta-bg.jpg')" }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-6 col-lg-10">
              <div className="section-title text-center text-xl-start mb-5 mb-xl-0" data-aos="fade-up" data-aos-duration="800">
                <h3>
                  Your Business Needs More Than <br /> Just Managed IT Services
                </h3>
              </div>
            </div>
            <div className="col-xl-6 col-lg-10">
              <div className="axis-avatar-box" data-aos="fade-up" data-aos-duration="1000">
                <div className="avatar-list">
                  <ul>
                    <li><img src="/assets/images/innerpage/gallery/avatar-img1.jpg" alt="avatar image" /></li>
                    <li><img src="/assets/images/innerpage/gallery/avatar-img2.jpg" alt="avatar image" /></li>
                    <li><img src="/assets/images/innerpage/gallery/avatar-img3.jpg" alt="avatar image" /></li>
                    <li><img src="/assets/images/innerpage/gallery/avatar-img4.jpg" alt="avatar image" /></li>
                  </ul>
                  <div className="text">
                    <h4>99% Client Satisfaction</h4>
                    <p>2,528 positive reviews last year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TeamGrid members={team} />

      <ContactSection settings={settings} />
    </>
  )
}
