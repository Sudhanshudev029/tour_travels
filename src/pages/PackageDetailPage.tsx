import { Check, Clock } from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { EnquiryBand } from '../components/ui/EnquiryBand'
import { ExploreDirectory } from '../components/ui/ExploreDirectory'
import { FaqBlock } from '../components/ui/FaqBlock'
import { ListingCard } from '../components/ui/ListingCard'
import { PageHero } from '../components/ui/PageHero'
import { Picture } from '../components/ui/Picture'
import { SectionHeading } from '../components/ui/SectionHeading'
import { WhatsAppButton } from '../components/ui/WhatsAppButton'
import { packageDisclaimer, packageFaqs, tourPackages } from '../data/packages'
import { usePageMeta } from '../hooks/usePageMeta'

export default function PackageDetailPage() {
  const { id } = useParams()
  const p = tourPackages.find((x) => x.id === id)
  usePageMeta(p ? `${p.title} — ${p.duration}` : 'Package', p ? `${p.title} (${p.duration}) in Varanasi. ${p.summary}` : 'Varanasi tour packages')
  if (!p) return <Navigate to="/packages" replace />
  const related = tourPackages.filter((x) => x.id !== p.id).slice(0, 3)
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Tour packages', to: '/packages' }, { label: p.title }]}
        title={p.title}
        intro={p.summary}
        chips={[p.duration, p.bestFor, 'Quote on enquiry']}
        image={<Picture name={p.image} alt={`${p.title} — Via Kashi tour package`} sizes="(min-width: 960px) 520px, 100vw" focus={p.focus} priority />}
      >
        <div className="phero__cta">
          <Button href={`/contact-us?interest=package&topic=${encodeURIComponent(p.title)}#enquiry`}>Get a quote</Button>
          <WhatsAppButton variant="secondary" message={`Namaste! I would like a quote for the "${p.title}" (${p.duration}) package. Dates: ___ People: ___`} fallbackLabel="Contact us" />
        </div>
      </PageHero>

      <section className="section">
        <div className="container split split--wide">
          <div>
            <SectionHeading eyebrow="Suggested itinerary" title="Day by day" lead="A starting point — we adjust it to your dates, pace and group." />
            <ol className="timeline">
              {p.itinerary.map((d) => (
                <li key={d.day}>
                  <span className="timeline__day">{d.day}</span>
                  <div>
                    <h3>{d.title}</h3>
                    <ul>
                      {d.items.map((i) => (
                        <li key={i}>
                          <Check size={15} aria-hidden /> {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="panel">
            <h3>
              <Clock size={18} aria-hidden /> At a glance
            </h3>
            <dl className="glance">
              <div><dt>Duration</dt><dd>{p.duration}</dd></div>
              <div><dt>Best for</dt><dd>{p.bestFor}</dd></div>
              <div><dt>Pricing</dt><dd>{p.startingPrice ?? 'Request a quote'}</dd></div>
            </dl>
            <ul className="checklist checklist--col">
              {p.highlights.map((h) => (
                <li key={h}>
                  <Check size={18} aria-hidden /> {h}
                </li>
              ))}
            </ul>
            <p className="fine-print">{packageDisclaimer}</p>
          </aside>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <SectionHeading eyebrow="More packages" title="You might also like" />
          <div className="lgrid">
            {related.map((r, i) => (
              <ListingCard key={r.id} to={`/packages/${r.id}`} category={r.duration} title={r.title} summary={r.summary} image={r.image} focus={r.focus} facts={r.highlights} cta="View itinerary" index={i} />
            ))}
          </div>
        </div>
      </section>
      <FaqBlock items={packageFaqs} />
      <EnquiryBand title={`Interested in ${p.title}?`} body="Share your dates and group size for a tailored quote." topic={p.title} interest="package" />
      <ExploreDirectory />
    </>
  )
}
