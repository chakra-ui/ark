export const root = 'ark-field'
export const itemTag = 'ark-field-item'

export const itemValueOf = (el: HTMLElement) => {
  const item = el.closest(itemTag)
  return item && el.closest(root)?.contains(item) ? (item.getAttribute('value') ?? undefined) : undefined
}
