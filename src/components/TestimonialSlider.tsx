'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import type { Testimonial } from '@/payload-types'

export default function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 4500, stopOnInteraction: false }),
  ])

  if (!items.length) return null

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {items.map((t) => (
          <div key={t.id} className="min-w-0 flex-[0_0_100%] px-3 md:flex-[0_0_50%]">
            <figure className="h-full rounded-2xl border border-border-muted bg-white p-8">
              <div className="mb-4 flex gap-1 text-primary" aria-label={`${t.rating ?? 5} stars`}>
                {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed text-heading">“{t.quote}”</blockquote>
              <figcaption className="mt-6">
                <div className="font-heading font-semibold text-heading">{t.authorName}</div>
                <div className="text-sm text-body-text">
                  {[t.authorRole, t.company].filter(Boolean).join(', ')}
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
    </div>
  )
}
