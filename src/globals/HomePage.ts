import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  access: { read: anyone, update: authenticated },
  admin: { group: 'Site' },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'subheading', type: 'textarea' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
        { name: 'ctaLabel', type: 'text' },
        { name: 'ctaHref', type: 'text' },
      ],
    },
    {
      name: 'featuredServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
    {
      name: 'featuredProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
    },
    {
      name: 'featuredTestimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
    },
  ],
}
