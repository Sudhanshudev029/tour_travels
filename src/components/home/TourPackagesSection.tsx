import { packageDisclaimer, tourPackages } from '../../data/packages'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
import { TourPackageCard } from '../ui/TourPackageCard'

export function TourPackagesSection() {
  const standard = tourPackages.filter((p) => p.id !== 'custom-group')
  const custom = tourPackages.find((p) => p.id === 'custom-group')
  return (
    <section id="packages" className="section section--sand" aria-labelledby="packages-title">
      <div className="container">
        <SectionHeading
          id="packages-title"
          eyebrow="Tour packages"
          title="Itineraries shaped around your time in Kashi"
          lead="Suggested starting points — every plan is adjusted to your dates, group and pace before anything is confirmed."
        />
        <div className="pkg-grid">
          {standard.map((p, i) => (
            <TourPackageCard key={p.id} pkg={p} index={i} />
          ))}
          {custom && <TourPackageCard pkg={custom} variant="custom" index={standard.length} />}
        </div>
        <p className="fine-print">{packageDisclaimer}</p>
        <div className="section__more">
          <Button href="/packages" variant="dark">
            View all packages
          </Button>
        </div>
      </div>
    </section>
  )
}
