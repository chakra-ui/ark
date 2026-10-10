import type * as cascadeSelect from '@zag-js/cascade-select'
import type { TreeCollection, TreeNode as CascadeSelectNode } from '../collection'

export interface RootProps<T extends CascadeSelectNode> {
  /**
   * Whether parent (branch) items can be selectable
   */
  allowParentSelection?: boolean
  /**
   * Whether the cascade-select should close when an item is selected
   * @default true
   */
  closeOnSelect?: boolean
  /**
   * The tree collection data
   */
  collection: TreeCollection<T>
  /**
   * The initial value of the cascade-select when rendered.
   * Use when you don't need to control the value.
   */
  defaultValue?: string[][]
  /**
   * The initial open state of the cascade-select when rendered.
   * Use when you don't need to control the open state.
   */
  defaultOpen?: boolean
  /**
   * The initial highlighted value of the cascade-select when rendered.
   */
  defaultHighlightedValue?: string[]
  /**
   * Whether the cascade-select is disabled
   */
  disabled?: boolean
  /**
   * The associate form of the underlying input element
   */
  form?: string
  /**
   * Function to format the display value
   */
  formatValue?: (selectedItems: T[][]) => string
  /**
   * The controlled highlighted value of the cascade-select
   */
  highlightedValue?: string[]
  /**
   * What triggers highlighting of items
   * @default "click"
   */
  highlightTrigger?: 'click' | 'hover'
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the cascade-select elements. Useful for composition.
   */
  ids?: cascadeSelect.ElementIds
  /**
   * Whether the cascade-select is invalid
   */
  invalid?: boolean
  /**
   * Whether the cascade-select should loop focus when navigating with keyboard
   * @default false
   */
  loopFocus?: boolean
  /**
   * The v-model value of the cascade-select
   */
  modelValue?: string[][]
  /**
   * Whether to allow multiple selections
   * @default false
   */
  multiple?: boolean
  /**
   * The name attribute of the underlying input element
   */
  name?: string
  /**
   * The controlled open state of the cascade-select
   */
  open?: boolean
  /**
   * The positioning options for the cascade-select content
   */
  positioning?: cascadeSelect.PositioningOptions
  /**
   * Whether the cascade-select is read-only
   */
  readOnly?: boolean
  /**
   * Whether the cascade-select is required
   */
  required?: boolean
  /**
   * Function to scroll to a specific index in a list
   */
  scrollToIndexFn?: (details: cascadeSelect.ScrollToIndexDetails) => void
}

export type RootEmits = {
  exitComplete: []
  highlightChange: [details: cascadeSelect.HighlightChangeDetails]
  openChange: [details: cascadeSelect.OpenChangeDetails]
  valueChange: [details: cascadeSelect.ValueChangeDetails]
  'update:modelValue': [value: string[][]]
  'update:open': [open: boolean]
}
