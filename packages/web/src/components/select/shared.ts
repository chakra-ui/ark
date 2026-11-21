import type { ListCollection } from '@zag-js/collection'
import * as select from '@zag-js/select'
import { spreadProps } from '@zag-js/vanilla'

import { defineCollection, grouping, type Item } from '../../utils/collection.js'
import { rootOf, type RootElement } from '../../utils/define.js'

export const root = 'ark-select'

export const collection = defineCollection({
  item: 'ark-select-item',
  itemText: 'ark-select-item-text',
  list: 'ark-select-list',
  itemGroup: 'ark-select-item-group',
  itemGroupLabel: 'ark-select-item-group-label',
  create: (items: Item[]) => select.collection({ items, ...grouping(items) }),
})

export const itemOf = (part: HTMLElement) => {
  const value = collection.valueOf(part)
  const rootEl = rootOf<HTMLElement>(part, root)
  return value != null && rootEl ? collection.get(rootEl)?.find(value) : null
}

const syncedOptions = new WeakMap<HTMLSelectElement, unknown>()

function syncOptions(hidden: HTMLSelectElement, items: ListCollection) {
  if (syncedOptions.get(hidden) === items) return
  syncedOptions.set(hidden, items)
  const options = items.items.map((item) => new Option(items.stringifyItem(item) ?? '', items.getItemValue(item) ?? ''))
  hidden.replaceChildren(...options)
}

export function syncHiddenSelect(el: RootElement<select.Api>, hidden: HTMLSelectElement, api: select.Api) {
  syncOptions(hidden, api.collection)
  spreadProps(hidden, api.getHiddenSelectProps(), el.machineId)
  const value = new Set(api.value)
  for (const option of hidden.options) option.selected = value.has(option.value)
}

export const listOf = (el: Element, name: string) => {
  const attr = el.getAttribute(name)
  if (attr == null) return undefined
  return attr ? attr.split(',').map((value) => value.trim()) : []
}

export const hiddenSelects = new WeakMap<HTMLElement, HTMLSelectElement>()
