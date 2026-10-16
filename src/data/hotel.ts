import type { ImageName } from './imageMeta'

/**
 * Hotel content is limited to what the client's real room photos show. Location, tariff, check-in/out times and
 * room counts are NOT stated — add them here once the client confirms.
 */
export interface Room {
  id: string
  name: string
  image: ImageName
  alt: string
  focus: string
  features: readonly string[]
  /** Tile shape on the gallery mosaic. */
  shape: 'wide' | 'tall'
}

export const rooms: readonly Room[] = [
  { id: 'double-1', name: 'Double-bed room', image: 'hotel-room-double-1', focus: '50% 55%', shape: 'wide', alt: 'Double-bed room with a padded headboard, floral bed runner, wardrobe and bedside lamps', features: ['Double bed with fresh linen', 'Wardrobe and bedside tables', 'In-room telephone'] },
  { id: 'twin-2', name: 'Twin-bed room', image: 'hotel-room-twin-2', focus: '50% 55%', shape: 'wide', alt: 'Twin-bed room with two large beds, air conditioning, ceiling fan and framed Varanasi artwork', features: ['Two large beds', 'Air-conditioned', 'Ceiling fan and framed local artwork'] },
  { id: 'twin-1', name: 'Twin-bed room', image: 'hotel-room-twin-1', focus: '50% 50%', shape: 'tall', alt: 'Twin-bed room with red padded headboards, wooden panelling and a ceiling fan', features: ['Two beds with padded headboards', 'Wood-panelled walls', 'Ceiling fan'] },
  { id: 'double-2', name: 'Double-bed room', image: 'hotel-room-double-2', focus: '50% 50%', shape: 'tall', alt: 'Double-bed room with a bedside table and framed artwork', features: ['Double bed', 'Bedside table', 'Tiled flooring'] },
  { id: 'double-3', name: 'Double-bed room', image: 'hotel-room-double-3', focus: '50% 55%', shape: 'wide', alt: 'Bright double-bed room with marble flooring, air conditioning and seating', features: ['Air-conditioned', 'Marble-style flooring', 'Seating area'] },
  { id: 'double-4', name: 'Double-bed room', image: 'hotel-room-double-4', focus: '50% 55%', shape: 'wide', alt: 'Double-bed room with a teal headboard, wardrobe, curtains and air conditioning', features: ['Air-conditioned', 'Wardrobe and curtains', 'In-room telephone'] },
]

export const hotelFeatures = [
  'Air-conditioned rooms',
  'Ceiling fans',
  'Wardrobes and bedside tables',
  'Fresh white linen and towels',
  'In-room telephone',
  'Curtains and tiled flooring',
] as const

export const hotelVideos = [
  { src: '/video/hotel-tour-1.mp4', poster: 'hotel-room-double-1', label: 'Hotel walkthrough 1' },
  { src: '/video/hotel-tour-2.mp4', poster: 'hotel-room-twin-2', label: 'Hotel walkthrough 2' },
] as const satisfies readonly { src: string; poster: ImageName; label: string }[]

export const hotelFaqs = [
  { id: 'quote', question: 'How do I book a room?', answer: 'Send your check-in and check-out dates, number of guests and room preference through the enquiry form or WhatsApp. We confirm availability and the tariff directly.' },
  { id: 'where', question: 'Where is the hotel located?', answer: 'Share your plans and we will tell you the exact location and how it connects to the ghats, the temple area and the station.' },
  { id: 'combine', question: 'Can I combine a stay with boat rides and cabs?', answer: 'Yes — most guests do. We can arrange the room, an airport or station pickup and a boat ride in one plan.' },
  { id: 'id', question: 'What do I need at check-in?', answer: 'A valid photo ID for every adult guest is normally required at check-in. Confirm any other requirements when you book.' },
  { id: 'group', question: 'Can you arrange rooms for a larger group?', answer: 'Tell us the number of guests and dates and we will confirm what is possible.' },
] as const
