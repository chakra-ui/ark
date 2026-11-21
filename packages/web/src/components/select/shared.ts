import * as select from '@zag-js/select'
import { spreadProps } from '@zag-js/vanilla'
import { defineCollection, grouping, type Item } from '../../utils/collection.js'
import type { RootElement } from '../../utils/define.js'
export const root = 'ark-select'

export const collection = defineCollection({
  item: 'ark-select-item',
  itemText: 'ark-select-item-text',
  list: 'ark-select-list',
  itemGroup: 'ark-select-item-group',
  itemGroupLabel: 'ark-select-item-group-label',
  create: (items) =>
    select.collection<Item>({
      items,
      ...grouping(items),
      itemToValue: (item) => item.value,
      itemToString: (item) => item.label,
      isItemDisabled: (item) => item.disabled,
    }),
})

export const itemOf = (part: HTMLElement) => {
  const value = collection.valueOf(part)
  const rootEl = part.closest<HTMLElement>(root)
  return value != null && rootEl ? collection.get(rootEl)?.find(value) : null
}

export function syncHiddenSelect(el: RootElement<select.Api>, hidden: HTMLSelectElement, api: select.Api) {
  const items = collection.get(el)?.items ?? []
  if (hidden.options.length !== items.length || items.some((item, i) => hidden.options[i]?.value !== item.value)) {
    hidden.replaceChildren(...items.map((item) => new Option(item.label, item.value)))
  }
  spreadProps(hidden, api.getHiddenSelectProps(), el.machineId)
  for (const option of hidden.options) option.selected = api.value.includes(option.value)
}

export const listOf = (el: Element, name: string) => {
  const attr = el.getAttribute(name)
  if (attr == null) return undefined
  return attr ? attr.split(',').map((value) => value.trim()) : []
}

export const hiddenSelects = new WeakMap<HTMLElement, HTMLSelectElement>()
