import type { ImageName } from './imageMeta'

export interface Service {
  id: string
  title: string
  summary: string
  image: ImageName
  /** Focal point for object-position so crops keep the subject. */
  focus?: string
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
    image: 'varanasi-ghats-panorama',
    focus: '50% 40%',
    interest: 'Tour package',
    span: 4,
  },
  {
    id: 'boat-rides',
    title: 'Ganga Boat Rides',
    summary: 'See the ghats from the river — at sunrise, or around the evening aarti.',
    image: 'ganga-boat-ride',
    focus: '50% 60%',
    interest: 'Ganga boat ride',
    span: 2,
  },
  {
    id: 'cab-booking',
    title: 'Cab & Local Sightseeing',
    summary: 'Airport and station transfers, day sightseeing and trips to nearby towns.',
    image: 'ramnagar-fort',
    focus: '40% 50%',
    interest: 'Cab / local sightseeing',
    span: 2,
  },
  {
    id: 'hotels',
    title: 'Hotels & Stay',
    summary: 'Help choosing a stay close to the ghats, the temple lanes or the station.',
    image: 'ganges-sunrise-ghats',
    focus: '50% 50%',
    interest: 'Hotel / accommodation',
    span: 4,
  },
  {
    id: 'temple-tours',
    title: 'Spiritual & Temple Tours',
    summary: 'Guided visits to Kashi’s sacred sites with time to pray, not to rush.',
    image: 'kashi-vishwanath-temple',
    focus: '50% 45%',
    interest: 'Temple & spiritual tour',
    span: 3,
  },
  {
    id: 'custom-pilgrimage',
    title: 'Customised Pilgrimage Trips',
    summary: 'Kashi with Prayagraj, Ayodhya or Vindhyachal — planned around your route and dates.',
    image: 'prayagraj-sangam',
    focus: '50% 60%',
    interest: 'Custom pilgrimage (Prayagraj / Ayodhya)',
    span: 3,
  },
]
