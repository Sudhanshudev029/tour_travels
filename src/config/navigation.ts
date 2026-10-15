/**
 * Navigation map. Phase 1 is homepage-only, so every item points to a homepage section.
 * `futureRoute` records the dedicated page each item will move to in later phases —
 * switch `href` to it once that page exists.
 */
export interface NavItem {
  label: string
  href: string
  futureRoute?: string
}

export const primaryNav: readonly NavItem[] = [
  { label: 'Home', href: '#top' },
  { label: 'Tour Packages', href: '#packages', futureRoute: '/packages' },
  { label: 'Boat Rides', href: '#boat-rides', futureRoute: '/boat-rides' },
  { label: 'Cab Booking', href: '#cab-booking', futureRoute: '/cabs' },
  { label: 'Places to Visit', href: '#places', futureRoute: '/places' },
  { label: 'About Us', href: '#why-us', futureRoute: '/about' },
  { label: 'Contact', href: '#enquiry', futureRoute: '/contact' },
]

export const footerServiceLinks: readonly NavItem[] = [
  { label: 'Tour Packages', href: '#packages' },
  { label: 'Ganga Boat Rides', href: '#boat-rides' },
  { label: 'Cab & Sightseeing', href: '#cab-booking' },
  { label: 'Hotels & Stay', href: '#hotels' },
  { label: 'Pilgrimage Trips', href: '#custom-pilgrimage' },
]
