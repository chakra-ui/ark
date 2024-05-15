import type * as pinInput from '@zag-js/pin-input'

export interface RootProps {
  /**
   * Whether to auto-focus the first input.
   */
  autoFocus?: boolean
  /**
   * Whether to blur the input when the value is complete
   */
  blurOnComplete?: boolean
  /**
   * The initial value of the pin input when it is first rendered.
   * Use when you do not need to control the state of the pin input.
   */
  defaultValue?: string[]
  /**
   * Whether the inputs are disabled
   */
  disabled?: boolean
  /**
   * The associate form of the underlying input element.
   */
  form?: string
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the pin input. Useful for composition.
   */
  ids?: Partial<{
    root: string
    hiddenInput: string
    label: string
    control: string
    input(id: string): string
  }>
  /**
   * Whether the pin input is in the invalid state
   */
  invalid?: boolean
  /**
   * If `true`, the input's value will be masked just like `type=password`
   */
  mask?: boolean
  modelValue?: string[]
  /**
   * The name of the input element. Useful for form submission.
   */
  name?: string
  /**
   * If `true`, the pin input component signals to its fields that they should
   * use `autocomplete="one-time-code"`.
   */
  otp?: boolean
  /**
   * The regular expression that the user-entered input value is checked against.
   */
  pattern?: string
  /**
   * The placeholder text for the input
   * @default "○"
   */
  placeholder?: string
  /**
   * Whether to select input value when input is focused
   */
  selectOnFocus?: boolean
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations?: pinInput.IntlTranslations
  /**
   * The type of value the pin-input should allow
   * @default "numeric"
   */
  type?: 'alphanumeric' | 'numeric' | 'alphabetic'
}

export type RootEmits = {
  /**
   * Function called on input change
   */
  valueChange: [details: pinInput.ValueChangeDetails]
  /**
   * Function called when all inputs have valid values
   */
  valueComplete: [details: pinInput.ValueChangeDetails]
  /**
   * Function called when an invalid value is entered
   */
  valueInvalid: [details: pinInput.ValueInvalidDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string[]]
}
