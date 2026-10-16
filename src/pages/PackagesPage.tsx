import { ExploreDirectory } from '../components/ui/ExploreDirectory'
import { CompareTable } from '../components/ui/CompareTable'
import { EnquiryBand } from '../components/ui/EnquiryBand'
import { FaqBlock } from '../components/ui/FaqBlock'
import { FeatureTrio } from '../components/ui/FeatureTrio'
import { ListingCard } from '../components/ui/ListingCard'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { packageDisclaimer, packageFaqs, tourPackages } from '../data/packages'
import { usePageMeta } from '../hooks/usePageMeta'

export default function PackagesPage() {
  usePageMeta('Varanasi Tour Packages', 'Varanasi tour packages from 1 night to a multi-city pilgrimage: ghats, Ganga Aarti, boat rides, Sarnath, Prayagraj and Ayodhya. Customised family and group trips — send an enquiry for a quote.')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Tour packages' }]}
        title="Varanasi tour packages"
        intro="Suggested itineraries from a single night to a multi-city pilgrimage. Every plan is adjusted to your dates, group and pace before anything is confirmed."
        chips={[`${tourPackages.length} package types`, 'Customisable', 'Quote on enquiry']}
      />
      <section className="section">
        <div className="container">
          <div className="lgrid">
            {tourPackages.map((p, i) => (
              <ListingCard
                key={p.id}
                to={`/packages/${p.id}`}
                category={p.duration}
                title={p.title}
                summary={p.summary}
                image={p.image}
                focus={p.focus}
                badge={p.featured ? 'Suggested for first visits' : undefined}
                facts={p.highlights}
                cta="View itinerary"
                index={i}
              />
            ))}
          </div>
          <p className="fine-print">{packageDisclaimer}</p>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="pk-compare">
        <div className="container">
          <SectionHeading id="pk-compare" eyebrow="Compare packages" title="Choose by duration" lead="Pricing varies with hotel category, group size and season — request a quote for your dates." />
          <CompareTable
            caption="Package comparison"
            columns={['Package', 'Duration', 'Best for']}
            rows={tourPackages.map((p) => ({ cells: [p.title, p.duration, p.bestFor], to: `/packages/${p.id}`, cta: 'View itinerary' }))}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FeatureTrio />
        </div>
      </section>
      <FaqBlock items={packageFaqs} />
      <EnquiryBand title="Plan your Kashi trip" body="Tell us your dates, group size and interests — we will shape an itinerary and quote." topic="a tour package" interest="package" />
      <ExploreDirectory />
    </>
  )
}
