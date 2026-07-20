import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { socialsField } from '../fields/common'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: { read: anyone, update: authenticated },
  admin: { group: 'Site' },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Fexo' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'favicon', type: 'upload', relationTo: 'media' },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'address', type: 'textarea' },
      ],
    },
    socialsField,
    {
      name: 'analyticsId',
      type: 'text',
      label: 'Analytics ID',
      admin: { description: 'e.g. Google Analytics measurement ID.' },
    },
  ],
}
