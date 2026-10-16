import type { ImageName } from './imageMeta'

/** Hero carousel — the first slide is the LCP image, so keep it first and keep its preload in index.html in sync. */
export interface HeroSlide {
  image: ImageName
  alt: string
  focus: string
  caption: string
}

export const heroSlides: readonly HeroSlide[] = [
  {
    image: 'hero-ghats-sunrise-boats',
    alt: 'Wooden boats moored at the Varanasi ghats as the sun rises over the Ganga',
    focus: '50% 55%',
    caption: 'Sunrise on the Ganga',
  },
  {
    image: 'ganga-aarti-evening',
    alt: 'Priests performing the evening Ganga Aarti with lamps and incense smoke in Varanasi',
    focus: '50% 38%',
    caption: 'Evening Ganga Aarti',
  },
  {
    image: 'dashashwamedh-ghat-colourful',
    alt: 'Colourful umbrellas, saffron flags and a golden boat at Dashashwamedh Ghat in Varanasi',
    focus: '50% 62%',
    caption: 'Dashashwamedh Ghat',
  },
  {
    image: 'ganga-golden-hour-boat',
    alt: 'A boat of pilgrims crossing the Ganga under an orange sunrise sky near Varanasi',
    focus: '50% 62%',
    caption: 'Golden hour on the Ganga',
  },
]
