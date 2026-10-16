import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { EnquiryForm } from '../components/home/EnquiryForm'
import { ExploreDirectory } from '../components/ui/ExploreDirectory'
import { PageHero } from '../components/ui/PageHero'
import { business, hasEmail, hasPhone, hasWhatsApp } from '../config/business'
import { mapsUrl, sampleTicket } from '../data/ticket'
import { usePageMeta } from '../hooks/usePageMeta'
import { useReveal } from '../hooks/useReveal'
import { buildWhatsAppUrl } from '../lib/whatsapp'

export default function ContactPage() {
  usePageMeta('Contact Us', `Contact ${business.name}: WhatsApp, email and our enquiry form for hotel stays, boat rides, cabs and tour packages in Varanasi.`)
  const ref = useReveal<HTMLUListElement>()
  return (
    <>
      <PageHero crumbs={[{ label: 'Contact us' }]} title="Contact us" intro="Send an enquiry or message us directly — tell us your dates and group size and we will reply with options and a quote." />
      <section className="section">
        <div className="container contact">
          <ul ref={ref} className="contact__cards reveal">
            {hasWhatsApp && (
              <li>
                <MessageCircle size={22} aria-hidden />
                <div>
                  <h3>WhatsApp</h3>
                  <a href={buildWhatsAppUrl() ?? '#'} target="_blank" rel="noopener noreferrer">
                    {business.whatsappDisplay}
                  </a>
                </div>
              </li>
            )}
            {hasPhone && (
              <li>
                <Phone size={22} aria-hidden />
                <div>
                  <h3>Phone</h3>
                  <a href={`tel:+${business.phone}`}>{business.phoneDisplay}</a>
                </div>
              </li>
            )}
            {hasEmail && (
              <li>
                <Mail size={22} aria-hidden />
                <div>
                  <h3>Email</h3>
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </div>
              </li>
            )}
            <li>
              <MapPin size={22} aria-hidden />
              <div>
                <h3>Boat boarding point</h3>
                <p>{sampleTicket.boardingPoint}</p>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </div>
            </li>
            {business.address && (
              <li>
                <MapPin size={22} aria-hidden />
                <div>
                  <h3>Office</h3>
                  <p>{business.address}</p>
                </div>
              </li>
            )}
          </ul>
          <div id="enquiry" className="contact__form">
            <EnquiryForm />
          </div>
        </div>
      </section>
      <ExploreDirectory />
    </>
  )
}
