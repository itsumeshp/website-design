import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { orderField } from '../fields/common'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'company', 'rating', 'order'],
    group: 'Content',
  },
  fields: [
    { name: 'authorName', type: 'text', required: true },
    { name: 'authorRole', type: 'text' },
    { name: 'company', type: 'text' },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    { name: 'quote', type: 'textarea', required: true },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: { description: '1–5 stars.' },
    },
    orderField,
  ],
}
