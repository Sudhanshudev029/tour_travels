/**
 * Proposed selling points — editable copy, not verified claims. Confirm each with the client
 * before launch, and do NOT add certifications, guarantees or 24/7 claims without evidence.
 */
export interface Benefit {
  id: string
  title: string
  body: string
  icon: 'map' | 'route' | 'calendar' | 'message' | 'family' | 'car'
}

export const benefits: readonly Benefit[] = [
  { id: 'local', icon: 'map', title: 'Local Varanasi help', body: 'Planning from inside the city — lanes, timings and crowd patterns that guidebooks miss.' },
  { id: 'itinerary', icon: 'route', title: 'Personalised itineraries', body: 'Every plan starts from your dates, group and pace — not a fixed script.' },
  { id: 'flexible', icon: 'calendar', title: 'Flexible planning', body: 'Add a boat ride, stretch to Prayagraj, or drop a day — the plan adjusts with you.' },
  { id: 'clear', icon: 'message', title: 'Clear communication', body: 'What is included, what is not, and what to expect — written down before you commit.' },
  { id: 'family', icon: 'family', title: 'Family-friendly arrangements', body: 'Comfortable pacing and vehicles for elders, children and large groups.' },
  { id: 'transport', icon: 'car', title: 'Transport & sightseeing support', body: 'Station and airport pickups, day cars and guides arranged together.' },
]
