import {
  type CollectionItem,
  type CollectionOptions,
  type FilePathTreeNode,
  filePathToTree,
  GridCollection,
  type GridCollectionOptions,
  ListCollection,
  PageListCollection,
  type PageListCollectionOptions,
  TreeCollection,
  type TreeCollectionOptions,
  type TreeNode,
} from '@zag-js/collection'

export type {
  CollectionItem,
  CollectionOptions,
  FilePathTreeNode,
  FlatTreeNode,
  GridCollection,
  GridCollectionOptions,
  ListCollection,
  PageListCollection,
  PageListCollectionOptions,
  TreeCollection,
  TreeCollectionOptions,
  TreeNode,
} from '@zag-js/collection'

export const createListCollection = <T extends CollectionItem>(options: CollectionOptions<T>): ListCollection<T> =>
  new ListCollection(options)

export const createGridCollection = <T extends CollectionItem>(options: GridCollectionOptions<T>): GridCollection<T> =>
  new GridCollection(options)

export const createPageListCollection = <T extends CollectionItem>(
  options: PageListCollectionOptions<T>,
): PageListCollection<T> => new PageListCollection(options)

export const createTreeCollection = <T extends TreeNode>(options: TreeCollectionOptions<T>): TreeCollection<T> =>
  new TreeCollection(options)

export const createFileTreeCollection = (paths: string[]): TreeCollection<FilePathTreeNode> => filePathToTree(paths)
