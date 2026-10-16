import { handleEnquiry } from '../../server/enquiry.ts'

// Served at /api/enquiry (see `config.path`). SMTP_* / ENQUIRY_TO come from Netlify environment variables.
export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') return Response.json({ ok: false, message: 'Method not allowed.' }, { status: 405, headers: { Allow: 'POST' } })
  const body = await req.json().catch(() => null)
  const ip = req.headers.get('x-nf-client-connection-ip') ?? req.headers.get('x-forwarded-for') ?? 'anon'
  const { status, json } = await handleEnquiry(body, process.env, ip)
  return Response.json(json, { status })
}

export const config = { path: '/api/enquiry' }
