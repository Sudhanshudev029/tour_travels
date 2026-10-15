import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useMediaQuery, useReducedMotion } from '../../hooks/useMediaQuery'
import { canUseWebGL, prefersLightweight } from '../../lib/webgl'
import { SceneBoundary } from './SceneBoundary'

const ScrollJourney3D = lazy(() => import('./ScrollJourney3D'))

/**
 * Decorative scroll-driven 3D backdrop for the dark "experiences" section: a pinned canvas whose camera
 * glides down a lamp-lit Ganga as the section scrolls. Absent under reduced motion / no WebGL.
 */
export function ScrollJourney() {
  const host = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const compact = useMediaQuery('(max-width: 767px)')
  const [mount, setMount] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = host.current
    if (!el || reduced || !canUseWebGL() || prefersLightweight()) return
    const near = new IntersectionObserver(([e]) => e.isIntersecting && setMount(true), { rootMargin: '600px 0px' })
    const vis = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: '0px' })
    near.observe(el)
    vis.observe(el)
    return () => {
      near.disconnect()
      vis.disconnect()
    }
  }, [reduced])

  return (
    <div ref={host} className="journey" aria-hidden="true">
      <div className="journey__sticky">
        {mount && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <ScrollJourney3D host={host} active={active} compact={compact} />
            </Suspense>
          </SceneBoundary>
        )}
      </div>
    </div>
  )
}
