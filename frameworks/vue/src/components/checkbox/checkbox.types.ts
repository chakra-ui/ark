import type * as checkbox from '@zag-js/checkbox'

export interface RootProps {
  /**
   * The checked state of the checkbox
   */
  checked?: checkbox.CheckedState
  /**
   * The initial checked state of the checkbox.
   */
  defaultChecked?: checkbox.CheckedState

  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean
  /**
   * The id of the form that the checkbox belongs to.
   */
  form?: string

  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the checkbox. Useful for composition.
   */
  ids?: Partial<{ root: string; hiddenInput: string; control: string; label: string }>
  /**
   * Whether the checkbox is invalid
   */
  invalid?: boolean
  /**
   * The name of the input field in a checkbox.
   * Useful for form submission.
   */
  name?: string
  /**
   * Whether the checkbox is read-only
   */
  readOnly?: boolean
  /**
   * Whether the checkbox is required
   */
  required?: boolean
  /**
   * The value of checkbox input. Useful for form submission.
   * @default "on"
   */
  value?: string
}

export type RootEmits = {
  /**
   * The callback invoked when the checked state changes.
   */
  checkedChange: [details: checkbox.CheckedChangeDetails]

  'update:checked': [checked: checkbox.CheckedState]
}
