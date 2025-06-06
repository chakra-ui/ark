import {
  type CollectionItem,
  type CollectionOptions,
  GridCollection,
  type GridCollectionOptions,
} from '@zag-js/collection'

export const createGridCollection = <T extends CollectionItem>(options: GridCollectionOptions<T>): GridCollection<T> =>
  new GridCollection(options)

export type { GridCollection, CollectionOptions, CollectionItem, GridCollectionOptions }
