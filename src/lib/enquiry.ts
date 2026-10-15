/** Lets any CTA preselect the enquiry form's "interested in" field without a global store. */
const EVENT = 'enquiry:interest'

export const interestOptions = [
  'Tour package',
  'Ganga boat ride',
  'Cab / local sightseeing',
  'Hotel / accommodation',
  'Temple & spiritual tour',
  'Custom pilgrimage (Prayagraj / Ayodhya)',
  'Not sure yet',
] as const

export function selectInterest(interest: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: interest }))
}

export function onInterestSelected(cb: (interest: string) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<string>).detail)
  window.addEventListener(EVENT, handler)
  return () => window.removeEventListener(EVENT, handler)
}
