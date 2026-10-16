import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { handleEnquiry } from './server/enquiry.ts'

/** Serves POST /api/enquiry on `vite` and `vite preview` with the same handler Netlify runs in production. */
function enquiryApi(env: Record<string, string>): Plugin {
  const middleware = async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (req.url?.split('?')[0] !== '/api/enquiry') return next()
    const send = (status: number, json: unknown) => {
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(json))
    }
    if (req.method !== 'POST') return send(405, { ok: false, message: 'Method not allowed.' })
    let raw = ''
    for await (const chunk of req) {
      raw += chunk
      if (raw.length > 20_000) return send(413, { ok: false, message: 'Request too large.' })
    }
    let body: unknown = null
    try {
      body = JSON.parse(raw)
    } catch {
      /* handled as invalid below */
    }
    const { status, json } = await handleEnquiry(body, env, req.socket.remoteAddress ?? 'local')
    send(status, json)
  }
  return {
    name: 'enquiry-api',
    configureServer: (s) => void s.middlewares.use(middleware),
    configurePreviewServer: (s) => void s.middlewares.use(middleware),
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // loadEnv with '' prefix also reads server-only vars (SMTP_*); they are never sent to the browser.
  plugins: [react(), enquiryApi(loadEnv(mode, process.cwd(), ''))],
}))
