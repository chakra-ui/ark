import {
  type FilePathTreeNode,
  TreeCollection,
  type TreeCollectionOptions,
  type TreeNode,
  filePathToTree,
} from '@zag-js/collection'

export type {
  TreeCollection,
  TreeNode,
  TreeCollectionOptions,
  FilePathTreeNode,
  FlatTreeNode,
} from '@zag-js/collection'

export const createTreeCollection = <T extends TreeNode>(options: TreeCollectionOptions<T>): TreeCollection<T> =>
  new TreeCollection(options)

export const createFileTreeCollection = (paths: string[]): TreeCollection<FilePathTreeNode> => filePathToTree(paths)
