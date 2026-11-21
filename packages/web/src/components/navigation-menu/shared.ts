export const root = 'ark-navigation-menu'
export const itemTag = 'ark-navigation-menu-item'

const contentValues = new WeakMap<HTMLElement, string>()

export const itemValueOf = (el: Element) => el.closest(itemTag)?.getAttribute('value') ?? ''

export function contentValueOf(el: HTMLElement) {
  let value = contentValues.get(el)
  if (value == null) {
    value = el.getAttribute('value') ?? itemValueOf(el)
    contentValues.set(el, value)
  }
  return value
}

export const dirOf = (el: Element) =>
  (el.parentElement?.closest('[dir]')?.getAttribute('dir') ?? undefined) as 'ltr' | 'rtl' | undefined
