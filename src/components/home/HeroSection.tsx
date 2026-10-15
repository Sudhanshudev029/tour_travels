import { ChevronDown } from 'lucide-react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useMediaQuery, useReducedMotion } from '../../hooks/useMediaQuery'
import { canUseWebGL, prefersLightweight } from '../../lib/webgl'
import { Button } from '../ui/Button'
import { Picture } from '../ui/Picture'
import { WhatsAppButton } from '../ui/WhatsAppButton'
import { SceneBoundary } from './SceneBoundary'

const HeroScene3D = lazy(() => import('./HeroScene3D'))

export function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const compact = useMediaQuery('(max-width: 767px)')
  const [sceneReady, setSceneReady] = useState(false)

  // Mount the optional 3D layer only after the photographic hero has painted.
  useEffect(() => {
    if (!canUseWebGL() || prefersLightweight()) return
    const start = () => setSceneReady(true)
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(start, 600)
    return () => clearTimeout(id)
  }, [])

  return (
    <section id="top" className="hero on-dark" aria-labelledby="hero-title">
      <div ref={bgRef} className="hero__bg">
        <Picture
          name="hero-ghats-sunrise-boats"
          alt="Wooden boats moored at the Varanasi ghats as the sun rises over the Ganga"
          sizes="100vw"
          focus="50% 55%"
          priority
        />
      </div>
      <div className="hero__shade" />
      {sceneReady && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <HeroScene3D parallaxEl={bgRef} reducedMotion={reduced} compact={compact} />
          </Suspense>
        </SceneBoundary>
      )}

      <div className="container hero__content">
        <p className="hero__eyebrow">
          <span lang="hi" className="deva">
            काशी
          </span>
          <span aria-hidden="true">·</span> Varanasi
        </p>
        <h1 id="hero-title">
          Experience the <em>Eternal Soul</em> of Kashi
        </h1>
        <p className="hero__lead">
          Sacred ghats, timeless temples, quiet Ganga boat rides and journeys planned around you — from first darshan to the last evening aarti.
        </p>
        <div className="hero__cta">
          <Button href="#packages">Explore Tour Packages</Button>
          <WhatsAppButton variant="secondary" />
        </div>
        <p className="hero__note">Tell us your dates and group size — we’ll shape an itinerary and quote with you.</p>
      </div>

      <a className="hero__scroll" href="#services" aria-label="Scroll to services">
        <ChevronDown size={22} aria-hidden />
      </a>
    </section>
  )
}
