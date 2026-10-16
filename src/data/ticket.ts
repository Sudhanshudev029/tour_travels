/**
 * Content for the homepage "sample e-ticket". The layout mirrors the client's real ticket, but every
 * personal field (name, phone, ticket ID, QR code) is a placeholder — NEVER paste real customer data here.
 */
export const sampleTicket = {
  org: 'Via Kashi Tours',
  title: 'Boat Ride · Date of travel',
  ref: 'TKT-SAMPLE',
  attendee: 'Guest name',
  category: 'Motor boat',
  contact: '+91 XXXXX XXXXX',
  booking: 'On confirmation',
  persons: '2',
  location: 'Varanasi',
  boardingPoint: 'Infront of Tulsi Ghat Dwar, Imperial Public School, B2/225, Assi Ghat Rd, Anandbagh, Bhelupur, Varanasi, Uttar Pradesh 221001',
  guidelines: [
    'Present this ticket with the QR code at the entrance for scanning.',
    'Entry closes strictly at the time printed on your ticket.',
    'Valid ID proof is compulsory.',
    'Board only your assigned boat.',
    'Ticket is non-transferable.',
    'Valid only on the date printed on your ticket.',
  ],
} as const

export const ticketHighlights = [
  { title: 'One unique QR code', body: 'Scanned once at the entry gate — no printouts needed.' },
  { title: 'Your boat and group', body: 'Pass category and number of people are printed on the pass.' },
  { title: 'Boarding point with a map link', body: 'Find the gate in Varanasi without guesswork.' },
  { title: 'Clear entry rules', body: 'Timings and ID requirements listed on the ticket itself.' },
] as const

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sampleTicket.boardingPoint)}`
