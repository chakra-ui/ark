import { type CollectionItem, type CollectionOptions, ListCollection } from '@zag-js/collection'
import { ref } from '@zag-js/core'

export type { CollectionItem, ListCollection } from '@zag-js/collection'

export const createListCollection = <T extends CollectionItem>(
  options: CollectionOptions<T>,
): ListCollection<T> => {
  return ref(new ListCollection(options))
}

// collection.empty = (): ListCollection<CollectionItem> => {
//   return ref(new ListCollection<CollectionItem>({ items: [] }))
// }
