'use client'

import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'infrion-cookie-consent'
const CONSENT_EVENT = 'infrion-consent-change'

export type ConsentValue = 'unset' | 'accepted' | 'rejected'

function readConsent(): ConsentValue {
  if (typeof window === 'undefined') return 'unset'
  const raw = window.localStorage.getItem(STORAGE_KEY)
  return raw === 'accepted' || raw === 'rejected' ? raw : 'unset'
}

function writeConsent(value: ConsentValue) {
  window.localStorage.setItem(STORAGE_KEY, value)
  window.dispatchEvent(new Event(CONSENT_EVENT))
}

function subscribe(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb)
  window.addEventListener('storage', cb)
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb)
    window.removeEventListener('storage', cb)
  }
}

export function useConsent() {
  const consent = useSyncExternalStore(subscribe, readConsent, () => 'unset' as ConsentValue)
  const accept = useCallback(() => writeConsent('accepted'), [])
  const reject = useCallback(() => writeConsent('rejected'), [])
  return { consent, accept, reject }
}
