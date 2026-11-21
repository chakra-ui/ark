export const str = <T extends string = string>(el: Element, name: string) =>
  (el.getAttribute(name) ?? undefined) as T | undefined

export const num = (el: Element, name: string) => {
  const value = el.getAttribute(name)
  return value == null || value === '' ? undefined : Number(value)
}

export const list = (el: Element, name: string) => {
  const value = el.getAttribute(name)
  return value ? value.split(',').map((item) => item.trim()) : undefined
}

export const numbers = (el: Element, name: string) => list(el, name)?.map(Number)

export const controlled = (el: Element, name: string) =>
  el.hasAttribute(name) ? el.getAttribute(name) !== 'false' : undefined

export function positioning(el: Element) {
  const options: Record<string, unknown> = {}
  const placement = str(el, 'placement')
  const gutter = num(el, 'gutter')
  if (placement) options.placement = placement
  if (gutter != null) options.gutter = gutter
  if (el.hasAttribute('same-width')) options.sameWidth = true
  return options
}

export const positioningAttributes = ['placement', 'gutter', 'same-width']
