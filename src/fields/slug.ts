import type { Field } from 'payload'

export const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

/**
 * A slug text field that auto-derives from `sourceField` (default: "title")
 * when left blank, and normalizes anything typed in. Lives in the sidebar.
 */
export const slugField = (sourceField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'Auto-generated from the title if left blank.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.length > 0) {
          return formatSlug(value)
        }
        const source = data?.[sourceField]
        if (typeof source === 'string' && source.length > 0) {
          return formatSlug(source)
        }
        return value
      },
    ],
  },
})
