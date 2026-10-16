import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { business, hasEmail, hasPhone, hasWhatsApp } from '../../config/business'
import { footerCompanyLinks, footerQuickLinks } from '../../config/navigation'
import { buildWhatsAppUrl } from '../../lib/whatsapp'
import { imageCredits } from '../../data/imageCredits'
import { Brand } from './Brand'

const year = new Date().getFullYear()

export function Footer() {
  const socials = Object.entries(business.social).filter(([, url]) => url)
  const hasContact = hasWhatsApp || hasPhone || hasEmail || business.address

  return (
    <footer className="footer on-dark">
      <div className="container footer__grid">
        <div className="footer__about">
          <Brand onDark />
          <p className="footer__tag">{business.tagline}</p>
          <p>{business.description}</p>
          {socials.length > 0 && (
            <ul className="footer__social">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Quick links">
          <h2 className="footer__h">Quick links</h2>
          <ul>
            {footerQuickLinks.map((i) => (
              <li key={i.to}>
                <Link to={i.to}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="footer__h">Company</h2>
          <ul>
            {footerCompanyLinks.map((i) => (
              <li key={i.to}>
                <Link to={i.to}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer__h">Contact</h2>
          {hasContact ? (
            <ul className="footer__contact">
              {hasWhatsApp && (
                <li>
                  <MessageCircle size={16} aria-hidden />{' '}
                  <a href={buildWhatsAppUrl() ?? '#enquiry'} target="_blank" rel="noopener noreferrer">
                    WhatsApp {business.whatsappDisplay}
                  </a>
                </li>
              )}
              {hasPhone && (
                <li>
                  <Phone size={16} aria-hidden /> <a href={`tel:+${business.phone}`}>{business.phoneDisplay}</a>
                </li>
              )}
              {hasEmail && (
                <li>
                  <Mail size={16} aria-hidden /> <a href={`mailto:${business.email}`}>{business.email}</a>
                </li>
              )}
              {business.address && (
                <li>
                  <MapPin size={16} aria-hidden /> <span>{business.address}</span>
                </li>
              )}
            </ul>
          ) : (
            <p className="footer__muted">Contact details will be published here soon. For now, send an enquiry using our contact form.</p>
          )}
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {business.name}. All rights reserved.
        </p>
        <details className="credits">
          <summary>Photo credits</summary>
          <ul>
            {Object.values(imageCredits).map((c) => (
              <li key={c.source}>
                <a href={c.source} target="_blank" rel="noopener noreferrer">
                  “{c.title.replace(/\.[a-z]+$/i, '')}”
                </a>{' '}
                by {c.author}, <a href={c.licenseUrl || c.source} target="_blank" rel="noopener noreferrer">{c.license}</a>. Resized and cropped.
              </li>
            ))}
          </ul>
        </details>
      </div>
    </footer>
  )
}
