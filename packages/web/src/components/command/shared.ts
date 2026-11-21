import { type CollectionItem, isPageListCollection, type ListCollection, PageListCollection } from '@zag-js/collection'
import { createFuzzySearch, type FuzzySearch } from '@zag-js/fuzzy'

import { defineCollection, grouping, type CollectionConfig, type Item } from '../../utils/collection.js'

import { rootOf } from '../../utils/define.js'
export const root = 'ark-command'

export type CommandFilter<T extends CollectionItem = CollectionItem> = (items: T[], query: string) => T[]

export type Pages = PageListCollection

export type Source = ListCollection | PageListCollection

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

export const collection = defineCollection<Source>({
  item: 'ark-command-item',
  itemText: 'ark-command-item-text',
  list: 'ark-command-list',
  itemGroup: 'ark-command-item-group',
  itemGroupLabel: 'ark-command-item-group-label',
  attributes: ['keywords', 'parent'],
  readMarkup,
  create: (items: Item[]) => new PageListCollection({ items, ...grouping(items) }),
})

export const queries = new WeakMap<HTMLElement, string>()

type CommandHost = HTMLElement & { filter?: CommandFilter }

const navigation = new WeakMap<HTMLElement, { source: Source; pages: Pages }>()

export function pagesOf(el: HTMLElement): Pages | undefined {
  const source = collection.get(el)
  const current = navigation.get(el)
  if (current && current.source === source) return current.pages
  return source && isPageListCollection(source) ? (source as Pages) : undefined
}

export function setPages(el: HTMLElement, pages: Pages) {
  const source = collection.get(el)
  if (source) navigation.set(el, { source, pages })
}

const itemKeywords = (item: unknown): string[] | undefined => {
  const keywords = (item as { keywords?: unknown } | null)?.keywords
  return Array.isArray(keywords) ? keywords.filter((keyword) => typeof keyword === 'string') : undefined
}

const searches = new WeakMap<Source, FuzzySearch<CollectionItem>>()

function searchOf(source: Source) {
  let search = searches.get(source)
  if (!search) {
    search = createFuzzySearch<CollectionItem>({
      itemToString: (item) => source.stringifyItem(item) ?? '',
      itemToKeywords: itemKeywords,
    })
    searches.set(source, search)
  }
  return search
}

export const queryOf = (el: HTMLElement) =>
  el.getAttribute('input-value') ?? queries.get(el) ?? el.getAttribute('default-input-value') ?? ''

const descendants = new WeakMap<Pages, CollectionItem[]>()

function searchableOf(pages: Pages) {
  let items = descendants.get(pages)
  if (!items) {
    items = pages.getDescendants()
    descendants.set(pages, items)
  }
  return items
}

const filtered = new WeakMap<HTMLElement, { view: Source; query: string; filter: unknown; result: Source }>()

export function filteredOf(el: HTMLElement): Source | undefined {
  const source = collection.get(el)
  if (!source) return undefined
  const pages = pagesOf(el)
  const view = pages ?? source
  const filter = (el as CommandHost).filter
  const query = queryOf(el).trim()
  if (!query) return view
  const cached = filtered.get(el)
  if (cached && cached.view === view && cached.query === query && cached.filter === filter) return cached.result
  const searchable = pages ? searchableOf(pages) : source.items
  const matches = new Set(filter ? filter(searchable, query) : searchOf(source).search(searchable, query))
  const ordered = pages ? pages.allItems : source.items
  const result = view.setItems(ordered.filter((item) => matches.has(item)))
  filtered.set(el, { view, query, filter, result })
  return result
}

export const hasGroup = (items: Source, name: string) => items.group().some(([key]) => key === name)

export const itemOf = (part: HTMLElement) => {
  const value = collection.valueOf(part)
  const rootEl = rootOf<HTMLElement>(part, root)
  const source = rootEl ? collection.get(rootEl) : undefined
  if (value == null || !source) return null
  return isPageListCollection(source) ? (source as Pages).getItem(value) : source.find(value)
}

export const isFilteredOut = (part: HTMLElement, value: string) => {
  const rootEl = rootOf<HTMLElement>(part, root)
  return !!rootEl && !filteredOf(rootEl)?.has(value)
}
