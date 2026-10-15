import { Quote } from 'lucide-react'
import { business } from '../../config/business'
import { testimonials } from '../../data/testimonials'
import { SectionHeading } from '../ui/SectionHeading'

/** Renders nothing until real reviews exist AND config enables it — never shows fabricated reviews. */
export function TestimonialsSection() {
  if (!business.showTestimonials || testimonials.length === 0) return null
  return (
    <section id="reviews" className="section" aria-labelledby="reviews-title">
      <div className="container">
        <SectionHeading id="reviews-title" eyebrow="Traveller words" title="What our guests say" align="center" />
        <ul className="reviews">
          {testimonials.map((t) => (
            <li key={t.id}>
              <Quote size={22} aria-hidden />
              <blockquote>{t.quote}</blockquote>
              <p>
                <strong>{t.name}</strong>, {t.from}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
