'use client'

import { useState } from 'react'

export type FaqItem = { id: string; question: string; answer: string }

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(items[1]?.id ?? items[0]?.id ?? null)
  if (items.length === 0) return null

  return (
    <div className="accordion" id="accordionOne" data-aos="fade-up" data-aos-duration="1000">
      {items.map((item) => {
        const isOpen = open === item.id
        return (
          <div className="accordion-card style-one mb-25" key={item.id}>
            <div className="accordion-header">
              <h5
                className="accordion-title"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : item.id)}
                style={{ cursor: 'pointer' }}
              >
                {item.question}
              </h5>
            </div>
            <div className={`accordion-collapse collapse${isOpen ? ' show' : ''}`}>
              {isOpen ? (
                <div className="accordion-content">
                  <p>{item.answer}</p>
                </div>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
