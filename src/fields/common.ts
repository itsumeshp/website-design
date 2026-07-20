import type { Field } from 'payload'

/** Social links array, reused by Authors, TeamMembers, SiteSettings, Footer. */
export const socialsField: Field = {
  name: 'socials',
  type: 'array',
  labels: { singular: 'Social link', plural: 'Social links' },
  fields: [
    {
      name: 'platform',
      type: 'select',
      required: true,
      options: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'X / Twitter', value: 'twitter' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'YouTube', value: 'youtube' },
        { label: 'GitHub', value: 'github' },
        { label: 'Dribbble', value: 'dribbble' },
        { label: 'Behance', value: 'behance' },
      ],
    },
    { name: 'url', type: 'text', required: true },
  ],
}

/** Manual sort order (sidebar). Lower shows first. */
export const orderField: Field = {
  name: 'order',
  type: 'number',
  defaultValue: 0,
  admin: {
    position: 'sidebar',
    description: 'Lower numbers appear first.',
  },
}
