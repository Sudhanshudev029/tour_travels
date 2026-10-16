/**
 * Cab categories mirror the structure of typical Varanasi travel sites. The FLEET IS A PLACEHOLDER —
 * confirm exactly which vehicles Via Kashi operates and edit/remove entries. Capacities are typical figures.
 * No prices are shown; every vehicle is quoted on enquiry.
 */
export type VehicleIcon = 'car' | 'suv' | 'van' | 'bus'

export interface Vehicle {
  slug: string
  name: string
  category: string
  capacity: string
  icon: VehicleIcon
  bestFor: string
  summary: string
  suits: readonly string[]
}

export const vehicles: readonly Vehicle[] = [
  {
    slug: 'swift-dzire',
    name: 'Swift Dzire',
    category: 'Sedan',
    capacity: 'Up to 4 passengers',
    icon: 'car',
    bestFor: 'Couples and small families',
    summary: 'A compact, economical sedan for airport and station transfers, city sightseeing and short trips with light luggage.',
    suits: ['Airport & railway station transfers', 'Local sightseeing in Varanasi', 'Day trip to Sarnath'],
  },
  {
    slug: 'ertiga',
    name: 'Ertiga',
    category: 'MUV',
    capacity: '6–7 passengers',
    icon: 'suv',
    bestFor: 'Families with luggage',
    summary: 'Roomy seating for a family or small group, with space for bags — a comfortable pick for longer drives.',
    suits: ['Family sightseeing days', 'Kashi–Ayodhya or Kashi–Prayagraj trips', 'Airport transfers with luggage'],
  },
  {
    slug: 'innova-crysta',
    name: 'Innova Crysta',
    category: 'Premium MUV',
    capacity: '6–7 passengers',
    icon: 'suv',
    bestFor: 'Comfort on long journeys',
    summary: 'A premium MUV with extra legroom for elders and long outstation drives between pilgrimage cities.',
    suits: ['Multi-city pilgrimage routes', 'Elders travelling with family', 'Full-day sightseeing'],
  },
  {
    slug: 'tempo-traveller',
    name: 'Tempo Traveller',
    category: 'Tempo Traveller',
    capacity: 'Up to 12 passengers',
    icon: 'van',
    bestFor: 'Medium groups and large families',
    summary: 'One vehicle for the whole group — convenient for temple visits, sightseeing and inter-city transfers.',
    suits: ['Group sightseeing', 'Temple and ghat visits together', 'Outstation group trips'],
  },
  {
    slug: '12-seater-maharaja-tempo-traveller',
    name: '12 Seater Maharaja Tempo Traveller',
    category: 'Tempo Traveller',
    capacity: 'Up to 12 passengers',
    icon: 'van',
    bestFor: 'Groups who want extra comfort',
    summary: 'A more comfortable 12-seater layout for longer journeys. Confirm the exact seating and features when you enquire.',
    suits: ['Long outstation drives', 'Family groups with elders', 'Weddings and small events'],
  },
  {
    slug: '20-seater-tempo-traveller',
    name: '20 Seater Tempo Traveller',
    category: 'Mini coach',
    capacity: 'Up to 20 passengers',
    icon: 'bus',
    bestFor: 'Large groups and tour parties',
    summary: 'A larger vehicle for tour groups, committees and wedding parties travelling together.',
    suits: ['Tour groups and societies', 'Wedding guest transfers', 'Pilgrimage groups'],
  },
  {
    slug: '26-seater-tempo-traveller',
    name: '26 Seater Tempo Traveller',
    category: 'Mini coach',
    capacity: 'Up to 26 passengers',
    icon: 'bus',
    bestFor: 'Very large groups',
    summary: 'The biggest option for large parties who want to stay together through the whole trip.',
    suits: ['Large pilgrimage parties', 'Corporate or institute outings', 'Event transport'],
  },
]

export const cabTrips = [
  { id: 'airport', title: 'Airport transfer', body: 'Pickup and drop between Lal Bahadur Shastri Airport and your hotel in Varanasi. Share your flight number and we plan around it.' },
  { id: 'station', title: 'Railway station transfer', body: 'Meet-and-greet style pickups from Varanasi Junction and other city stations, with help locating your hotel in the old city lanes.' },
  { id: 'local', title: 'Local sightseeing', body: 'Half-day and full-day car hire for temples, ghats, BHU, Ramnagar Fort and Sarnath, with stops planned around your pace.' },
  { id: 'outstation', title: 'Outstation trips', body: 'Comfortable drives to nearby pilgrimage and heritage cities, one-way or round trip.' },
] as const

export const outstationDestinations = ['Ayodhya', 'Prayagraj', 'Vindhyachal', 'Bodh Gaya', 'Lucknow', 'Sarnath'] as const

export const cabFaqs = [
  { id: 'quote', question: 'How do I get a cab quote?', answer: 'Send your pickup point, drop point, date and number of passengers using the enquiry form or WhatsApp. We reply with the vehicle options and the fare.' },
  { id: 'airport', question: 'Can you pick me up from the airport or railway station?', answer: 'Yes. Share your flight or train number and arrival time so the pickup can be planned around any delay.' },
  { id: 'which', question: 'Which vehicle should I choose?', answer: 'A sedan suits up to four people with light luggage. For families or more bags choose an MUV, and for groups of ten or more a Tempo Traveller or larger vehicle.' },
  { id: 'outstation', question: 'Do you run outstation trips to Ayodhya, Prayagraj and other cities?', answer: 'Yes — one-way and round trips can be arranged. Tell us the route and number of days and we will quote accordingly.' },
  { id: 'toll', question: 'Are tolls, parking and driver allowance included?', answer: 'This depends on the trip and is confirmed in your quote. Ask us to list exactly what is and is not included before you book.' },
] as const
