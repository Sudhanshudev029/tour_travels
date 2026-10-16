import type { ImageName } from './imageMeta'

/** Client-supplied photographs from real boat rides. Confirm guests are comfortable with their photos being public. */
export interface GalleryTile {
  id: string
  image: ImageName
  alt: string
  focus?: string
  /** Layout slot on the desktop mosaic (see .gallery in home.css). */
  slot: 'hero' | 'wide' | 'tall' | 'small' | 'square'
  caption?: string
}

export const galleryTiles: readonly GalleryTile[] = [
  { id: 'night', image: 'real-boat-m2-night', slot: 'hero', focus: '50% 50%', caption: 'Dev Diwali night', alt: 'Smiling guests on a Via Kashi boat on the Ganga during Dev Diwali night, with the lit-up ghats behind' },
  { id: 'm4', image: 'real-boat-m4-group', slot: 'small', focus: '45% 50%', alt: 'A group of guests posing on Via Kashi boat M4 on the Ganga' },
  { id: 'm3', image: 'real-boat-m3-group', slot: 'tall', focus: '50% 50%', caption: 'Family & group trips', alt: 'A large group of guests smiling on Via Kashi boat M3 at dusk' },
  { id: 'tickets', image: 'real-tickets', slot: 'small', focus: '50% 40%', alt: 'A hand holding a fan of Via Kashi Tour & Travels boat tickets' },
  { id: 'decorated', image: 'real-boat-decorated', slot: 'tall', focus: '50% 40%', caption: 'Our decorated boats', alt: 'A Via Kashi boat decorated with marigold garlands on the Ganga' },
  { id: 'm1', image: 'real-boat-m1-day', slot: 'square', focus: '50% 45%', caption: 'Daytime on the river', alt: 'Guests in life jackets on Via Kashi boat M1 on the Ganga in daylight' },
  { id: 'morning', image: 'real-boat-morning', slot: 'tall', focus: '50% 40%', alt: 'Guests boarding decorated Via Kashi boats at the ghat in the morning' },
]
