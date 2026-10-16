import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'

const HomePage = lazy(() => import('./pages/HomePage'))
const HotelsPage = lazy(() => import('./pages/HotelsPage'))
const CabPage = lazy(() => import('./pages/CabPage'))
const CabDetailPage = lazy(() => import('./pages/CabDetailPage'))
const BoatPage = lazy(() => import('./pages/BoatPage'))
const BoatDetailPage = lazy(() => import('./pages/BoatDetailPage'))
const PackagesPage = lazy(() => import('./pages/PackagesPage'))
const PackageDetailPage = lazy(() => import('./pages/PackageDetailPage'))
const ThingsToDoPage = lazy(() => import('./pages/ThingsToDoPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="hotels" element={<HotelsPage />} />
          <Route path="cab" element={<CabPage />} />
          <Route path="cab/:slug" element={<CabDetailPage />} />
          <Route path="boat" element={<BoatPage />} />
          <Route path="boat/:slug" element={<BoatDetailPage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="packages/:id" element={<PackageDetailPage />} />
          <Route path="things-to-do" element={<ThingsToDoPage />} />
          <Route path="things-to-do/local-food" element={<ThingsToDoPage category="local-food" />} />
          <Route path="things-to-do/experiences" element={<ThingsToDoPage category="experiences" />} />
          <Route path="about-us" element={<AboutPage />} />
          <Route path="contact-us" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
