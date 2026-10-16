import { ExploreDirectory } from '../components/ui/ExploreDirectory'
import { CompareTable } from '../components/ui/CompareTable'
import { EnquiryBand } from '../components/ui/EnquiryBand'
import { FaqBlock } from '../components/ui/FaqBlock'
import { FeatureTrio } from '../components/ui/FeatureTrio'
import { FilterTabs } from '../components/ui/FilterTabs'
import { ListingCard } from '../components/ui/ListingCard'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { VehicleTile } from '../components/ui/VehicleTile'
import { cabFaqs, cabTrips, outstationDestinations, vehicles } from '../data/cab'
import { useReveal } from '../hooks/useReveal'
import { usePageMeta } from '../hooks/usePageMeta'

export const cabTabs = [{ label: 'All cabs', to: '/cab' }, ...vehicles.map((v) => ({ label: v.name, to: `/cab/${v.slug}` }))]

export default function CabPage() {
  usePageMeta('Cab Booking in Varanasi', 'Book a cab in Varanasi: airport and railway station transfers, local sightseeing and outstation trips to Ayodhya, Prayagraj and more. Sedans, MUVs and Tempo Travellers.')
  const tripsRef = useReveal<HTMLUListElement>()
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Cab booking' }]}
        title="Cab booking in Varanasi"
        intro="Airport and station pickups, sightseeing days and outstation trips — choose a vehicle that fits your group and we will quote the trip."
        chips={[`${vehicles.length} vehicle types`, 'Quote on enquiry', 'Confirmed directly with Via Kashi']}
      />
      <section className="section">
        <div className="container">
          <FilterTabs tabs={cabTabs} label="Cab categories" />
          <div className="lgrid">
            {vehicles.map((v, i) => (
              <ListingCard
                key={v.slug}
                to={`/cab/${v.slug}`}
                category={v.category}
                title={v.name}
                summary={v.summary}
                tile={<VehicleTile icon={v.icon} />}
                facts={[v.capacity, v.bestFor]}
                cta="View & enquire"
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="trips-title">
        <div className="container">
          <SectionHeading id="trips-title" eyebrow="Cab services" title="One cab for every kind of journey" align="center" />
          <ul ref={tripsRef} className="benefits reveal">
            {cabTrips.map((t) => (
              <li key={t.id}>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </li>
            ))}
          </ul>
          <p className="outstation">
            <strong>Popular outstation destinations:</strong> {outstationDestinations.join(' · ')}
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="compare-title">
        <div className="container">
          <SectionHeading id="compare-title" eyebrow="Compare vehicles" title="Pick the right size" lead="Typical seating is shown. Quotes depend on route, days and season — ask us for a fare." />
          <CompareTable
            caption="Cab vehicle comparison"
            columns={['Vehicle', 'Capacity', 'Best for']}
            rows={vehicles.map((v) => ({ cells: [v.name, v.capacity, v.bestFor], to: `/cab/${v.slug}`, cta: 'View options' }))}
          />
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <FeatureTrio />
        </div>
      </section>
      <FaqBlock items={cabFaqs} />
      <EnquiryBand title="Need a cab in Varanasi?" body="Send pickup, drop, date and number of passengers — we will reply with a fare." topic="a cab" interest="cab" />
      <ExploreDirectory />
    </>
  )
}
