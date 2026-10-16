import { Check, Clock } from 'lucide-react'
import type { TourPackage } from '../../data/packages'
import { useReveal } from '../../hooks/useReveal'
import { Button } from './Button'
import { Picture } from './Picture'

interface Props {
  pkg: TourPackage
  variant?: 'standard' | 'custom'
  index?: number
}

export function TourPackageCard({ pkg, variant = 'standard', index = 0 }: Props) {
  const ref = useReveal<HTMLElement>()
  return (
    <article ref={ref} data-tilt className={`pkg reveal${variant === 'custom' ? ' pkg--custom' : ''}`} style={{ ['--d' as string]: `${(index % 3) * 80}ms` }}>
      <div className="media">
        <Picture name={pkg.image} alt="" sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" focus={pkg.focus} />
        {pkg.featured && <span className="pkg__badge">Suggested for first visits</span>}
      </div>
      <div className="pkg__body">
        <p className="pkg__dur">
          <Clock size={13} aria-hidden style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
          {pkg.duration}
        </p>
        <h3 className="pkg__title">{pkg.title}</h3>
        <p className="pkg__sum">{pkg.summary}</p>
        <ul className="pkg__list">
          {pkg.highlights.map((h) => (
            <li key={h}>
              <Check size={15} aria-hidden />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <div className="pkg__foot">
          <p className="pkg__price">
            <small>{pkg.startingPrice ? 'Starting from' : 'Pricing'}</small>
            <strong>{pkg.startingPrice ?? 'Request a quote'}</strong>
          </p>
          <div className="pkg__btns">
            <Button href={`/packages/${pkg.id}`} size="sm" variant={variant === 'custom' ? 'secondary' : 'outline'} aria-label={`View itinerary for ${pkg.title}`}>
              View details
            </Button>
            <Button href={`/contact-us?interest=package&topic=${encodeURIComponent(pkg.title)}#enquiry`} size="sm" variant={variant === 'custom' ? 'primary' : 'dark'} aria-label={`Enquire about ${pkg.title}`}>
              Enquire
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
