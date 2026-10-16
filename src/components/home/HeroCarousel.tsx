import { useEffect, useRef, useState } from 'react'
import { heroSlides } from '../../data/heroSlides'
import { Picture } from '../ui/Picture'

const INTERVAL_MS = 6500

/**
 * Self-running crossfade background — no controls by design. Slide 0 renders immediately (LCP);
 * the rest mount after the page is idle. Advancing pauses while the hero is off-screen or the tab is
 * hidden, and never starts under reduced motion.
 */
export function HeroCarousel({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [running, setRunning] = useState(true)

  // Defer slides 2–4 so they never compete with the first image.
  useEffect(() => {
    if (reducedMotion) return
    const start = () => setLoaded(true)
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(start, 1500)
    return () => clearTimeout(id)
  }, [reducedMotion])

  useEffect(() => {
    const el = root.current
    if (!el) return
    let onScreen = true
    const sync = () => setRunning(onScreen && !document.hidden)
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      sync()
    })
    io.observe(el)
    document.addEventListener('visibilitychange', sync)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  useEffect(() => {
    if (reducedMotion || !loaded || !running) return
    const id = setInterval(() => {
      setIndex((i) => {
        setPrev(i)
        return (i + 1) % heroSlides.length
      })
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [reducedMotion, loaded, running])

  const visible = loaded ? heroSlides : heroSlides.slice(0, 1)

  return (
    <div ref={root} className="hero__slides">
      {visible.map((s, i) => (
        <div
          key={s.image}
          className={`hero__slide${i === index ? ' is-active' : ''}${i === prev ? ' is-prev' : ''}`}
          aria-hidden={i === index ? undefined : true}
        >
          <Picture name={s.image} alt={i === index ? s.alt : ''} sizes="100vw" focus={s.focus} priority={i === 0} />
        </div>
      ))}
      <p className="hero__caption" aria-hidden="true">
        <span key={index}>{heroSlides[index].caption}</span>
      </p>
    </div>
  )
}
