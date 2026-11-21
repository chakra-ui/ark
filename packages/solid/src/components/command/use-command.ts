import { isPageListCollection, type PageListCollection } from '@zag-js/collection'
import * as combobox from '@zag-js/combobox'
import { createFuzzySearch } from '@zag-js/fuzzy'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createEffect, createMemo, createSignal, createUniqueId, untrack } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.tsx'
import type { MaybeAccessor } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'
import { splitProps } from '../../utils/split-props.ts'
import type { CollectionItem, ListCollection } from '../collection/index.tsx'

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
const ownKeys = ['collection', 'filter', 'onPageChange'] as const

const keywordsOf = (item: unknown): string[] | undefined => {
  const keywords = (item as { keywords?: unknown } | null)?.keywords
  return Array.isArray(keywords) ? keywords.filter((keyword) => typeof keyword === 'string') : undefined
}

export const useCommand = <T extends CollectionItem>(props: MaybeAccessor<UseCommandProps<T>>): UseCommandReturn<T> => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const resolved = () => runIfFn(props)

  const [localInputValue, setLocalInputValue] = createSignal(untrack(() => resolved().defaultInputValue) ?? '')
  const query = createMemo(() => (resolved().inputValue ?? localInputValue()).trim())

  const [navigation, setNavigation] = createSignal<{ source: unknown; pages: PageListCollection<T> } | null>(null)
  const pages = createMemo(() => {
    const collection = resolved().collection
    const current = navigation()
    if (current?.source === collection) return current.pages
    return isPageListCollection(collection) ? (collection as PageListCollection<T>) : null
  })

  const fuzzy = createMemo(() => {
    const collection = resolved().collection
    return createFuzzySearch<T>({
      itemToString: (item) => collection.stringifyItem(item) ?? '',
      itemToKeywords: keywordsOf,
    })
  })

  const filteredCollection = createMemo((): ListCollection<T> => {
    const { collection, filter } = resolved()
    const current = pages()
    const search = query()
    if (!search) return current ?? collection
    const source = current ? current.getDescendants() : collection.items
    const items = filter ? filter(source, search) : fuzzy().search(source, search)
    return (current ?? collection).setItems(items) as ListCollection<T>
  })

  let pendingHighlight: string | null = null

  const navigate = (next: PageListCollection<T>, nextQuery: string) => {
    if (next === pages()) return false
    setNavigation({ source: resolved().collection, pages: next })
    pendingHighlight = next.restore.highlightedValue
    api().setInputValue(nextQuery)
    resolved().onPageChange?.({ page: next.page, item: next.pageItem })
    return true
  }

  const setPage = (value: string | null) => {
    const current = pages()
    if (current) navigate(current.setPage(value, query()), '')
  }

  const back = () => {
    const current = pages()
    if (!current?.canGoBack) return false
    const next = current.back(query())
    return navigate(next, next.restore.query)
  }

  const up = () => {
    const current = pages()
    return current?.page != null ? navigate(current.up(query()), '') : false
  }

  const isPage = (item: T) => pages()?.isPage(item) ?? false

  const getAncestors = (item: T) => pages()?.getAncestors(item) ?? []

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
        const current = pages()
        const item = current?.getItem(details.itemValue)
        if (item && current?.isPage(item)) {
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
    const currentPages = pages()
    return {
      ...current,
      getInputProps() {
        return mergeProps(current.getInputProps(), {
          onKeyDown(event: KeyboardEvent & { currentTarget: HTMLInputElement }) {
            if (event.key !== 'Backspace' || event.currentTarget.value || !up()) return
            event.preventDefault()
          },
        }) as ReturnType<combobox.Api<PropTypes, T>['getInputProps']>
      },
      page: currentPages?.page ?? null,
      path: currentPages?.getPath() ?? [],
      canGoBack: currentPages?.canGoBack ?? false,
      setPage,
      back,
      up,
      isPage,
      getAncestors,
    }
  })
}
