import {
  type CollectionItem,
  type CollectionOptions,
  ListCollection,
  TreeCollection,
  type TreeCollectionOptions,
  type TreeNode,
} from '@zag-js/collection'
import { ref } from '@zag-js/core'

export type { CollectionItem, ListCollection } from '@zag-js/collection'

export const createListCollection = <T extends CollectionItem>(
  options: CollectionOptions<T>,
): ListCollection<T> => ref(new ListCollection(options))

export type { TreeCollection, TreeNode } from '@zag-js/collection'

export const createTreeCollection = <T extends TreeNode>(
  options: TreeCollectionOptions<T>,
): TreeCollection<T> => ref(new TreeCollection(options))
