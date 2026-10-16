import { BedDouble, Car, Compass, MessageCircle, Ship } from 'lucide-react'
import { Link } from 'react-router-dom'
import { hasWhatsApp } from '../../config/business'
import { buildWhatsAppUrl } from '../../lib/whatsapp'

const links = [
  { label: 'Boat rides', to: '/boat', icon: Ship },
  { label: 'Cabs', to: '/cab', icon: Car },
  { label: 'Hotels', to: '/hotels', icon: BedDouble },
  { label: 'Packages', to: '/packages', icon: Compass },
] as const

/** Quick-jump chips just under the hero (same idea as the reference site's pill row). */
export function QuickLinks() {
  const wa = buildWhatsAppUrl()
  return (
    <nav className="quick" aria-label="Quick links">
      <ul className="container">
        {links.map(({ label, to, icon: Icon }) => (
          <li key={to}>
            <Link to={to}>
              <Icon size={18} aria-hidden /> {label}
            </Link>
          </li>
        ))}
        {hasWhatsApp && wa && (
          <li>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="quick__wa">
              <MessageCircle size={18} aria-hidden /> WhatsApp
            </a>
          </li>
        )}
      </ul>
    </nav>
  )
}
