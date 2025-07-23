import { Selection, type SelectionMode } from '@zag-js/collection'
import { createEffect, createMemo, createSignal, on, splitProps } from 'solid-js'
import type { MaybeAccessor } from '../../types'
import type { CollectionItem, ListCollection } from './list-collection'

export interface UseListSelectionProps<T extends CollectionItem> {
  /**
   * The selection mode.
   */
  selectionMode?: SelectionMode
  /**
   * Whether the selection is deselectable.
   */
  deselectable?: boolean
  /**
   * The initial selected values.
   */
  initialSelectedValues?: string[]
  /**
   * Whether to reset the selection when the collection changes.
   */
  resetOnCollectionChange?: boolean
  /**
   * The collection to use.
   */
  collection: ListCollection<T>
}

export function useListSelection<T extends CollectionItem>(
  props: MaybeAccessor<UseListSelectionProps<T>>,
): UseListSelectionReturn {
  const splittedProps = createMemo(() => {
    const rawProps = typeof props === 'function' ? props() : props
    return splitProps(rawProps, [
      'collection',
      'selectionMode',
      'deselectable',
      'initialSelectedValues',
      'resetOnCollectionChange',
    ])
  })

  const createSelection = (values: string[] = []) => {
    const [localProps] = splittedProps()
    const selection = new Selection(values)
    selection.selectionMode = localProps.selectionMode ?? 'single'
    selection.deselectable = localProps.deselectable ?? true
    return selection
  }

  const init = () => {
    const [localProps] = splittedProps()
    return createSelection(localProps.initialSelectedValues ?? [])
  }

  const [selection, setSelection] = createSignal(init())

  const watchDeps = () => {
    const [{ collection, resetOnCollectionChange }] = splittedProps()
    return [collection.getValues(), resetOnCollectionChange] as const
  }

  createEffect(
    on(
      watchDeps,
      ([, resetOnCollectionChange]) => {
        if (resetOnCollectionChange) {
          setSelection(createSelection())
        }
      },
      { defer: true },
    ),
  )

  const selectedValues = createMemo(() => Array.from(selection()))

  const isEmpty = createMemo(() => selection().isEmpty())

  const firstSelectedValue = createMemo(() => {
    const [localProps] = splittedProps()
    return selection().firstSelectedValue(localProps.collection)
  })

  const lastSelectedValue = createMemo(() => {
    const [localProps] = splittedProps()
    return selection().lastSelectedValue(localProps.collection)
  })

  return {
    selectedValues,
    isEmpty,
    firstSelectedValue,
    lastSelectedValue,
    isSelected: (value: string | null) => {
      return selection().isSelected(value)
    },
    isAllSelected: () => {
      const [localProps] = splittedProps()
      const allValues = localProps.collection.getValues()
      return allValues.length > 0 && allValues.every((value) => selection().isSelected(value))
    },
    isSomeSelected: () => {
      const [localProps] = splittedProps()
      const allValues = localProps.collection.getValues()
      return allValues.some((value) => selection().isSelected(value))
    },
    canSelect: (value: string) => {
      const [localProps] = splittedProps()
      return selection().canSelect(localProps.collection, value)
    },
    select: (value: string, forceToggle?: boolean) => {
      const [localProps] = splittedProps()
      setSelection(selection().select(localProps.collection, value, forceToggle))
    },
    deselect: (value: string) => {
      setSelection(selection().deselect(value))
    },
    toggle: (value: string) => {
      const [localProps] = splittedProps()
      setSelection(selection().toggleSelection(localProps.collection, value))
    },
    replace: (value: string | null) => {
      const [localProps] = splittedProps()
      setSelection(selection().replaceSelection(localProps.collection, value))
    },
    extend: (anchorValue: string, targetValue: string) => {
      const [localProps] = splittedProps()
      setSelection(selection().extendSelection(localProps.collection, anchorValue, targetValue))
    },
    setSelectedValues: (values: string[]) => {
      setSelection(selection().setSelection(values))
    },
    clear: () => {
      setSelection(selection().clearSelection())
    },
    resetSelection: () => {
      setSelection(createSelection())
    },
  }
}

export interface UseListSelectionReturn {
  /**
   * The selected values as an array.
   */
  selectedValues: () => string[]
  /**
   * Whether the selection is empty.
   */
  isEmpty: () => boolean
  /**
   * The first selected value.
   */
  firstSelectedValue: () => string | null
  /**
   * The last selected value.
   */
  lastSelectedValue: () => string | null
  /**
   * Check if a value is selected.
   */
  isSelected: (value: string | null) => boolean
  /**
   * Check if a value can be selected.
   */
  canSelect: (value: string) => boolean
  /**
   * Select a value.
   */
  select: (value: string, forceToggle?: boolean) => void
  /**
   * Deselect a value.
   */
  deselect: (value: string) => void
  /**
   * Toggle selection of a value.
   */
  toggle: (value: string) => void
  /**
   * Replace the selection with a single value.
   */
  replace: (value: string | null) => void
  /**
   * Extend the selection from anchor to target.
   */
  extend: (anchorValue: string, targetValue: string) => void
  /**
   * Set the selected values.
   */
  setSelectedValues: (values: string[]) => void
  /**
   * Clear the selection.
   */
  clear: () => void
  /**
   * Clear all selections.
   */
  resetSelection: () => void
  /**
   * Returns true if all items from the collection are selected.
   */
  isAllSelected: () => boolean
  /**
   * Returns true if at least one item from the collection is selected.
   */
  isSomeSelected: () => boolean
}
