import type { CSSProperties } from 'react'
import { imageMeta, type ImageName } from '../../data/imageMeta'

interface Props {
  name: ImageName
  alt: string
  sizes: string
  focus?: string
  /** Above-the-fold images: eager load + high fetch priority. */
  priority?: boolean
}

/** Responsive <img> using the generated WebP widths; intrinsic size reserves space (no CLS). */
export function Picture({ name, alt, sizes, focus, priority }: Props) {
  const m = imageMeta[name]
  const widths = m.widths as readonly number[]
  const largest = widths[widths.length - 1]
  const srcSet = widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ')
  const style: CSSProperties | undefined = focus ? { objectPosition: focus } : undefined
  return (
    <img
      src={`/images/${name}-${widths.includes(1200) ? 1200 : largest}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={largest}
      height={Math.round((largest * m.h) / m.w)}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      style={style}
    />
  )
}
