'use client'

import * as combobox from '@zag-js/combobox'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/react'
import { type KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from 'react'
import { useEnvironmentContext, useFilter, useLocaleContext } from '../../providers/index.ts'
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
   * The collection of items. Items are filtered by the input value.
   * An item with a `parent` value is shown on the page of that item.
   */
  collection: ListCollection<T>
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

export interface UseCommandReturn<T extends CollectionItem> extends combobox.Api<PropTypes, T> {
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

const filterOptions = { sensitivity: 'base' } as const
const noValue: string[] = []

const keywordsOf = (item: unknown): string[] => {
  const keywords = (item as { keywords?: unknown } | null)?.keywords
  return Array.isArray(keywords) ? keywords.filter((keyword) => typeof keyword === 'string') : []
}

const parentOf = (item: unknown): string | null => {
  const parent = (item as { parent?: unknown } | null)?.parent
  return typeof parent === 'string' ? parent : null
}

export const useCommand = <T extends CollectionItem>(props: UseCommandProps<T>): UseCommandReturn<T> => {
  const { collection, filter, defaultPage, onPageChange, ...rest } = props
  const id = useId()
  const { dir } = useLocaleContext()
  const { getRootNode } = useEnvironmentContext()
  const { contains } = useFilter(filterOptions)

  const [localInputValue, setLocalInputValue] = useState(props.defaultInputValue ?? '')
  const [page, setPageValue] = useState<string | null>(defaultPage ?? null)
  const query = (props.inputValue ?? localInputValue).trim()

  const tree = useMemo(() => {
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
  }, [collection])

  const currentPage = page != null && tree.owners.has(page) ? page : null

  const pages = useMemo(() => {
    const path: T[] = []
    let value = currentPage
    while (value != null && path.length <= collection.size) {
      const item = collection.find(value)
      if (!item) break
      path.unshift(item)
      value = tree.parentValue(value)
    }
    return path
  }, [collection, tree, currentPage])

  const filteredCollection = useMemo(() => {
    const scoped = tree.owners.size > 0
    if (!query && !scoped) return collection
    const match: CommandFilter<T> =
      filter ??
      ((itemText, inputValue, item) =>
        contains(itemText, inputValue) || keywordsOf(item).some((keyword) => contains(keyword, inputValue)))
    return collection.filter((itemText, _index, item) => {
      if (scoped && tree.parentValue(collection.getItemValue(item) ?? '') !== currentPage) return false
      return !query || match(itemText, query, item)
    })
  }, [collection, tree, currentPage, query, filter, contains])

  const pendingHighlightRef = useRef<string | null>(null)
  const apiRef = useRef<combobox.Api<PropTypes, T> | null>(null)

  const setPage = (value: string | null) => {
    const next = value != null && tree.owners.has(value) ? value : null
    if (next === currentPage) return
    const values = pages.map((item) => collection.getItemValue(item))
    const depth = next == null ? 0 : values.indexOf(next) + 1
    pendingHighlightRef.current = next == null || depth > 0 ? (values[depth] ?? null) : null
    setPageValue(next)
    apiRef.current?.setInputValue('')
    onPageChange?.({ page: next, item: next != null ? collection.find(next) : null })
  }

  const popPage = () => {
    if (currentPage == null) return false
    setPage(tree.parentValue(currentPage))
    return true
  }

  const isPage = (item: T) => tree.owners.has(collection.getItemValue(item) ?? '')

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
      if (tree.owners.has(details.itemValue)) {
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
          if (event.key !== 'Backspace' || event.currentTarget.value || !popPage()) return
          event.preventDefault()
        },
      })
    },
    page: currentPage,
    pages,
    setPage,
    popPage,
    isPage,
  }
}
