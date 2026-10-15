import { X } from 'lucide-react'
import { useEffect, useRef, type RefObject } from 'react'
import { business, hasEmail, hasPhone } from '../../config/business'
import { primaryNav } from '../../config/navigation'
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

  // Close if the viewport grows into the desktop layout while the drawer is open.
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
      <div
        id="mobile-nav"
        ref={panelRef}
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
      >
        <div className="drawer__top">
          <Brand />
          <button ref={closeRef} type="button" className="menu-btn menu-btn--close" aria-label="Close menu" onClick={onClose}>
            <X size={26} aria-hidden />
          </button>
        </div>
        <nav aria-label="Mobile">
          <ul className="drawer__links">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={onClose}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="drawer__foot">
          <WhatsAppButton block label="Chat on WhatsApp" fallbackLabel="Send an Enquiry" />
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
