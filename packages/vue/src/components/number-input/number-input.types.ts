import type * as numberInput from '@zag-js/number-input'

export interface RootProps {
  /**
   * Whether to allow mouse wheel to change the value
   */
  allowMouseWheel?: boolean
  /**
   * Whether to allow the value overflow the min/max range
   * @default true
   */
  allowOverflow?: boolean
  /**
   * Whether to clamp the value when the input loses focus (blur)
   * @default true
   */
  clampValueOnBlur?: boolean
  /**
   * The initial value of the number input when it is first rendered.
   * Use when you do not need to control the state of the number input.
   */
  defaultValue?: string
  /**
   * Whether the number input is disabled.
   */
  disabled?: boolean
  /**
   * Whether to focus input when the value changes
   * @default true
   */
  focusInputOnChange?: boolean
  /**
   * The associate form of the input element.
   */
  form?: string
  /**
   * The options to pass to the `Intl.NumberFormat` constructor
   */
  formatOptions?: Intl.NumberFormatOptions
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the number input. Useful for composition.
   */
  ids?: Partial<{
    root: string
    label: string
    input: string
    incrementTrigger: string
    decrementTrigger: string
    scrubber: string
  }>
  /**
   * Hints at the type of data that might be entered by the user. It also determines
   * the type of keyboard shown to the user on mobile devices
   * @default "decimal"
   */
  inputMode?: 'text' | 'tel' | 'numeric' | 'decimal'
  /**
   * Whether the number input value is invalid.
   */
  invalid?: boolean
  /**
   * The current locale. Based on the BCP 47 definition.
   * @default "en-US"
   */
  locale?: string
  /**
   * The maximum value of the number input
   * @default Number.MAX_SAFE_INTEGER
   */
  max?: number
  /**
   * The minimum value of the number input
   * @default Number.MIN_SAFE_INTEGER
   */
  min?: number
  modelValue?: string
  /**
   * The name attribute of the number input. Useful for form submission.
   */
  name?: string
  /**
   * The pattern used to check the <input> element's value against
   *
   * @default "[0-9]*(.[0-9]+)?"
   */
  pattern?: string
  /**
   * Whether the number input is readonly
   */
  readOnly?: boolean
  /**
   * Whether to spin the value when the increment/decrement button is pressed
   * @default true
   */
  spinOnPress?: boolean
  /**
   * The amount to increment or decrement the value by
   * @default 1
   */
  step?: number
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations?: numberInput.IntlTranslations
}

export type RootEmits = {
  /**
   * Function invoked when the number input is focused
   */
  focusChange: [details: numberInput.FocusChangeDetails]
  /**
   * Function invoked when the value changes
   */
  valueChange: [details: numberInput.ValueChangeDetails]
  /**
   * Function invoked when the value overflows or underflows the min/max range
   */
  valueInvalid: [details: numberInput.ValueInvalidDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string]
}
