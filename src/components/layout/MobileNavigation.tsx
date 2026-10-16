import { ChevronDown, X } from 'lucide-react'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { business, hasEmail, hasPhone } from '../../config/business'
import { footerCompanyLinks, mainNav } from '../../config/navigation'
import { Button } from '../ui/Button'
import { WhatsAppButton } from '../ui/WhatsAppButton'
import { Brand } from './Brand'

interface Props {
  open: boolean
  onClose: () => void
  returnFocusTo: RefObject<HTMLButtonElement | null>
}

const FOCUSABLE = 'a[href], button:not([disabled])'

export function MobileNavigation({ open, onClose, returnFocusTo }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      wasOpen.current = true
      closeRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else if (wasOpen.current) {
      returnFocusTo.current?.focus()
      wasOpen.current = false
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, returnFocusTo])

  useEffect(() => {
    if (!open) return
    const mq = window.matchMedia('(min-width: 1080px)')
    const h = () => mq.matches && onClose()
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [open, onClose])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') return onClose()
    if (e.key !== 'Tab') return
    const items = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
    if (!items?.length) return
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <div className={`drawer${open ? ' is-open' : ''}`} onKeyDown={onKeyDown}>
      <div className="drawer__scrim" onClick={onClose} aria-hidden="true" />
      <div id="mobile-nav" ref={panelRef} className="drawer__panel" role="dialog" aria-modal="true" aria-label="Site menu" inert={!open}>
        <div className="drawer__top">
          <Brand />
          <button ref={closeRef} type="button" className="menu-btn menu-btn--close" aria-label="Close menu" onClick={onClose}>
            <X size={26} aria-hidden />
          </button>
        </div>
        <nav aria-label="Mobile">
          <ul className="drawer__links">
            <li>
              <NavLink to="/" end onClick={onClose}>
                Home
              </NavLink>
            </li>
            {mainNav.map((g) => (
              <li key={g.to}>
                {g.children ? (
                  <>
                    <div className="drawer__row">
                      <NavLink to={g.to} onClick={onClose}>
                        {g.label}
                      </NavLink>
                      <button type="button" aria-label={`Show ${g.label} options`} aria-expanded={expanded === g.to} onClick={() => setExpanded(expanded === g.to ? null : g.to)}>
                        <ChevronDown size={20} aria-hidden />
                      </button>
                    </div>
                    <ul className="drawer__sub" hidden={expanded !== g.to}>
                      {g.children.map((c) => (
                        <li key={c.to}>
                          <Link to={c.to} onClick={onClose}>
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <NavLink to={g.to} onClick={onClose}>
                    {g.label}
                  </NavLink>
                )}
              </li>
            ))}
            {footerCompanyLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} onClick={onClose}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="drawer__foot">
          <Button href="/contact-us#enquiry" block onClick={onClose}>
            Enquire Now
          </Button>
          <WhatsAppButton block variant="outline" label="Chat on WhatsApp" fallbackLabel="Contact us" />
          {(hasPhone || hasEmail) && (
            <p className="drawer__contact">
              {hasPhone && <a href={`tel:+${business.phone}`}>{business.phoneDisplay}</a>}
              {hasEmail && <a href={`mailto:${business.email}`}>{business.email}</a>}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
