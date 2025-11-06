import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { untrack } from 'svelte'
import { type CollectionOptions, type ListCollection, createListCollection } from './list-collection'

export interface UseListCollectionProps<T> extends Omit<CollectionOptions<T>, 'items'> {
  /**
   * The initial items to display in the collection.
   */
  initialItems: T[] | readonly T[]
  /**
   * The filter function to use to filter the items.
   */
  filter?: (itemText: string, filterText: string, item: T) => boolean
  /**
   * The maximum number of items to display in the collection.
   * Useful for performance when you have a large number of items.
   */
  limit?: number
}

export function useListCollection<T>(props: MaybeFunction<UseListCollectionProps<T>>): UseListCollectionReturn<T> {
  const [localProps, collectionOptions] = $derived.by(() => {
    const { initialItems = [], filter, limit, ...collectionOptions } = runIfFn(props)
    return [{ initialItems, filter, limit }, collectionOptions]
  })

  let items = $state<T[] | readonly T[]>(untrack(() => localProps.initialItems))
  let filterText = $state('')

  const setItems = (newItems: T[] | readonly T[]) => {
    items = newItems
    filterText = ''
  }

  const create = (itemsToCreate: T[] | readonly T[]) => {
    return createListCollection({ ...collectionOptions, items: itemsToCreate })
  }

  const collection = $derived.by(() => {
    let activeItems = items

    // Apply filter if we have filter text and a filter function
    const filter = localProps.filter
    if (filterText && filter) {
      activeItems = create(items).filter((itemString, _index, item) => filter(itemString, filterText, item)).items
    }

    // Apply limit
    const limitedItems = localProps.limit == null ? activeItems : activeItems.slice(0, localProps.limit)
    return createListCollection({ ...collectionOptions, items: limitedItems })
  })

  return {
    collection() {
      return collection
    },
    filter: (inputValue = '') => {
      filterText = inputValue
    },
    set: (newItems) => {
      setItems(newItems)
    },
    reset: () => {
      setItems(localProps.initialItems)
    },
    clear: () => {
      setItems([])
    },
    insert: (index, ...itemsToInsert) => {
      const newItems = create(items).insert(index, ...itemsToInsert).items
      setItems(newItems)
    },
    insertBefore: (value, ...itemsToInsert) => {
      const newItems = create(items).insertBefore(value, ...itemsToInsert).items
      setItems(newItems)
    },
    insertAfter: (value, ...itemsToInsert) => {
      const newItems = create(items).insertAfter(value, ...itemsToInsert).items
      setItems(newItems)
    },
    remove: (...itemOrValues) => {
      const newItems = create(items).remove(...itemOrValues).items
      setItems(newItems)
    },
    move: (value, to) => {
      const newItems = create(items).move(value, to).items
      setItems(newItems)
    },
    moveBefore: (value, ...values) => {
      const newItems = create(items).moveBefore(value, ...values).items
      setItems(newItems)
    },
    moveAfter: (value, ...values) => {
      const newItems = create(items).moveAfter(value, ...values).items
      setItems(newItems)
    },
    reorder: (from: number, to: number) => {
      const newItems = create(items).reorder(from, to).items
      setItems(newItems)
    },
    append: (...itemsToAppend) => {
      const newItems = create(items).append(...itemsToAppend).items
      setItems(newItems)
    },
    upsert: (value, item, mode = 'append') => {
      const newItems = create(items).upsert(value, item, mode).items
      setItems(newItems)
    },
    prepend: (...itemsToPrepend) => {
      const newItems = create(items).prepend(...itemsToPrepend).items
      setItems(newItems)
    },
    update: (value, item) => {
      const newItems = create(items).update(value, item).items
      setItems(newItems)
    },
  }
}

export interface UseListCollectionReturn<T> {
  /**
   * The collection of items.
   */
  collection: () => ListCollection<T>
  /**
   * The function to filter the items.
   */
  filter: (inputValue: string) => void
  /**
   * The function to set the items.
   */
  set: (items: T[]) => void
  /**
   * The function to reset the items.
   */
  reset: () => void
  /**
   * The function to clear the items.
   */
  clear: () => void
  /**
   * The function to insert items at a specific index.
   */
  insert: (index: number, ...items: T[]) => void
  /**
   * The function to insert items before a specific value.
   */
  insertBefore: (value: string, ...items: T[]) => void
  /**
   * The function to insert items after a specific value.
   */
  insertAfter: (value: string, ...items: T[]) => void
  /**
   * The function to remove items.
   */
  remove: (...itemOrValues: Array<T | string>) => void
  /**
   * The function to move an item to a specific index.
   */
  move: (value: string, to: number) => void
  /**
   * The function to move an item before a specific value.
   */
  moveBefore: (value: string, ...values: string[]) => void
  /**
   * The function to move an item after a specific value.
   */
  moveAfter: (value: string, ...values: string[]) => void
  /**
   * The function to reorder items.
   */
  reorder: (from: number, to: number) => void
  /**
   * The function to append items.
   */
  append: (...items: T[]) => void
  /**
   * The function to upsert an item.
   */
  upsert: (value: string, item: T, mode?: 'append' | 'prepend') => void
  /**
   * The function to prepend items.
   */
  prepend: (...items: T[]) => void
  /**
   * The function to update an item.
   */
  update: (value: string, item: T) => void
}
