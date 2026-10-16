import { useReveal } from '../../hooks/useReveal'
import { Button } from './Button'
import { WhatsAppButton } from './WhatsAppButton'

interface Props {
  title?: string
  body?: string
  /** What the visitor is asking about — prefilled into the contact form and the WhatsApp message. */
  topic?: string
  interest?: 'package' | 'boat' | 'cab' | 'hotel' | 'temple' | 'pilgrimage'
}

/** "Need help planning your trip?" call-to-action used at the foot of content pages. */
export function EnquiryBand({ title = 'Need help planning your trip?', body = 'Tell us your dates and group size — we will reply with options and a quote.', topic, interest }: Props) {
  const ref = useReveal<HTMLDivElement>()
  const qs = new URLSearchParams()
  if (interest) qs.set('interest', interest)
  if (topic) qs.set('topic', topic)
  const href = `/contact-us${qs.toString() ? `?${qs}` : ''}#enquiry`
  const message = topic ? `Namaste! I would like to know about ${topic} with Via Kashi Tour & Travels. Please share the details and a quote.` : undefined
  return (
    <section className="band on-dark" aria-label="Enquire">
      <div ref={ref} className="container band__inner reveal">
        <div>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <div className="band__actions">
          <Button href={href}>Send an enquiry</Button>
          <WhatsAppButton variant="secondary" message={message} fallbackLabel="Contact us" />
        </div>
      </div>
    </section>
  )
}
