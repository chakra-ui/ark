import * as combobox from '@zag-js/combobox'
import { defineCollection, grouping, type CollectionConfig, type Item } from '../../utils/collection.js'
export const root = 'ark-command'

export type CommandFilter = (itemText: string, inputValue: string, item: Item) => boolean

const toCollection = (items: Item[]) =>
  combobox.collection<Item>({
    items,
    ...grouping(items),
    itemToValue: (item) => item.value,
    itemToString: (item) => item.label,
    isItemDisabled: (item) => item.disabled,
  })

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

type CommandHost = HTMLElement & { filter?: CommandFilter; page?: string | null }

interface Tree {
  parentOf: (value: string) => string | null
  owners: Set<string>
}

const trees = new WeakMap<object, Tree>()

export function treeOf(el: HTMLElement): Tree {
  const source = collection.get(el)
  const cached = source && trees.get(source)
  if (cached) return cached
  const parents = new Map((source?.items ?? []).map((item) => [item.value, item.parent ?? null]))
  const parentOf = (value: string) => {
    const parent = parents.get(value) ?? null
    return parent != null && parents.has(parent) ? parent : null
  }
  const owners = new Set<string>()
  for (const value of parents.keys()) {
    const parent = parentOf(value)
    if (parent != null) owners.add(parent)
  }
  const tree = { parentOf, owners }
  if (source) trees.set(source, tree)
  return tree
}

export const pageOf = (el: HTMLElement) => {
  const page = (el as CommandHost).page ?? null
  return page != null && treeOf(el).owners.has(page) ? page : null
}

const filtered = new WeakMap<
  HTMLElement,
  { source: unknown; key: string; filter: unknown; result: ReturnType<typeof toCollection> }
>()

const contains = (text: string, query: string) => text.toLocaleLowerCase().includes(query.toLocaleLowerCase())

export const defaultFilter: CommandFilter = (itemText, inputValue, item) =>
  contains(itemText, inputValue) || !!item.keywords?.some((keyword) => contains(keyword, inputValue))

export const queryOf = (el: HTMLElement) =>
  el.getAttribute('input-value') ?? queries.get(el) ?? el.getAttribute('default-input-value') ?? ''

export function filteredOf(el: HTMLElement) {
  const source = collection.get(el)
  if (!source) return undefined
  const filter = (el as CommandHost).filter
  const query = queryOf(el).trim()
  const page = pageOf(el)
  const key = `${page ?? ''}\u0000${query}`
  const cached = filtered.get(el)
  if (cached && cached.source === source && cached.key === key && cached.filter === filter) return cached.result
  const tree = treeOf(el)
  const scoped = tree.owners.size > 0
  const match = filter ?? defaultFilter
  const items = source.items.filter(
    (item) => (!scoped || tree.parentOf(item.value) === page) && (!query || match(item.label, query, item)),
  )
  const result = toCollection(items)
  filtered.set(el, { source, key, filter, result })
  return result
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
