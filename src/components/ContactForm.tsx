'use client'

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

const inputClass =
  'w-full rounded-lg border border-border-muted bg-white px-4 py-3 text-heading outline-none transition focus:border-primary'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    // Honeypot: bots fill hidden "company" field.
    if (data.company) {
      setStatus('success')
      return
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
          source: 'contact-page',
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
        <h3 className="font-heading text-xl font-semibold text-heading">Thanks — message sent!</h3>
        <p className="mt-2 text-body-text">We&apos;ll get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={inputClass} name="name" placeholder="Your name" required />
        <input className={inputClass} type="email" name="email" placeholder="Email address" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={inputClass} name="phone" placeholder="Phone (optional)" />
        <input className={inputClass} name="subject" placeholder="Subject" />
      </div>
      <textarea className={inputClass} name="message" rows={5} placeholder="Your message" required />
      {status === 'error' ? <p className="text-sm text-primary">{error}</p> : null}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="justify-self-start rounded-full bg-primary px-8 py-3 font-heading text-sm font-medium text-white transition hover:bg-heading disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
