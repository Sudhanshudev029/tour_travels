import { Headset, ReceiptText, UsersRound } from 'lucide-react'
import { useReveal } from '../../hooks/useReveal'

const items = [
  { icon: UsersRound, title: 'Local team', body: 'Plans made by people who work in Varanasi every day.' },
  { icon: ReceiptText, title: 'Clear quotes', body: 'Know what is included before you confirm anything.' },
  { icon: Headset, title: 'Direct contact', body: 'Talk to us on WhatsApp, phone or email — no middlemen.' },
]

export function FeatureTrio() {
  const ref = useReveal<HTMLUListElement>()
  return (
    <ul ref={ref} className="trio reveal">
      {items.map(({ icon: Icon, title, body }) => (
        <li key={title}>
          <span className="benefits__icon">
            <Icon size={22} aria-hidden />
          </span>
          <h3>{title}</h3>
          <p>{body}</p>
        </li>
      ))}
    </ul>
  )
}
