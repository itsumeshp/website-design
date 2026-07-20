'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitContact, type ContactState } from '@/app/(frontend)/actions'

const initial: ContactState = { status: 'idle' }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button className="theme-btn style-one" disabled={pending}>
      {pending ? 'Sending…' : 'Send A Request'}
      <i className="far fa-arrow-right" />
    </button>
  )
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initial)

  return (
    <div className="contact-form-wrapper" data-aos="fade-up" data-aos-duration="1200">
      <h4>Send Us message</h4>
      <form action={formAction}>
        <div className="row">
          {/* Honeypot — hidden from users, bots fill it */}
          <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
            <label>
              Company Website
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <label>Full Name*</label>
              <input type="text" className="form_control" placeholder="Full Name*" name="name" required />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <label>Email Address*</label>
              <input type="email" className="form_control" placeholder="Email Address*" name="email" required />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <label>Company Name*</label>
              <input type="text" className="form_control" placeholder="Company Name*" name="subject" />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <label>Message*</label>
              <textarea
                name="message"
                placeholder="Write Your Message Here"
                rows={5}
                className="form_control"
                required
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <SubmitButton />
              {state.status === 'success' ? (
                <p style={{ marginTop: 15, color: 'var(--primary-color)' }}>{state.message}</p>
              ) : null}
              {state.status === 'error' ? (
                <p style={{ marginTop: 15, color: 'var(--primary-color)' }}>{state.message}</p>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
