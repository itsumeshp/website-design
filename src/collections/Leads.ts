import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Leads: CollectionConfig = {
  slug: 'leads',
  access: {
    // Public can create (contact form submissions); only staff can read/manage.
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
    group: 'Inbox',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'subject', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'source',
      type: 'text',
      admin: { readOnly: true, description: 'Which page/form the lead came from.' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Read', value: 'read' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
