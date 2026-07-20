import type { Access } from 'payload'

/** Public read — content served to the website is world-readable. */
export const anyone: Access = () => true

/** Any authenticated Payload user (staff). Used for create/update/delete. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)
