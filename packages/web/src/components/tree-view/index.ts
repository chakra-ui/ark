import type { Api, Props } from '@zag-js/tree-view'

import type { TreeCollection, TreeNode } from '../collection/index.js'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'
import type { CallbackEvents, FunctionProperties } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type {
  TreeViewCell,
  TreeViewIndentGuide,
  TreeViewLabel,
  TreeViewNode,
  TreeViewNodeCheckbox,
  TreeViewNodeExpandTrigger,
  TreeViewNodeGroup,
  TreeViewNodeGroupContent,
  TreeViewNodeIndicator,
  TreeViewNodeRenameInput,
  TreeViewNodeText,
  TreeViewTree,
} from './parts.js'

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
    'ark-tree-view-node-group': InstanceType<typeof TreeViewNodeGroup>
    'ark-tree-view-node-group-content': InstanceType<typeof TreeViewNodeGroupContent>
    'ark-tree-view-label': InstanceType<typeof TreeViewLabel>
    'ark-tree-view-tree': InstanceType<typeof TreeViewTree>
    'ark-tree-view-node': InstanceType<typeof TreeViewNode>
    'ark-tree-view-cell': InstanceType<typeof TreeViewCell>
    'ark-tree-view-node-text': InstanceType<typeof TreeViewNodeText>
    'ark-tree-view-node-indicator': InstanceType<typeof TreeViewNodeIndicator>
    'ark-tree-view-node-checkbox': InstanceType<typeof TreeViewNodeCheckbox>
    'ark-tree-view-node-rename-input': InstanceType<typeof TreeViewNodeRenameInput>
    'ark-tree-view-node-expand-trigger': InstanceType<typeof TreeViewNodeExpandTrigger>
    'ark-tree-view-indent-guide': InstanceType<typeof TreeViewIndentGuide>
  }
}

export type TreeViewEventMap<T extends TreeNode = TreeNode> = CallbackEvents<Props<T>>
