import { NavLink } from 'react-router-dom'

export interface Tab {
  label: string
  to: string
}

/** Category chips linking to sibling pages (e.g. All boats · Motor boat · …). */
export function FilterTabs({ tabs, label }: { tabs: readonly Tab[]; label: string }) {
  return (
    <nav aria-label={label} className="tabs">
      <ul>
        {tabs.map((t) => (
          <li key={t.to}>
            <NavLink to={t.to} end className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
              {t.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
