import type { Api, Props } from '@zag-js/tree-view'

import type { TreeCollection, TreeNode } from '../collection/index.js'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'
import type { CallbackEvents, FunctionProperties } from '../../utils/events.js'
import './root.js'
import './parts.js'

type PropTypes = Api extends Api<infer P> ? P : never

export type { Api as TreeViewApi } from '@zag-js/tree-view'
export {
  createFileTreeCollection,
  createTreeCollection,
  type FilePathTreeNode,
  type TreeCollection,
  type TreeCollectionOptions,
  type TreeNode,
} from '../collection/index.js'

export interface TreeViewElement<T extends TreeNode = TreeNode>
  extends
    ActionMethods<Api<PropTypes, T>, 'expand' | 'collapse'>,
    RootElement<Api<PropTypes, T>, Props<T>>,
    FunctionProperties<Props<T>>,
    Pick<Props<T>, 'ids' | 'translations'>,
    StateProperties<Props<T>, 'expandedValue' | 'selectedValue' | 'checkedValue'> {
  /**
   * The nodes to show, e.g. from `createTreeCollection`. Assign a new collection to update the tree.
   */
  collection?: TreeCollection<T> | undefined
}

declare global {
  interface HTMLElementTagNameMap {
    'ark-tree-view': TreeViewElement
  }
}

export type TreeViewEventMap<T extends TreeNode = TreeNode> = CallbackEvents<Props<T>>
