import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * Cached Payload local-API client for use in Server Components.
 * `cache` dedupes within a single request.
 */
export const getPayloadClient = cache(async () => {
  return getPayload({ config: await config })
})
