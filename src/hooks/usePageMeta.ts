import { useEffect } from 'react'

const SITE = 'Via Kashi Tour & Travels'

/** Sets the document title and meta description for the current route. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title.includes(SITE) ? title : `${title} | ${SITE}`
    const set = (selector: string, attr: string, value: string) => document.head.querySelector(selector)?.setAttribute(attr, value)
    set('meta[name="description"]', 'content', description)
    set('meta[property="og:title"]', 'content', document.title)
    set('meta[property="og:description"]', 'content', description)
  }, [title, description])
}
