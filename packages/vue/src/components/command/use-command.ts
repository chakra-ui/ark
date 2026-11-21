import * as combobox from '@zag-js/combobox'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRefOrGetter, computed, ref, toValue, useId, watch } from 'vue'
import {
  DEFAULT_ENVIRONMENT,
  DEFAULT_LOCALE,
  useEnvironmentContext,
  useFilter,
  useLocaleContext,
} from '../../providers/index.ts'
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

export interface UseCommandApi<T extends CollectionItem> extends combobox.Api<PropTypes, T> {
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

export interface UseCommandReturn<T extends CollectionItem> extends ComputedRef<UseCommandApi<T>> {}

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

export const useCommand = <T extends CollectionItem>(
  props: MaybeRefOrGetter<UseCommandProps<T>>,
  emit?: EmitFn<RootEmits<T>>,
): UseCommandReturn<T> => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const { contains } = useFilter(filterOptions)

  const initialProps = toValue(props)
  const localInputValue = ref(initialProps.defaultInputValue ?? '')
  const page = ref<string | null>(initialProps.defaultPage ?? null)

  const collection = computed(() => toValue(props).collection)
  const query = computed(() => (toValue(props).inputValue ?? localInputValue.value).trim())

  const tree = computed(() => {
    const items = collection.value
    const parents = new Map<string, string | null>()
    for (const item of items.items) parents.set(items.getItemValue(item) ?? '', parentOf(item))
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

  const currentPage = computed(() => (page.value != null && tree.value.owners.has(page.value) ? page.value : null))

  const pages = computed(() => {
    const items = collection.value
    const path: T[] = []
    let value = currentPage.value
    while (value != null && path.length <= items.size) {
      const item = items.find(value)
      if (!item) break
      path.unshift(item)
      value = tree.value.parentValue(value)
    }
    return path
  })

  const filteredCollection = computed(() => {
    const items = collection.value
    const { owners, parentValue } = tree.value
    const scoped = owners.size > 0
    const inputValue = query.value
    if (!inputValue && !scoped) return items
    const filter = toValue(props).filter
    const match: CommandFilter<T> =
      filter ??
      ((itemText, inputValue, item) =>
        contains(itemText, inputValue) || keywordsOf(item).some((keyword) => contains(keyword, inputValue)))
    const pageValue = currentPage.value
    return items.filter((itemText, _index, item) => {
      if (scoped && parentValue(items.getItemValue(item) ?? '') !== pageValue) return false
      return !inputValue || match(itemText, inputValue, item)
    })
  })

  let pendingHighlight: string | null = null

  const setPage = (value: string | null) => {
    const items = collection.value
    const { owners } = tree.value
    const next = value != null && owners.has(value) ? value : null
    if (next === currentPage.value) return
    const values = pages.value.map((item) => items.getItemValue(item))
    const depth = next == null ? 0 : values.indexOf(next) + 1
    pendingHighlight = next == null || depth > 0 ? (values[depth] ?? null) : null
    page.value = next
    api.value.setInputValue('')
    const details = { page: next, item: next != null ? (items.find(next) ?? null) : null }
    emit?.('pageChange', details)
    toValue(props).onPageChange?.(details)
  }

  const popPage = () => {
    if (currentPage.value == null) return false
    setPage(tree.value.parentValue(currentPage.value))
    return true
  }

  const isPage = (item: T) => tree.value.owners.has(collection.value.getItemValue(item) ?? '')

  const context = computed<combobox.Props<T>>(() => {
    const localProps = toValue(props)
    const { collection: _collection, filter: _filter, defaultPage: _defaultPage, onPageChange: _, ...rest } = localProps

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
        if (tree.value.owners.has(details.itemValue)) {
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
    if (event.key !== 'Backspace' || target?.value || !popPage()) return
    event.preventDefault()
  }

  return computed(() => {
    const value = api.value
    return {
      ...value,
      getInputProps() {
        return mergeProps(value.getInputProps(), { onKeydown: onInputKeydown })
      },
      page: currentPage.value,
      pages: pages.value,
      setPage,
      popPage,
      isPage,
    }
  })
}
