import { ChevronDown, Menu } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { mainNav, type NavGroup } from '../../config/navigation'
import { useScrolled } from '../../hooks/useScrolled'
import { Button } from '../ui/Button'
import { WhatsAppButton } from '../ui/WhatsAppButton'
import { Brand } from './Brand'
import { MobileNavigation } from './MobileNavigation'

const navClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'is-active' : undefined)

function DropdownItem({ group, open, onToggle, onClose }: { group: NavGroup; open: boolean; onToggle: () => void; onClose: () => void }) {
  const id = `menu-${group.label.toLowerCase().replace(/\W+/g, '-')}`
  return (
    <li className={`nav-item${open ? ' is-open' : ''}`} onMouseEnter={() => !open && onToggle()} onMouseLeave={() => open && onClose()}>
      <NavLink to={group.to} className={navClass} onClick={onClose}>
        {group.label}
      </NavLink>
      <button type="button" className="nav-item__caret" aria-label={`${group.label} menu`} aria-expanded={open} aria-controls={id} onClick={onToggle}>
        <ChevronDown size={15} aria-hidden />
      </button>
      <ul id={id} className="nav-menu" hidden={!open}>
        <li className="nav-menu__all">
          <Link to={group.to} onClick={onClose}>
            {group.allLabel ?? `All ${group.label}`}
          </Link>
        </li>
        {group.children?.map((c) => (
          <li key={c.to}>
            <Link to={c.to} onClick={onClose}>
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

export function Header() {
  const scrolled = useScrolled()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const solid = scrolled || !isHome
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState<string | null>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMenu(null)
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menu) return
    const onDown = (e: PointerEvent) => !navRef.current?.contains(e.target as Node) && setMenu(null)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(null)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menu])

  return (
    <>
      <header className={`site-header${solid ? ' is-solid' : ''}`}>
        <div className="container site-header__bar">
          <Brand onDark={!solid} />
          <nav ref={navRef} className="desktop-nav" aria-label="Primary">
            <ul>
              {mainNav.map((g) =>
                g.children ? (
                  <DropdownItem key={g.to} group={g} open={menu === g.to} onToggle={() => setMenu(menu === g.to ? null : g.to)} onClose={() => setMenu(null)} />
                ) : (
                  <li key={g.to}>
                    <NavLink to={g.to} className={navClass}>
                      {g.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className="site-header__actions">
            <span className="site-header__cta">
              <Button href="/contact-us#enquiry" size="sm">
                Enquire Now
              </Button>
              <WhatsAppButton size="sm" variant={solid ? 'dark' : 'secondary'} label="WhatsApp" fallbackLabel="Contact" />
            </span>
            <button ref={toggleRef} type="button" className="menu-btn" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(true)}>
              <Menu size={26} aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <MobileNavigation open={open} onClose={() => setOpen(false)} returnFocusTo={toggleRef} />
    </>
  )
}
