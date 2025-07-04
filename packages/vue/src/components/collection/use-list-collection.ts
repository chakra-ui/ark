import { type MaybeRef, type Ref, computed, ref, toValue } from 'vue'
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

export function useListCollection<T>(props: MaybeRef<UseListCollectionProps<T>>): UseListCollectionReturn<T> {
  const resolvedProps = computed(() => {
    const { initialItems = [], filter, limit, ...collectionOptions } = toValue(props)
    return [{ initialItems, filter, limit }, collectionOptions] as const
  })

  const init = () => {
    const { initialItems } = resolvedProps.value[0]
    return initialItems
  }

  const items = ref(init()) as Ref<T[]>
  const filterText = ref('')

  const setItems = (newItems: T[]) => {
    items.value = newItems
    filterText.value = ''
  }

  const create = (itemsToCreate: T[]) => {
    const [, collectionOptions] = resolvedProps.value
    return createListCollection({ ...collectionOptions, items: itemsToCreate })
  }

  const collection = computed(() => {
    const [localProps, collectionOptions] = resolvedProps.value
    let activeItems = items.value

    // Apply filter if we have filter text and a filter function
    const filter = localProps.filter
    if (filterText.value && filter) {
      activeItems = create(items.value).filter((itemString, _index, item) =>
        filter(itemString, filterText.value, item),
      ).items
    }

    // Apply limit
    const limitedItems = localProps.limit == null ? activeItems : activeItems.slice(0, localProps.limit)
    return createListCollection({ ...collectionOptions, items: limitedItems })
  })

  return {
    collection,
    filter: (inputValue = '') => {
      filterText.value = inputValue
    },
    set: (newItems) => {
      setItems(newItems)
    },
    reset: () => {
      const [localProps] = resolvedProps.value
      setItems(localProps.initialItems)
    },
    clear: () => {
      setItems([])
    },
    insert: (index, ...itemsToInsert) => {
      const newItems = create(items.value).insert(index, ...itemsToInsert).items
      setItems(newItems)
    },
    insertBefore: (value, ...itemsToInsert) => {
      const newItems = create(items.value).insertBefore(value, ...itemsToInsert).items
      setItems(newItems)
    },
    insertAfter: (value, ...itemsToInsert) => {
      const newItems = create(items.value).insertAfter(value, ...itemsToInsert).items
      setItems(newItems)
    },
    remove: (...itemOrValues) => {
      const newItems = create(items.value).remove(...itemOrValues).items
      setItems(newItems)
    },
    move: (value, to) => {
      const newItems = create(items.value).move(value, to).items
      setItems(newItems)
    },
    moveBefore: (value, ...values) => {
      const newItems = create(items.value).moveBefore(value, ...values).items
      setItems(newItems)
    },
    moveAfter: (value, ...values) => {
      const newItems = create(items.value).moveAfter(value, ...values).items
      setItems(newItems)
    },
    reorder: (from: number, to: number) => {
      const newItems = create(items.value).reorder(from, to).items
      setItems(newItems)
    },
    append: (...itemsToAppend) => {
      const newItems = create(items.value).append(...itemsToAppend).items
      setItems(newItems)
    },
    upsert: (value, item, mode = 'append') => {
      let collection = create(items.value)
      const updateFn = mode === 'append' ? collection.append : collection.prepend
      collection = collection.has(value) ? collection.update(value, item) : updateFn(item)
      setItems(collection.items)
    },
    prepend: (...itemsToPrepend) => {
      const newItems = create(items.value).prepend(...itemsToPrepend).items
      setItems(newItems)
    },
    update: (value, item) => {
      const newItems = create(items.value).update(value, item).items
      setItems(newItems)
    },
  }
}

export interface UseListCollectionReturn<T> {
  /**
   * The collection of items.
   */
  collection: Ref<ListCollection<T>>
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
