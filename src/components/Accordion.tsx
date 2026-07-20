'use client'

import { useState, type ReactNode } from 'react'

type Item = { id: string; question: string; answer: ReactNode }

export default function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border-muted rounded-2xl border border-border-muted bg-white">
      {items.map((item) => {
        const isOpen = open === item.id
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-heading font-semibold text-heading"
              aria-expanded={isOpen}
            >
              {item.question}
              <span className={`text-primary transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>
            {isOpen ? <div className="px-6 pb-5 text-body-text">{item.answer}</div> : null}
          </div>
        )
      })}
    </div>
  )
}
