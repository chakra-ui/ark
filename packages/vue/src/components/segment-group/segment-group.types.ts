import type * as segmentGroup from '@zag-js/radio-group'

export interface RootProps {
  /**
   * The initial value of the checked radio when rendered.
   * Use when you don't need to control the value of the radio group.
   */
  defaultValue?: string | null
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
  ids?: segmentGroup.ElementIds
  /**
   * If `true`, the radio group is marked as invalid.
   */
  invalid?: boolean
  /**
   * The v-model value of the segment group
   */
  modelValue?: string | null
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
   * Whether the radio group is read-only
   */
  readOnly?: boolean
  /**
   * If `true`, the radio group is marked as required.
   */
  required?: boolean
}

export type RootEmits = {
  /**
   * Function called once a radio is checked
   */
  valueChange: [details: segmentGroup.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string | null]
}
