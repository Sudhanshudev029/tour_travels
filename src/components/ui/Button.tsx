import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'outline' | 'dark'

interface CommonProps {
  variant?: Variant
  size?: 'md' | 'sm'
  block?: boolean
  icon?: ReactNode
  children: ReactNode
}

type AnchorProps = CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'>
type NativeProps = CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

function classes({ variant = 'primary', size = 'md', block }: CommonProps, extra?: string) {
  return ['btn', variant !== 'primary' && `btn--${variant}`, size === 'sm' && 'btn--sm', block && 'btn--block', extra]
    .filter(Boolean)
    .join(' ')
}

/** Renders a router <Link> for in-app paths ("/boat"), a normal anchor for external URLs and mailto/tel. */
export function Button(props: AnchorProps | NativeProps) {
  const { variant, size, block, icon, children, ...rest } = props
  const cls = classes({ variant, size, block, children })
  if (typeof props.href === 'string') {
    const { href, className, ...a } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    const merged = [cls, className].filter(Boolean).join(' ')
    if (href.startsWith('/')) {
      return (
        <Link to={href} className={merged} {...a}>
          {icon}
          {children}
        </Link>
      )
    }
    const external = /^https?:/.test(href)
    return (
      <a href={href} className={merged} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...a}>
        {icon}
        {children}
      </a>
    )
  }
  const { className, type = 'button', ...b } = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type={type} className={[cls, className].filter(Boolean).join(' ')} {...b}>
      {icon}
      {children}
    </button>
  )
}
