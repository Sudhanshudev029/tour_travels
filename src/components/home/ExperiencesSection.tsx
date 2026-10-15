import { Map as MapIcon, Route, UtensilsCrossed } from 'lucide-react'
import { featureExperiences, smallExperiences } from '../../data/experiences'
import { useReveal } from '../../hooks/useReveal'
import { Picture } from '../ui/Picture'
import { SectionHeading } from '../ui/SectionHeading'

const icons = { temple: MapIcon, food: UtensilsCrossed, route: Route }

function Row({ e, flip }: { e: (typeof featureExperiences)[number]; flip: boolean }) {
  const ref = useReveal<HTMLElement>()
  return (
    <article ref={ref} className={`xp reveal${flip ? ' xp--flip' : ''}`}>
      <div className="xp__media media">
        <Picture name={e.image} alt={e.alt} sizes="(min-width: 900px) 55vw, 100vw" focus={e.focus} />
      </div>
      <div className="xp__text">
        <p className="xp__eyebrow">{e.eyebrow}</p>
        <h3>{e.title}</h3>
        <p>{e.body}</p>
      </div>
    </article>
  )
}

export function ExperiencesSection() {
  return (
    <section id="experiences" className="section section--dark on-dark" aria-labelledby="xp-title">
      <div className="container">
        <SectionHeading
          id="xp-title"
          eyebrow="Signature experiences"
          title="Moments that make Kashi unlike anywhere else"
          lead="Some of what we can weave into your trip — each one added only if it suits you."
        />
        <div className="xp-list">
          {featureExperiences.map((e, i) => (
            <Row key={e.id} e={e} flip={i % 2 === 1} />
          ))}
        </div>
        <ul className="xp-small">
          {smallExperiences.map((s) => {
            const Icon = icons[s.icon]
            return (
              <li key={s.id}>
                <Icon size={22} aria-hidden />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
