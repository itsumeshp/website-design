import Link from 'next/link'
import type { ReactNode } from 'react'

export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

export function Button({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'outline'
  className?: string
}) {
  const base =
    'group inline-flex items-center gap-2 rounded-full px-7 py-3 font-heading text-sm font-medium transition'
  const styles =
    variant === 'primary'
      ? 'bg-primary text-white hover:bg-heading'
      : 'border border-border-muted text-heading hover:border-primary hover:text-primary'
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <span className="transition-transform group-hover:translate-x-1" aria-hidden>
        &rarr;
      </span>
    </Link>
  )
}

export function SectionTitle({
  subtitle,
  title,
  align = 'left',
  className = '',
}: {
  subtitle?: string
  title: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : ''} ${className}`}>
      {subtitle ? (
        <span
          className={`mb-3 inline-flex items-center gap-2 font-heading text-sm font-medium uppercase tracking-wide text-primary ${
            align === 'center' ? 'justify-center' : ''
          }`}
        >
          <span className="h-px w-6 bg-primary" />
          {subtitle}
        </span>
      ) : null}
      <h2 className="font-heading text-3xl font-bold leading-tight text-heading sm:text-4xl">
        {title}
      </h2>
    </div>
  )
}

export function Section({
  children,
  className = '',
  muted = false,
}: {
  children: ReactNode
  className?: string
  muted?: boolean
}) {
  return (
    <section className={`py-16 sm:py-24 ${muted ? 'bg-gray-bg' : ''} ${className}`}>
      {children}
    </section>
  )
}
