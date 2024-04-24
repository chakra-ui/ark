import type * as numberInput from '@zag-js/number-input'

export interface NumberInputRootProps {
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
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
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
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: () => ShadowRoot | Node | Document
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
   */
  max?: number
  /**
   * The minimum value of the number input
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
   * @default
   * "[0-9]*(.[0-9]+)?"
   */
  pattern?: string
  /**
   * Whether the number input is readonly
   */
  readOnly?: boolean
  /**
   * Whether to spin the value when the increment/decrement button is pressed
   */
  spinOnPress?: boolean
  /**
   * The amount to increment or decrement the value by
   */
  step?: number
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations?: numberInput.IntlTranslations
  /**
   * The value of the input
   */
  value?: string
}

export type NumberInputRootEmits = {
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
