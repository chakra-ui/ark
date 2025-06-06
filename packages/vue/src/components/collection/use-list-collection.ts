import { type MaybeRef, computed, ref, toValue } from 'vue'
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

export function useListCollection<T>(props: MaybeRef<UseListCollectionProps<T>>) {
  const resolvedProps = computed(() => {
    const { initialItems = [], filter, limit, ...collectionOptions } = toValue(props)
    return [{ initialItems, filter, limit }, collectionOptions] as const
  })

  const create = (items: T[]) => {
    const [, collectionOptions] = resolvedProps.value
    return createListCollection({ ...collectionOptions, items })
  }

  const init = () => {
    const [localProps] = resolvedProps.value
    return create(
      localProps.limit != null ? localProps.initialItems.slice(0, localProps.limit) : localProps.initialItems,
    )
  }

  const collection = ref(init())

  const setCollection = (newCollection: ListCollection<T>) => {
    const [localProps] = resolvedProps.value
    collection.value =
      localProps.limit == null ? newCollection : newCollection.copy(newCollection.items.slice(0, localProps.limit))
  }

  return {
    collection,
    filter: (inputValue: string) => {
      const [localProps] = resolvedProps.value
      const filter = localProps.filter
      if (!filter) return
      const filtered = create(localProps.initialItems).filter((itemString) => filter(itemString, inputValue))
      setCollection(filtered)
    },
    set: (items: T[]) => {
      setCollection(create(items))
    },
    reset: () => {
      const [localProps] = resolvedProps.value
      setCollection(create(localProps.initialItems))
    },
    clear: () => {
      setCollection(create([]))
    },
    insert: (index: number, ...items: T[]) => {
      setCollection(collection.value.insert(index, ...items))
    },
    insertBefore: (value: string, ...items: T[]) => {
      setCollection(collection.value.insertBefore(value, ...items))
    },
    insertAfter: (value: string, ...items: T[]) => {
      setCollection(collection.value.insertAfter(value, ...items))
    },
    remove: (...itemOrValues: T[]) => {
      setCollection(collection.value.remove(...itemOrValues))
    },
    move: (value: string, to: number) => {
      setCollection(collection.value.move(value, to))
    },
    moveBefore: (value: string, ...values: string[]) => {
      setCollection(collection.value.moveBefore(value, ...values))
    },
    moveAfter: (value: string, ...values: string[]) => {
      setCollection(collection.value.moveAfter(value, ...values))
    },
    reorder: (from: number, to: number) => {
      setCollection(collection.value.reorder(from, to))
    },
    append: (...items: T[]) => {
      setCollection(collection.value.append(...items))
    },
    prepend: (...items: T[]) => {
      setCollection(collection.value.prepend(...items))
    },
    update: (value: string, item: T) => {
      setCollection(collection.value.update(value, item))
    },
  }
}
