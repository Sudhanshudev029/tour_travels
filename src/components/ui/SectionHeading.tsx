import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

interface Props {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({ eyebrow, title, lead, align = 'left', id }: Props) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`sh reveal${align === 'center' ? ' sh--center' : ''}`}>
      <p className="sh__eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  )
}
