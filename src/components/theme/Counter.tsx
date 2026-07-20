'use client'

import { useEffect, useRef, useState } from 'react'

/** Counts up to `end` when scrolled into view (replaces jquery.counterup). */
export default function Counter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done.current) {
            done.current = true
            const start = performance.now()
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1)
              setValue(Math.floor(p * end))
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [end, duration])

  return (
    <span className="counter" ref={ref}>
      {value}
    </span>
  )
}
