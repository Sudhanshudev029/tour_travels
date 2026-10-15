/**
 * Central business configuration — the single place to edit brand and contact details.
 * Nothing here is invented: every real-world value is empty until the client supplies it.
 * Values may also be provided through VITE_* variables (see .env.example).
 */
const env = import.meta.env

const digitsOnly = (v: string | undefined) => (v ?? '').replace(/\D/g, '')
const text = (v: string | undefined) => (v ?? '').trim()

const whatsapp = digitsOnly(env.VITE_WHATSAPP_NUMBER)
const phone = digitsOnly(env.VITE_PHONE)

export const business = {
  /** Placeholder wordmark — replace with the real brand name. */
  name: text(env.VITE_BUSINESS_NAME) || 'Your Brand Name',
  descriptor: 'Tours & Travels · Varanasi',
  description:
    'Local travel planning for Varanasi (Kashi): temple and ghat visits, Ganga boat rides, airport and station transfers, and pilgrimage routes to Prayagraj and Ayodhya.',
  /** International digits-only WhatsApp number, e.g. "<country code><number>". Empty = not configured. */
  whatsapp,
  phone,
  phoneDisplay: text(env.VITE_PHONE),
  email: text(env.VITE_EMAIL),
  address: text(env.VITE_ADDRESS),
  /** Optional logo path (served from /public). Falls back to the text wordmark. */
  logoSrc: '' as string,
  social: {
    instagram: '',
    facebook: '',
    youtube: '',
  },
  /** Testimonials stay hidden until real, permissioned reviews are added to data/testimonials.ts. */
  showTestimonials: false,
} as const

export const hasWhatsApp = whatsapp.length >= 10
export const hasPhone = phone.length >= 7
export const hasEmail = business.email.includes('@')
