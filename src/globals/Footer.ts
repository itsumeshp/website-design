import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { socialsField } from '../fields/common'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: anyone, update: authenticated },
  admin: { group: 'Site' },
  fields: [
    {
      name: 'columns',
      type: 'array',
      labels: { singular: 'Column', plural: 'Columns' },
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true, defaultValue: '/' },
          ],
        },
      ],
    },
    socialsField,
    {
      name: 'copyright',
      type: 'text',
      admin: { description: 'e.g. © 2026 Company. All rights reserved.' },
    },
  ],
}
