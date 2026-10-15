import { Menu } from 'lucide-react'
import { useRef, useState } from 'react'
import { primaryNav } from '../../config/navigation'
import { useScrolled } from '../../hooks/useScrolled'
import { WhatsAppButton } from '../ui/WhatsAppButton'
import { Brand } from './Brand'
import { MobileNavigation } from './MobileNavigation'

export function Header() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <header className={`site-header${scrolled ? ' is-solid' : ''}`}>
        <div className="container site-header__bar">
          <Brand onDark={!scrolled} />
          <nav className="desktop-nav" aria-label="Primary">
            <ul>
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="site-header__actions">
            <span className="site-header__cta">
              <WhatsAppButton size="sm" label="Chat on WhatsApp" fallbackLabel="Send Enquiry" />
            </span>
            <button
              ref={toggleRef}
              type="button"
              className="menu-btn"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(true)}
            >
              <Menu size={26} aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <MobileNavigation open={open} onClose={() => setOpen(false)} returnFocusTo={toggleRef} />
    </>
  )
}
