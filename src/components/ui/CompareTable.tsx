import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'

interface Props {
  caption: string
  columns: readonly string[]
  rows: readonly { cells: readonly string[]; to: string; cta: string }[]
}

/** Comparison table that turns into stacked cards on phones. Intentionally has no price column — quotes come on enquiry. */
export function CompareTable({ caption, columns, rows }: Props) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="ctable reveal">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
            <th scope="col">
              <span className="visually-hidden">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.to}>
              {r.cells.map((cell, i) => (
                <td key={i} data-label={columns[i]}>
                  {cell}
                </td>
              ))}
              <td className="ctable__act">
                <Link to={r.to}>{r.cta} →</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
