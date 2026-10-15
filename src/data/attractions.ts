import type { ImageName } from './imageMeta'

export interface Attraction {
  id: string
  name: string
  tag: string
  description: string
  image: ImageName
  alt: string
  focus?: string
}

export const attractions: readonly Attraction[] = [
  {
    id: 'kashi-vishwanath',
    name: 'Kashi Vishwanath Temple',
    tag: 'Temple',
    description:
      'The best-known Shiva temple of Kashi and a centre of Hindu pilgrimage. Entry rules and timings are set by the temple authorities and can change.',
    image: 'kashi-vishwanath-temple',
    alt: 'A large gateway at the Kashi Vishwanath Temple complex in Varanasi',
    focus: '50% 40%',
  },
  {
    id: 'dashashwamedh',
    name: 'Dashashwamedh Ghat',
    tag: 'Ghat',
    description: 'The busiest and most recognisable ghat — the heart of river life and the setting for the evening Ganga Aarti.',
    image: 'dashashwamedh-ghat',
    alt: 'Boats and crowds along Dashashwamedh Ghat on the Ganga in Varanasi',
    focus: '50% 50%',
  },
  {
    id: 'assi',
    name: 'Assi Ghat',
    tag: 'Ghat',
    description: 'At the southern end of the ghats, known for gatherings at dawn and dusk and for its aarti.',
    image: 'assi-ghat-morning-aarti',
    alt: 'Priests performing aarti with incense smoke at Assi Ghat, Varanasi',
    focus: '60% 45%',
  },
  {
    id: 'sarnath',
    name: 'Sarnath',
    tag: 'Buddhist site',
    description: 'Where the Buddha is traditionally said to have given his first sermon. Home to the Dhamek Stupa and a museum.',
    image: 'sarnath-dhamek-stupa',
    alt: 'The brick Dhamek Stupa at Sarnath near Varanasi at golden hour',
    focus: '50% 50%',
  },
  {
    id: 'ramnagar',
    name: 'Ramnagar Fort',
    tag: 'Heritage',
    description: 'An 18th-century riverside fort across the Ganga from the old city, with a museum of the former royal household.',
    image: 'ramnagar-fort',
    alt: 'Sandstone balconies and ramparts of Ramnagar Fort near Varanasi',
    focus: '35% 50%',
  },
]
