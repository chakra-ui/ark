import { PageListCollection, type CollectionItem, type PageListCollectionOptions } from '@zag-js/collection'

export const createPageListCollection = <T extends CollectionItem>(
  options: PageListCollectionOptions<T>,
): PageListCollection<T> => new PageListCollection(options)

export type { PageListCollection, PageListCollectionOptions }
