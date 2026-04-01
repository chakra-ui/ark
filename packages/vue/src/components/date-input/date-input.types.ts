import type * as dateInput from '@zag-js/date-input'

export interface RootProps {
  /**
   * The initial selected date(s) when rendered.
   * Use when you don't need to control the selected date(s).
   */
  defaultValue?: dateInput.DateValue[]
  /**
   * Whether the date input is disabled.
   */
  disabled?: boolean
  /**
   * The granularity of the date input.
   */
  granularity?: dateInput.Props['granularity']
  /**
   * The hour cycle used for formatting time segments.
   */
  hourCycle?: dateInput.Props['hourCycle']
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the date input. Useful for composition.
   */
  ids?: dateInput.Props['ids']
  /**
   * Whether the date input is invalid.
   */
  invalid?: boolean
  /**
   * The locale (BCP 47 language tag) to use when formatting the date.
   * @default "en-US"
   */
  locale?: string
  /**
   * The maximum date that can be selected.
   */
  max?: dateInput.DateValue
  /**
   * The minimum date that can be selected.
   */
  min?: dateInput.DateValue
  /**
   * The v-model value of the date input.
   */
  modelValue?: dateInput.DateValue[]
  /**
   * The `name` attribute of the hidden input element.
   */
  name?: string
  /**
   * The associate form of the hidden input element.
   */
  form?: string
  /**
   * Whether the date input is read-only.
   */
  readOnly?: boolean
  /**
   * Whether the date input is required.
   */
  required?: boolean
  /**
   * The selection mode of the date input.
   * - `single` - only one date can be selected
   * - `range` - a range of dates can be selected
   *
   * @default "single"
   */
  selectionMode?: dateInput.SelectionMode
  /**
   * The time zone to use.
   * @default "UTC"
   */
  timeZone?: string
  /**
   * The localized messages to use.
   */
  translations?: dateInput.Props['translations']
  /**
   * The controlled selected date(s).
   */
  value?: dateInput.DateValue[]
  /**
   * The format of the date to display in the input.
   */
  format?: dateInput.Props['format']
  /**
   * Whether to include all date/time segments based on the granularity.
   */
  allSegments?: dateInput.Props['allSegments']
  /**
   * The formatter used to format the date segments.
   */
  formatter?: dateInput.Props['formatter']
  /**
   * The placeholder date value used to generate placeholder segments.
   */
  placeholderValue?: dateInput.Props['placeholderValue']
  /**
   * The initial placeholder date value when rendered.
   */
  defaultPlaceholderValue?: dateInput.Props['defaultPlaceholderValue']
  /**
   * Whether to force leading zeros for numeric segments.
   */
  shouldForceLeadingZeros?: boolean
}

export type RootEmits = {
  /**
   * Function invoked when the focused segment changes.
   */
  focusChange: [details: dateInput.FocusChangeDetails]
  /**
   * Function invoked when the selected value changes.
   */
  valueChange: [details: dateInput.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: dateInput.DateValue[]]
}
