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
  /** Who the package suits (shown on the comparison table and detail page). */
  bestFor: string
  /** Suggested day-by-day plan — an editable starting point, confirmed with the guest. */
  itinerary: readonly { day: string; title: string; items: readonly string[] }[]
}

export const tourPackages: readonly TourPackage[] = [
  {
    id: 'varanasi-1n2d',
    title: 'Varanasi Essentials',
    duration: '1 Night / 2 Days',
    summary: 'A compact first visit to Kashi’s ghats, temple district and the evening riverside.',
    highlights: ['Ghat walk and Ganga Aarti', 'Kashi Vishwanath darshan*', 'Old-city lanes and local food'],
    image: 'ganga-golden-hour-boat',
    focus: '50% 62%',
    bestFor: 'First-time visitors with limited time',
    itinerary: [
      { day: 'Day 1', title: 'Arrival, ghats & Ganga Aarti', items: ['Pickup from airport or station and hotel check-in', 'Evening walk along the ghats', 'Ganga Aarti viewing'] },
      { day: 'Day 2', title: 'Temple darshan & departure', items: ['Early morning boat ride (optional)', 'Kashi Vishwanath darshan*', 'Drop to airport or station'] },
    ],
    startingPrice: null,
  },
  {
    id: 'varanasi-2n3d',
    title: 'Kashi & Sarnath',
    duration: '2 Nights / 3 Days',
    summary: 'Sunrise on the river, the temple, and a half-day at the Buddhist site of Sarnath.',
    highlights: ['Sunrise Ganga boat ride', 'Evening Ganga Aarti', 'Sarnath visit'],
    image: 'real-boat-morning',
    focus: '50% 50%',
    bestFor: 'Families who want sunrise, aarti and Sarnath',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & evening aarti', items: ['Pickup and hotel check-in', 'Rest and local food stop', 'Ganga Aarti in the evening'] },
      { day: 'Day 2', title: 'Sunrise boat ride & temples', items: ['Sunrise boat ride along the ghats', 'Kashi Vishwanath darshan*', 'Old-city walk and shopping'] },
      { day: 'Day 3', title: 'Sarnath & departure', items: ['Half-day visit to Sarnath', 'Drop to airport or station'] },
    ],
    startingPrice: null,
    featured: true,
  },
  {
    id: 'varanasi-3n4d',
    title: 'Kashi Unhurried',
    duration: '3 Nights / 4 Days',
    summary: 'More time for temples, Ramnagar Fort, the BHU campus and the quieter southern ghats.',
    highlights: ['Assi Ghat mornings', 'Ramnagar Fort and museum', 'Free time for personal rituals'],
    image: 'real-boat-decorated',
    focus: '50% 45%',
    bestFor: 'Travellers who prefer an unhurried pace',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & settling in', items: ['Pickup and check-in', 'Easy evening at the ghats'] },
      { day: 'Day 2', title: 'Temples & Ganga Aarti', items: ['Morning at Assi Ghat', 'Kashi Vishwanath darshan*', 'Evening Ganga Aarti'] },
      { day: 'Day 3', title: 'Sarnath & Ramnagar', items: ['Sarnath in the morning', 'Ramnagar Fort and museum in the afternoon'] },
      { day: 'Day 4', title: 'Free morning & departure', items: ['Time for personal rituals or shopping', 'Drop to airport or station'] },
    ],
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
    bestFor: 'Pilgrims covering three holy cities',
    itinerary: [
      { day: 'Day 1', title: 'Varanasi', items: ['Arrival, ghats and Ganga Aarti', 'Kashi Vishwanath darshan*'] },
      { day: 'Day 2', title: 'Varanasi → Prayagraj', items: ['Road transfer to Prayagraj', 'Sangam visit and boat ride (seasonal)'] },
      { day: 'Day 3', title: 'Prayagraj → Ayodhya', items: ['Road transfer to Ayodhya', 'Temple visit and evening at the ghats*'] },
      { day: 'Day 4', title: 'Return', items: ['Return transfer or onward drop'] },
    ],
    startingPrice: null,
  },
  {
    id: 'custom-group',
    title: 'Custom Family or Group Yatra',
    duration: 'Your dates, your pace',
    summary: 'Elders travelling, a large family, a temple committee — tell us what matters and we’ll shape the plan.',
    highlights: ['Route and stay tailored to you', 'Vehicles sized to your group', 'Add-ons: boat rides, guides, meals'],
    image: 'real-boat-m3-group',
    focus: '50% 55%',
    bestFor: 'Large families, elders and groups',
    itinerary: [
      { day: 'Plan', title: 'Built around your group', items: ['Share dates, headcount and must-see places', 'We propose a route, stay and vehicle', 'Add boat rides, guides and meals as needed'] },
    ],
    startingPrice: null,
  },
]

export const packageDisclaimer =
  '*Temple entry, darshan arrangements and timings are decided by the temple authorities and can change. Itineraries shown are suggestions and are confirmed with you before booking.'

export const packageFaqs = [
  { id: 'custom', question: 'Can I customise a package?', answer: 'Yes. Every package is a starting point — share your dates, group size and interests and we will adjust the plan.' },
  { id: 'price', question: 'How is the price decided?', answer: 'It depends on the hotel category, group size, vehicle, season and add-ons. We send a clear quote once we know your plan.' },
  { id: 'incl', question: 'What is usually included?', answer: 'Typically the stay, local transport and sightseeing as listed in your plan. Meals, boat rides, guides and temple entry arrangements can be added — your quote lists exactly what is covered.' },
  { id: 'temple', question: 'Is temple darshan guaranteed?', answer: 'No. Temple access, timings and rules are set by the temple authorities and can change. We plan around them and tell you what we know.' },
  { id: 'multi', question: 'Can I add Prayagraj or Ayodhya?', answer: 'Yes — multi-city routes with road transfers can be arranged. See the Kashi–Prayagraj–Ayodhya package or ask for a custom route.' },
  { id: 'book', question: 'How do I book?', answer: 'Send an enquiry or message us on WhatsApp. After you review the quote, you confirm the details directly with us.' },
] as const
