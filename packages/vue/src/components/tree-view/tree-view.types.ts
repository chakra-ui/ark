import type * as treeView from '@zag-js/tree-view'
import type { TreeCollection, TreeNode } from '../collection'

export interface RootProps<T extends TreeNode> {
  /**
   * The collection of tree nodes
   */
  collection: TreeCollection<T>
  /**
   * The initial expanded node ids when rendered.
   * Use when you don't need to control the expanded node ids.
   */
  defaultExpandedValue?: string[]
  /**
   * The initial selected node ids when rendered.
   * Use when you don't need to control the selected node ids.
   */
  defaultSelectedValue?: string[]
  /**
   * Whether clicking on a branch should open it or not
   * @default true
   */
  expandOnClick?: boolean
  /**
   * The controlled expanded node ids
   */
  expandedValue?: string[]
  /**
   * The id of the focused node
   */
  focusedValue?: string
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the tree elements. Useful for composition.
   */
  ids?: Partial<{ root: string; tree: string; label: string; node(value: string): string }>
  /**
   * The controlled selected node ids
   */
  selectedValue?: string[]
  /**
   * Whether the tree supports multiple selection
   * - "single": only one node can be selected
   * - "multiple": multiple nodes can be selected
   *
   * @default "single"
   */
  selectionMode?: 'single' | 'multiple'
  /**
   * Whether the tree supports typeahead search
   * @default true
   */
  typeahead?: boolean
  /**
   * A function that loads the children of a node.
   */
  loadChildren?: (details: treeView.LoadChildrenDetails<T>) => Promise<T[]>
}

export type RootEmits = {
  /**
   * Called when the tree is opened or closed
   */
  expandedChange: [details: treeView.ExpandedChangeDetails]
  /**
   * Called when the focused node changes
   */
  focusChange: [details: treeView.FocusChangeDetails]
  /**
   * Called when the selection changes
   */
  selectionChange: [details: treeView.SelectionChangeDetails]
  /**
   * A function that is called when the children are loaded.
   */
  loadChildrenComplete: [details: treeView.LoadChildrenCompleteDetails]
  /**
   * Called when the expanded value changes
   */
  'update:expandedValue': [value: string[]]
  /**
   * Called when the focused value changes
   */
  'update:focusedValue': [value: string | null]
  /**
   * Called when the selected value changes
   */
  'update:selectedValue': [value: string[]]
}
