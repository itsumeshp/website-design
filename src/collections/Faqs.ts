import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { orderField } from '../fields/common'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
    group: 'Content',
  },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'richText', required: true },
    { name: 'category', type: 'text', admin: { description: 'Optional grouping, e.g. Billing.' } },
    orderField,
  ],
}
