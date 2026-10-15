import { CalendarCheck, Car, MapPinned, MessagesSquare, Route, Users } from 'lucide-react'
import { benefits } from '../../data/whyUs'
import { useReveal } from '../../hooks/useReveal'
import { SectionHeading } from '../ui/SectionHeading'

const icons = { map: MapPinned, route: Route, calendar: CalendarCheck, message: MessagesSquare, family: Users, car: Car }

export function WhyChooseUs() {
  const ref = useReveal<HTMLUListElement>()
  return (
    <section id="why-us" className="section" aria-labelledby="why-title">
      <div className="container">
        <SectionHeading id="why-title" eyebrow="Why travel with us" title="Travel planning that feels personal" lead="How we approach every Varanasi trip." align="center" />
        <ul ref={ref} className="benefits reveal">
          {benefits.map((b) => {
            const Icon = icons[b.icon]
            return (
              <li key={b.id}>
                <span className="benefits__icon">
                  <Icon size={22} aria-hidden />
                </span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
