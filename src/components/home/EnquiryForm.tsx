import { Check, Copy, Send } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { hasWhatsApp } from '../../config/business'
import { interestOptions, onInterestSelected } from '../../lib/enquiry'
import { buildEnquiryMessage, buildWhatsAppUrl } from '../../lib/whatsapp'
import { Button } from '../ui/Button'

interface Values {
  name: string
  phone: string
  travelDate: string
  groupSize: string
  interest: string
  notes: string
}
type Errors = Partial<Record<keyof Values, string>>

const empty: Values = { name: '', phone: '', travelDate: '', groupSize: '2', interest: interestOptions[0], notes: '' }

const localISODate = (d = new Date()) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  const digits = v.phone.replace(/\D/g, '')
  if (!/^[+\d\s()-]+$/.test(v.phone.trim()) || digits.length < 7 || digits.length > 15) e.phone = 'Enter a valid phone number (7–15 digits).'
  if (!v.travelDate) e.travelDate = 'Choose your approximate travel date.'
  else if (v.travelDate < localISODate()) e.travelDate = 'Travel date cannot be in the past.'
  const g = Number(v.groupSize)
  if (!Number.isInteger(g) || g < 1 || g > 100) e.groupSize = 'Enter a group size between 1 and 100.'
  if (v.notes.length > 600) e.notes = 'Please keep notes under 600 characters.'
  return e
}

type Status = { kind: 'idle' } | { kind: 'opened' } | { kind: 'unconfigured'; message: string }

/**
 * Frontend-only enquiry. There is no backend: submitting prepares a WhatsApp message with the
 * entered details. We never claim an enquiry was "submitted" — the visitor sends it in WhatsApp.
 */
export function EnquiryForm() {
  const uid = useId()
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [copied, setCopied] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => onInterestSelected((interest) => setValues((v) => ({ ...v, interest }))), [])

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setStatus({ kind: 'idle' })
    const firstBad = (Object.keys(errs) as (keyof Values)[])[0]
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus()
      return
    }
    const pretty = new Date(`${values.travelDate}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    const message = buildEnquiryMessage({ ...values, travelDate: pretty })
    const url = buildWhatsAppUrl(message)
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
      setStatus({ kind: 'opened' })
    } else {
      setStatus({ kind: 'unconfigured', message })
    }
  }

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      /* clipboard unavailable — the text stays selectable in the box */
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

  return (
    <form ref={formRef} className="enq" onSubmit={submit} noValidate aria-labelledby={`${uid}-title`}>
      <h3 id={`${uid}-title`}>Plan your Kashi trip</h3>
      <p className="enq__intro">
        Tell us a little about your trip. {hasWhatsApp ? 'This opens WhatsApp with your details filled in.' : 'WhatsApp is not connected yet, so we’ll prepare your message for you to copy.'}
      </p>

      <div className="enq__grid">
        <div className="field">
          <label htmlFor={`${uid}-name`}>Your name</label>
          <input {...field('name')} type="text" autoComplete="name" value={values.name} onChange={set('name')} required />
          {err('name')}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-phone`}>Phone number</label>
          <input {...field('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91…" value={values.phone} onChange={set('phone')} required />
          {err('phone')}
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

      <Button type="submit" block icon={<Send size={18} aria-hidden />}>
        {hasWhatsApp ? 'Continue on WhatsApp' : 'Prepare my enquiry'}
      </Button>

      <div aria-live="polite">
        {status.kind === 'opened' && (
          <p className="enq__alert enq__alert--info">
            WhatsApp should open in a new tab with your details filled in. Your enquiry has not been sent until you press <strong>Send</strong> there.
          </p>
        )}
        {status.kind === 'unconfigured' && (
          <div className="enq__alert enq__alert--info">
            <p>
              <strong>Nothing has been sent.</strong> This site has no WhatsApp number or server connected yet. Copy your prepared message below and send it to the business once contact details are available.
            </p>
            <textarea readOnly rows={7} value={status.message} aria-label="Prepared enquiry message" onFocus={(e) => e.currentTarget.select()} />
            <Button size="sm" variant="outline" onClick={() => copy(status.message)} icon={copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}>
              {copied ? 'Copied' : 'Copy message'}
            </Button>
          </div>
        )}
      </div>
      <p className="enq__fine">This form has no server behind it — your details are not stored anywhere by this website.</p>
    </form>
  )
}
