import { steps } from '../../data/steps'
import { useReveal } from '../../hooks/useReveal'
import { SectionHeading } from '../ui/SectionHeading'

export function HowItWorks() {
  const ref = useReveal<HTMLOListElement>()
  return (
    <section id="how-it-works" className="section section--sand" aria-labelledby="how-title">
      <div className="container">
        <SectionHeading id="how-title" eyebrow="How it works" title="From first idea to confirmed plan" lead="A simple, conversation-led process — no online payment is taken on this website." align="center" />
        <ol ref={ref} className="steps reveal">
          {steps.map((s, i) => (
            <li key={s.id}>
              <span className="steps__num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>
                <span className="visually-hidden">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
