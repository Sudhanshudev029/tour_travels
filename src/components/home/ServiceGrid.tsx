import { services } from '../../data/services'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceCard } from '../ui/ServiceCard'

export function ServiceGrid() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          id="services-title"
          eyebrow="Our services"
          title="Everything for your Kashi journey, in one place"
          lead="From the first airport pickup to the final aarti — choose a service to start an enquiry."
        />
        <div className="svc-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
