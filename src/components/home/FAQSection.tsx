import { faqs } from '../../data/faqs'
import { SectionHeading } from '../ui/SectionHeading'
import { FAQAccordion } from '../ui/FAQAccordion'

export function FAQSection() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="container faq-wrap">
        <SectionHeading id="faq-title" eyebrow="Good to know" title="Frequently asked questions" lead="Can’t find your answer? Ask us in the enquiry form below." />
        <FAQAccordion items={faqs} />
      </div>
    </section>
  )
}
