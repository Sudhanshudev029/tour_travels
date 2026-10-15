import { business, hasWhatsApp } from '../../config/business'
import { buildWhatsAppUrl } from '../../lib/whatsapp'

/** Round icon-only WhatsApp shortcut, bottom-right (same pattern as the reference site). Opens WhatsApp directly. */
export function FloatingWhatsApp() {
  const url = buildWhatsAppUrl()
  if (!hasWhatsApp || !url) return null
  return (
    <a
      className="wa-float"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${business.shortName} on WhatsApp`}
    >
      <svg viewBox="0 0 64 64" width="52" height="52" aria-hidden="true" focusable="false">
        <circle cx="32" cy="32" r="32" fill="#25d366" />
        <path d="M32 11.5a20.5 20.5 0 0 0-17.4 31.3L11.5 52.5l10.1-2.7A20.5 20.5 0 1 0 32 11.5z" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinejoin="round" />
        <path
          transform="translate(20 20)"
          fill="#fff"
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        />
      </svg>
    </a>
  )
}
