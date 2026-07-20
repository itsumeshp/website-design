import Link from 'next/link'
import { getHomePage, getServices, getProjects, getTestimonials, getClients } from '@/lib/queries'
import { Container, Section, SectionTitle, Button } from '@/components/ui'
import Reveal from '@/components/Reveal'
import TestimonialSlider from '@/components/TestimonialSlider'

export default async function HomePage() {
  const [home, services, projects, testimonials, clients] = await Promise.all([
    getHomePage(),
    getServices(6),
    getProjects(6),
    getTestimonials(),
    getClients(),
  ])

  const hero = home.hero

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-bg">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        <Container className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 font-heading text-sm font-medium text-primary shadow-sm">
                Expert-Driven IT Solutions
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-heading text-4xl font-bold leading-tight text-heading sm:text-6xl">
                {hero?.heading ?? 'IT Solutions & Technology'}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-lg text-body-text">
                {hero?.subheading ??
                  'We build modern software and cloud solutions for growing businesses.'}
              </p>
            </Reveal>
            {hero?.ctaLabel && hero?.ctaHref ? (
              <Reveal delay={0.15}>
                <div className="mt-8 flex justify-center gap-4">
                  <Button href={hero.ctaHref}>{hero.ctaLabel}</Button>
                  <Button href="/services" variant="outline">
                    Our Services
                  </Button>
                </div>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </section>

      {/* Services */}
      {services.length > 0 ? (
        <Section>
          <Container>
            <Reveal>
              <SectionTitle subtitle="What We Do" title="Services that move you forward" align="center" />
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <Reveal key={s.id} delay={i * 0.05}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group block h-full rounded-2xl border border-border-muted bg-white p-8 transition hover:border-primary hover:shadow-lg"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-heading text-lg font-bold text-primary">
                      {s.title.charAt(0)}
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-heading group-hover:text-primary">
                      {s.title}
                    </h3>
                    {s.shortDesc ? <p className="mt-3 text-body-text">{s.shortDesc}</p> : null}
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Projects */}
      {projects.length > 0 ? (
        <Section muted>
          <Container>
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionTitle subtitle="Our Work" title="Selected projects" />
                <Button href="/projects" variant="outline">
                  View all
                </Button>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group block h-full overflow-hidden rounded-2xl border border-border-muted bg-white transition hover:shadow-lg"
                  >
                    <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 font-heading text-2xl font-bold text-heading/30">
                      {p.title.charAt(0)}
                    </div>
                    <div className="p-6">
                      {p.category ? (
                        <span className="text-xs font-medium uppercase tracking-wide text-primary">
                          {p.category}
                        </span>
                      ) : null}
                      <h3 className="mt-1 font-heading text-lg font-semibold text-heading group-hover:text-primary">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Testimonials */}
      {testimonials.length > 0 ? (
        <Section>
          <Container>
            <Reveal>
              <SectionTitle subtitle="Testimonials" title="What clients say" align="center" />
            </Reveal>
            <div className="mt-12">
              <TestimonialSlider items={testimonials} />
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Clients */}
      {clients.length > 0 ? (
        <Section muted className="py-12">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {clients.map((c) => (
                <span key={c.id} className="font-heading text-xl font-semibold text-heading/40">
                  {c.name}
                </span>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* CTA */}
      <Section>
        <Container>
          <div className="rounded-3xl bg-heading px-8 py-16 text-center">
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Ready to start your project?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Let&apos;s talk about how we can help your business grow with the right technology.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/contact">Get in touch</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
