import * as combobox from '@zag-js/combobox'
import { num, str } from '../../utils/attrs.js'
import { defineCollection, grouping, type Item } from '../../utils/collection.js'
export const root = 'ark-combobox'

const toCollection = (items: Item[]) =>
  combobox.collection<Item>({
    items,
    ...grouping(items),
    itemToValue: (item) => item.value,
    itemToString: (item) => item.label,
    isItemDisabled: (item) => item.disabled,
  })

export const collection = defineCollection({
  item: 'ark-combobox-item',
  itemText: 'ark-combobox-item-text',
  list: 'ark-combobox-list',
  itemGroup: 'ark-combobox-item-group',
  itemGroupLabel: 'ark-combobox-item-group-label',
  create: toCollection,
})

type Filter = 'contains' | 'starts-with' | 'none'

export const queries = new WeakMap<HTMLElement, string>()

const filtered = new WeakMap<HTMLElement, { source: unknown; key: string; result: ReturnType<typeof toCollection> }>()

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
  const key = `${filter}|${limit}|${query}`
  const cached = filtered.get(el)
  if (cached && cached.source === source && cached.key === key) return cached.result
  const items = source.items.filter((item) => matches(item.label, query, filter))
  const result = toCollection(limit == null ? items : items.slice(0, limit))
  filtered.set(el, { source, key, result })
  return result
}

export const listOf = (el: Element, name: string) => {
  const attr = el.getAttribute(name)
  if (attr == null) return undefined
  return attr ? attr.split(',').map((value) => value.trim()) : []
}

export const itemOf = (part: HTMLElement) => {
  const value = collection.valueOf(part)
  const rootEl = part.closest<HTMLElement>(root)
  return value != null && rootEl ? collection.get(rootEl)?.find(value) : null
}

export const isFilteredOut = (part: HTMLElement, value: string) => {
  const rootEl = part.closest<HTMLElement>(root)
  return !!rootEl && !filteredOf(rootEl)?.has(value)
}
