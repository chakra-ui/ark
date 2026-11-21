import type * as drawer from '@zag-js/drawer'

import { list, str } from '../../utils/attrs.js'

export const root = 'ark-drawer'

type Dir = 'ltr' | 'rtl'

export const dirOf = (el: Element): Dir | undefined => {
  const own = str<Dir>(el, 'dir')
  if (own) return own

  const inherited = el.parentElement?.closest('[dir]')?.getAttribute('dir')
  return (inherited as Dir | null) ?? undefined
}

export const unlessFalse = (el: Element, name: string) => {
  return el.getAttribute(name) === 'false' ? false : undefined
}

export const swipeDirectionOf = (el: Element) => {
  return str<drawer.SwipeDirection>(el, 'swipe-direction')
}

const toSnapPoint = (value: string): drawer.SnapPoint => {
  const trimmed = value.trim()
  const number = Number(trimmed)
  return trimmed !== '' && Number.isFinite(number) ? number : trimmed
}

export const snapPointsOf = (el: Element) => {
  return list(el, 'snap-points')?.map(toSnapPoint)
}

export const snapPointOf = (el: Element, name: string) => {
  const value = el.getAttribute(name)
  if (value == null) return undefined
  return value === '' ? null : toSnapPoint(value)
}

export const focusEl = (el: Element, name: string) => {
  const selector = str(el, name)
  if (!selector) return undefined

  return () => {
    const own = el.querySelector<HTMLElement>(selector)
    return own ?? (el.getRootNode() as ParentNode).querySelector<HTMLElement>(selector)
  }
}
