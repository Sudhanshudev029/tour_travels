import { Check, MapPin, QrCode } from 'lucide-react'
import { mapsUrl, sampleTicket as t, ticketHighlights } from '../../data/ticket'
import { useReveal } from '../../hooks/useReveal'
import { Button } from '../ui/Button'
import { Picture } from '../ui/Picture'
import { SectionHeading } from '../ui/SectionHeading'
import { SampleQr } from './SampleQr'

const fields: [string, string][] = [
  ['Ticket ID', t.ref],
  ['Contact number', t.contact],
  ['Booking date', t.booking],
  ['Persons', t.persons],
]

/** Illustrative e-ticket mirroring the client's real pass. All personal fields are placeholders. */
export function TicketPreview() {
  const copyRef = useReveal<HTMLDivElement>()
  const cardRef = useReveal<HTMLDivElement>()
  return (
    <section id="ticket" className="section section--dark on-dark ticket-sec" aria-labelledby="ticket-title">
      <div className="container ticket-sec__grid">
        <div ref={copyRef} className="ticket-sec__copy reveal">
          <SectionHeading
            id="ticket-title"
            eyebrow="Your boat ticket"
            title="Know exactly what you’ll receive"
            lead="Once your boat ride is confirmed you get a digital e-ticket with a unique QR code. Show it at the entry gate with a valid ID — that’s it."
          />
          <ul className="ticket-sec__list">
            {ticketHighlights.map((h) => (
              <li key={h.title}>
                <Check size={18} aria-hidden />
                <span>
                  <strong>{h.title}</strong> — {h.body}
                </span>
              </li>
            ))}
          </ul>
          <p className="ticket-sec__note">
            Sample ticket for illustration. The name, phone number, ticket ID and QR code shown are placeholders and won’t scan.
          </p>
        </div>

        <div ref={cardRef} className="reveal ticket-sec__card" style={{ ['--d' as string]: '120ms' }}>
          <article className="tk" data-tilt aria-label="Sample Via Kashi e-ticket">
            <header className="tk__top">
              <span><i aria-hidden="true" /> Official e-ticket &amp; entry pass · Sample</span>
              <span>Ref: {t.ref}</span>
            </header>
            <div className="tk__banner media">
              <Picture name="ticket-banner" alt="Via Kashi Tours Dev Deepawali boat ride banner showing a decorated cruise boat and the lit-up ghats of Varanasi" sizes="(min-width: 960px) 560px, 100vw" />
            </div>

            <div className="tk__body">
              <div className="tk__head">
                <div>
                  <p className="tk__kicker">Organisation &amp; date</p>
                  <h3>{t.org} — {t.title}</h3>
                </div>
                <span className="tk__badge">✓ Confirmed pass</span>
              </div>

              <div className="tk__panel">
                <p className="tk__kicker">Attendee &amp; pass details</p>
                <div className="tk__who">
                  <div>
                    <p className="tk__label">Attendee name</p>
                    <p className="tk__name">{t.attendee}</p>
                  </div>
                  <div className="tk__cat">
                    <p className="tk__label">Pass category</p>
                    <p>{t.category}</p>
                  </div>
                </div>
                <dl className="tk__grid">
                  {fields.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="tk__tear" aria-hidden="true"><span>Show this section at entry gate</span></div>

            <div className="tk__entry">
              <div className="tk__qr">
                <p><QrCode size={15} aria-hidden /> Show at entry!</p>
                <div className="tk__qrbox">
                  <SampleQr />
                  <span className="tk__stamp" aria-hidden="true">Sample</span>
                </div>
                <code>{t.ref}</code>
                <small>Scan at entrance gate · Valid for one entry</small>
              </div>

              <div className="tk__info">
                <div className="tk__loc">
                  <p className="tk__kicker">Location</p>
                  <h4>{t.location}</h4>
                  <p>{t.boardingPoint}</p>
                  <Button href={mapsUrl} size="sm" variant="dark" icon={<MapPin size={15} aria-hidden />}>
                    Open venue in Google Maps
                  </Button>
                </div>
                <div className="tk__rules">
                  <p className="tk__kicker">Entry guidelines</p>
                  <ul>
                    {t.guidelines.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
