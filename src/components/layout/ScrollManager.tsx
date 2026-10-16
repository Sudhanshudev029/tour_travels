import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to top on route changes, or to the #hash target when present (after lazy content mounts). */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    const tick = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView()
      else if (tries++ < 20) timer = window.setTimeout(tick, 100)
    }
    let timer = window.setTimeout(tick, 0)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])
  return null
}
