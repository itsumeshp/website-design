'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useState, type ReactNode } from 'react'

type Breakpoint = { minWidth: number; perView: number }

/**
 * Generic Embla slider that mimics the theme's slick sliders: autoplay, loop,
 * custom prev/next arrows, and responsive slides-per-view.
 */
export default function Slider({
  children,
  perView = 4,
  breakpoints = [],
  gap = 30,
  className = '',
}: {
  children: ReactNode[]
  perView?: number
  breakpoints?: Breakpoint[] // largest minWidth wins
  gap?: number
  className?: string
}) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ])
  const [current, setCurrent] = useState(perView)

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      const sorted = [...breakpoints].sort((a, b) => b.minWidth - a.minWidth)
      const hit = sorted.find((b) => w >= b.minWidth)
      setCurrent(hit ? hit.perView : perView)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [breakpoints, perView])

  useEffect(() => {
    embla?.reInit()
  }, [current, embla])

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla])

  const basis = `calc(${100 / current}% - ${(gap * (current - 1)) / current}px)`

  return (
    <div className={`axis-embla ${className}`} style={{ position: 'relative' }}>
      <div className="overflow-hidden" ref={emblaRef} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: `${gap}px` }}>
          {children.map((child, i) => (
            <div key={i} style={{ flex: `0 0 ${basis}`, minWidth: 0 }}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="prev" onClick={scrollPrev} role="button" aria-label="Previous">
        <i className="far fa-arrow-left" />
      </div>
      <div className="next" onClick={scrollNext} role="button" aria-label="Next">
        <i className="far fa-arrow-right" />
      </div>
    </div>
  )
}
