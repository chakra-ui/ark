import type * as dateInput from '@zag-js/date-input'

export interface RootProps {
  defaultValue?: dateInput.DateValue[]
  disabled?: boolean
  granularity?: dateInput.Props['granularity']
  hourCycle?: dateInput.Props['hourCycle']
  id?: string
  ids?: dateInput.Props['ids']
  invalid?: boolean
  locale?: string
  max?: dateInput.DateValue
  min?: dateInput.DateValue
  modelValue?: dateInput.DateValue[]
  name?: string
  form?: string
  readOnly?: boolean
  required?: boolean
  selectionMode?: dateInput.SelectionMode
  timeZone?: string
  translations?: dateInput.Props['translations']
  value?: dateInput.DateValue[]
  format?: dateInput.Props['format']
  createCalendar?: dateInput.Props['createCalendar']
  allSegments?: dateInput.Props['allSegments']
  formatter?: dateInput.Props['formatter']
  placeholderValue?: dateInput.Props['placeholderValue']
  defaultPlaceholderValue?: dateInput.Props['defaultPlaceholderValue']
  isDateUnavailable?: dateInput.Props['isDateUnavailable']
  shouldForceLeadingZeros?: boolean
}

export type RootEmits = {
  focusChange: [details: dateInput.FocusChangeDetails]
  valueChange: [details: dateInput.ValueChangeDetails]
  'update:modelValue': [value: dateInput.DateValue[]]
}
