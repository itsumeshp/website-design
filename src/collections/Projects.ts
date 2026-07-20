import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'category', 'date'],
    group: 'Content',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'gallery',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    { name: 'client', type: 'text' },
    { name: 'category', type: 'text', admin: { description: 'e.g. Web App, Cloud, AI' } },
    { name: 'summary', type: 'textarea' },
    { name: 'content', type: 'richText' },
    { name: 'date', type: 'date', admin: { position: 'sidebar' } },
    seoField,
  ],
}
