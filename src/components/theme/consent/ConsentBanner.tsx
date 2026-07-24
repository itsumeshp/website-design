'use client'

import Link from 'next/link'
import { useConsent } from './useConsent'

export default function ConsentBanner() {
  const { consent, accept, reject } = useConsent()
  if (consent !== 'unset') return null

  return (
    <div className="ix-consent" role="dialog" aria-label="Cookie consent">
      <div className="ix-consent-inner">
        <p className="ix-consent-text">
          We use a chat widget and analytics cookies to improve your experience. See our{' '}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <div className="ix-consent-actions">
          <button type="button" className="ix-consent-btn ghost" onClick={reject}>
            Decline
          </button>
          <button type="button" className="ix-consent-btn primary" onClick={accept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
