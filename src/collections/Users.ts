import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  auth: true,
  fields: [
    { name: 'name', type: 'text' },
    // Email + password added by the auth strategy.
  ],
  versions: false,
}
