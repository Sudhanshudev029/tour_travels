import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { ImageName } from '../../data/imageMeta'
import { useReveal } from '../../hooks/useReveal'
import { Picture } from './Picture'

interface Props {
  to: string
  category: string
  title: string
  summary?: string
  /** Photo; omit to render the icon tile instead. */
  image?: ImageName
  focus?: string
  alt?: string
  /** Shown instead of a photo, e.g. a vehicle icon. */
  tile?: ReactNode
  facts?: readonly string[]
  cta?: string
  badge?: string
  index?: number
}

/** Whole-card link used on listing pages (boats, cabs, packages, things to do). Never shows invented ratings or prices. */
export function ListingCard({ to, category, title, summary, image, focus, alt = '', tile, facts, cta = 'View details', badge, index = 0 }: Props) {
  const ref = useReveal<HTMLAnchorElement>()
  return (
    <Link ref={ref} to={to} className="lc reveal" data-tilt style={{ ['--d' as string]: `${(index % 3) * 70}ms` }}>
      <div className="lc__media media">
        {image ? <Picture name={image} alt={alt} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" focus={focus} /> : <div className="lc__tile">{tile}</div>}
        {badge && <span className="lc__badge">{badge}</span>}
      </div>
      <div className="lc__body">
        <p className="lc__cat">{category}</p>
        <h3>{title}</h3>
        {summary && <p className="lc__sum">{summary}</p>}
        {facts && (
          <ul className="lc__facts">
            {facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}
        <span className="lc__cta">
          {cta} <ArrowRight size={16} aria-hidden />
        </span>
      </div>
    </Link>
  )
}
