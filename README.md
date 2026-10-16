# Via Kashi Tour & Travels — Phase 1 (Homepage)

React 19 + TypeScript + Vite, plain CSS tokens, `three` + `@react-three/fiber` for the hero scene.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
npm run lint
```

## Before launch
- Edit `src/config/business.ts` (or copy `.env.example` to `.env`): name, phone, **WhatsApp number (digits only)**, email, address, socials. Until a WhatsApp number is set, CTAs fall back to the on-page enquiry form and say so.
- Replace suggested packages in `src/data/packages.ts` and set `startingPrice` only with real prices.
- Add real, permissioned reviews to `src/data/testimonials.ts`, then set `showTestimonials: true`.
- Photos are from Wikimedia Commons (CC BY / CC BY-SA, GODL-India for one). Attribution is listed in the footer ("Photo credits") — keep it, or swap in the client's own photography.
- Add `<link rel="canonical">`, Open Graph image and LocalBusiness schema once the production domain and facts are known.

## Enquiry emails (Nodemailer)
The form posts to `/api/enquiry`, handled by `server/enquiry.ts` (Nodemailer over SMTP). It runs as a Netlify Function in production (`netlify/functions/enquiry.ts`) and as Vite middleware on `npm run dev` / `npm run preview`.

Server-only variables (never prefix with `VITE_`): `SMTP_USER`, `SMTP_PASS`, `ENQUIRY_TO` (default `viakashitours@gmail.com`), optional `SMTP_HOST`/`SMTP_PORT`/`MAIL_FROM`.
- Gmail: enable 2-Step Verification, then create an **App Password** at https://myaccount.google.com/apppasswords and use it as `SMTP_PASS`.
- Local: put them in `.env` (git-ignored) and restart `npm run dev`.
- Netlify: add the same keys under *Site configuration → Environment variables*, then redeploy.
