import type { EnquiryDetails } from './whatsapp'

export type SendResult = { ok: true } | { ok: false; reason: string }

/**
 * Posts the enquiry to our own endpoint (/api/enquiry), which emails it with Nodemailer — see server/enquiry.ts.
 * Resolves ok:true only when the server confirms the email was handed to the mail server.
 */
export async function sendEnquiry(d: EnquiryDetails & { email: string }, honeypot: string): Promise<SendResult> {
  try {
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...d, website: honeypot }),
    })
    const data: { ok?: boolean; message?: string } = await res.json().catch(() => ({}))
    if (res.ok && data.ok === true) return { ok: true }
    return { ok: false, reason: data.message || `The server returned an error (${res.status}).` }
  } catch {
    return { ok: false, reason: 'Could not reach the server. Please check your connection.' }
  }
}
