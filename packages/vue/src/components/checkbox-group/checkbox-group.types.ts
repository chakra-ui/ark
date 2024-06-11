export interface CheckboxGroupProps {
  /**
   * The initial value of `value` when uncontrolled
   */
  defaultValue?: string[]
  /**
   * The controlled value of the checkbox group
   */
  modelValue?: string[]
  /**
   * If `true`, the checkbox group is disabled
   */
  disabled?: boolean
  /**
   * If `true`, the checkbox group is read-only
   */
  readOnly?: boolean
}

export type CheckboxGroupEmits = {
  /**
   * Functional called when the value changes.
   */
  valueChange: [value: string[]]

  'update:modelValue': [value: string[]]
}

export interface CheckboxGroupItemProps {
  value: string | undefined
}
