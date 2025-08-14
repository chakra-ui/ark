import { Selection, type SelectionMode } from '@zag-js/collection'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useEvent } from '../../utils/use-event'
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

export function useListSelection<T extends CollectionItem>(props: UseListSelectionProps<T>): UseListSelectionReturn {
  const {
    collection,
    selectionMode = 'single',
    deselectable = true,
    initialSelectedValues = [],
    resetOnCollectionChange = false,
  } = props

  const createSelection = useCallback(
    (values: string[] = []) => {
      const selection = new Selection(values)
      selection.selectionMode = selectionMode
      selection.deselectable = deselectable
      return selection
    },
    [selectionMode, deselectable],
  )

  const [selection, setSelectionState] = useState(() => createSelection(initialSelectedValues))

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    if (resetOnCollectionChange) {
      setSelectionState(createSelection())
    }
  }, [collection.toString(), resetOnCollectionChange, createSelection])

  const selectedValues = useMemo(() => Array.from(selection), [selection])

  const isEmpty = useMemo(() => selection.isEmpty(), [selection])

  const firstSelectedValue = useMemo(() => selection.firstSelectedValue(collection), [selection, collection])

  const lastSelectedValue = useMemo(() => selection.lastSelectedValue(collection), [selection, collection])

  return {
    selectedValues,
    isEmpty,
    firstSelectedValue,
    lastSelectedValue,
    isSelected: useEvent((value: string | null) => {
      return selection.isSelected(value)
    }),
    isAllSelected: useEvent(() => {
      const allValues = collection.getValues()
      return allValues.length > 0 && allValues.every((value) => selection.isSelected(value))
    }),
    isSomeSelected: useEvent(() => {
      const allValues = collection.getValues()
      return allValues.some((value) => selection.isSelected(value))
    }),
    canSelect: useEvent((value: string) => {
      return selection.canSelect(collection, value)
    }),
    select: useEvent((value: string, forceToggle?: boolean) => {
      setSelectionState(selection.select(collection, value, forceToggle))
    }),
    deselect: useEvent((value: string) => {
      setSelectionState(selection.deselect(value))
    }),
    toggle: useEvent((value: string) => {
      setSelectionState(selection.toggleSelection(collection, value))
    }),
    replace: useEvent((value: string | null) => {
      setSelectionState(selection.replaceSelection(collection, value))
    }),
    extend: useEvent((anchorValue: string, targetValue: string) => {
      setSelectionState(selection.extendSelection(collection, anchorValue, targetValue))
    }),
    setSelectedValues: useEvent((values: string[]) => {
      setSelectionState(selection.setSelection(values))
    }),
    clear: useEvent(() => {
      setSelectionState(selection.clearSelection())
    }),
    resetSelection: useEvent(() => {
      setSelectionState(createSelection())
    }),
  }
}

export interface UseListSelectionReturn {
  /**
   * The selected values as an array.
   */
  selectedValues: string[]
  /**
   * Whether the selection is empty.
   */
  isEmpty: boolean
  /**
   * The first selected value.
   */
  firstSelectedValue: string | null
  /**
   * The last selected value.
   */
  lastSelectedValue: string | null
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
