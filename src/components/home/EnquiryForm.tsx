import { CheckCircle2, Loader2, MessageCircle, Send } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { business } from '../../config/business'
import { interestOptions, onInterestSelected } from '../../lib/enquiry'
import { isValidPhone, PHONE_ERROR } from '../../lib/phone'
import { sendEnquiry } from '../../lib/sendEnquiry'
import { buildEnquiryMessage, buildWhatsAppUrl } from '../../lib/whatsapp'
import { Button } from '../ui/Button'

interface Values {
  name: string
  phone: string
  email: string
  travelDate: string
  groupSize: string
  interest: string
  notes: string
}
type Errors = Partial<Record<keyof Values, string>>

const interestByKey: Record<string, (typeof interestOptions)[number]> = {
  package: 'Tour package',
  boat: 'Ganga boat ride',
  cab: 'Cab / local sightseeing',
  hotel: 'Hotel / accommodation',
  temple: 'Temple & spiritual tour',
  pilgrimage: 'Custom pilgrimage (Prayagraj / Ayodhya)',
}

const empty: Values = { name: '', phone: '', email: '', travelDate: '', groupSize: '2', interest: interestOptions[0], notes: '' }

const localISODate = (d = new Date()) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!isValidPhone(v.phone)) e.phone = PHONE_ERROR
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address or leave it blank.'
  if (!v.travelDate) e.travelDate = 'Choose your approximate travel date.'
  else if (v.travelDate < localISODate()) e.travelDate = 'Travel date cannot be in the past.'
  const g = Number(v.groupSize)
  if (!Number.isInteger(g) || g < 1 || g > 100) e.groupSize = 'Enter a group size between 1 and 100.'
  if (v.notes.length > 600) e.notes = 'Please keep notes under 600 characters.'
  return e
}

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'failed'; reason: string; whatsappUrl: string | null }

/** Enquiries are emailed via our /api/enquiry endpoint (Nodemailer). "Sent" is only shown after the server confirms. */
export function EnquiryForm() {
  const uid = useId()
  const [params] = useSearchParams()
  const prefill = (): Values => {
    const interest = interestByKey[params.get('interest') ?? '']
    const topic = (params.get('topic') ?? '').slice(0, 80)
    return { ...empty, ...(interest ? { interest } : {}), ...(topic ? { notes: `Enquiry about: ${topic}` } : {}) }
  }
  const [values, setValues] = useState<Values>(prefill)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const formRef = useRef<HTMLFormElement>(null)
  const honey = useRef<HTMLInputElement>(null)

  useEffect(() => onInterestSelected((interest) => setValues((v) => ({ ...v, interest }))), [])

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const submit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (status.kind === 'sending') return
    const errs = validate(values)
    setErrors(errs)
    const firstBad = (Object.keys(errs) as (keyof Values)[])[0]
    if (firstBad) {
      setStatus({ kind: 'idle' })
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus()
      return
    }
    setStatus({ kind: 'sending' })
    const pretty = new Date(`${values.travelDate}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    const details = { ...values, travelDate: pretty }
    const result = await sendEnquiry(details, honey.current?.value ?? '')
    if (result.ok) {
      setStatus({ kind: 'sent' })
      setValues(empty)
    } else {
      setStatus({ kind: 'failed', reason: result.reason, whatsappUrl: buildWhatsAppUrl(buildEnquiryMessage(details)) })
    }
  }

  const field = (k: keyof Values) => ({
    id: `${uid}-${k}`,
    name: k,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${uid}-${k}-err` : undefined,
  })
  const err = (k: keyof Values) =>
    errors[k] ? (
      <p className="field__err" id={`${uid}-${k}-err`}>
        {errors[k]}
      </p>
    ) : null

  if (status.kind === 'sent') {
    return (
      <div className="enq enq--done" role="status">
        <CheckCircle2 size={44} aria-hidden />
        <h3>Thank you — enquiry sent</h3>
        <p>
          Your enquiry has been emailed to {business.shortName}. We’ll get back to you on the phone number you shared.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus({ kind: 'idle' })}>
          Send another enquiry
        </Button>
      </div>
    )
  }

  const sending = status.kind === 'sending'

  return (
    <form ref={formRef} className="enq" onSubmit={submit} noValidate aria-labelledby={`${uid}-title`}>
      <h3 id={`${uid}-title`}>Plan your Kashi trip</h3>
      <p className="enq__intro">Tell us a little about your trip and we’ll reply with options and a quote.</p>

      {/* Honeypot: hidden from people, tempting to bots */}
      <input ref={honey} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="enq__honey" />

      <div className="enq__grid">
        <div className="field">
          <label htmlFor={`${uid}-name`}>Your name</label>
          <input {...field('name')} type="text" autoComplete="name" value={values.name} onChange={set('name')} required />
          {err('name')}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-phone`}>Phone number</label>
          <input {...field('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210 or +91…" maxLength={20} value={values.phone} onChange={set('phone')} required />
          {err('phone')}
        </div>
        <div className="field field--wide">
          <label htmlFor={`${uid}-email`}>Email (optional)</label>
          <input {...field('email')} type="email" autoComplete="email" value={values.email} onChange={set('email')} />
          {err('email')}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-travelDate`}>Approx. travel date</label>
          <input {...field('travelDate')} type="date" min={localISODate()} value={values.travelDate} onChange={set('travelDate')} required />
          {err('travelDate')}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-groupSize`}>Group size</label>
          <input {...field('groupSize')} type="number" inputMode="numeric" min={1} max={100} value={values.groupSize} onChange={set('groupSize')} required />
          {err('groupSize')}
        </div>
        <div className="field field--wide">
          <label htmlFor={`${uid}-interest`}>I’m interested in</label>
          <select {...field('interest')} value={values.interest} onChange={set('interest')}>
            {interestOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="field field--wide">
          <label htmlFor={`${uid}-notes`}>Travel preferences (optional)</label>
          <textarea {...field('notes')} rows={3} maxLength={600} placeholder="Elders travelling, boat ride at sunrise, Prayagraj add-on…" value={values.notes} onChange={set('notes')} />
          {err('notes')}
        </div>
      </div>

      {Object.values(errors).some(Boolean) && (
        <p className="enq__alert enq__alert--error" role="alert">
          Please fix the highlighted fields and try again.
        </p>
      )}

      <Button type="submit" block disabled={sending} aria-busy={sending} icon={sending ? <Loader2 size={18} className="spin" aria-hidden /> : <Send size={18} aria-hidden />}>
        {sending ? 'Sending…' : 'Send Enquiry'}
      </Button>

      <div aria-live="polite">
        {status.kind === 'failed' && (
          <div className="enq__alert enq__alert--error" role="alert">
            <p>
              <strong>We couldn’t send your enquiry.</strong> {status.reason}
            </p>
            {status.whatsappUrl && (
              <Button href={status.whatsappUrl} size="sm" variant="outline" icon={<MessageCircle size={16} aria-hidden />}>
                Send it on WhatsApp instead
              </Button>
            )}
          </div>
        )}
      </div>
      <p className="enq__fine">Your details are emailed to {business.shortName} and are not stored on this website.</p>
    </form>
  )
}
