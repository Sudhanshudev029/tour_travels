import { business, hasWhatsApp } from '../config/business'

export const DEFAULT_WHATSAPP_MESSAGE =
  'Namaste! I am planning a trip to Varanasi and would like to know about your tour packages. Please share the available options.'

/** Official wa.me click-to-chat URL, or null when no real number is configured. */
export function buildWhatsAppUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string | null {
  if (!hasWhatsApp) return null
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`
}

export interface EnquiryDetails {
  name: string
  phone: string
  travelDate: string
  groupSize: string
  interest: string
  notes: string
}

export function buildEnquiryMessage(d: EnquiryDetails): string {
  const lines = [
    'Namaste! I would like to plan a trip to Varanasi.',
    '',
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Travel date: ${d.travelDate}`,
    `Group size: ${d.groupSize}`,
    `Interested in: ${d.interest}`,
  ]
  if (d.notes.trim()) lines.push(`Notes: ${d.notes.trim()}`)
  lines.push('', 'Please share the available options and a quote.')
  return lines.join('\n')
}
