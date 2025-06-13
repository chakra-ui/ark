import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { type CollectionOptions, type ListCollection, createListCollection } from './list-collection'

export interface UseListCollectionProps<T> extends Omit<CollectionOptions<T>, 'items'> {
  /**
   * The initial items to display in the collection.
   */
  initialItems: T[]
  /**
   * The filter function to use to filter the items.
   */
  filter?: (itemText: string, filterText: string) => boolean
  /**
   * The maximum number of items to display in the collection.
   * Useful for performance when you have a large number of items.
   */
  limit?: number
}

export function useListCollection<T>(inProps: MaybeFunction<UseListCollectionProps<T>>) {
  const [props, collectionOptions] = $derived.by(() => {
    const { initialItems = [], filter, limit, ...collectionOptions } = runIfFn(inProps)
    return [{ initialItems, filter, limit }, collectionOptions]
  })

  const create = (items: T[]) => {
    return createListCollection({ ...collectionOptions, items })
  }

  let collection = $state(create(props.limit != null ? props.initialItems.slice(0, props.limit) : props.initialItems))

  const setCollection = (v: ListCollection<T>) => {
    collection = props.limit == null ? v : v.copy(v.items.slice(0, props.limit))
  }

  return {
    get collection() {
      return collection
    },
    filter: (inputValue: string) => {
      const filterFn = props.filter
      if (!filterFn) return
      const filtered = create(props.initialItems).filter((itemString) => filterFn(itemString, inputValue))
      setCollection(filtered)
    },
    set: (items: T[]) => {
      setCollection(create(items))
    },
    reset: () => {
      setCollection(create(props.initialItems))
    },
    clear: () => {
      setCollection(create([]))
    },
    insert: (index: number, ...items: T[]) => {
      setCollection(collection.insert(index, ...items))
    },
    insertBefore: (value: string, ...items: T[]) => {
      setCollection(collection.insertBefore(value, ...items))
    },
    insertAfter: (value: string, ...items: T[]) => {
      setCollection(collection.insertAfter(value, ...items))
    },
    remove: (...itemOrValues: T[]) => {
      setCollection(collection.remove(...itemOrValues))
    },
    move: (value: string, to: number) => {
      setCollection(collection.move(value, to))
    },
    moveBefore: (value: string, ...values: string[]) => {
      setCollection(collection.moveBefore(value, ...values))
    },
    moveAfter: (value: string, ...values: string[]) => {
      setCollection(collection.moveAfter(value, ...values))
    },
    reorder: (from: number, to: number) => {
      setCollection(collection.reorder(from, to))
    },
    prepend: (...items: T[]) => {
      setCollection(collection.prepend(...items))
    },
    update: (value: string, item: T) => {
      setCollection(collection.update(value, item))
    },
  }
}
