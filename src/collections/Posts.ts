import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'publishedAt', 'status'],
    group: 'Blog',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    { name: 'excerpt', type: 'textarea' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText' },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    seoField,
  ],
}
