import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'
import { isValidPhone } from '../src/lib/phone.ts'

/**
 * Server-side enquiry handler, shared by the Netlify Function (production) and the Vite dev/preview
 * middleware (localhost). Sends the enquiry to the business inbox with Nodemailer over SMTP.
 *
 * Environment (server only — never prefix these with VITE_, that would expose them to the browser):
 *   SMTP_USER   sending account, e.g. a Gmail address
 *   SMTP_PASS   its password — for Gmail use an App Password (needs 2-Step Verification)
 *   ENQUIRY_TO  inbox that receives enquiries (default viakashitours@gmail.com)
 *   SMTP_HOST / SMTP_PORT   default smtp.gmail.com / 465
 *   MAIL_FROM   optional "Name <address>" (default "Via Kashi Website" <SMTP_USER>)
 */
export type Env = Record<string, string | undefined>
export interface HandlerResult {
  status: number
  json: { ok: boolean; message?: string }
}

const DEFAULT_TO = 'viakashitours@gmail.com'
const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/[\r\n\t]+/g, ' ').trim().slice(0, max) : '')
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

// Best-effort throttling (per warm server instance): 5 enquiries / 10 min per client.
const hits = new Map<string, number[]>()
function throttled(key: string) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < 10 * 60_000)
  if (recent.length >= 5) return true
  recent.push(now)
  hits.set(key, recent)
  return false
}

export async function handleEnquiry(body: unknown, env: Env, clientKey = 'anon', transport?: Transporter): Promise<HandlerResult> {
  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>

  // Honeypot: pretend success so bots learn nothing.
  if (clean(b.website, 100)) return { status: 200, json: { ok: true } }

  const d = {
    name: clean(b.name, 80),
    phone: clean(b.phone, 20),
    email: clean(b.email, 120),
    travelDate: clean(b.travelDate, 40),
    groupSize: clean(b.groupSize, 4),
    interest: clean(b.interest, 80),
    notes: typeof b.notes === 'string' ? b.notes.replace(/\r/g, '').trim().slice(0, 600) : '',
  }
  const size = Number(d.groupSize)
  if (d.name.length < 2 || !isValidPhone(d.phone) || !d.travelDate || !Number.isInteger(size) || size < 1 || size > 100 || !d.interest) {
    return { status: 400, json: { ok: false, message: 'Some enquiry details are missing or invalid.' } }
  }
  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) {
    return { status: 400, json: { ok: false, message: 'The email address looks invalid.' } }
  }
  if (throttled(clientKey)) return { status: 429, json: { ok: false, message: 'Too many enquiries. Please try again in a few minutes.' } }

  let tx = transport
  if (!tx) {
    if (!env.SMTP_USER || !env.SMTP_PASS) {
      return { status: 503, json: { ok: false, message: 'Email sending is not configured on the server yet.' } }
    }
    const port = Number(env.SMTP_PORT) || 465
    tx = nodemailer.createTransport({
      host: env.SMTP_HOST || 'smtp.gmail.com',
      port,
      secure: port === 465,
      // Google displays App Passwords in groups of four with spaces; the real password has none.
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS.replace(/\s+/g, '') },
    })
  }

  const rows: [string, string][] = [
    ['Name', d.name],
    ['Phone', d.phone],
    ['Email', d.email || '—'],
    ['Travel date', d.travelDate],
    ['Group size', d.groupSize],
    ['Interested in', d.interest],
    ['Notes', d.notes || '—'],
  ]
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')
  const html = `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#6b5d53;vertical-align:top"><b>${esc(k)}</b></td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table>`

  try {
    await tx.sendMail({
      from: env.MAIL_FROM || `"Via Kashi Website" <${env.SMTP_USER ?? DEFAULT_TO}>`,
      to: env.ENQUIRY_TO || DEFAULT_TO,
      replyTo: d.email || undefined,
      subject: `New website enquiry — ${d.name} (${d.interest})`,
      text,
      html,
    })
    return { status: 200, json: { ok: true } }
  } catch (err) {
    console.error('[enquiry] send failed:', err instanceof Error ? err.message : err)
    return { status: 502, json: { ok: false, message: 'The email could not be sent right now. Please try WhatsApp instead.' } }
  }
}
