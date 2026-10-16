import { Outlet } from 'react-router-dom'
import { useCardTilt } from '../../hooks/useCardTilt'
import { useScrollVars } from '../../hooks/useScrollVars'
import { FloatingWhatsApp } from '../ui/FloatingWhatsApp'
import { BottomNav } from './BottomNav'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollManager } from './ScrollManager'

export function Layout() {
  useScrollVars()
  useCardTilt()
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
      <ScrollManager />
    </>
  )
}
