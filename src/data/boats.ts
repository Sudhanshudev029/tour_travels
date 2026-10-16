import type { ImageName } from './imageMeta'

/**
 * Boat categories follow the structure used by Varanasi boat-booking sites. Capacities, durations and prices
 * are deliberately NOT stated — they are shared on enquiry. Confirm the exact boat types Via Kashi runs.
 */
export interface BoatType {
  slug: string
  name: string
  tagline: string
  image: ImageName
  focus: string
  bestFor: string
  summary: string
  highlights: readonly string[]
  about: readonly string[]
}

export const boats: readonly BoatType[] = [
  {
    slug: 'motor-boat',
    name: 'Motor Boat',
    tagline: 'Sunrise, sunset or Ganga Aarti from the water',
    image: 'real-boat-m1-day',
    focus: '50% 42%',
    bestFor: 'Families and first-time visitors',
    summary: 'Our standard motor boat ride along the ghats — the easiest way to see Varanasi’s riverfront.',
    highlights: ['Sunrise, daytime and evening rides', 'Life jackets provided on board', 'Boarding near Assi Ghat'],
    about: [
      'A motor boat takes you along the line of ghats at a comfortable pace, so you can take in the temples, steps and morning rituals without the effort of rowing.',
      'Choose a sunrise ride for soft light and quiet water, or an evening ride timed around the Ganga Aarti. Tell us which you prefer and your group size and we will confirm the details.',
    ],
  },
  {
    slug: 'bajra-boat',
    name: 'Bajra Boat',
    tagline: 'A larger boat for groups and celebrations',
    image: 'real-boat-m4-group',
    focus: '45% 50%',
    bestFor: 'Groups, families and celebrations',
    summary: 'A larger traditional-style boat with more room on deck for groups travelling together.',
    highlights: ['More space for big groups', 'Good for family gatherings', 'Timings arranged to suit your plan'],
    about: [
      'When the whole family or group wants to sit together, a larger boat makes the ride more relaxed and sociable.',
      'Availability and the number of guests each boat can carry are confirmed on enquiry, so share your headcount and preferred time.',
    ],
  },
  {
    slug: 'dev-diwali-booking',
    name: 'Dev Diwali Booking',
    tagline: 'The festival of lights from the Ganga',
    image: 'real-boat-m2-night',
    focus: '50% 45%',
    bestFor: 'Festival visitors — book early',
    summary: 'Watch the ghats glow with thousands of lamps from a decorated boat on Dev Deepawali.',
    highlights: ['Special Dev Deepawali boat rides', 'Digital e-ticket with a QR code', 'Advance booking recommended'],
    about: [
      'Dev Deepawali, the festival of lights on Kartik Purnima, is one of the most spectacular nights on the Ganga. Our tickets for 2026 are for 24 November 2026.',
      'Boat places are limited and demand is high, so enquire early. You receive a digital ticket with entry guidelines and the boarding point.',
    ],
  },
  {
    slug: 'event-boat',
    name: 'Event Boat',
    tagline: 'Private boats for parties and special occasions',
    image: 'real-boat-m3-group',
    focus: '50% 55%',
    bestFor: 'Birthdays, anniversaries and private groups',
    summary: 'Hire a boat for your own group — celebrations, family reunions or a private Ganga Aarti.',
    highlights: ['Private use for your group', 'Decor and timing discussed in advance', 'Pickup point agreed with you'],
    about: [
      'For a private occasion, tell us the date, headcount and what you have in mind. We will confirm what the boat can accommodate and what can be arranged.',
    ],
  },
  {
    slug: 'cruise-booking',
    name: 'Cruise Booking',
    tagline: 'Decorated cruise boats on the Ganga',
    image: 'real-boat-decorated',
    focus: '50% 45%',
    bestFor: 'Large groups and festival evenings',
    summary: 'Our decorated Via Kashi cruise-style boats for larger parties and special evenings on the river.',
    highlights: ['Decorated, multi-deck style boats', 'Suited to big groups', 'Seasonal and event cruises'],
    about: [
      'Cruise-style boats offer more space and a festive feel. They are especially popular for celebrations and festival nights.',
      'Capacity and schedule depend on the date, so send your preferred day and group size for a confirmed plan.',
    ],
  },
]

export const boatFaqs = [
  { id: 'book', question: 'How do I book a boat ride?', answer: 'Send the date, preferred time (sunrise, daytime or evening) and number of people through the enquiry form or WhatsApp. We confirm availability and the fare, then share your ticket.' },
  { id: 'aarti', question: 'Can I watch the Ganga Aarti from a boat?', answer: 'Yes. An evening boat ride timed around the Ganga Aarti is one of the most popular options. Arrive early — boats gather close to the ghat before the ceremony begins.' },
  { id: 'private', question: 'Can I book a private boat for my group?', answer: 'Yes. Tell us your group size and we will confirm a private boat or a larger boat for you.' },
  { id: 'ticket', question: 'What will my ticket look like?', answer: 'You receive a digital e-ticket with a unique QR code, your pass category, the boarding point and entry guidelines. A sample is shown on this page.' },
  { id: 'id', question: 'Do I need to carry ID?', answer: 'Yes — please carry a valid photo ID, as it can be checked at the boarding gate.' },
  { id: 'safety', question: 'Are life jackets provided?', answer: 'Life jackets are provided on our boats and guests are advised to wear them throughout the ride.' },
] as const
