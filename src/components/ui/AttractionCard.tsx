import type { Attraction } from '../../data/attractions'
import { useReveal } from '../../hooks/useReveal'
import { Picture } from './Picture'

export function AttractionCard({ place, className = '', index = 0 }: { place: Attraction; className?: string; index?: number }) {
  const ref = useReveal<HTMLElement>()
  return (
    <article ref={ref} data-tilt className={`att reveal ${className}`} style={{ ['--d' as string]: `${(index % 3) * 80}ms` }}>
      <div className="media">
        <Picture name={place.image} alt={place.alt} sizes="(min-width: 1024px) 45vw, 100vw" focus={place.focus} />
      </div>
      <div className="att__body">
        <span className="att__tag">{place.tag}</span>
        <h3 className="att__name">{place.name}</h3>
        <p className="att__desc">{place.description}</p>
      </div>
    </article>
  )
}
