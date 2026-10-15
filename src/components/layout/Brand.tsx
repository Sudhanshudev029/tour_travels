import { business } from '../../config/business'

/** Emblem (cropped from the client logo) + live-text wordmark, all driven by config. */
export function Brand({ onDark = false }: { onDark?: boolean }) {
  const { logoMark, shortName, descriptor, name } = business
  return (
    <a href="#top" className={`brand${onDark ? ' brand--dark' : ''}`} aria-label={`${name} — home`}>
      <img className="brand__mark" src={logoMark.src} srcSet={logoMark.srcSet} sizes="48px" alt="" width={48} height={48} decoding="async" />
      <span className="brand__text">
        <span className="brand__name">{shortName}</span>
        <span className="brand__desc">{descriptor}</span>
      </span>
    </a>
  )
}
