import { getSiteSettings, getTeam } from '@/lib/queries'
import { Container, Section, SectionTitle, Button } from '@/components/ui'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'

export const metadata = { title: 'About — Fexo' }

const stats = [
  { value: '10+', label: 'Years experience' },
  { value: '250+', label: 'Projects delivered' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '40+', label: 'Team members' },
]

export default async function AboutPage() {
  const [settings, team] = await Promise.all([getSiteSettings(), getTeam(4)])

  return (
    <>
      <PageHeader title="About Us" />

      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionTitle
                subtitle="Who We Are"
                title={`Building the future with ${settings.siteName}`}
              />
              <p className="mt-6 text-body-text">
                We are a technology company helping businesses grow through modern software, cloud
                solutions, and thoughtful design. Our team partners with you from idea to launch and
                beyond.
              </p>
              <div className="mt-8">
                <Button href="/contact">Work with us</Button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border-muted bg-white p-8 text-center"
                  >
                    <div className="font-heading text-3xl font-bold text-primary">{s.value}</div>
                    <div className="mt-1 text-sm text-body-text">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {team.length > 0 ? (
        <Section muted>
          <Container>
            <Reveal>
              <SectionTitle subtitle="Our People" title="Meet the team" align="center" />
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m, i) => (
                <Reveal key={m.id} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border-muted bg-white p-6 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 font-heading text-xl font-bold text-primary">
                      {m.name.charAt(0)}
                    </div>
                    <h3 className="font-heading font-semibold text-heading">{m.name}</h3>
                    <p className="text-sm text-body-text">{m.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  )
}
