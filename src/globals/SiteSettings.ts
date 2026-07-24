import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { socialsField } from '../fields/common'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: { read: anyone, update: authenticated },
  admin: { group: 'Site' },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Infrion Technolab' },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Light/white logo — used on dark backgrounds (home hero, footer).' },
    },
    {
      name: 'logoDark',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Dark logo — used on light backgrounds (inner-page header).' },
    },
    { name: 'favicon', type: 'upload', relationTo: 'media' },
    { name: 'topbarWorkingHours', type: 'text', admin: { description: 'Inner-page topbar text, e.g. "Our Working Time: 10:00 am To 07:00 pm"' } },
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
