import { Selection, type SelectionMode } from '@zag-js/collection'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
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
  props: MaybeFunction<UseListSelectionProps<T>>,
): UseListSelectionReturn {
  const localProps = $derived.by(() => {
    const {
      collection,
      selectionMode = 'single',
      deselectable = true,
      initialSelectedValues = [],
      resetOnCollectionChange = false,
    } = runIfFn(props)
    return {
      collection,
      selectionMode,
      deselectable,
      initialSelectedValues,
      resetOnCollectionChange,
    }
  })

  const createSelection = (values: string[] = []) => {
    const selection = new Selection(values)
    selection.selectionMode = localProps.selectionMode
    selection.deselectable = localProps.deselectable
    return selection
  }

  let selection = $state(createSelection(localProps.initialSelectedValues))

  // Watch for collection changes and reset selection if needed
  $effect(() => {
    const { collection, resetOnCollectionChange } = localProps
    // Trigger effect when collection values change
    collection.getValues()

    if (resetOnCollectionChange) {
      selection = createSelection()
    }
  })

  const selectedValues = $derived(Array.from(selection))
  const isEmpty = $derived(selection.isEmpty())
  const firstSelectedValue = $derived(selection.firstSelectedValue(localProps.collection))
  const lastSelectedValue = $derived(selection.lastSelectedValue(localProps.collection))

  return {
    selectedValues: () => selectedValues,
    isEmpty: () => isEmpty,
    firstSelectedValue: () => firstSelectedValue,
    lastSelectedValue: () => lastSelectedValue,
    isSelected: (value: string | null) => {
      return selection.isSelected(value)
    },
    isAllSelected: () => {
      const allValues = localProps.collection.getValues()
      return allValues.length > 0 && allValues.every((value) => selection.isSelected(value))
    },
    isSomeSelected: () => {
      const allValues = localProps.collection.getValues()
      return allValues.some((value) => selection.isSelected(value))
    },
    canSelect: (value: string) => {
      return selection.canSelect(localProps.collection, value)
    },
    select: (value: string, forceToggle?: boolean) => {
      selection = selection.select(localProps.collection, value, forceToggle)
    },
    deselect: (value: string) => {
      selection = selection.deselect(value)
    },
    toggle: (value: string) => {
      selection = selection.toggleSelection(localProps.collection, value)
    },
    replace: (value: string | null) => {
      selection = selection.replaceSelection(localProps.collection, value)
    },
    extend: (anchorValue: string, targetValue: string) => {
      selection = selection.extendSelection(localProps.collection, anchorValue, targetValue)
    },
    setSelectedValues: (values: string[]) => {
      selection = selection.setSelection(values)
    },
    clear: () => {
      selection = selection.clearSelection()
    },
    resetSelection: () => {
      selection = createSelection()
    },
    setSelection: (newSelection: string[]) => {
      selection = selection.setSelection(newSelection)
    },
    setSelectionMode: (mode: SelectionMode) => {
      const newSelection = selection.copy()
      newSelection.selectionMode = mode
      selection = newSelection
    },
    setDeselectable: (deselectable: boolean) => {
      const newSelection = selection.copy()
      newSelection.deselectable = deselectable
      selection = newSelection
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
  /**
   * Set the selection to a specific array of items.
   */
  setSelection: (selection: string[]) => void
  /**
   * Set the selection mode.
   */
  setSelectionMode: (mode: SelectionMode) => void
  /**
   * Set whether the selection is deselectable.
   */
  setDeselectable: (deselectable: boolean) => void
}
