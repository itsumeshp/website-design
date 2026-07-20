import type { Field } from 'payload'

/** Reusable SEO / social-share metadata group (sidebar). */
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  admin: { position: 'sidebar' },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Meta title',
      admin: { description: 'Falls back to the page title if blank.' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Meta description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Share image (Open Graph)',
    },
  ],
}
