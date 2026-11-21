import * as combobox from '@zag-js/combobox'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createEffect, createMemo, createSignal, createUniqueId, untrack } from 'solid-js'
import { useEnvironmentContext, useFilter, useLocaleContext } from '../../providers/index.tsx'
import type { MaybeAccessor } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'
import { splitProps } from '../../utils/split-props.ts'
import type { CollectionItem, ListCollection } from '../collection/index.tsx'

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

const filterOptions = { sensitivity: 'base' } as const
const noValue: string[] = []
const ownKeys = ['collection', 'filter', 'defaultPage', 'onPageChange'] as const

const keywordsOf = (item: unknown): string[] => {
  const keywords = (item as { keywords?: unknown } | null)?.keywords
  return Array.isArray(keywords) ? keywords.filter((keyword) => typeof keyword === 'string') : []
}

const parentOf = (item: unknown): string | null => {
  const parent = (item as { parent?: unknown } | null)?.parent
  return typeof parent === 'string' ? parent : null
}

export const useCommand = <T extends CollectionItem>(props: MaybeAccessor<UseCommandProps<T>>): UseCommandReturn<T> => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const { contains } = useFilter(filterOptions)

  const resolved = () => runIfFn(props)

  const [localInputValue, setLocalInputValue] = createSignal(untrack(() => resolved().defaultInputValue) ?? '')
  const [page, setPageValue] = createSignal<string | null>(untrack(() => resolved().defaultPage) ?? null)
  const query = createMemo(() => (resolved().inputValue ?? localInputValue()).trim())

  const tree = createMemo(() => {
    const collection = resolved().collection
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

  const currentPage = createMemo(() => {
    const value = page()
    return value != null && tree().owners.has(value) ? value : null
  })

  const pages = createMemo(() => {
    const collection = resolved().collection
    const path: T[] = []
    let value = currentPage()
    while (value != null && path.length <= collection.size) {
      const item = collection.find(value)
      if (!item) break
      path.unshift(item)
      value = tree().parentValue(value)
    }
    return path
  })

  const filteredCollection = createMemo(() => {
    const { collection, filter } = resolved()
    const { owners, parentValue } = tree()
    const scoped = owners.size > 0
    const search = query()
    const current = currentPage()
    if (!search && !scoped) return collection
    const match: CommandFilter<T> =
      filter ??
      ((itemText, inputValue, item) =>
        contains(itemText, inputValue) || keywordsOf(item).some((keyword) => contains(keyword, inputValue)))
    return collection.filter((itemText, _index, item) => {
      if (scoped && parentValue(collection.getItemValue(item) ?? '') !== current) return false
      return !search || match(itemText, search, item)
    })
  })

  let pendingHighlight: string | null = null

  const setPage = (value: string | null) => {
    const { collection, onPageChange } = resolved()
    const { owners } = tree()
    const current = currentPage()
    const next = value != null && owners.has(value) ? value : null
    if (next === current) return
    const values = pages().map((item) => collection.getItemValue(item))
    const depth = next == null ? 0 : values.indexOf(next) + 1
    pendingHighlight = next == null || depth > 0 ? (values[depth] ?? null) : null
    setPageValue(next)
    api().setInputValue('')
    onPageChange?.({ page: next, item: next != null ? collection.find(next) : null })
  }

  const popPage = () => {
    const current = currentPage()
    if (current == null) return false
    setPage(tree().parentValue(current))
    return true
  }

  const isPage = (item: T) => tree().owners.has(resolved().collection.getItemValue(item) ?? '')

  const machineProps = createMemo<combobox.Props<T>>(() => {
    const [, rest] = splitProps(resolved(), [...ownKeys])
    return {
      id,
      dir: locale().dir,
      getRootNode: environment().getRootNode,
      loopFocus: false,
      defaultHighlightedValue: filteredCollection().firstValue,
      ...rest,
      collection: filteredCollection(),
      inline: true,
      allowCustomValue: true,
      inputBehavior: 'autohighlight',
      selectionBehavior: 'preserve',
      value: noValue,
      onInputValueChange(details) {
        setLocalInputValue(details.inputValue)
        rest.onInputValueChange?.(details)
      },
      onSelect(details) {
        if (tree().owners.has(details.itemValue)) {
          setPage(details.itemValue)
          return
        }
        rest.onSelect?.(details)
      },
    }
  })

  const service = useMachine(combobox.machine, machineProps)
  const api = createMemo(() => combobox.connect<PropTypes, T>(service, normalizeProps))

  createEffect(filteredCollection, (collection) => {
    const value = pendingHighlight
    if (value == null || !collection.has(value)) return
    pendingHighlight = null
    const frame = requestAnimationFrame(() => api().setHighlightedValue(value))
    return () => cancelAnimationFrame(frame)
  })

  return createMemo(() => {
    const current = api()
    return {
      ...current,
      getInputProps() {
        return mergeProps(current.getInputProps(), {
          onKeyDown(event: KeyboardEvent & { currentTarget: HTMLInputElement }) {
            if (event.key !== 'Backspace' || event.currentTarget.value || !popPage()) return
            event.preventDefault()
          },
        }) as ReturnType<combobox.Api<PropTypes, T>['getInputProps']>
      },
      page: currentPage(),
      pages: pages(),
      setPage,
      popPage,
      isPage,
    }
  })
}
