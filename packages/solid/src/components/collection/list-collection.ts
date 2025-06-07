import { type CollectionItem, type CollectionMethods, type CollectionOptions, ListCollection } from '@zag-js/collection'

export const createListCollection = <T extends CollectionItem>(options: CollectionOptions<T>): ListCollection<T> =>
  new ListCollection(options)

export type { ListCollection, CollectionOptions, CollectionItem, CollectionMethods }
