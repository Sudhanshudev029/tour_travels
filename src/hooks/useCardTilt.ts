import { useEffect } from 'react'

/** Delegated 3D tilt + glare for any `[data-tilt]` element. Mouse-only; skipped for touch and reduced motion. */
export function useCardTilt() {
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let cur: HTMLElement | null = null
    let last: PointerEvent | null = null
    let raf = 0

    const reset = (el: HTMLElement) => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    const apply = () => {
      raf = 0
      if (!cur || !last) return
      const r = cur.getBoundingClientRect()
      const x = (last.clientX - r.left) / r.width
      const y = (last.clientY - r.top) / r.height
      cur.style.setProperty('--ry', `${((x - 0.5) * 9).toFixed(2)}deg`)
      cur.style.setProperty('--rx', `${((0.5 - y) * 9).toFixed(2)}deg`)
      cur.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
      cur.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
    }
    const onMove = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.<HTMLElement>('[data-tilt]') ?? null
      if (t !== cur) {
        if (cur) reset(cur)
        cur = t
      }
      if (!t) return
      last = e
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      if (cur) reset(cur)
      cur = null
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])
}
