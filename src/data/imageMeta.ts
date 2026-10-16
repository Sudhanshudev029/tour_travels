// Intrinsic sizes + generated widths for /public/images/<name>-<width>.webp
export interface ImageMeta { w: number; h: number; widths: number[] }
export const imageMeta = {
  "hero-ghats-sunrise-boats": {
    "w": 3840,
    "h": 2161,
    "widths": [
      640,
      1200,
      1920
    ]
  },
  "ganga-aarti-evening": {
    "w": 3840,
    "h": 2560,
    "widths": [
      640,
      1200,
      1920
    ]
  },
  "assi-ghat-morning-aarti": {
    "w": 3840,
    "h": 2543,
    "widths": [
      640,
      1200,
      1920
    ]
  },
  "kashi-vishwanath-temple": {
    "w": 3840,
    "h": 2880,
    "widths": [
      640,
      1200,
      1920
    ]
  },
  "dashashwamedh-ghat": {
    "w": 3840,
    "h": 1829,
    "widths": [
      640,
      1200,
      1920
    ]
  },
  "sarnath-dhamek-stupa": {
    "w": 3840,
    "h": 2158,
    "widths": [
      640,
      1200,
      1920
    ]
  },
  "ramnagar-fort": {
    "w": 3840,
    "h": 2160,
    "widths": [
      640,
      1200,
      1920
    ]
  },
  "ganga-boat-ride": {
    "w": 2362,
    "h": 1565,
    "widths": [
      640,
      1200,
      1920
    ]
  },
  "old-city-alley": {
    "w": 720,
    "h": 1279,
    "widths": [
      640
    ]
  },
  "prayagraj-sangam": {
    "w": 2048,
    "h": 1800,
    "widths": [
      640,
      1200,
      1920
    ]
  },
  "ayodhya-ram-mandir": {
    "w": 2200,
    "h": 1467,
    "widths": [
      640,
      1200,
      1920
    ]
  },
  "dev-deepavali": {
    "w": 1280,
    "h": 960,
    "widths": [
      640,
      1200
    ]
  },
  "varanasi-ghats-panorama": {
    "w": 3450,
    "h": 2382,
    "widths": [
      640,
      1200,
      1920
    ]
  },
  "ganges-sunrise-ghats": {
    "w": 2228,
    "h": 1671,
    "widths": [
      640,
      1200,
      1920
    ]
  },
  "dashashwamedh-ghat-colourful": {"w": 3840, "h": 2880, "widths": [640, 1200, 1920]},
  "ganga-golden-hour-boat": {"w": 3840, "h": 2568, "widths": [640, 1200, 1920]}
} as const satisfies Record<string, ImageMeta>
export type ImageName = keyof typeof imageMeta
