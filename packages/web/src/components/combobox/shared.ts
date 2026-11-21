import type { ListCollection } from '@zag-js/collection'
import * as combobox from '@zag-js/combobox'

import { num, str } from '../../utils/attrs.js'
import { defineCollection, grouping, type Item } from '../../utils/collection.js'
import { rootOf } from '../../utils/define.js'

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

function matches(label: string, query: string, filter: Filter) {
  if (!query || filter === 'none') return true
  const text = label.toLocaleLowerCase()
  const q = query.toLocaleLowerCase()
  return filter === 'starts-with' ? text.startsWith(q) : text.includes(q)
}

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
  const items = source.items.filter((item) => matches(source.stringifyItem(item) ?? '', query, filter))
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
