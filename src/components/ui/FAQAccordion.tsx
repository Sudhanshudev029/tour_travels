import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import type { Faq } from '../../data/faqs'

/** Single-open accordion following the WAI-ARIA disclosure pattern (buttons + regions). */
export function FAQAccordion({ items }: { items: readonly Faq[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null)
  const base = useId()
  return (
    <div className="faq">
      {items.map((f) => {
        const isOpen = open === f.id
        const bid = `${base}-b-${f.id}`
        const pid = `${base}-p-${f.id}`
        return (
          <div className="faq__item" data-open={isOpen} key={f.id}>
            <h3 className="faq__q">
              <button id={bid} className="faq__btn" aria-expanded={isOpen} aria-controls={pid} onClick={() => setOpen(isOpen ? null : f.id)}>
                <span>{f.question}</span>
                <Plus size={20} aria-hidden />
              </button>
            </h3>
            <div id={pid} role="region" aria-labelledby={bid} className="faq__panel" hidden={false} inert={!isOpen}>
              <div>
                <p>{f.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
