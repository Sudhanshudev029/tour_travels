import type { ImageName } from './imageMeta'

export interface Service {
  id: string
  title: string
  summary: string
  image: ImageName
  /** Focal point for object-position so crops keep the subject. */
  focus?: string
  /** Page this card opens. */
  to: string
  /** Value preselected in the enquiry form. */
  interest: string
  /** Layout span on the 6-column desktop grid. */
  span: 2 | 3 | 4
}

export const services: readonly Service[] = [
  {
    id: 'tour-packages',
    title: 'Varanasi Tour Packages',
    summary: 'Itineraries from one night to a week — ghats, temples, aarti and Sarnath, paced around your group.',
    image: 'dashashwamedh-ghat-colourful',
    focus: '50% 62%',
    to: '/packages',
    interest: 'Tour package',
    span: 4,
  },
  {
    id: 'boat-rides',
    title: 'Ganga Boat Rides',
    summary: 'See the ghats from the river — at sunrise, or around the evening aarti.',
    image: 'real-boat-m1-day',
    focus: '50% 40%',
    to: '/boat',
    interest: 'Ganga boat ride',
    span: 2,
  },
  {
    id: 'cab-booking',
    title: 'Cab & Local Sightseeing',
    summary: 'Airport and station transfers, day sightseeing and trips to nearby towns.',
    image: 'ramnagar-fort-balcony',
    focus: '50% 42%',
    to: '/cab',
    interest: 'Cab / local sightseeing',
    span: 2,
  },
  {
    id: 'hotels',
    title: 'Hotels & Stay',
    summary: 'Help choosing a stay close to the ghats, the temple lanes or the station.',
    image: 'dashashwamedh-ghat',
    focus: '50% 55%',
    to: '/hotels',
    interest: 'Hotel / accommodation',
    span: 4,
  },
  {
    id: 'temple-tours',
    title: 'Spiritual & Temple Tours',
    summary: 'Guided visits to Kashi’s sacred sites with time to pray, not to rush.',
    image: 'kvt-spire-gate',
    focus: '50% 24%',
    to: '/things-to-do/experiences',
    interest: 'Temple & spiritual tour',
    span: 3,
  },
  {
    id: 'custom-pilgrimage',
    title: 'Customised Pilgrimage Trips',
    summary: 'Kashi with Prayagraj, Ayodhya or Vindhyachal — planned around your route and dates.',
    image: 'prayagraj-sangam',
    focus: '50% 78%',
    to: '/packages/kashi-prayagraj-ayodhya',
    interest: 'Custom pilgrimage (Prayagraj / Ayodhya)',
    span: 3,
  },
]
