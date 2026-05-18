import {
  type CollectionItem,
  type CollectionOptions,
  GridCollection,
  type GridCollectionOptions,
  ListCollection,
  Selection,
  type SelectionMode,
  TreeCollection,
  type TreeCollectionOptions,
  type TreeNode,
  type FilePathTreeNode,
  filePathToTree,
} from '@zag-js/collection'
import * as asyncList from '@zag-js/async-list'

export {
  GridCollection,
  ListCollection,
  Selection,
  TreeCollection,
  filePathToTree,
  flattenedToTree,
  isGridCollection,
  isListCollection,
  type CollectionItem,
  type CollectionMethods,
  type CollectionOptions,
  type CollectionSearchOptions,
  type CollectionSearchState,
  type FilePathTreeNode,
  type FlatTreeNode,
  type FlatTreeNodeMeta,
  type GridCollectionOptions,
  type IndexPath,
  type SelectionMode,
  type TreeCollectionMethods,
  type TreeCollectionOptions,
  type TreeNode,
  type TreeSkipFn,
  type ValuePath,
} from '@zag-js/collection'

export type {
  Api as AsyncListApi,
  Machine as AsyncListMachine,
  Props as AsyncListProps,
  Service as AsyncListService,
  LoadDependency,
  LoadDetails,
  LoadResult,
  SortDescriptor,
  SortDetails,
  SortDirection,
} from '@zag-js/async-list'

export const createListCollection = <T extends CollectionItem>(options: CollectionOptions<T>): ListCollection<T> =>
  new ListCollection(options)

export const createGridCollection = <T extends CollectionItem>(options: GridCollectionOptions<T>): GridCollection<T> =>
  new GridCollection(options)

export const createTreeCollection = <T extends TreeNode>(options: TreeCollectionOptions<T>): TreeCollection<T> =>
  new TreeCollection(options)

export const createFileTreeCollection = (paths: string[]): TreeCollection<FilePathTreeNode> => filePathToTree(paths)

export interface CreateListSelectionOptions {
  values?: Iterable<string>
  selectionMode?: SelectionMode
  deselectable?: boolean
}

export const createListSelection = (options: CreateListSelectionOptions = {}): Selection => {
  const selection = new Selection(options.values)
  if (options.selectionMode !== undefined) {
    selection.selectionMode = options.selectionMode
  }
  if (options.deselectable !== undefined) {
    selection.deselectable = options.deselectable
  }
  return selection
}

export const createAsyncListMachine = asyncList.machine
export const connectAsyncList = asyncList.connect
