import type * as toggleGroup from '@zag-js/toggle-group'

export interface RootProps {
  /**
   * The initial value of the toggle group when it is first rendered.
   * Use when you do not need to control the state of the toggle group.
   */
  defaultValue?: string[]
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
   */
  loopFocus?: boolean
  modelValue?: string[]
  /**
   * Whether to allow multiple toggles to be selected.
   */
  multiple?: boolean
  /**
   * The orientation of the toggle group.
   */
  orientation?: toggleGroup.Orientation
  /**
   *  Whether to use roving tab index to manage focus.
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
