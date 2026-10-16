import { Suspense, lazy } from 'react'
import { HeroSection } from '../components/home/HeroSection'
import { QuickLinks } from '../components/home/QuickLinks'
import { ServiceGrid } from '../components/home/ServiceGrid'
import { usePageMeta } from '../hooks/usePageMeta'

// Below-the-fold sections are split into their own chunk and loaded after first paint.
const BelowFold = lazy(() => import('./HomeBelowFold'))

export default function HomePage() {
  usePageMeta(
    'Via Kashi Tour & Travels — Varanasi Tour Packages, Boat Rides, Stays & Cabs',
    'Via Kashi Tour & Travels — more than a destination. Tour packages, Ganga boat rides, hotels and stays, cabs and pilgrimage routes to Prayagraj and Ayodhya from Varanasi. Send an enquiry for a tailored itinerary.',
  )
  return (
    <>
      <HeroSection />
      <QuickLinks />
      <ServiceGrid />
      <Suspense fallback={null}>
        <BelowFold />
      </Suspense>
    </>
  )
}
