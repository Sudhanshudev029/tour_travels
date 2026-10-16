import { EnquiryBand } from '../components/ui/EnquiryBand'
import { ExploreDirectory } from '../components/ui/ExploreDirectory'
import { PageHero } from '../components/ui/PageHero'
import { Picture } from '../components/ui/Picture'
import { SectionHeading } from '../components/ui/SectionHeading'
import { business } from '../config/business'
import { aboutPillars, aboutValues } from '../data/about'
import { useReveal } from '../hooks/useReveal'
import { usePageMeta } from '../hooks/usePageMeta'

export default function AboutPage() {
  usePageMeta('About Us', `About ${business.name}: hotel stays, Ganga boat rides, cabs and tour packages in Varanasi (Kashi) — more than a destination.`)
  const pref = useReveal<HTMLUListElement>()
  const vref = useReveal<HTMLUListElement>()
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About us' }]}
        title={`About ${business.shortName}`}
        intro={`${business.name} helps pilgrims, families and travellers experience Kashi — ${business.tagline.toLowerCase()}.`}
        image={<Picture name="real-boat-m3-group" alt="Smiling guests on a Via Kashi boat on the Ganga" sizes="(min-width: 960px) 520px, 100vw" focus="50% 55%" priority />}
      />
      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading eyebrow="Who we are" title="Your local team in Kashi" />
            <p className="prose">
              Varanasi is best experienced with people who know its ghats, lanes and rhythms. {business.shortName} brings together stays, boat rides, cabs and tour packages so you can plan the whole journey in one conversation.
            </p>
            <p className="prose">
              Whether you are here for darshan, the Ganga Aarti, Dev Deepawali or a family holiday, we plan around your group, your pace and your priorities.
            </p>
          </div>
          <div className="aboutimg media">
            <Picture name="real-boat-m2-night" alt="Guests on a Via Kashi boat during Dev Diwali night on the Ganga" sizes="(min-width: 960px) 520px, 100vw" focus="50% 50%" />
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="what-we-do">
        <div className="container">
          <SectionHeading id="what-we-do" eyebrow="What we do" title="Everything for your Kashi journey" align="center" />
          <ul ref={pref} className="benefits reveal">
            {aboutPillars.map((p) => (
              <li key={p.id}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="how-we-work">
        <div className="container">
          <SectionHeading id="how-we-work" eyebrow="How we work" title="Simple, clear and personal" align="center" />
          <ul ref={vref} className="benefits reveal">
            {aboutValues.map((v) => (
              <li key={v.id}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <EnquiryBand title="Let’s plan your trip" body="Tell us what you have in mind — we will take it from there." />
      <ExploreDirectory />
    </>
  )
}
