import Link from 'next/link'
import { Container } from './ui'

export default function PageHeader({
  title,
  crumb,
}: {
  title: string
  crumb?: { label: string; href: string }
}) {
  return (
    <section className="border-b border-border-muted bg-gray-bg">
      <Container className="py-16 text-center">
        <h1 className="font-heading text-4xl font-bold text-heading sm:text-5xl">{title}</h1>
        <nav className="mt-3 text-sm text-body-text">
          <Link href="/" className="transition hover:text-primary">
            Home
          </Link>
          {crumb ? (
            <>
              <span className="mx-2">/</span>
              <Link href={crumb.href} className="transition hover:text-primary">
                {crumb.label}
              </Link>
            </>
          ) : null}
        </nav>
      </Container>
    </section>
  )
}
