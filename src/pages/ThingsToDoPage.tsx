import { Coffee, CupSoda, Leaf, Utensils } from 'lucide-react'
import { ExploreDirectory } from '../components/ui/ExploreDirectory'
import { EnquiryBand } from '../components/ui/EnquiryBand'
import { FaqBlock } from '../components/ui/FaqBlock'
import { FeatureTrio } from '../components/ui/FeatureTrio'
import { FilterTabs } from '../components/ui/FilterTabs'
import { ListingCard } from '../components/ui/ListingCard'
import { PageHero } from '../components/ui/PageHero'
import { type TodoCategory, todoFaqs, todoItems, todoTabs } from '../data/thingsToDo'
import { usePageMeta } from '../hooks/usePageMeta'

const icons = { food: Utensils, drink: CupSoda, sweet: Coffee, paan: Leaf }
const copy: Record<'all' | TodoCategory, { title: string; intro: string; meta: string }> = {
  all: { title: 'Things to do in Varanasi', intro: 'Sunrise boat rides, the Ganga Aarti, old-city walks and the foods Kashi is known for — ideas for every kind of traveller.', meta: 'Things to do in Varanasi: boat rides, Ganga Aarti, heritage walks, temple visits and local food. Plan your trip with Via Kashi.' },
  'local-food': { title: 'Local food in Varanasi', intro: 'From kachori-sabzi breakfasts to malaiyo and Banarasi paan — the tastes worth planning a stop around.', meta: 'Local food in Varanasi: kachori sabzi, Banarasi lassi, tamatar chaat, malaiyo, paan and sweets. Ask Via Kashi for food stop suggestions.' },
  experiences: { title: 'Experiences in Varanasi', intro: 'Rituals, rivers, heritage and pilgrimages — experiences we can weave into your trip.', meta: 'Experiences in Varanasi: sunrise boat ride, Ganga Aarti, Dev Deepawali, heritage walks, Sarnath and pilgrimage routes with Via Kashi.' },
}

export default function ThingsToDoPage({ category }: { category?: TodoCategory }) {
  const key = category ?? 'all'
  usePageMeta(copy[key].title, copy[key].meta)
  const items = category ? todoItems.filter((i) => i.category === category) : todoItems
  return (
    <>
      <PageHero
        crumbs={category ? [{ label: 'Things to do', to: '/things-to-do' }, { label: category === 'local-food' ? 'Local food' : 'Experiences' }] : [{ label: 'Things to do' }]}
        title={copy[key].title}
        intro={copy[key].intro}
        chips={[`${items.length} ideas`, 'We can plan any of these for you']}
      />
      <section className="section">
        <div className="container">
          <FilterTabs tabs={todoTabs} label="Categories" />
          <div className="lgrid">
            {items.map((it, i) => {
              const Icon = it.icon ? icons[it.icon] : null
              return (
                <ListingCard
                  key={it.id}
                  to={it.to}
                  category={it.category === 'local-food' ? 'Local food' : 'Experience'}
                  title={it.title}
                  summary={it.summary}
                  image={it.image}
                  focus={it.focus}
                  tile={Icon ? <span className="vtile vtile--food"><Icon size={52} strokeWidth={1.4} aria-hidden /></span> : undefined}
                  facts={[it.tag]}
                  cta={it.cta}
                  index={i}
                />
              )
            })}
          </div>
        </div>
      </section>
      <section className="section section--sand">
        <div className="container">
          <FeatureTrio />
        </div>
      </section>
      <FaqBlock items={todoFaqs} />
      <EnquiryBand title="Need help planning your trip?" body="Tell us what you would like to do and we will build it into your itinerary." topic="things to do in Varanasi" interest="package" />
      <ExploreDirectory />
    </>
  )
}
