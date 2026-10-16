import type { ImageName } from './imageMeta'

export interface FeatureExperience {
  id: string
  eyebrow: string
  title: string
  body: string
  image: ImageName
  alt: string
  focus?: string
}

export const featureExperiences: readonly FeatureExperience[] = [
  {
    id: 'sunrise-boat',
    eyebrow: 'First light',
    title: 'Sunrise on the Ganga',
    body: 'Slip onto the river before the city wakes. From the water the ghats unfold in one long, softly lit line — temples, bathers, and the day’s first prayers.',
    image: 'hero-ghats-sunrise-boats',
    alt: 'Wooden boats moored at the Varanasi ghats with the sun rising over the Ganga',
    focus: '50% 55%',
  },
  {
    id: 'ganga-aarti',
    eyebrow: 'After dusk',
    title: 'The evening Ganga Aarti',
    body: 'Lamps, conch, bells and chanting along the riverbank. We help you choose where to watch from — a boat on the water or a place on the steps — and when to arrive.',
    image: 'ganga-aarti-evening',
    alt: 'Priests performing the evening Ganga Aarti with lamps and incense smoke in Varanasi',
    focus: '50% 40%',
  },
  {
    id: 'heritage-walk',
    eyebrow: 'On foot',
    title: 'Walks through the old city',
    body: 'Narrow galis, temple bells, sweet shops and silk looms. A walk with someone who knows the lanes turns a maze into a story.',
    image: 'old-city-lane',
    alt: 'A narrow lane lined with shops in the old city of Varanasi',
    focus: '50% 55%',
  },
]

export interface SmallExperience {
  id: string
  title: string
  body: string
  icon: 'temple' | 'food' | 'route'
}

export const smallExperiences: readonly SmallExperience[] = [
  {
    id: 'temple-visits',
    title: 'Guided temple visits',
    body: 'Context for what you are seeing, and help with queues and etiquette — within whatever rules the temple sets.',
    icon: 'temple',
  },
  {
    id: 'food',
    title: 'Local culture & cuisine',
    body: 'Kachori-sabzi breakfasts, lassi, chaat and Banarasi sweets — suggested stops for food lovers and a note on what suits you.',
    icon: 'food',
  },
  {
    id: 'multi-city',
    title: 'Multi-city pilgrimages',
    body: 'Combine Kashi with Prayagraj, Ayodhya or Vindhyachal, with the road legs planned for you.',
    icon: 'route',
  },
]
