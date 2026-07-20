import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  admin: { useAsTitle: 'name', group: 'Blog' },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField('name'),
  ],
}
