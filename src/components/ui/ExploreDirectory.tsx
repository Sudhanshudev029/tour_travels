import { Link } from 'react-router-dom'
import { exploreDirectory } from '../../config/navigation'

/** Compact link directory ("Explore Varanasi") for discovery and internal linking. */
export function ExploreDirectory() {
  return (
    <section className="section explore" aria-labelledby="explore-title">
      <div className="container">
        <h2 id="explore-title" className="explore__title">
          Explore Varanasi with Via Kashi
        </h2>
        <div className="explore__grid">
          {exploreDirectory.map((g) => (
            <div key={g.heading}>
              <h3>{g.heading}</h3>
              <ul>
                {g.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
