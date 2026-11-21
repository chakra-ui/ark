'use client'

import { isPageListCollection, type PageListCollection } from '@zag-js/collection'
import * as combobox from '@zag-js/combobox'
import { createFuzzySearch } from '@zag-js/fuzzy'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/react'
import { type KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
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
   * The unique identifier of the command
   */
  id?: string | undefined
  /**
   * The collection of items. Use `createPageListCollection` for nested pages,
   * where an item with a `parent` value is shown on the page of that item.
   */
  collection: ListCollection<T> | PageListCollection<T>
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

export interface UseCommandReturn<T extends CollectionItem> extends combobox.Api<PropTypes, T> {
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

const noValue: string[] = []

const keywordsOf = (item: unknown): string[] | undefined => {
  const keywords = (item as { keywords?: unknown } | null)?.keywords
  return Array.isArray(keywords) ? keywords.filter((keyword) => typeof keyword === 'string') : undefined
}

export const useCommand = <T extends CollectionItem>(props: UseCommandProps<T>): UseCommandReturn<T> => {
  const { collection, filter, onPageChange, ...rest } = props
  const id = useId()
  const { dir } = useLocaleContext()
  const { getRootNode } = useEnvironmentContext()

  const [localInputValue, setLocalInputValue] = useState(props.defaultInputValue ?? '')
  const query = (props.inputValue ?? localInputValue).trim()

  const [navigation, setNavigation] = useState<{ source: unknown; pages: PageListCollection<T> } | null>(null)
  const pages =
    navigation?.source === collection
      ? navigation.pages
      : isPageListCollection(collection)
        ? (collection as PageListCollection<T>)
        : null

  const fuzzy = useMemo(
    () =>
      createFuzzySearch<T>({
        itemToString: (item) => collection.stringifyItem(item) ?? '',
        itemToKeywords: keywordsOf,
      }),
    [collection],
  )

  const filteredCollection = useMemo((): ListCollection<T> => {
    if (!query) return pages ?? collection
    const source = pages ? pages.getDescendants() : collection.items
    const items = filter ? filter(source, query) : fuzzy.search(source, query)
    return (pages ?? collection).setItems(items) as ListCollection<T>
  }, [collection, pages, query, filter, fuzzy])

  const pendingHighlightRef = useRef<string | null>(null)
  const apiRef = useRef<combobox.Api<PropTypes, T> | null>(null)

  const navigate = (next: PageListCollection<T>, nextQuery: string) => {
    if (next === pages) return false
    setNavigation({ source: collection, pages: next })
    pendingHighlightRef.current = next.restore.highlightedValue
    apiRef.current?.setInputValue(nextQuery)
    onPageChange?.({ page: next.page, item: next.pageItem })
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

  const machineProps: combobox.Props<T> = {
    id,
    dir,
    getRootNode,
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
      setLocalInputValue(details.inputValue)
      props.onInputValueChange?.(details)
    },
    onSelect(details) {
      const item = pages?.getItem(details.itemValue)
      if (item && pages?.isPage(item)) {
        setPage(details.itemValue)
        return
      }
      props.onSelect?.(details)
    },
  }

  const service = useMachine(combobox.machine, machineProps)
  const api = combobox.connect(service, normalizeProps)
  apiRef.current = api

  useEffect(() => {
    const value = pendingHighlightRef.current
    if (value == null || !filteredCollection.has(value)) return
    pendingHighlightRef.current = null
    const frame = requestAnimationFrame(() => apiRef.current?.setHighlightedValue(value))
    return () => cancelAnimationFrame(frame)
  }, [filteredCollection])

  return {
    ...api,
    getInputProps() {
      return mergeProps(api.getInputProps(), {
        onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
          if (event.key !== 'Backspace' || event.currentTarget.value || !up()) return
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
  }
}
