import type * as zagSwitch from '@zag-js/switch'

export interface RootProps {
  /**
   * The controlled checked state of the switch
   */
  checked?: boolean
  /**
   * The initial checked state of the switch when rendered.
   * Use when you don't need to control the checked state of the switch.
   */
  defaultChecked?: boolean
  /**
   * Whether the switch is disabled.
   */
  disabled?: boolean
  /**
   * The id of the form that the switch belongs to
   */
  form?: string
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the switch. Useful for composition.
   */
  ids?: Partial<{ root: string; hiddenInput: string; control: string; label: string; thumb: string }>
  /**
   * If `true`, the switch is marked as invalid.
   */
  invalid?: boolean
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  label?: string
  /**
   * The name of the input field in a switch
   * (Useful for form submission).
   */
  name?: string
  /**
   * Whether the switch is read-only
   */
  readOnly?: boolean
  /**
   * If `true`, the switch input is marked as required,
   */
  required?: boolean
}

export type RootEmits = {
  /**
   * Function to call when the switch is clicked.
   */
  checkedChange: [details: zagSwitch.CheckedChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:checked': [checked: boolean]
}
