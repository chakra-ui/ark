import type * as toggleGroup from '@zag-js/toggle-group'

export interface RootProps {
  /**
   * The initial selected value of the toggle group when rendered.
   * Use when you don't need to control the selected value of the toggle group.
   */
  defaultValue?: string[]
  /**
   * Whether the toggle group allows empty selection.
   * **Note:** This is ignored if `multiple` is `true`.
   *
   * @default true
   */
  deselectable?: boolean
  /**
   * Whether the toggle is disabled.
   */
  disabled?: boolean
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the toggle. Useful for composition.
   */
  ids?: Partial<{ root: string; item(value: string): string }>
  /**
   * Whether to loop focus inside the toggle group.
   * @default true
   */
  loopFocus?: boolean
  /**
   * The v-model value of the toggle group
   */
  modelValue?: string[]
  /**
   * Whether to allow multiple toggles to be selected.
   */
  multiple?: boolean
  /**
   * The orientation of the toggle group.
   * @default "horizontal"
   */
  orientation?: toggleGroup.Orientation
  /**
   * Whether to use roving tab index to manage focus.
   * @default true
   */
  rovingFocus?: boolean
}

export type RootEmits = {
  /**
   * Function to call when the toggle is clicked.
   */
  valueChange: [details: toggleGroup.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string[]]
}
