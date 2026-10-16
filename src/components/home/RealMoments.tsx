import { galleryTiles } from '../../data/gallery'
import { useReveal } from '../../hooks/useReveal'
import { Picture } from '../ui/Picture'
import { SectionHeading } from '../ui/SectionHeading'

export function RealMoments() {
  const ref = useReveal<HTMLUListElement>()
  return (
    <section id="moments" className="section section--sand" aria-labelledby="moments-title">
      <div className="container">
        <SectionHeading
          id="moments-title"
          eyebrow="From our boats"
          title="Real guests, real moments on the Ganga"
          lead="A few frames from boat rides with Via Kashi — sunrise starts, Dev Diwali nights and family outings."
          align="center"
        />
        <ul ref={ref} className="gallery reveal">
          {galleryTiles.map((t) => (
            <li key={t.id} className={`gallery__tile gallery__tile--${t.slot}`}>
              <Picture name={t.image} alt={t.alt} sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw" focus={t.focus} />
              {t.caption && <span className="gallery__cap">{t.caption}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
