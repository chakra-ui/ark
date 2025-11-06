import { useCallback, useMemo, useRef, useState } from 'react'
import { useEvent } from '../../utils/use-event'
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

export function useListCollection<T>(props: UseListCollectionProps<T>): UseListCollectionReturn<T> {
  const { initialItems = [], filter, limit, ...collectionOptions } = props

  const [items, setItemsImpl] = useState(initialItems)
  const [filterText, setFilterText] = useState<string>('')

  const setItems = useEvent((items: T[] | readonly T[]) => {
    setItemsImpl(items)
    setFilterText('')
  })

  const collectionOptionsRef = useRef(collectionOptions)
  collectionOptionsRef.current = collectionOptions

  const create = useCallback((items: T[] | readonly T[]) => {
    return createListCollection({ ...collectionOptionsRef.current, items })
  }, [])

  const collection = useMemo(() => {
    let activeItems = items

    // Apply filter if we have filter text and a filter function
    if (filterText && filter) {
      activeItems = create(items).filter((itemString, _index, item) => filter(itemString, filterText, item)).items
    }

    // Apply limit
    const limitedItems = limit == null ? activeItems : activeItems.slice(0, limit)
    return createListCollection({ ...collectionOptionsRef.current, items: limitedItems })
  }, [items, filterText, filter, limit, create])

  return {
    collection,
    filter: useEvent((inputValue) => {
      setFilterText(inputValue || '')
    }),
    set: useEvent((newItems) => {
      setItems(newItems)
    }),
    reset: useEvent(() => {
      setItems(initialItems)
    }),
    clear: useEvent(() => {
      setItems([])
    }),
    insert: useEvent((index, ...itemsToInsert) => {
      const newItems = create(items).insert(index, ...itemsToInsert).items
      setItems(newItems)
    }),
    insertBefore: useEvent((value, ...itemsToInsert) => {
      const newItems = create(items).insertBefore(value, ...itemsToInsert).items
      setItems(newItems)
    }),
    insertAfter: useEvent((value, ...itemsToInsert) => {
      const newItems = create(items).insertAfter(value, ...itemsToInsert).items
      setItems(newItems)
    }),
    remove: useEvent((...itemOrValues) => {
      const newItems = create(items).remove(...itemOrValues).items
      setItems(newItems)
    }),
    move: useEvent((value, to) => {
      const newItems = create(items).move(value, to).items
      setItems(newItems)
    }),
    moveBefore: useEvent((value, ...values) => {
      const newItems = create(items).moveBefore(value, ...values).items
      setItems(newItems)
    }),
    moveAfter: useEvent((value, ...values) => {
      const newItems = create(items).moveAfter(value, ...values).items
      setItems(newItems)
    }),
    reorder: useEvent((from, to) => {
      const newItems = create(items).reorder(from, to).items
      setItems(newItems)
    }),
    append: useEvent((...itemsToAppend) => {
      const newItems = create(items).append(...itemsToAppend).items
      setItems(newItems)
    }),
    upsert: useEvent((value, item, mode = 'append') => {
      const newItems = create(items).upsert(value, item, mode).items
      setItems(newItems)
    }),
    prepend: useEvent((...itemsToPrepend) => {
      const newItems = create(items).prepend(...itemsToPrepend).items
      setItems(newItems)
    }),
    update: useEvent((value, item) => {
      const newItems = create(items).update(value, item).items
      setItems(newItems)
    }),
  }
}

export interface UseListCollectionReturn<T> {
  /**
   * The collection of items.
   */
  collection: ListCollection<T>
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
