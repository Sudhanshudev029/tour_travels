import { useEffect } from 'react'
import { AttractionsSection } from '../components/home/AttractionsSection'
import { ExperiencesSection } from '../components/home/ExperiencesSection'
import { FAQSection } from '../components/home/FAQSection'
import { FinalCTA } from '../components/home/FinalCTA'
import { HowItWorks } from '../components/home/HowItWorks'
import { RealMoments } from '../components/home/RealMoments'
import { TicketPreview } from '../components/home/TicketPreview'
import { TestimonialsSection } from '../components/home/TestimonialsSection'
import { TourPackagesSection } from '../components/home/TourPackagesSection'
import { ExploreDirectory } from '../components/ui/ExploreDirectory'
import { WeatherWidget } from '../components/ui/WeatherWidget'
import { WhyChooseUs } from '../components/home/WhyChooseUs'

export default function HomeBelowFold() {
  // Deep links (e.g. /#enquiry) can't resolve until this lazy chunk has mounted.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <>
      <TourPackagesSection />
      <AttractionsSection />
      <ExperiencesSection />
      <RealMoments />
      <WhyChooseUs />
      <HowItWorks />
      <TicketPreview />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
      <WeatherWidget />
      <ExploreDirectory />
    </>
  )
}
