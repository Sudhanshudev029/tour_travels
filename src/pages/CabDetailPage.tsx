import { Check, Users } from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'
import { ExploreDirectory } from '../components/ui/ExploreDirectory'
import { EnquiryBand } from '../components/ui/EnquiryBand'
import { FaqBlock } from '../components/ui/FaqBlock'
import { ListingCard } from '../components/ui/ListingCard'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { VehicleTile } from '../components/ui/VehicleTile'
import { WhatsAppButton } from '../components/ui/WhatsAppButton'
import { cabFaqs, cabTrips, vehicles } from '../data/cab'
import { usePageMeta } from '../hooks/usePageMeta'
import { steps } from '../data/steps'
import { cabTabs } from './CabPage'
import { FilterTabs } from '../components/ui/FilterTabs'

export default function CabDetailPage() {
  const { slug } = useParams()
  const v = vehicles.find((x) => x.slug === slug)
  usePageMeta(v ? `${v.name} Cab in Varanasi` : 'Cab', v ? `${v.name} cab booking in Varanasi — ${v.capacity.toLowerCase()}. ${v.summary}` : 'Cab booking in Varanasi')
  if (!v) return <Navigate to="/cab" replace />
  const others = vehicles.filter((x) => x.slug !== v.slug).slice(0, 3)
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Cab booking', to: '/cab' }, { label: v.name }]}
        title={`${v.name} cab in Varanasi`}
        intro={v.summary}
        chips={[v.category, v.capacity, v.bestFor]}
        image={
          <div className="phero__tile">
            <VehicleTile icon={v.icon} size={96} />
          </div>
        }
      >
        <div className="phero__cta">
          <Button href={`/contact-us?interest=cab&topic=${encodeURIComponent(`${v.name} cab`)}#enquiry`}>Get a quote</Button>
          <WhatsAppButton variant="secondary" message={`Namaste! I would like a quote for a ${v.name} cab in Varanasi. Pickup: ___ Drop: ___ Date: ___ Passengers: ___`} fallbackLabel="Contact us" />
        </div>
      </PageHero>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading eyebrow="About this vehicle" title={`Why choose the ${v.name}`} lead={v.summary} />
            <p className="facts-line">
              <Users size={18} aria-hidden /> <strong>{v.capacity}</strong> · Best for {v.bestFor.toLowerCase()}
            </p>
            <h3 className="mini-h">Great for</h3>
            <ul className="checklist checklist--col">
              {v.suits.map((s) => (
                <li key={s}>
                  <Check size={18} aria-hidden /> {s}
                </li>
              ))}
            </ul>
            <p className="fine-print">Photos of the exact vehicle and the fare are shared when you enquire. Vehicle availability is confirmed for your date.</p>
          </div>
          <div className="panel">
            <h3>How booking works</h3>
            <ol className="mini-steps">
              {steps.map((s) => (
                <li key={s.id}>
                  <strong>{s.title}.</strong> {s.body}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="trip-types">
        <div className="container">
          <SectionHeading id="trip-types" eyebrow="Trip types" title="What can you book it for?" />
          <ul className="benefits">
            {cabTrips.map((t) => (
              <li key={t.id}>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="More options" title="Other vehicles" />
          <FilterTabs tabs={cabTabs} label="Cab categories" />
          <div className="lgrid">
            {others.map((o, i) => (
              <ListingCard key={o.slug} to={`/cab/${o.slug}`} category={o.category} title={o.name} summary={o.summary} tile={<VehicleTile icon={o.icon} />} facts={[o.capacity]} cta="View & enquire" index={i} />
            ))}
          </div>
        </div>
      </section>
      <FaqBlock items={cabFaqs} />
      <EnquiryBand title={`Book a ${v.name}`} body="Send pickup, drop, date and passengers — we will reply with a fare." topic={`a ${v.name} cab`} interest="cab" />
      <ExploreDirectory />
    </>
  )
}
