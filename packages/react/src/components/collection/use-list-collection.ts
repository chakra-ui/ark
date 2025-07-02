import { useState } from 'react'
import { useEvent } from '../../utils/use-event'
import { type CollectionOptions, type ListCollection, createListCollection } from './list-collection'

export interface UseListCollectionProps<T> extends Omit<CollectionOptions<T>, 'items'> {
  /**
   * The initial items to display in the collection.
   */
  initialItems: T[]
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

export function useListCollection<T>(props: UseListCollectionProps<T>) {
  const { initialItems = [], filter, limit, ...collectionOptions } = props

  const create = (items: T[]) => {
    return createListCollection({ ...collectionOptions, items })
  }

  const [collection, setCollectionImpl] = useState(() =>
    create(limit != null ? initialItems.slice(0, limit) : initialItems),
  )

  const setCollection = useEvent((collection: ListCollection<T>) => {
    setCollectionImpl(limit == null ? collection : collection.copy(collection.items.slice(0, limit)))
  })

  return {
    collection,
    filter: (inputValue = '') => {
      if (!filter) return
      const filtered = create(initialItems).filter((itemString, _index, item) => filter(itemString, inputValue, item))
      setCollection(filtered)
    },
    set: useEvent((items: T[]) => {
      setCollection(create(items))
    }),
    reset: useEvent(() => {
      setCollection(create(initialItems))
    }),
    clear: useEvent(() => {
      setCollection(create([]))
    }),
    insert: useEvent((index: number, ...items: T[]) => {
      setCollection(collection.insert(index, ...items))
    }),
    insertBefore: useEvent((value: string, ...items: T[]) => {
      setCollection(collection.insertBefore(value, ...items))
    }),
    insertAfter: useEvent((value: string, ...items: T[]) => {
      setCollection(collection.insertAfter(value, ...items))
    }),
    remove: useEvent((...itemOrValues: T[]) => {
      setCollection(collection.remove(...itemOrValues))
    }),
    move: useEvent((value: string, to: number) => {
      setCollection(collection.move(value, to))
    }),
    moveBefore: useEvent((value: string, ...values: string[]) => {
      setCollection(collection.moveBefore(value, ...values))
    }),
    moveAfter: useEvent((value: string, ...values: string[]) => {
      setCollection(collection.moveAfter(value, ...values))
    }),
    reorder: useEvent((from: number, to: number) => {
      setCollection(collection.reorder(from, to))
    }),
    append: useEvent((...items: T[]) => {
      setCollection(collection.append(...items))
    }),
    prepend: useEvent((...items: T[]) => {
      setCollection(collection.prepend(...items))
    }),
    update: useEvent((value: string, item: T) => {
      setCollection(collection.update(value, item))
    }),
  }
}
