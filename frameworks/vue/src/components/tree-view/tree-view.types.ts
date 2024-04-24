import type * as treeView from '@zag-js/tree-view'

export interface TreeViewRootProps {
  /**
   * The initial focused index of the tree view.
   */
  defaultFocusedId?: string
  /**
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
  /**
   * The id of the expanded nodes
   */
  expandedValue?: string[]
  /**
   * The id of the focused node
   */
  focusedValue?: string
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: () => ShadowRoot | Node | Document
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * Whether clicking on a branch should open it or not
   * @default true
   */
  openOnClick?: boolean
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
   */
  typeahead?: boolean
}

export type TreeViewRootEmits = {
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
}
