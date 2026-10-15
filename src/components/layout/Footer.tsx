import { Mail, MapPin, Phone } from 'lucide-react'
import { business, hasEmail, hasPhone } from '../../config/business'
import { footerServiceLinks, primaryNav } from '../../config/navigation'
import { imageCredits } from '../../data/imageCredits'
import { Brand } from './Brand'

const year = new Date().getFullYear()

export function Footer() {
  const socials = Object.entries(business.social).filter(([, url]) => url)
  const hasContact = hasPhone || hasEmail || business.address

  return (
    <footer className="footer on-dark">
      <div className="container footer__grid">
        <div className="footer__about">
          <Brand onDark />
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

        <nav aria-label="Footer navigation">
          <h2 className="footer__h">Explore</h2>
          <ul>
            {primaryNav.map((i) => (
              <li key={i.href}>
                <a href={i.href}>{i.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="footer__h">Services</h2>
          <ul>
            {footerServiceLinks.map((i) => (
              <li key={i.href}>
                <a href={i.href}>{i.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer__h">Contact</h2>
          {hasContact ? (
            <ul className="footer__contact">
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
            <p className="footer__muted">Contact details will be published here soon. For now, send an enquiry using the form on this page.</p>
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
