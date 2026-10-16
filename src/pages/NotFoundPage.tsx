import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHero } from '../components/ui/PageHero'
import { Button } from '../components/ui/Button'

export default function NotFoundPage() {
  usePageMeta('Page not found', 'The page you are looking for could not be found.')
  return (
    <>
      <PageHero crumbs={[{ label: 'Page not found' }]} title="We couldn’t find that page" intro="The link may be old or mistyped. Try one of these instead.">
        <div className="phero__cta">
          <Button href="/">Back to home</Button>
          <Button href="/packages" variant="secondary">
            Tour packages
          </Button>
        </div>
      </PageHero>
      <section className="section">
        <div className="container">
          <ul className="explore__grid">
            {[['Hotels', '/hotels'], ['Cab booking', '/cab'], ['Boat rides', '/boat'], ['Things to do', '/things-to-do'], ['Contact us', '/contact-us']].map(([l, to]) => (
              <li key={to}>
                <Link to={to}>{l}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
