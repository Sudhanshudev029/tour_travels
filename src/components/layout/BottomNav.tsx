import { BedDouble, Car, Compass, House, Ship } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { bottomNav } from '../../config/navigation'

const icons = { home: House, boat: Ship, cab: Car, stay: BedDouble, tours: Compass }

/** App-style tab bar for phones and small tablets: Home · Boat · Cab · Stay · Tours. Hidden on desktop. */
export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Quick navigation">
      <ul>
        {bottomNav.map((item) => {
          const Icon = icons[item.icon]
          return (
            <li key={item.to}>
              <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                <Icon size={24} strokeWidth={1.8} aria-hidden />
                <span>{item.label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
