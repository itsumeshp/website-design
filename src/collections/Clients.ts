import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { orderField } from '../fields/common'

export const Clients: CollectionConfig = {
  slug: 'clients',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'url', 'order'],
    group: 'Content',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'url', type: 'text' },
    orderField,
  ],
}
