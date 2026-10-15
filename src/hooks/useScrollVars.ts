import { useEffect } from 'react'

/** Publishes --scroll-p (page) and --hero-p (first viewport) on <html>, throttled to one write per frame. */
export function useScrollVars() {
  useEffect(() => {
    const root = document.documentElement
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      const max = root.scrollHeight - window.innerHeight
      root.style.setProperty('--scroll-p', (max > 0 ? Math.min(1, y / max) : 0).toFixed(4))
      root.style.setProperty('--hero-p', Math.min(1, y / window.innerHeight).toFixed(4))
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      cancelAnimationFrame(raf)
    }
  }, [])
}
