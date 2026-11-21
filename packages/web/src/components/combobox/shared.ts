import type { ListCollection } from '@zag-js/collection'
import * as combobox from '@zag-js/combobox'

import { num, str } from '../../utils/attrs.js'
import { defineCollection, grouping, type Item } from '../../utils/collection.js'
import { rootOf } from '../../utils/define.js'
import { filterOf } from '../../utils/locale.js'

export const root = 'ark-combobox'

export const collection = defineCollection<ListCollection>({
  item: 'ark-combobox-item',
  itemText: 'ark-combobox-item-text',
  list: 'ark-combobox-list',
  itemGroup: 'ark-combobox-item-group',
  itemGroupLabel: 'ark-combobox-item-group-label',
  create: (items: Item[]) => combobox.collection({ items, ...grouping(items) }),
})

type Filter = 'contains' | 'starts-with' | 'none'

export const queries = new WeakMap<HTMLElement, string>()

const filtered = new WeakMap<HTMLElement, { source: ListCollection; key: string; result: ListCollection }>()

export function filteredOf(el: HTMLElement) {
  const source = collection.get(el)
  if (!source) return undefined
  const filter = (str(el, 'filter') ?? 'contains') as Filter
  const limit = num(el, 'limit')
  const query = queries.get(el) ?? ''
  if ((!query || filter === 'none') && limit == null) return source
  const key = `${filter}|${limit}|${query}`
  const cached = filtered.get(el)
  if (cached && cached.source === source && cached.key === key) return cached.result
  const { contains, startsWith } = filterOf(el)
  const match = filter === 'starts-with' ? startsWith : contains

  const items =
    !query || filter === 'none'
      ? source.items
      : source.items.filter((item) => match(source.stringifyItem(item) ?? '', query))
  const result = source.setItems(limit == null ? items : items.slice(0, limit))
  filtered.set(el, { source, key, result })
  return result
}

export const hasGroup = (items: ListCollection, name: string) => items.group().some(([key]) => key === name)

export const listOf = (el: Element, name: string) => {
  const attr = el.getAttribute(name)
  if (attr == null) return undefined
  return attr ? attr.split(',').map((value) => value.trim()) : []
}

export const itemOf = (part: HTMLElement) => {
  const value = collection.valueOf(part)
  const rootEl = rootOf<HTMLElement>(part, root)
  return value != null && rootEl ? collection.get(rootEl)?.find(value) : null
}

export const isFilteredOut = (part: HTMLElement, value: string) => {
  const rootEl = rootOf<HTMLElement>(part, root)
  return !!rootEl && !filteredOf(rootEl)?.has(value)
}
