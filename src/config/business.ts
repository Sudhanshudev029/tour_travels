/**
 * Central business configuration — the single place to edit brand and contact details.
 * Nothing here is invented: every real-world value is empty until the client supplies it.
 * Values may also be provided through VITE_* variables (see .env.example).
 */
const env = import.meta.env

const digitsOnly = (v: string | undefined) => (v ?? '').replace(/\D/g, '')
const text = (v: string | undefined) => (v ?? '').trim()

/** Client-supplied WhatsApp number: +91 92358 80851 (India country code 91, digits only). */
const DEFAULT_WHATSAPP = '919235880851'
const DEFAULT_EMAIL = 'viakashitours@gmail.com'
const whatsapp = digitsOnly(env.VITE_WHATSAPP_NUMBER) || DEFAULT_WHATSAPP
const phone = digitsOnly(env.VITE_PHONE)

export const business = {
  name: text(env.VITE_BUSINESS_NAME) || 'Via Kashi Tour & Travels',
  /** Short wordmark used in the header and footer. */
  shortName: 'Via Kashi',
  descriptor: 'Tour & Travels · Varanasi',
  tagline: 'More than a destination',
  description:
    'Via Kashi — more than a destination. Hotels and stays, Ganga boat rides, cabs and tour packages in Varanasi (Kashi), with pilgrimage routes to Prayagraj and Ayodhya.',
  /** International digits-only WhatsApp number, e.g. "<country code><number>". Empty = not configured. */
  whatsapp,
  whatsappDisplay: whatsapp === DEFAULT_WHATSAPP ? '+91 92358 80851' : `+${whatsapp}`,
  phone,
  phoneDisplay: text(env.VITE_PHONE),
  email: text(env.VITE_EMAIL) || DEFAULT_EMAIL,
  address: text(env.VITE_ADDRESS),
  /** Emblem cropped from the client logo (public/images/logo.jpeg); the wordmark is live text. */
  logoMark: { src: '/images/logo-mark-128.webp', srcSet: '/images/logo-mark-64.webp 64w, /images/logo-mark-128.webp 128w, /images/logo-mark-256.webp 256w' },
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
