import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 text-center">
      <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary font-heading">
        Phase 0 · Scaffold
      </span>
      <h1 className="text-5xl font-bold font-heading text-heading max-w-3xl">
        Fexo company website
      </h1>
      <p className="max-w-xl text-lg text-body-text">
        Next.js + Payload CMS + Postgres are wired up. Design tokens and fonts
        from the Fexo theme are loaded. Content pages and the CMS content model
        come next.
      </p>
      <div className="flex items-center gap-4">
        <a
          href={payloadConfig.routes.admin}
          className="rounded-md bg-primary px-6 py-3 font-medium text-white font-heading transition hover:opacity-90"
        >
          Go to admin panel
        </a>
        <a
          href="https://payloadcms.com/docs"
          rel="noopener noreferrer"
          target="_blank"
          className="rounded-md border border-border-muted px-6 py-3 font-medium text-heading font-heading transition hover:bg-gray-bg"
        >
          Payload docs
        </a>
      </div>
      {user && 'email' in user ? (
        <p className="text-sm text-body-text">Signed in as {user.email}</p>
      ) : null}
    </div>
  )
}
