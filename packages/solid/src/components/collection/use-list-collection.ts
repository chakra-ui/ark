import { createMemo, createSignal, splitProps } from 'solid-js'
import type { MaybeAccessor } from '../../types'
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

export function useListCollection<T>(props: MaybeAccessor<UseListCollectionProps<T>>) {
  const splittedProps = createMemo(() => {
    const rawProps = typeof props === 'function' ? props() : props
    return splitProps(rawProps, ['initialItems', 'filter', 'limit'])
  })

  const create = (items: T[]) => {
    const [, collectionProps] = splittedProps()
    return createListCollection({ ...collectionProps, items })
  }

  const init = () => {
    const [localProps] = splittedProps()
    return create(
      localProps.limit != null ? localProps.initialItems.slice(0, localProps.limit) : localProps.initialItems,
    )
  }

  const [collection, setCollectionImpl] = createSignal(init())

  const setCollection = (collection: ListCollection<T>) => {
    const [localProps] = splittedProps()
    setCollectionImpl(
      localProps.limit == null ? collection : collection.copy(collection.items.slice(0, localProps.limit)),
    )
  }

  return {
    collection,
    filter: (inputValue = '') => {
      const [localProps] = splittedProps()

      const filter = localProps.filter
      if (!filter) return

      const filtered = create(localProps.initialItems).filter((itemString, _index, item) =>
        filter(itemString, inputValue, item),
      )
      setCollection(filtered)
    },
    set: (items: T[]) => {
      setCollection(create(items))
    },
    reset: () => {
      const [localProps] = splittedProps()
      setCollection(create(localProps.initialItems))
    },
    clear: () => {
      setCollection(create([]))
    },
    insert: (index: number, ...items: T[]) => {
      setCollection(collection().insert(index, ...items))
    },
    insertBefore: (value: string, ...items: T[]) => {
      setCollection(collection().insertBefore(value, ...items))
    },
    insertAfter: (value: string, ...items: T[]) => {
      setCollection(collection().insertAfter(value, ...items))
    },
    remove: (...itemOrValues: T[]) => {
      setCollection(collection().remove(...itemOrValues))
    },
    move: (value: string, to: number) => {
      setCollection(collection().move(value, to))
    },
    moveBefore: (value: string, ...values: string[]) => {
      setCollection(collection().moveBefore(value, ...values))
    },
    moveAfter: (value: string, ...values: string[]) => {
      setCollection(collection().moveAfter(value, ...values))
    },
    reorder: (from: number, to: number) => {
      setCollection(collection().reorder(from, to))
    },
    append: (...items: T[]) => {
      setCollection(collection().append(...items))
    },
    prepend: (...items: T[]) => {
      setCollection(collection().prepend(...items))
    },
    update: (value: string, item: T) => {
      setCollection(collection().update(value, item))
    },
  }
}
