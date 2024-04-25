import type * as zagSwitch from '@zag-js/switch'

export interface RootProps {
  /**
   * Whether the switch is checked.
   */
  checked?: boolean
  /**
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
  /**
   * Whether the switch is disabled.
   */
  disabled?: boolean
  /**
   * The id of the form that the switch belongs to
   */
  form?: string
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: () => ShadowRoot | Node | Document
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the switch. Useful for composition.
   */
  ids?: Partial<{ root: string; input: string; control: string; label: string; thumb: string }>
  /**
   * If `true`, the switch is marked as invalid.
   */
  invalid?: boolean
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  label?: string
  modelValue?: boolean
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
  /**
   * The value of switch input. Useful for form submission.
   * @default "on"
   */
  value?: string | number
}

export type RootEmits = {
  /**
   * Function to call when the switch is clicked.
   */
  checkedChange: [details: zagSwitch.CheckedChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: boolean]
}
