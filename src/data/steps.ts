export interface Step { id: string; title: string; body: string }

export const steps: readonly Step[] = [
  { id: 'explore', title: 'Explore', body: 'Browse destinations and package ideas to see what fits your trip.' },
  { id: 'share', title: 'Share your plans', body: 'Tell us your dates, group size and what matters most.' },
  { id: 'quote', title: 'Get a tailored plan', body: 'Receive a customised itinerary and a quote to review.' },
  { id: 'confirm', title: 'Confirm directly', body: 'Agree the details with us directly, then travel with a clear plan.' },
]
