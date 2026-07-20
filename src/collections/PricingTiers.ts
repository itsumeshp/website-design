import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { orderField } from '../fields/common'

export const PricingTiers: CollectionConfig = {
  slug: 'pricing-tiers',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'featured', 'order'],
    group: 'Content',
  },
  fields: [
    { name: 'name', type: 'text', required: true, admin: { description: 'e.g. Starter, Pro' } },
    {
      name: 'price',
      type: 'text',
      admin: { description: 'e.g. "$29" or "Custom". Text so non-numeric values work.' },
    },
    { name: 'period', type: 'text', admin: { description: 'e.g. /month' } },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'feature', type: 'text', required: true }],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Highlight this tier.' },
    },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Get Started' },
    { name: 'ctaHref', type: 'text', defaultValue: '/contact' },
    orderField,
  ],
}
