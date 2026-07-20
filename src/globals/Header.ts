import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: anyone, update: authenticated },
  admin: { group: 'Site' },
  fields: [
    {
      name: 'nav',
      type: 'array',
      label: 'Navigation',
      labels: { singular: 'Menu item', plural: 'Menu items' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true, defaultValue: '/' },
        {
          name: 'sublinks',
          type: 'array',
          labels: { singular: 'Sub-link', plural: 'Sub-links' },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true, defaultValue: '/' },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to action button',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
  ],
}
