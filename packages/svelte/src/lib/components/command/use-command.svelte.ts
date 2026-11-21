import { useEnvironmentContext } from '$lib/providers/environment'
import { useFilter, useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import * as combobox from '@zag-js/combobox'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import type { CollectionItem, ListCollection } from '../collection/index.ts'

export type CommandFilter<T extends CollectionItem = CollectionItem> = (
  itemText: string,
  inputValue: string,
  item: T,
) => boolean

export interface CommandPageChangeDetails<T extends CollectionItem = CollectionItem> {
  page: string | null
  item: T | null
}

export interface UseCommandProps<T extends CollectionItem> extends Pick<
  combobox.Props<T>,
  | 'autoFocus'
  | 'defaultHighlightedValue'
  | 'defaultInputValue'
  | 'disabled'
  | 'highlightedValue'
  | 'id'
  | 'ids'
  | 'inputValue'
  | 'loading'
  | 'loopFocus'
  | 'navigate'
  | 'onHighlightChange'
  | 'onInputValueChange'
  | 'onSelect'
  | 'placeholder'
  | 'scrollToIndexFn'
  | 'translations'
> {
  /**
   * The collection of items. Items are filtered by the input value.
   * An item with a `parent` value is shown on the page of that item.
   */
  collection: MaybeFunction<ListCollection<T>>
  /**
   * The function used to match an item against the input value.
   * Defaults to a case-insensitive contains match on the item text and its `keywords`.
   */
  filter?: CommandFilter<T> | undefined
  /**
   * The initial page to show, as the value of the item that owns it.
   */
  defaultPage?: string | null | undefined
  /**
   * Function called when the page changes
   */
  onPageChange?: ((details: CommandPageChangeDetails<T>) => void) | undefined
}

export interface CommandApi<T extends CollectionItem> extends combobox.Api<PropTypes, T> {
  /**
   * The value of the item whose page is open, or `null` at the top level
   */
  page: string | null
  /**
   * The items from the top level to the open page
   */
  pages: T[]
  /**
   * Opens the page of an item, or the top level for `null`
   */
  setPage: (value: string | null) => void
  /**
   * Goes up one page. Returns `false` at the top level.
   */
  popPage: () => boolean
  /**
   * Whether the item has a page of child items
   */
  isPage: (item: T) => boolean
}

export interface UseCommandReturn<T extends CollectionItem> extends Accessor<CommandApi<T>> {}

const noValue: string[] = []

const keywordsOf = (item: unknown): string[] => {
  const keywords = (item as { keywords?: unknown } | null)?.keywords
  return Array.isArray(keywords) ? keywords.filter((keyword) => typeof keyword === 'string') : []
}

const parentOf = (item: unknown): string | null => {
  const parent = (item as { parent?: unknown } | null)?.parent
  return typeof parent === 'string' ? parent : null
}

export const useCommand = <T extends CollectionItem>(props: MaybeFunction<UseCommandProps<T>>): UseCommandReturn<T> => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const { contains } = useFilter({ sensitivity: 'base' })

  const resolvedProps = $derived(runIfFn(props))
  const collection = $derived(runIfFn(resolvedProps.collection))

  const initialProps = runIfFn(props)
  let localInputValue = $state(initialProps.defaultInputValue ?? '')
  let page = $state<string | null>(initialProps.defaultPage ?? null)
  const query = $derived((resolvedProps.inputValue ?? localInputValue).trim())

  const tree = $derived.by(() => {
    const parents = new Map<string, string | null>()
    for (const item of collection.items) parents.set(collection.getItemValue(item) ?? '', parentOf(item))
    const parentValue = (value: string) => {
      const parent = parents.get(value) ?? null
      return parent != null && parents.has(parent) ? parent : null
    }
    const owners = new Set<string>()
    for (const value of parents.keys()) {
      const parent = parentValue(value)
      if (parent != null) owners.add(parent)
    }
    return { parentValue, owners }
  })

  const currentPage = $derived(page != null && tree.owners.has(page) ? page : null)

  const pages = $derived.by(() => {
    const path: T[] = []
    let value = currentPage
    while (value != null && path.length <= collection.size) {
      const item = collection.find(value)
      if (!item) break
      path.unshift(item)
      value = tree.parentValue(value)
    }
    return path
  })

  const filteredCollection = $derived.by(() => {
    const scoped = tree.owners.size > 0
    if (!query && !scoped) return collection
    const filter = resolvedProps.filter
    const match: CommandFilter<T> =
      filter ??
      ((itemText, inputValue, item) =>
        contains(itemText, inputValue) || keywordsOf(item).some((keyword) => contains(keyword, inputValue)))
    return collection.filter((itemText, _index, item) => {
      if (scoped && tree.parentValue(collection.getItemValue(item) ?? '') !== currentPage) return false
      return !query || match(itemText, query, item)
    })
  })

  let pendingHighlight: string | null = null

  const setPage = (value: string | null) => {
    const next = value != null && tree.owners.has(value) ? value : null
    if (next === currentPage) return
    const values = pages.map((item) => collection.getItemValue(item))
    const depth = next == null ? 0 : values.indexOf(next) + 1
    pendingHighlight = next == null || depth > 0 ? (values[depth] ?? null) : null
    page = next
    api.setInputValue('')
    resolvedProps.onPageChange?.({ page: next, item: next != null ? collection.find(next) : null })
  }

  const popPage = () => {
    if (currentPage == null) return false
    setPage(tree.parentValue(currentPage))
    return true
  }

  const isPage = (item: T) => tree.owners.has(collection.getItemValue(item) ?? '')

  const machineProps = $derived.by((): combobox.Props<T> => {
    const {
      collection: _collection,
      filter: _filter,
      defaultPage: _defaultPage,
      onPageChange: _onPageChange,
      ...rest
    } = resolvedProps
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      loopFocus: false,
      defaultHighlightedValue: filteredCollection.firstValue,
      ...rest,
      collection: filteredCollection,
      inline: true,
      allowCustomValue: true,
      inputBehavior: 'autohighlight',
      selectionBehavior: 'preserve',
      value: noValue,
      onInputValueChange(details) {
        localInputValue = details.inputValue
        resolvedProps.onInputValueChange?.(details)
      },
      onSelect(details) {
        if (tree.owners.has(details.itemValue)) {
          setPage(details.itemValue)
          return
        }
        resolvedProps.onSelect?.(details)
      },
    }
  })

  const service = useMachine(combobox.machine, () => machineProps)
  const api = $derived(combobox.connect(service, normalizeProps))

  $effect(() => {
    const visible = filteredCollection
    const value = pendingHighlight
    if (value == null || !visible.has(value)) return
    pendingHighlight = null
    const frame = requestAnimationFrame(() => api.setHighlightedValue(value))
    return () => cancelAnimationFrame(frame)
  })

  const command = $derived<CommandApi<T>>({
    ...api,
    getInputProps() {
      return mergeProps(api.getInputProps(), {
        onkeydown(event: KeyboardEvent) {
          const target = event.currentTarget as HTMLInputElement
          if (event.key !== 'Backspace' || target.value || !popPage()) return
          event.preventDefault()
        },
      })
    },
    page: currentPage,
    pages,
    setPage,
    popPage,
    isPage,
  })

  return () => command
}
