import { MessageCircle, Send } from 'lucide-react'
import { hasWhatsApp } from '../../config/business'
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../../lib/whatsapp'
import { Button } from './Button'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'dark'
  size?: 'md' | 'sm'
  message?: string
  label?: string
  /** Shown instead of `label` while no real WhatsApp number is configured. */
  fallbackLabel?: string
  block?: boolean
}

/**
 * Opens WhatsApp when a real number is configured. Otherwise it honestly falls back to the
 * on-page enquiry form instead of pointing at a fake number.
 */
export function WhatsAppButton({ variant, size, message = DEFAULT_WHATSAPP_MESSAGE, label, fallbackLabel = 'Plan Your Kashi Trip', block }: Props) {
  const url = buildWhatsAppUrl(message)
  if (url) {
    return (
      <Button href={url} variant={variant} size={size} block={block} icon={<MessageCircle size={18} aria-hidden />}>
        {label ?? 'Chat on WhatsApp'}
      </Button>
    )
  }
  return (
    <Button href="#enquiry" variant={variant} size={size} block={block} icon={<Send size={17} aria-hidden />} data-whatsapp-unconfigured={!hasWhatsApp}>
      {fallbackLabel}
    </Button>
  )
}
