import type { ImageName } from './imageMeta'

/**
 * Suggested package types — NOT confirmed products. Replace highlights with the client's real
 * itineraries. Set `startingPrice` (e.g. "₹12,500 per person") only when the client supplies it;
 * until then the card shows "Request a quote".
 */
export interface TourPackage {
  id: string
  title: string
  duration: string
  summary: string
  highlights: readonly string[]
  image: ImageName
  focus?: string
  startingPrice: string | null
  featured?: boolean
}

export const tourPackages: readonly TourPackage[] = [
  {
    id: 'varanasi-1n2d',
    title: 'Varanasi Essentials',
    duration: '1 Night / 2 Days',
    summary: 'A compact first visit to Kashi’s ghats, temple district and the evening riverside.',
    highlights: ['Ghat walk and Ganga Aarti', 'Kashi Vishwanath darshan*', 'Old-city lanes and local food'],
    image: 'ganges-sunrise-ghats',
    focus: '50% 55%',
    startingPrice: null,
  },
  {
    id: 'varanasi-2n3d',
    title: 'Kashi & Sarnath',
    duration: '2 Nights / 3 Days',
    summary: 'Sunrise on the river, the temple, and a half-day at the Buddhist site of Sarnath.',
    highlights: ['Sunrise Ganga boat ride', 'Evening Ganga Aarti', 'Sarnath visit'],
    image: 'ganga-aarti-evening',
    focus: '50% 40%',
    startingPrice: null,
    featured: true,
  },
  {
    id: 'varanasi-3n4d',
    title: 'Kashi Unhurried',
    duration: '3 Nights / 4 Days',
    summary: 'More time for temples, Ramnagar Fort, the BHU campus and the quieter southern ghats.',
    highlights: ['Assi Ghat mornings', 'Ramnagar Fort and museum', 'Free time for personal rituals'],
    image: 'sarnath-dhamek-stupa',
    focus: '50% 50%',
    startingPrice: null,
  },
  {
    id: 'kashi-prayagraj-ayodhya',
    title: 'Kashi · Prayagraj · Ayodhya',
    duration: 'Multi-day pilgrimage',
    summary: 'A three-city circuit with road transfers between Varanasi, Prayagraj and Ayodhya.',
    highlights: ['Sangam at Prayagraj', 'Ayodhya temple visit*', 'Inter-city transport planning'],
    image: 'ayodhya-ram-mandir',
    focus: '50% 40%',
    startingPrice: null,
  },
  {
    id: 'custom-group',
    title: 'Custom Family or Group Yatra',
    duration: 'Your dates, your pace',
    summary: 'Elders travelling, a large family, a temple committee — tell us what matters and we’ll shape the plan.',
    highlights: ['Route and stay tailored to you', 'Vehicles sized to your group', 'Add-ons: boat rides, guides, meals'],
    image: 'prayagraj-sangam',
    focus: '50% 60%',
    startingPrice: null,
  },
]

export const packageDisclaimer =
  '*Temple entry, darshan arrangements and timings are decided by the temple authorities and can change. Itineraries shown are suggestions and are confirmed with you before booking.'
