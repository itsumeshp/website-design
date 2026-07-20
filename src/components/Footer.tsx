import Link from 'next/link'
import type { Footer as FooterGlobal, SiteSetting } from '@/payload-types'
import { Container } from './ui'

export default function Footer({
  footer,
  settings,
}: {
  footer: FooterGlobal
  settings: SiteSetting
}) {
  return (
    <footer className="bg-heading text-white/70">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="font-heading text-2xl font-bold text-white">
            {settings.siteName}
            <span className="text-primary">.</span>
          </Link>
          {settings.contact?.address ? (
            <p className="mt-4 text-sm leading-relaxed">{settings.contact.address}</p>
          ) : null}
          {settings.contact?.email ? (
            <p className="mt-2 text-sm">{settings.contact.email}</p>
          ) : null}
          {settings.contact?.phone ? (
            <p className="mt-1 text-sm">{settings.contact.phone}</p>
          ) : null}
        </div>

        {(footer.columns ?? []).map((col) => (
          <div key={col.id ?? col.title}>
            <h4 className="mb-4 font-heading text-base font-semibold text-white">{col.title}</h4>
            <ul className="space-y-2">
              {(col.links ?? []).map((l) => (
                <li key={l.id ?? l.label}>
                  <Link href={l.url} className="text-sm transition hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-sm">{footer.copyright}</p>
          <div className="flex gap-4">
            {(settings.socials ?? []).map((s) => (
              <a
                key={s.id ?? s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm capitalize transition hover:text-primary"
              >
                {s.platform}
              </a>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  )
}
