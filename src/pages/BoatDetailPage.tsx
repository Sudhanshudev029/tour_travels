import { Check } from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'
import { TicketPreview } from '../components/home/TicketPreview'
import { Button } from '../components/ui/Button'
import { EnquiryBand } from '../components/ui/EnquiryBand'
import { ExploreDirectory } from '../components/ui/ExploreDirectory'
import { FaqBlock } from '../components/ui/FaqBlock'
import { FilterTabs } from '../components/ui/FilterTabs'
import { ListingCard } from '../components/ui/ListingCard'
import { PageHero } from '../components/ui/PageHero'
import { Picture } from '../components/ui/Picture'
import { SectionHeading } from '../components/ui/SectionHeading'
import { WhatsAppButton } from '../components/ui/WhatsAppButton'
import { boatFaqs, boats } from '../data/boats'
import { usePageMeta } from '../hooks/usePageMeta'
import { boatTabs } from './BoatPage'

export default function BoatDetailPage() {
  const { slug } = useParams()
  const b = boats.find((x) => x.slug === slug)
  usePageMeta(b ? `${b.name} in Varanasi` : 'Boat', b ? `${b.name} in Varanasi — ${b.summary}` : 'Boat booking in Varanasi')
  if (!b) return <Navigate to="/boat" replace />
  const others = boats.filter((x) => x.slug !== b.slug).slice(0, 3)
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Boat booking', to: '/boat' }, { label: b.name }]}
        title={`${b.name} in Varanasi`}
        intro={b.tagline}
        chips={[b.bestFor, 'Quote on enquiry']}
        image={<Picture name={b.image} alt={`${b.name} on the Ganga with Via Kashi`} sizes="(min-width: 960px) 520px, 100vw" focus={b.focus} priority />}
      >
        <div className="phero__cta">
          <Button href={`/contact-us?interest=boat&topic=${encodeURIComponent(b.name)}#enquiry`}>Enquire for this boat</Button>
          <WhatsAppButton variant="secondary" message={`Namaste! I would like to book a ${b.name} in Varanasi. Date: ___ Time: ___ People: ___`} fallbackLabel="Contact us" />
        </div>
      </PageHero>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading eyebrow="About this ride" title={b.summary} />
            {b.about.map((p) => (
              <p key={p} className="prose">
                {p}
              </p>
            ))}
          </div>
          <div className="panel">
            <h3>Highlights</h3>
            <ul className="checklist checklist--col">
              {b.highlights.map((h) => (
                <li key={h}>
                  <Check size={18} aria-hidden /> {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {(b.slug === 'dev-diwali-booking' || b.slug === 'motor-boat') && <TicketPreview />}

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="More options" title="Other boats" />
          <FilterTabs tabs={boatTabs} label="Boat categories" />
          <div className="lgrid">
            {others.map((o, i) => (
              <ListingCard key={o.slug} to={`/boat/${o.slug}`} category={o.name} title={o.tagline} summary={o.summary} image={o.image} focus={o.focus} facts={[o.bestFor]} cta="View & enquire" index={i} />
            ))}
          </div>
        </div>
      </section>
      <FaqBlock items={boatFaqs} />
      <EnquiryBand title={`Book the ${b.name}`} body="Send your date, time and group size — we will confirm availability." topic={b.name} interest="boat" />
      <ExploreDirectory />
    </>
  )
}
