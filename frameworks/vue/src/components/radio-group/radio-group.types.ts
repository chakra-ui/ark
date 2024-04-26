import type * as radioGroup from '@zag-js/radio-group'

export interface RootProps {
  /**
   * If `true`, the radio group will be disabled
   */
  disabled?: boolean
  /**
   * The associate form of the underlying input.
   */
  form?: string

  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the radio. Useful for composition.
   */
  ids?: Partial<{
    root: string
    label: string
    indicator: string
    item(value: string): string
    itemLabel(value: string): string
    itemControl(value: string): string
    itemHiddenInput(value: string): string
  }>
  modelValue?: string
  /**
   * The name of the input fields in the radio
   * (Useful for form submission).
   */
  name?: string
  /**
   * Orientation of the radio group
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * Whether the checkbox is read-only
   */
  readOnly?: boolean
  /**
   * The value of the checked radio
   */
  value?: string
}

export type RootEmits = {
  /**
   * Function called once a radio is checked
   * @param value the value of the checked radio
   */
  valueChange: [details: radioGroup.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string]
}
