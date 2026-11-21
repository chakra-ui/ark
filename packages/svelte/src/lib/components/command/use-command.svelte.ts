import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import { isPageListCollection, type PageListCollection } from '@zag-js/collection'
import * as combobox from '@zag-js/combobox'
import { createFuzzySearch } from '@zag-js/fuzzy'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import type { CollectionItem, ListCollection } from '../collection/index.ts'

export type CommandFilter<T extends CollectionItem = CollectionItem> = (items: T[], query: string) => T[]

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
   * The collection of items. Use `createPageListCollection` for nested pages,
   * where an item with a `parent` value is shown on the page of that item.
   */
  collection: MaybeFunction<ListCollection<T> | PageListCollection<T>>
  /**
   * Returns the items that match the query, best match first.
   * Defaults to a fuzzy search of the item text and its `keywords`.
   */
  filter?: CommandFilter<T> | undefined
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
  path: T[]
  /**
   * Whether there's a page to go back to
   */
  canGoBack: boolean
  /**
   * Opens the page of an item, or the top level for `null`
   */
  setPage: (value: string | null) => void
  /**
   * Goes back to the previous page, restoring its query. Returns `false` when there's none.
   */
  back: () => boolean
  /**
   * Goes up to the parent page. Returns `false` at the top level.
   */
  up: () => boolean
  /**
   * Whether the item opens a page
   */
  isPage: (item: T) => boolean
  /**
   * The item's pages below the open page, e.g. to show where a search result lives
   */
  getAncestors: (item: T) => T[]
}

export interface UseCommandReturn<T extends CollectionItem> extends Accessor<CommandApi<T>> {}

const noValue: string[] = []

const keywordsOf = (item: unknown): string[] | undefined => {
  const keywords = (item as { keywords?: unknown } | null)?.keywords
  return Array.isArray(keywords) ? keywords.filter((keyword) => typeof keyword === 'string') : undefined
}

export const useCommand = <T extends CollectionItem>(props: MaybeFunction<UseCommandProps<T>>): UseCommandReturn<T> => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const resolvedProps = $derived(runIfFn(props))
  const collection = $derived(runIfFn(resolvedProps.collection))

  const initialProps = runIfFn(props)
  let localInputValue = $state(initialProps.defaultInputValue ?? '')
  const query = $derived((resolvedProps.inputValue ?? localInputValue).trim())

  let navigation = $state.raw<{ source: unknown; pages: PageListCollection<T> } | null>(null)
  const pages = $derived(
    navigation?.source === collection
      ? navigation.pages
      : isPageListCollection(collection)
        ? (collection as PageListCollection<T>)
        : null,
  )

  const fuzzy = $derived(
    createFuzzySearch<T>({ itemToString: (item) => collection.stringifyItem(item) ?? '', itemToKeywords: keywordsOf }),
  )

  const filteredCollection = $derived.by((): ListCollection<T> => {
    if (!query) return pages ?? collection
    const source = pages ? pages.getDescendants() : collection.items
    const filter = resolvedProps.filter
    const items = filter ? filter(source, query) : fuzzy.search(source, query)
    return (pages ?? collection).setItems(items) as ListCollection<T>
  })

  let pendingHighlight: string | null = null

  const navigate = (next: PageListCollection<T>, nextQuery: string) => {
    if (next === pages) return false
    navigation = { source: collection, pages: next }
    pendingHighlight = next.restore.highlightedValue
    api.setInputValue(nextQuery)
    resolvedProps.onPageChange?.({ page: next.page, item: next.pageItem })
    return true
  }

  const setPage = (value: string | null) => {
    if (pages) navigate(pages.setPage(value, query), '')
  }

  const back = () => {
    if (!pages?.canGoBack) return false
    const next = pages.back(query)
    return navigate(next, next.restore.query)
  }

  const up = () => (pages?.page != null ? navigate(pages.up(query), '') : false)

  const machineProps = $derived.by((): combobox.Props<T> => {
    const { collection: _collection, filter: _filter, onPageChange: _onPageChange, ...rest } = resolvedProps
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
        const item = pages?.getItem(details.itemValue)
        if (item && pages?.isPage(item)) {
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
          if (event.key !== 'Backspace' || target.value || !up()) return
          event.preventDefault()
        },
      })
    },
    page: pages?.page ?? null,
    path: pages?.getPath() ?? [],
    canGoBack: pages?.canGoBack ?? false,
    setPage,
    back,
    up,
    isPage: (item) => pages?.isPage(item) ?? false,
    getAncestors: (item) => pages?.getAncestors(item) ?? [],
  })

  return () => command
}
