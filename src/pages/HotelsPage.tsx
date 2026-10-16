import { BedDouble, Check } from 'lucide-react'
import { ExploreDirectory } from '../components/ui/ExploreDirectory'
import { EnquiryBand } from '../components/ui/EnquiryBand'
import { FaqBlock } from '../components/ui/FaqBlock'
import { FeatureTrio } from '../components/ui/FeatureTrio'
import { Button } from '../components/ui/Button'
import { PageHero } from '../components/ui/PageHero'
import { Picture } from '../components/ui/Picture'
import { SectionHeading } from '../components/ui/SectionHeading'
import { WhatsAppButton } from '../components/ui/WhatsAppButton'
import { hotelFaqs, hotelFeatures, hotelVideos, rooms } from '../data/hotel'
import { useReveal } from '../hooks/useReveal'
import { usePageMeta } from '../hooks/usePageMeta'

function Room({ r, i }: { r: (typeof rooms)[number]; i: number }) {
  const ref = useReveal<HTMLElement>()
  return (
    <article ref={ref} className="room reveal" data-tilt style={{ ['--d' as string]: `${(i % 3) * 70}ms` }}>
      <div className="room__media media">
        <Picture name={r.image} alt={r.alt} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" focus={r.focus} />
      </div>
      <div className="room__body">
        <h3>{r.name}</h3>
        <ul>
          {r.features.map((f) => (
            <li key={f}>
              <Check size={15} aria-hidden /> {f}
            </li>
          ))}
        </ul>
        <Button href={`/contact-us?interest=hotel&topic=${encodeURIComponent(r.name)}#enquiry`} size="sm" variant="dark">
          Enquire for this room
        </Button>
      </div>
    </article>
  )
}

export default function HotelsPage() {
  usePageMeta('Hotel & Stay in Varanasi', 'Comfortable twin and double-bed rooms in Varanasi with Via Kashi Tour & Travels. See real room photos and send an enquiry for availability and rates.')
  const vref = useReveal<HTMLUListElement>()
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Hotels' }]}
        title="Hotel & stay in Varanasi"
        intro="Comfortable rooms for pilgrims, families and travellers. These are real photos of our rooms — send your dates and we will confirm availability and rates."
        chips={['Real room photos', 'Rates on enquiry', 'Combine with boat & cab']}
        image={<Picture name="hotel-room-double-1" alt="A double-bed room with a padded headboard and floral bed runner" sizes="(min-width: 960px) 520px, 100vw" focus="50% 55%" priority />}
      >
        <div className="phero__cta">
          <Button href="/contact-us?interest=hotel&topic=a%20hotel%20room#enquiry" icon={<BedDouble size={18} aria-hidden />}>
            Enquire for a room
          </Button>
          <WhatsAppButton variant="secondary" message="Namaste! I would like to enquire about a hotel room in Varanasi. Please share availability and rates." fallbackLabel="Contact us" />
        </div>
      </PageHero>

      <section className="section" aria-labelledby="rooms-title">
        <div className="container">
          <SectionHeading id="rooms-title" eyebrow="Our rooms" title="Rooms you can picture yourself in" lead="Twin-bed and double-bed rooms, shown exactly as they are." />
          <div className="rooms">
            {rooms.map((r, i) => (
              <Room key={r.id} r={r} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="features-title">
        <div className="container split">
          <SectionHeading id="features-title" eyebrow="What you’ll find" title="Simple comforts, thoughtfully arranged" lead="Features visible across our room photos. Ask us about anything specific you need." />
          <ul className="checklist">
            {hotelFeatures.map((f) => (
              <li key={f}>
                <Check size={18} aria-hidden /> {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="video-title">
        <div className="container">
          <SectionHeading id="video-title" eyebrow="Take a look" title="Walk through the hotel" lead="Short clips recorded at the property." align="center" />
          <ul ref={vref} className="videos reveal">
            {hotelVideos.map((v) => (
              <li key={v.src}>
                <video controls playsInline preload="none" poster={`/images/${v.poster}-640.webp`} aria-label={v.label}>
                  <source src={v.src} type="video/mp4" />
                  Your browser can’t play this video.
                </video>
                <p>{v.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <FeatureTrio />
        </div>
      </section>
      <FaqBlock items={hotelFaqs} />
      <EnquiryBand title="Planning a stay in Kashi?" body="Share your dates and number of guests and we will confirm rooms and rates." topic="a hotel room" interest="hotel" />
      <ExploreDirectory />
    </>
  )
}
