import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'
import { socialsField } from '../fields/common'

export const Authors: CollectionConfig = {
  slug: 'authors',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  admin: { useAsTitle: 'name', group: 'Blog' },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField('name'),
    { name: 'role', type: 'text', admin: { description: 'e.g. Content Lead' } },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea' },
    socialsField,
  ],
}
