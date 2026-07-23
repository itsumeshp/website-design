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
      name: 'whyChoose',
      type: 'group',
      label: 'Why Choose Us',
      fields: [
        { name: 'eyebrow', type: 'text', admin: { description: 'Small label above the heading.' } },
        { name: 'heading', type: 'text' },
        { name: 'highlight', type: 'text', admin: { description: 'Part of the heading shown in the brand colour.' } },
        { name: 'intro', type: 'textarea' },
        {
          name: 'features',
          type: 'array',
          labels: { singular: 'Feature point', plural: 'Feature points' },
          fields: [
            { name: 'icon', type: 'text', admin: { description: 'Font Awesome 5 class, e.g. "fa-shield-alt"' } },
            { name: 'title', type: 'text', required: true },
            { name: 'desc', type: 'text' },
          ],
        },
        {
          name: 'stats',
          type: 'array',
          labels: { singular: 'Stat', plural: 'Stats' },
          fields: [
            { name: 'icon', type: 'text', admin: { description: 'Font Awesome 5 class, e.g. "fa-briefcase"' } },
            { name: 'value', type: 'text', required: true, admin: { description: 'e.g. "14+"' } },
            { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Products Shipped"' } },
            { name: 'sublabel', type: 'text', admin: { description: 'e.g. "Across industries"' } },
          ],
        },
        {
          name: 'ratings',
          type: 'array',
          labels: { singular: 'Rating', plural: 'Ratings' },
          admin: { description: 'Only add a platform once you have a real public profile + score.' },
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: ['google', 'clutch', 'upwork', 'freelancer', 'trustpilot', 'g2', 'other'],
            },
            { name: 'score', type: 'text', admin: { description: 'e.g. "4.9"' } },
            { name: 'count', type: 'text', admin: { description: 'number of reviews, e.g. "23"' } },
            { name: 'label', type: 'text', admin: { description: 'e.g. "On Clutch"' } },
            { name: 'url', type: 'text' },
          ],
        },
        {
          name: 'ctas',
          type: 'array',
          labels: { singular: 'CTA button', plural: 'CTA buttons' },
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: ['upwork', 'freelancer', 'clutch', 'google', 'linkedin', 'other'],
            },
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
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
