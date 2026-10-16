import { MapPin } from 'lucide-react'
import { ExploreDirectory } from '../components/ui/ExploreDirectory'
import { CompareTable } from '../components/ui/CompareTable'
import { EnquiryBand } from '../components/ui/EnquiryBand'
import { FaqBlock } from '../components/ui/FaqBlock'
import { FeatureTrio } from '../components/ui/FeatureTrio'
import { FilterTabs } from '../components/ui/FilterTabs'
import { ListingCard } from '../components/ui/ListingCard'
import { PageHero } from '../components/ui/PageHero'
import { Picture } from '../components/ui/Picture'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { boatFaqs, boats } from '../data/boats'
import { mapsUrl, sampleTicket } from '../data/ticket'
import { useReveal } from '../hooks/useReveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { TicketPreview } from '../components/home/TicketPreview'

export const boatTabs = [{ label: 'All boats', to: '/boat' }, ...boats.map((b) => ({ label: b.name, to: `/boat/${b.slug}` }))]

const guides = [
  { id: 'aarti', title: 'Ganga Aarti boat ride', body: 'Watch the evening ceremony from the water. Boats gather near the ghat before it begins, so arrive early.' },
  { id: 'sunrise', title: 'Sunrise ride', body: 'The calmest, most photogenic time on the river — soft light and morning rituals along the ghats.' },
  { id: 'sunset', title: 'Sunset & evening ride', body: 'A relaxed ride as the light fades and lamps are lit along the steps.' },
  { id: 'private', title: 'Private boat', body: 'Reserve a boat for your own group for a quieter ride or a celebration.' },
] as const

export default function BoatPage() {
  usePageMeta('Boat Booking in Varanasi', 'Book Ganga boat rides in Varanasi: motor boat, Bajra boat, Dev Diwali, event boats and decorated cruises. Digital e-ticket, boarding near Assi Ghat. Send an enquiry.')
  const gref = useReveal<HTMLUListElement>()
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Boat booking' }]}
        title="Boat booking in Varanasi"
        intro="See the ghats the way they were meant to be seen — from the Ganga. Choose a boat for sunrise, the Ganga Aarti or Dev Deepawali and we will confirm the details."
        chips={[`${boats.length} boat types`, 'Digital e-ticket', 'Boarding near Assi Ghat']}
        image={<Picture name="real-boat-m4-group" alt="Guests smiling on a Via Kashi boat on the Ganga" sizes="(min-width: 960px) 520px, 100vw" focus="45% 50%" priority />}
      />
      <section className="section">
        <div className="container">
          <FilterTabs tabs={boatTabs} label="Boat categories" />
          <div className="lgrid">
            {boats.map((b, i) => (
              <ListingCard key={b.slug} to={`/boat/${b.slug}`} category={b.name} title={b.tagline} summary={b.summary} image={b.image} focus={b.focus} alt="" facts={[b.bestFor]} cta="View & enquire" index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="guide-title">
        <div className="container">
          <SectionHeading id="guide-title" eyebrow="Ride guide" title="Which ride is right for you?" align="center" />
          <ul ref={gref} className="benefits reveal">
            {guides.map((g) => (
              <li key={g.id}>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="compare-title">
        <div className="container">
          <SectionHeading id="compare-title" eyebrow="Compare boats" title="Find the right boat" lead="Capacity and fares are shared on enquiry because they depend on date and season." />
          <CompareTable caption="Boat comparison" columns={['Boat', 'Best for']} rows={boats.map((b) => ({ cells: [b.name, b.bestFor], to: `/boat/${b.slug}`, cta: 'View options' }))} />
        </div>
      </section>

      <TicketPreview />

      <section className="section" aria-labelledby="boarding-title">
        <div className="container split">
          <SectionHeading id="boarding-title" eyebrow="Boarding point" title="Where you board" lead="Our boat ticket shows the boarding point. Open it in Google Maps before you travel." />
          <div className="panel">
            <h3>
              <MapPin size={18} aria-hidden /> Varanasi
            </h3>
            <p>{sampleTicket.boardingPoint}</p>
            <Button href={mapsUrl} variant="dark" size="sm">
              Open in Google Maps
            </Button>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <FeatureTrio />
        </div>
      </section>
      <FaqBlock items={boatFaqs} />
      <EnquiryBand title="Ready for a ride on the Ganga?" body="Send your date, preferred time and group size — we will confirm availability." topic="a boat ride" interest="boat" />
      <ExploreDirectory />
    </>
  )
}
