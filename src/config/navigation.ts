import { boats } from '../data/boats'
import { vehicles } from '../data/cab'
import { todoTabs } from '../data/thingsToDo'

/**
 * Site navigation. Structure follows the reference travel site: Hotels, Cab ▾, Boat ▾, Packages, Things to do ▾,
 * plus an app-style bottom bar on phones (Home, Boat, Cab, Stay, Tours).
 */
export interface NavLinkItem {
  label: string
  to: string
}
export interface NavGroup extends NavLinkItem {
  children?: readonly NavLinkItem[]
  allLabel?: string
}

export const mainNav: readonly NavGroup[] = [
  { label: 'Hotels', to: '/hotels' },
  { label: 'Cab', to: '/cab', allLabel: 'All cabs', children: vehicles.map((v) => ({ label: v.name, to: `/cab/${v.slug}` })) },
  { label: 'Boat', to: '/boat', allLabel: 'All boats', children: boats.map((b) => ({ label: b.name, to: `/boat/${b.slug}` })) },
  { label: 'Packages', to: '/packages' },
  {
    label: 'Things to do',
    to: '/things-to-do',
    allLabel: 'All things to do',
    children: todoTabs.filter((t) => t.slug).map((t) => ({ label: t.label, to: t.to })),
  },
]

export const bottomNav = [
  { label: 'Home', to: '/', icon: 'home' },
  { label: 'Boat', to: '/boat', icon: 'boat' },
  { label: 'Cab', to: '/cab', icon: 'cab' },
  { label: 'Stay', to: '/hotels', icon: 'stay' },
  { label: 'Tours', to: '/packages', icon: 'tours' },
] as const

export const footerQuickLinks: readonly NavLinkItem[] = [
  { label: 'Tour Packages', to: '/packages' },
  { label: 'Boat Rides', to: '/boat' },
  { label: 'Hotels', to: '/hotels' },
  { label: 'Cab Booking', to: '/cab' },
  { label: 'Things to do', to: '/things-to-do' },
]

export const footerCompanyLinks: readonly NavLinkItem[] = [
  { label: 'About Us', to: '/about-us' },
  { label: 'Contact Us', to: '/contact-us' },
]

/** "Explore Varanasi" directory shown near the bottom of content pages. */
export const exploreDirectory: readonly { heading: string; links: readonly NavLinkItem[] }[] = [
  { heading: 'Stay', links: [{ label: 'Hotels in Varanasi', to: '/hotels' }] },
  { heading: 'Cab', links: [{ label: 'All cabs', to: '/cab' }, ...vehicles.slice(0, 4).map((v) => ({ label: v.name, to: `/cab/${v.slug}` }))] },
  { heading: 'Boat', links: [{ label: 'All boats', to: '/boat' }, ...boats.map((b) => ({ label: b.name, to: `/boat/${b.slug}` }))] },
  { heading: 'Packages', links: [{ label: 'All packages', to: '/packages' }, { label: 'Kashi–Prayagraj–Ayodhya', to: '/packages/kashi-prayagraj-ayodhya' }] },
  { heading: 'Things to do', links: todoTabs.map((t) => ({ label: t.label, to: t.to })) },
]
