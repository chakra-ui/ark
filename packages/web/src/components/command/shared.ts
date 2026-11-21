import { PageListCollection } from '@zag-js/collection'
import { createFuzzySearch, type FuzzySearch } from '@zag-js/fuzzy'
import { defineCollection, grouping, type CollectionConfig, type Item } from '../../utils/collection.js'
export const root = 'ark-command'

export type CommandFilter = (items: Item[], query: string) => Item[]

const toCollection = (items: Item[]) =>
  new PageListCollection<Item>({
    items,
    ...grouping(items),
    itemToValue: (item) => item.value,
    itemToString: (item) => item.label,
    isItemDisabled: (item) => item.disabled,
  })

export type Pages = ReturnType<typeof toCollection>

const keywordsOf = (value: string | null) =>
  value
    ?.split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean)

function readMarkup<C>(el: HTMLElement, config: CollectionConfig<C>): Item[] {
  return Array.from(el.querySelectorAll<HTMLElement>(`${config.item}:not([data-rendered])`), (item) => ({
    value: item.getAttribute('value') ?? '',
    label: (item.querySelector(config.itemText) ?? item).textContent?.trim() ?? '',
    disabled: item.hasAttribute('disabled'),
    group: (config.itemGroup && item.closest(config.itemGroup)?.getAttribute('name')) || undefined,
    keywords: keywordsOf(item.getAttribute('keywords')),
    parent: item.getAttribute('parent') ?? undefined,
  }))
}

export const collection = defineCollection({
  item: 'ark-command-item',
  itemText: 'ark-command-item-text',
  list: 'ark-command-list',
  itemGroup: 'ark-command-item-group',
  itemGroupLabel: 'ark-command-item-group-label',
  attributes: ['keywords', 'parent'],
  readMarkup,
  create: toCollection,
})

export const queries = new WeakMap<HTMLElement, string>()

type CommandHost = HTMLElement & { filter?: CommandFilter }

const navigation = new WeakMap<HTMLElement, { source: Pages; pages: Pages }>()

export function pagesOf(el: HTMLElement): Pages | undefined {
  const source = collection.get(el)
  const current = navigation.get(el)
  return current && current.source === source ? current.pages : source
}

export function setPages(el: HTMLElement, pages: Pages) {
  const source = collection.get(el)
  if (source) navigation.set(el, { source, pages })
}

const searches = new WeakMap<Pages, FuzzySearch<Item>>()

function searchOf(source: Pages) {
  let search = searches.get(source)
  if (!search) {
    search = createFuzzySearch<Item>({ itemToString: (item) => item.label, itemToKeywords: (item) => item.keywords })
    searches.set(source, search)
  }
  return search
}

export const queryOf = (el: HTMLElement) =>
  el.getAttribute('input-value') ?? queries.get(el) ?? el.getAttribute('default-input-value') ?? ''

const descendants = new WeakMap<Pages, Item[]>()

const filtered = new WeakMap<HTMLElement, { pages: Pages; query: string; filter: unknown; result: Pages }>()

export function filteredOf(el: HTMLElement) {
  const source = collection.get(el)
  const pages = pagesOf(el)
  if (!source || !pages) return undefined
  const filter = (el as CommandHost).filter
  const query = queryOf(el).trim()
  if (!query) return pages
  const cached = filtered.get(el)
  if (cached && cached.pages === pages && cached.query === query && cached.filter === filter) return cached.result
  let items = descendants.get(pages)
  if (!items) {
    items = pages.getDescendants()
    descendants.set(pages, items)
  }
  const matches = new Set(filter ? filter(items, query) : searchOf(source).search(items, query))
  const result = pages.setItems(pages.allItems.filter((item) => matches.has(item)))
  filtered.set(el, { pages, query, filter, result })
  return result
}

export const itemOf = (part: HTMLElement) => {
  const value = collection.valueOf(part)
  const rootEl = part.closest<HTMLElement>(root)
  return value != null && rootEl ? collection.get(rootEl)?.getItem(value) : null
}

export const isFilteredOut = (part: HTMLElement, value: string) => {
  const rootEl = part.closest<HTMLElement>(root)
  return !!rootEl && !filteredOf(rootEl)?.has(value)
}
