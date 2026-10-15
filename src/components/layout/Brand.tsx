import { business } from '../../config/business'

/** Wordmark driven entirely by config; the mark is a rising sun over ghat steps. */
export function Brand({ onDark = false }: { onDark?: boolean }) {
  return (
    <a href="#top" className={`brand${onDark ? ' brand--dark' : ''}`} aria-label={`${business.name} — home`}>
      {business.logoSrc ? (
        <img src={business.logoSrc} alt="" width={40} height={40} />
      ) : (
        <svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="19" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
          <path d="M9 24a11 11 0 0 1 22 0Z" fill="var(--bhagwa)" />
          <path d="M8 28h24M11 32h18M14 36h12" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
      <span className="brand__text">
        <span className="brand__name">{business.name}</span>
        <span className="brand__desc">{business.descriptor}</span>
      </span>
    </a>
  )
}
