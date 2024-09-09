import { type CollectionOptions, ListCollection } from '@zag-js/collection'
import { ref } from '@zag-js/core'
import type { CollectionItem } from '../types'

export const createListCollection = <T extends CollectionItem>(
  options: CollectionOptions<T>,
): ListCollection<T> => {
  return ref(new ListCollection(options))
}

// collection.empty = (): ListCollection<CollectionItem> => {
//   return ref(new ListCollection<CollectionItem>({ items: [] }))
// }
