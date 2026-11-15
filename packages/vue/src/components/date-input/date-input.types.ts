import type * as dateInput from '@zag-js/date-input'

export interface RootProps {
  /**
   * The computed segments map for the formatter.
   */
  allSegments?: dateInput.Segments
  /**
   * A function that creates a calendar object for a given calendar identifier.
   * Use this to support non-Gregorian calendars (e.g., Persian, Islamic, Buddhist).
   *
   * @example
   * import { createCalendar } from "@internationalized/date"
   * { locale: "fa-IR", createCalendar }
   */
  createCalendar?: (identifier: dateInput.CalendarIdentifier) => dateInput.Calendar
  /**
   * The initial placeholder date when rendered.
   */
  defaultPlaceholderValue?: dateInput.DateValue
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
   * The `form` attribute of the hidden input element.
   */
  form?: string
  /**
   * The format function for converting a DateValue to a string.
   */
  format?: (date: dateInput.DateValue, details: dateInput.FormatDateDetails) => string
  /**
   * The date formatter to use.
   */
  formatter?: dateInput.DateFormatter
  /**
   * Determines the smallest unit that is displayed in the date input.
   * @default "day"
   */
  granularity?: import('@zag-js/date-utils').DateGranularity
  /**
   * Whether to hide the time zone segment when the value is a `ZonedDateTime`.
   * Has no effect for values without a time zone.
   * @default false
   */
  hideTimeZone?: boolean
  /**
   * Whether to use 12-hour or 24-hour time format.
   * By default, this is determined by the locale.
   */
  hourCycle?: dateInput.HourCycle
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the date input. Useful for composition.
   */
  ids?: dateInput.ElementIds
  /**
   * Whether the date input is invalid
   */
  invalid?: boolean
  /**
   * Returns whether a date is unavailable.
   * When a committed date matches, the input is marked as invalid.
   */
  isDateUnavailable?: (date: dateInput.DateValue, locale: string) => boolean
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
   * Determines the largest unit that is displayed in the date input.
   * To create a time-only input, set this to `"hour"` and set `granularity`
   * to `"hour"`, `"minute"`, or `"second"`.
   * @default "year"
   */
  maxGranularity?: dateInput.MaxGranularity
  /**
   * The minimum date that can be selected.
   */
  min?: dateInput.DateValue
  /**
   * The v-model value of the date input
   */
  modelValue?: dateInput.DateValue[]
  /**
   * The `name` attribute of the input element.
   */
  name?: string
  /**
   * The controlled placeholder date.
   */
  placeholderValue?: dateInput.DateValue
  /**
   * Whether the date input is read-only.
   */
  readOnly?: boolean
  /**
   * Whether the date input is required
   */
  required?: boolean
  /**
   * The selection mode of the date input.
   * - `single` - only one date can be entered
   * - `range` - a range of dates can be entered (start and end)
   *
   * @default "single"
   */
  selectionMode?: dateInput.SelectionMode
  /**
   * Whether to always show leading zeros in month, day, and hour fields.
   * When false, formatting follows the locale default (e.g. "1" instead of "01").
   * @default false
   */
  shouldForceLeadingZeros?: boolean
  /**
   * The time zone to use
   * @default "UTC"
   */
  timeZone?: string
  /**
   * The localized messages to use.
   */
  translations?: dateInput.IntlTranslations
  /**
   * The controlled selected date(s).
   */
  value?: dateInput.DateValue[]
}

export type RootEmits = {
  /**
   * A function called when the date input gains or loses focus.
   */
  focusChange: [details: dateInput.FocusChangeDetails]
  /**
   * A function called when the placeholder value changes.
   */
  placeholderChange: [details: dateInput.PlaceholderChangeDetails]
  /**
   * Function called when the value changes.
   */
  valueChange: [details: dateInput.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: dateInput.DateValue[]]
  /**
   * The callback fired when the placeholder value changes.
   */
  'update:placeholderValue': [placeholderValue: dateInput.DateValue]
}
