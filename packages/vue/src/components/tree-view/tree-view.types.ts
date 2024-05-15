import type * as treeView from '@zag-js/tree-view'

export interface RootProps {
  /**
   * The initial expanded items of the tree view.
   * Use this when you do not need to control the state of the tree view.
   */
  defaultExpandedValue?: string[]
  /**
   * The initial selected items of the tree view.
   * Use this when you do not need to control the state of the tree view.
   */
  defaultSelectedValue?: string[]
  /**
   * Whether clicking on a branch should open it or not
   * @default true
   */
  expandOnClick?: boolean
  /**
   * The id of the expanded nodes
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
  ids?: Partial<{ root: string; tree: string; label: string }>
  /**
   * The id of the selected nodes
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
  'update:expandedValue': [value: string[]]
  'update:focusedValue': [value: string | null]
  'update:selectedValue': [value: string[]]
}
