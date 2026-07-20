import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'
import { socialsField, orderField } from '../fields/common'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order'],
    group: 'People',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField('name'),
    { name: 'role', type: 'text', required: true, admin: { description: 'e.g. CEO, Developer' } },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea' },
    socialsField,
    orderField,
  ],
}
