import { ArrowRight } from 'lucide-react'
import type { Service } from '../../data/services'
import { selectInterest } from '../../lib/enquiry'
import { useReveal } from '../../hooks/useReveal'
import { Picture } from './Picture'

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useReveal<HTMLAnchorElement>()
  return (
    <a
      ref={ref}
      id={service.id}
      href="#enquiry"
      className="svc reveal"
      style={{ ['--span' as string]: service.span, ['--d' as string]: `${(index % 3) * 80}ms` }}
      onClick={() => selectInterest(service.interest)}
    >
      <div className="media">
        <Picture name={service.image} alt="" sizes="(min-width: 1024px) 50vw, 100vw" focus={service.focus} />
      </div>
      <div className="svc__body">
        <h3 className="svc__title">{service.title}</h3>
        <p className="svc__sum">{service.summary}</p>
        <span className="svc__cta">
          Enquire <ArrowRight size={16} aria-hidden />
        </span>
      </div>
    </a>
  )
}
