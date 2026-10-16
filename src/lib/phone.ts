/**
 * Phone validation for the enquiry form.
 * - Indian mobiles: 10 digits starting 6–9, optionally prefixed +91 / 0091 / 91 / 0.
 * - International: must start with "+" and a non-91 country code, 8–15 digits total (E.164 length).
 */
export const PHONE_ERROR =
  'Enter a valid Indian mobile number (10 digits starting with 6–9), or an international number starting with + and the country code.'

export function isValidPhone(input: string): boolean {
  const raw = input.trim()
  if (!/^\+?[\d\s()-]+$/.test(raw)) return false
  const plus = raw.startsWith('+')
  let digits = raw.replace(/\D/g, '')

  if (plus && !digits.startsWith('91')) return digits.length >= 8 && digits.length <= 15 && !digits.startsWith('0')

  if (digits.startsWith('0091')) digits = digits.slice(4)
  else if (plus || (digits.length === 12 && digits.startsWith('91'))) digits = digits.slice(2)
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)

  return /^[6-9]\d{9}$/.test(digits)
}
