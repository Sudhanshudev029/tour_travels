import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export interface Crumb {
  label: string
  to?: string
}

interface Props {
  crumbs: readonly Crumb[]
  title: ReactNode
  intro?: ReactNode
  /** Small trust/info chips shown under the intro. */
  chips?: readonly string[]
  children?: ReactNode
  image?: ReactNode
}

/** Inner-page header: breadcrumb, H1, intro and chips. Sits below the fixed site header. */
export function PageHero({ crumbs, title, intro, chips, children, image }: Props) {
  return (
    <section className="phero on-dark">
      <div className="container phero__inner">
        <div className="phero__text">
          <nav aria-label="Breadcrumb" className="crumbs">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.label}>
                  <ChevronRight size={14} aria-hidden />
                  {c.to && i < crumbs.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
          <h1>{title}</h1>
          {intro && <p className="phero__intro">{intro}</p>}
          {chips && (
            <ul className="chips">
              {chips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          )}
          {children}
        </div>
        {image && <div className="phero__media">{image}</div>}
      </div>
    </section>
  )
}
