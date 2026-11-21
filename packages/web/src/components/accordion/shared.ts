import type * as accordion from '@zag-js/accordion'
export const root = 'ark-accordion'

export const itemTag = 'ark-accordion-item'

export const contentTag = 'ark-accordion-item-content'

export const listOf = (attr: string | null) => (attr ? attr.split(',').map((value) => value.trim()) : undefined)

export const itemPropsOf = (part: HTMLElement): accordion.ItemProps | null => {
  const item = part.closest(itemTag)
  const value = item?.getAttribute('value')
  return value == null ? null : { value, disabled: item!.hasAttribute('disabled') }
}
