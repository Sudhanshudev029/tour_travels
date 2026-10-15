import { Suspense, lazy } from 'react'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { HeroSection } from '../components/home/HeroSection'
import { ServiceGrid } from '../components/home/ServiceGrid'

// Below-the-fold sections are split into their own chunk and loaded after first paint.
const BelowFold = lazy(() => import('./HomeBelowFold'))

export function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <HeroSection />
        <ServiceGrid />
        <Suspense fallback={null}>
          <BelowFold />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
