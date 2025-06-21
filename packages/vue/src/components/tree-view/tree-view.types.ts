import type * as treeView from '@zag-js/tree-view'
import type { TreeCollection, TreeNode } from '../collection'

export interface RootProps<T extends TreeNode> {
  /**
   * The collection of tree nodes
   */
  collection: TreeCollection<T>
  /**
   * The initial expanded node values when rendered.
   * Use when you don't need to control the expanded node values.
   */
  defaultExpandedValue?: string[]
  /**
   * The initial selected node values when rendered.
   * Use when you don't need to control the selected node values.
   */
  defaultSelectedValue?: string[]
  /**
   * The initial checked node values when rendered.
   * Use when you don't need to control the checked node values.
   */
  defaultCheckedValue?: string[]
  /**
   * The initial focused node value when rendered.
   * Use when you don't need to control the focused node value.
   */
  defaultFocusedValue?: string
  /**
   * The controlled checked node values
   */
  checkedValue?: string[]
  /**
   * Whether clicking on a branch should open it or not
   * @default true
   */
  expandOnClick?: boolean
  /**
   * The controlled expanded node values
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
   * The controlled selected node values
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

export type RootEmits<T extends TreeNode> = {
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
   * Called when the checked value changes
   */
  checkedChange: [details: treeView.CheckedChangeDetails]
  /**
   * A function that is called when the children are loaded successfully.
   */
  loadChildrenComplete: [details: treeView.LoadChildrenCompleteDetails<T>]
  /**
   * A function that is called when there is an error loading the children.
   */
  loadChildrenError: [details: treeView.LoadChildrenErrorDetails<T>]
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
  /**
   * Called when the checked value changes
   */
  'update:checkedValue': [value: string[]]
}
