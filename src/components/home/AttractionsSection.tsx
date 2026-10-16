import { attractions } from '../../data/attractions'
import { AttractionCard } from '../ui/AttractionCard'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

export function AttractionsSection() {
  return (
    <section id="places" className="section" aria-labelledby="places-title">
      <div className="container">
        <SectionHeading
          id="places-title"
          eyebrow="Places to visit"
          title="Discover the spiritual heart of Kashi"
          lead="Temples, ghats and heritage sites that give Varanasi its character — visited with the care they deserve."
        />
        <div className="att-grid">
          {attractions.map((a, i) => (
            <AttractionCard key={a.id} place={a} index={i} className={i === 0 ? 'att--lead' : ''} />
          ))}
        </div>
        <div className="section__more">
          <Button href="/things-to-do" variant="dark">
            More things to do
          </Button>
        </div>
      </div>
    </section>
  )
}
