export const root = 'ark-field'
export const itemTag = 'ark-field-item'

/** The value of the `ark-field-item` a part sits in, when that item belongs to the part's own field. */
export const itemValueOf = (el: HTMLElement) => {
  const item = el.closest(itemTag)
  return item && el.closest(root)?.contains(item) ? (item.getAttribute('value') ?? undefined) : undefined
}
