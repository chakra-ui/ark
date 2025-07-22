import { Selection, type SelectionMode } from '@zag-js/collection'
import { type MaybeRef, type Ref, computed, shallowRef, toValue, watch } from 'vue'
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
  props: MaybeRef<UseListSelectionProps<T>>,
): UseListSelectionReturn {
  const resolvedProps = computed(() => {
    const {
      collection,
      selectionMode = 'single',
      deselectable = true,
      initialSelectedValues = [],
      resetOnCollectionChange = false,
    } = toValue(props)
    return { collection, selectionMode, deselectable, initialSelectedValues, resetOnCollectionChange }
  })

  const createSelection = (values: string[] = []) => {
    const { selectionMode, deselectable } = resolvedProps.value
    const selection = new Selection(values)
    selection.selectionMode = selectionMode
    selection.deselectable = deselectable
    return selection
  }

  const init = () => {
    const { initialSelectedValues } = resolvedProps.value
    return createSelection(initialSelectedValues)
  }

  const selection = shallowRef(init())

  watch(
    [() => resolvedProps.value.collection.getValues(), () => resolvedProps.value.resetOnCollectionChange],
    ([, resetOnCollectionChange]) => {
      if (resetOnCollectionChange) {
        selection.value = createSelection()
      }
    },
  )

  const selectedValues = computed(() => Array.from(selection.value))

  const isEmpty = computed(() => selection.value.isEmpty())

  const firstSelectedValue = computed(() => {
    const { collection } = resolvedProps.value
    return selection.value.firstSelectedValue(collection)
  })

  const lastSelectedValue = computed(() => {
    const { collection } = resolvedProps.value
    return selection.value.lastSelectedValue(collection)
  })

  return {
    selectedValues,
    isEmpty,
    firstSelectedValue,
    lastSelectedValue,
    isSelected: (value: string | null) => {
      return selection.value.isSelected(value)
    },
    isAllSelected: () => {
      const { collection } = resolvedProps.value
      const allValues = collection.getValues()
      return allValues.length > 0 && allValues.every((value) => selection.value.isSelected(value))
    },
    isSomeSelected: () => {
      const { collection } = resolvedProps.value
      const allValues = collection.getValues()
      return allValues.some((value) => selection.value.isSelected(value))
    },
    canSelect: (value: string) => {
      const { collection } = resolvedProps.value
      return selection.value.canSelect(collection, value)
    },
    select: (value: string, forceToggle?: boolean) => {
      const { collection } = resolvedProps.value
      selection.value = selection.value.select(collection, value, forceToggle)
    },
    deselect: (value: string) => {
      selection.value = selection.value.deselect(value)
    },
    toggle: (value: string) => {
      const { collection } = resolvedProps.value
      selection.value = selection.value.toggleSelection(collection, value)
    },
    replace: (value: string | null) => {
      const { collection } = resolvedProps.value
      selection.value = selection.value.replaceSelection(collection, value)
    },
    extend: (anchorValue: string, targetValue: string) => {
      const { collection } = resolvedProps.value
      selection.value = selection.value.extendSelection(collection, anchorValue, targetValue)
    },
    setSelectedValues: (values: string[]) => {
      selection.value = selection.value.setSelection(values)
    },
    clear: () => {
      selection.value = selection.value.clearSelection()
    },
    resetSelection: () => {
      selection.value = createSelection()
    },
    setSelection: (newSelection: string[]) => {
      selection.value = selection.value.setSelection(newSelection)
    },
    setSelectionMode: (mode: SelectionMode) => {
      const newSelection = selection.value.copy()
      newSelection.selectionMode = mode
      selection.value = newSelection
    },
    setDeselectable: (deselectable: boolean) => {
      const newSelection = selection.value.copy()
      newSelection.deselectable = deselectable
      selection.value = newSelection
    },
  }
}

export interface UseListSelectionReturn {
  /**
   * The selected values as an array.
   */
  selectedValues: Ref<string[]>
  /**
   * Whether the selection is empty.
   */
  isEmpty: Ref<boolean>
  /**
   * The first selected value.
   */
  firstSelectedValue: Ref<string | null>
  /**
   * The last selected value.
   */
  lastSelectedValue: Ref<string | null>
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
