import type * as datePicker from '@zag-js/date-picker'

export interface RootProps {
  /**
   * Whether the calendar should close after the date selection is complete.
   * This is ignored when the selection mode is `multiple`.
   * @default true
   */
  closeOnSelect?: boolean
  /**
   * The initial focused date when rendered.
   * Use when you don't need to control the focused date of the date picker.
   */
  defaultFocusedValue?: datePicker.DateValue
  /**
   * The initial open state of the date picker when rendered.
   * Use when you don't need to control the open state of the date picker.
   */
  defaultOpen?: boolean
  /**
   * The initial selected date(s) when rendered.
   * Use when you don't need to control the selected date(s) of the date picker.
   */
  defaultValue?: datePicker.DateValue[]
  /**
   * The default view of the calendar
   * @default "day"
   */
  defaultView?: datePicker.DateView
  /**
   * Whether the calendar is disabled.
   */
  disabled?: boolean
  /**
   * Whether the calendar should have a fixed number of weeks.
   * This renders the calendar with 6 weeks instead of 5 or 6.
   */
  fixedWeeks?: boolean
  /**
   * The controlled focused date.
   */
  focusedValue?: datePicker.DateValue
  /**
   * The format of the date to display in the input.
   */
  format?: (date: datePicker.DateValue, details: datePicker.LocaleDetails) => string
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the date picker. Useful for composition.
   */
  ids?: Partial<{
    root: string
    label(index: number): string
    table(id: string): string
    tableHeader(id: string): string
    tableBody(id: string): string
    tableRow(id: string): string
    content: string
    cellTrigger(id: string): string
    prevTrigger(view: datePicker.DateView): string
    nextTrigger(view: datePicker.DateView): string
    viewTrigger(view: datePicker.DateView): string
    clearTrigger: string
    control: string
    input(index: number): string
    trigger: string
    monthSelect: string
    yearSelect: string
    positioner: string
  }>
  /**
   * Returns whether a date of the calendar is available.
   */
  isDateUnavailable?: (date: datePicker.DateValue, locale: string) => boolean
  /**
   * The locale (BCP 47 language tag) to use when formatting the date.
   * @default "en-US"
   */
  locale?: string
  /**
   * The maximum date that can be selected.
   */
  max?: datePicker.DateValue
  /**
   * The maximum view of the calendar
   * @default "year"
   */
  maxView?: datePicker.DateView
  /**
   * The minimum date that can be selected.
   */
  min?: datePicker.DateValue
  /**
   * The minimum view of the calendar
   * @default "day"
   */
  minView?: datePicker.DateView
  /**
   * The v-model value of the date picker
   */
  modelValue?: datePicker.DateValue[]
  /**
   * The `name` attribute of the input element.
   */
  name?: string
  /**
   * The number of months to display.
   */
  numOfMonths?: number
  /**
   * The controlled open state of the date picker
   */
  open?: boolean
  /**
   * Whether day outside the visible range can be selected.
   * @default false
   */
  outsideDaySelectable?: boolean
  /**
   * Function to parse the date from the input back to a DateValue.
   */
  parse?: (value: string, details: datePicker.LocaleDetails) => datePicker.DateValue | undefined
  /**
   * The placeholder text to display in the input.
   */
  placeholder?: string
  /**
   * The user provided options used to position the date picker content
   */
  positioning?: datePicker.PositioningOptions
  /**
   * Whether the calendar is read-only.
   */
  readOnly?: boolean
  /**
   * The selection mode of the calendar.
   * - `single` - only one date can be selected
   * - `multiple` - multiple dates can be selected
   * - `range` - a range of dates can be selected
   *
   * @default "single"
   */
  selectionMode?: datePicker.SelectionMode
  /**
   * The first day of the week.
   *  `0` - Sunday
   *  `1` - Monday
   *  `2` - Tuesday
   *  `3` - Wednesday
   *  `4` - Thursday
   *  `5` - Friday
   *  `6` - Saturday
   */
  startOfWeek?: number
  /**
   * The time zone to use
   * @default "UTC"
   */
  timeZone?: string
  /**
   * The localized messages to use.
   */
  translations?: datePicker.IntlTranslations
  /**
   * The view of the calendar
   */
  view?: datePicker.DateView
}

export type RootEmits = {
  /**
   * Function called when the focused date changes.
   */
  focusChange: [details: datePicker.FocusChangeDetails]
  /**
   * Function called when the calendar opens or closes.
   */
  openChange: [details: datePicker.OpenChangeDetails]
  /**
   * Function called when the value changes.
   */
  valueChange: [details: datePicker.ValueChangeDetails]
  /**
   * Function called when the view changes.
   */
  viewChange: [details: datePicker.ViewChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: datePicker.DateValue[]]
  /**
   * The callback fired when the open state changes.
   */
  'update:open': [open: boolean]
  /**
   * The callback fired when the view changes.
   */
  'update:view': [view: datePicker.DateView]
  /**
   * The callback fired when the focused date changes.
   */
  'update:focusedValue': [focusedValue: datePicker.DateValue]
}
