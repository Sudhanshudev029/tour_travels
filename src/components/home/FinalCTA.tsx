import { useReveal } from '../../hooks/useReveal'
import { Picture } from '../ui/Picture'
import { WhatsAppButton } from '../ui/WhatsAppButton'
import { EnquiryForm } from './EnquiryForm'

export function FinalCTA() {
  const ref = useReveal<HTMLDivElement>()
  const formRef = useReveal<HTMLDivElement>()
  return (
    <section id="enquiry" className="cta on-dark" aria-labelledby="cta-title">
      <div className="cta__bg media" aria-hidden="true">
        <Picture name="lalita-ghat-night" alt="" sizes="100vw" focus="50% 50%" />
      </div>
      <div className="container cta__grid">
        <div ref={ref} className="cta__copy reveal">
          <p className="sh__eyebrow">Start planning</p>
          <h2 id="cta-title">Your journey to Kashi begins here</h2>
          <p>
            Tell us when you plan to travel, who is coming and what matters most. We’ll come back with an itinerary and a quote that fits.
          </p>
          <div className="cta__actions">
            <WhatsAppButton />
          </div>
        </div>
        <div ref={formRef} className="cta__form reveal" style={{ ['--d' as string]: '120ms' }}>
          <EnquiryForm />
        </div>
      </div>
    </section>
  )
}
