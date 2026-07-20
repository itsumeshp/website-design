'use client'

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.cname,
          message: data.message,
          source: 'home-contact',
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="contact-form-wrapper" data-aos="fade-up" data-aos-duration="1200">
      <h4>Send Us message</h4>
      <form onSubmit={onSubmit}>
        <div className="row">
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
              <input type="text" className="form_control" placeholder="Company Name*" name="cname" />
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
              <button className="theme-btn style-one" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send A Request'}
                <i className="far fa-arrow-right" />
              </button>
              {status === 'success' ? (
                <p style={{ marginTop: 15, color: 'var(--primary-color)' }}>
                  Thanks — your message has been sent!
                </p>
              ) : null}
              {status === 'error' ? (
                <p style={{ marginTop: 15, color: 'var(--primary-color)' }}>
                  Something went wrong. Please try again.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
