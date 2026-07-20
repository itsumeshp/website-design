import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/** Flatten a Lexical rich-text value to plain text (for simple UIs like accordions). */
export const extractPlainText = (data?: SerializedEditorState | null): string => {
  if (!data?.root) return ''
  const walk = (node: unknown): string => {
    if (!node || typeof node !== 'object') return ''
    const n = node as { text?: string; children?: unknown[] }
    if (typeof n.text === 'string') return n.text
    if (Array.isArray(n.children)) return n.children.map(walk).join('')
    return ''
  }
  return walk(data.root).trim()
}
