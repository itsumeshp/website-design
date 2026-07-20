'use server'

import { headers } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'

export type ContactState = { status: 'idle' | 'success' | 'error'; message?: string }

// Simple in-memory rate limit (per VM). 5 submissions / 10 min / IP.
const HITS = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 5

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: bots fill the hidden "company_website" field. Pretend success.
  if (formData.get('company_website')) return { status: 'success' }

  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const subject = String(formData.get('subject') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !email || !message) {
    return { status: 'error', message: 'Please fill in your name, email and message.' }
  }
  if (!isEmail(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }
  if (message.length > 5000) {
    return { status: 'error', message: 'Message is too long.' }
  }

  // Rate limit by client IP.
  const h = await headers()
  const ip = (h.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
  const now = Date.now()
  const recent = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_HITS) {
    return { status: 'error', message: 'Too many requests. Please try again later.' }
  }
  recent.push(now)
  HITS.set(ip, recent)

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'leads',
      data: { name, email, subject, message, source: 'website-contact', status: 'new' },
      overrideAccess: true,
    })

    // Optional email notification (only when Resend is configured).
    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL
    const from = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'
    if (apiKey && to) {
      const { Resend } = await import('resend')
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `New enquiry: ${subject || 'Website contact'}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      })
    }

    return { status: 'success', message: 'Thanks — your message has been sent!' }
  } catch (err) {
    console.error('Contact submission failed:', err)
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }
}
