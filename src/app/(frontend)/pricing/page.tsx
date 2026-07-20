import Link from 'next/link'
import { getPricingTiers } from '@/lib/queries'
import { Container, Section } from '@/components/ui'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'

export const metadata = { title: 'Pricing — Fexo' }

export default async function PricingPage() {
  const tiers = await getPricingTiers()

  return (
    <>
      <PageHeader title="Pricing" />
      <Section>
        <Container>
          {tiers.length === 0 ? (
            <p className="text-center text-body-text">No pricing tiers yet.</p>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {tiers.map((t, i) => (
                <Reveal key={t.id} delay={i * 0.05}>
                  <div
                    className={`flex h-full flex-col rounded-2xl border p-8 ${
                      t.featured
                        ? 'border-primary bg-heading text-white shadow-xl'
                        : 'border-border-muted bg-white'
                    }`}
                  >
                    <h2
                      className={`font-heading text-lg font-semibold ${
                        t.featured ? 'text-white' : 'text-heading'
                      }`}
                    >
                      {t.name}
                    </h2>
                    <div className="mt-4 flex items-end gap-1">
                      <span
                        className={`font-heading text-4xl font-bold ${
                          t.featured ? 'text-white' : 'text-heading'
                        }`}
                      >
                        {t.price}
                      </span>
                      {t.period ? (
                        <span className={t.featured ? 'text-white/60' : 'text-body-text'}>
                          {t.period}
                        </span>
                      ) : null}
                    </div>
                    <ul className="mt-6 flex-1 space-y-3">
                      {(t.features ?? []).map((f) => (
                        <li
                          key={f.id ?? f.feature}
                          className={`flex items-center gap-2 text-sm ${
                            t.featured ? 'text-white/80' : 'text-body-text'
                          }`}
                        >
                          <span className="text-primary">✓</span>
                          {f.feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={t.ctaHref ?? '/contact'}
                      className={`mt-8 rounded-full px-6 py-3 text-center font-heading text-sm font-medium transition ${
                        t.featured
                          ? 'bg-primary text-white hover:opacity-90'
                          : 'border border-border-muted text-heading hover:border-primary hover:text-primary'
                      }`}
                    >
                      {t.ctaLabel ?? 'Get Started'}
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
