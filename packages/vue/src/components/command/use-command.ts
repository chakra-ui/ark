import { isPageListCollection, type PageListCollection } from '@zag-js/collection'
import * as combobox from '@zag-js/combobox'
import { createFuzzySearch } from '@zag-js/fuzzy'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRefOrGetter, computed, ref, shallowRef, toValue, useId, watch } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { EmitFn } from '../../types.ts'
import { cleanProps } from '../../utils/clean-props.ts'
import type { CollectionItem, ListCollection } from '../collection/index.ts'
import type { CommandFilter, CommandPageChangeDetails, RootEmits } from './command.types.ts'

export type { CommandFilter, CommandPageChangeDetails } from './command.types.ts'

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

export interface UseCommandApi<T extends CollectionItem> extends combobox.Api<PropTypes, T> {
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

export interface UseCommandReturn<T extends CollectionItem> extends ComputedRef<UseCommandApi<T>> {}

const noValue: string[] = []

const keywordsOf = (item: unknown): string[] | undefined => {
  const keywords = (item as { keywords?: unknown } | null)?.keywords
  return Array.isArray(keywords) ? keywords.filter((keyword) => typeof keyword === 'string') : undefined
}

export const useCommand = <T extends CollectionItem>(
  props: MaybeRefOrGetter<UseCommandProps<T>>,
  emit?: EmitFn<RootEmits<T>>,
): UseCommandReturn<T> => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const initialProps = toValue(props)
  const localInputValue = ref(initialProps.defaultInputValue ?? '')

  const collection = computed(() => toValue(props).collection)
  const query = computed(() => (toValue(props).inputValue ?? localInputValue.value).trim())

  const navigation = shallowRef<{ source: unknown; pages: PageListCollection<T> } | null>(null)
  const pages = computed((): PageListCollection<T> | null => {
    const items = collection.value
    if (navigation.value?.source === items) return navigation.value.pages
    return isPageListCollection(items) ? (items as PageListCollection<T>) : null
  })

  const fuzzy = computed(() => {
    const items = collection.value
    return createFuzzySearch<T>({ itemToString: (item) => items.stringifyItem(item) ?? '', itemToKeywords: keywordsOf })
  })

  const filteredCollection = computed((): ListCollection<T> => {
    const items = collection.value
    const pageList = pages.value
    const inputValue = query.value
    if (!inputValue) return pageList ?? items
    const source = pageList ? pageList.getDescendants() : items.items
    const filter = toValue(props).filter
    const matches = filter ? filter(source, inputValue) : fuzzy.value.search(source, inputValue)
    return (pageList ?? items).setItems(matches) as ListCollection<T>
  })

  let pendingHighlight: string | null = null

  const navigate = (next: PageListCollection<T>, nextQuery: string) => {
    if (next === pages.value) return false
    navigation.value = { source: collection.value, pages: next }
    pendingHighlight = next.restore.highlightedValue
    api.value.setInputValue(nextQuery)
    const details = { page: next.page, item: next.pageItem }
    emit?.('pageChange', details)
    toValue(props).onPageChange?.(details)
    return true
  }

  const setPage = (value: string | null) => {
    const pageList = pages.value
    if (pageList) navigate(pageList.setPage(value, query.value), '')
  }

  const back = () => {
    const pageList = pages.value
    if (!pageList?.canGoBack) return false
    const next = pageList.back(query.value)
    return navigate(next, next.restore.query)
  }

  const up = () => {
    const pageList = pages.value
    return pageList?.page != null ? navigate(pageList.up(query.value), '') : false
  }

  const isPage = (item: T) => pages.value?.isPage(item) ?? false

  const getAncestors = (item: T) => pages.value?.getAncestors(item) ?? []

  const context = computed<combobox.Props<T>>(() => {
    const localProps = toValue(props)
    const { collection: _collection, filter: _filter, onPageChange: _, ...rest } = localProps

    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      loopFocus: false,
      defaultHighlightedValue: filteredCollection.value.firstValue,
      ...cleanProps(rest),
      collection: filteredCollection.value,
      inline: true,
      allowCustomValue: true,
      inputBehavior: 'autohighlight',
      selectionBehavior: 'preserve',
      value: noValue,
      onHighlightChange: (details) => {
        emit?.('highlightChange', details)
        emit?.('update:highlightedValue', details.highlightedValue)
        localProps.onHighlightChange?.(details)
      },
      onInputValueChange: (details) => {
        localInputValue.value = details.inputValue
        emit?.('inputValueChange', details)
        emit?.('update:inputValue', details.inputValue)
        localProps.onInputValueChange?.(details)
      },
      onSelect: (details) => {
        const pageList = pages.value
        const item = pageList?.getItem(details.itemValue)
        if (item && pageList?.isPage(item)) {
          setPage(details.itemValue)
          return
        }
        emit?.('select', details)
        localProps.onSelect?.(details)
      },
    }
  })

  const service = useMachine(combobox.machine, context)
  const api = computed(() => combobox.connect(service, normalizeProps))

  watch(
    filteredCollection,
    (items, _prev, onCleanup) => {
      const value = pendingHighlight
      if (value == null || !items.has(value)) return
      pendingHighlight = null
      const frame = requestAnimationFrame(() => api.value.setHighlightedValue(value))
      onCleanup(() => cancelAnimationFrame(frame))
    },
    { flush: 'post' },
  )

  const onInputKeydown = (event: KeyboardEvent) => {
    const target = event.currentTarget as HTMLInputElement | null
    if (event.key !== 'Backspace' || target?.value || !up()) return
    event.preventDefault()
  }

  return computed(() => {
    const value = api.value
    const pageList = pages.value
    return {
      ...value,
      getInputProps() {
        return mergeProps(value.getInputProps(), { onKeydown: onInputKeydown })
      },
      page: pageList?.page ?? null,
      path: pageList?.getPath() ?? [],
      canGoBack: pageList?.canGoBack ?? false,
      setPage,
      back,
      up,
      isPage,
      getAncestors,
    }
  })
}
