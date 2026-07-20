import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'
import { orderField } from '../fields/common'

export const Services: CollectionConfig = {
  slug: 'services',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
    group: 'Content',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'icon',
      type: 'text',
      admin: { description: 'FontAwesome/icon class or short key used by the frontend.' },
    },
    { name: 'shortDesc', type: 'textarea', label: 'Short description' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText' },
    orderField,
    seoField,
  ],
}
