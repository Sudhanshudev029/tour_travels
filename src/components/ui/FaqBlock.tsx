import { FAQAccordion } from './FAQAccordion'
import { SectionHeading } from './SectionHeading'

export function FaqBlock({ title = 'Frequently asked questions', items }: { title?: string; items: readonly { id: string; question: string; answer: string }[] }) {
  return (
    <section className="section" aria-labelledby="faq-heading">
      <div className="container faq-wrap">
        <SectionHeading id="faq-heading" eyebrow="Good to know" title={title} lead="Can’t find your answer? Send us an enquiry and we will reply." />
        <FAQAccordion items={items} />
      </div>
    </section>
  )
}
