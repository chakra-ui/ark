import * as dateInput from '@zag-js/date-input'

import { num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { type Api, date, dates, root } from './shared.js'

type Granularity = NonNullable<dateInput.Props['granularity']>
type MaxGranularity = NonNullable<dateInput.Props['maxGranularity']>

const controlledValue = (el: Element) => {
  if (!el.hasAttribute('value')) return undefined
  return dates(el, 'value') ?? []
}

const hourCycleOf = (el: Element) => num(el, 'hour-cycle') as dateInput.HourCycle | undefined

defineRoot<Api>({
  tag: root,
  machine: dateInput.machine,
  connect: dateInput.connect,

  attributes: [
    'value',
    'default-value',
    'min',
    'max',
    'locale',
    'time-zone',
    'granularity',
    'max-granularity',
    'hour-cycle',
    'selection-mode',
    'disabled',
    'readonly',
    'required',
    'invalid',
    'name',
    'form',
  ],
  properties: ['createCalendar', 'isDateUnavailable', 'format', 'formatter', 'ids', 'translations'],
  state: {
    value: {
      get: (api) => api.value.map(String),
      set: (api, value: string[] | null) => (value?.length ? api.setValue(dateInput.parse(value)) : api.clearValue()),
    },
  },
  props: (el) => ({
    value: controlledValue(el),
    defaultValue: dates(el, 'default-value'),
    min: date(el, 'min'),
    max: date(el, 'max'),
    locale: str(el, 'locale'),
    timeZone: str(el, 'time-zone'),
    granularity: str<Granularity>(el, 'granularity'),
    maxGranularity: str<MaxGranularity>(el, 'max-granularity'),
    hourCycle: hourCycleOf(el),
    selectionMode: str<dateInput.SelectionMode>(el, 'selection-mode'),
    disabled: el.hasAttribute('disabled'),
    readOnly: el.hasAttribute('readonly'),
    required: el.hasAttribute('required'),
    invalid: el.hasAttribute('invalid'),
    name: str(el, 'name'),
    form: str(el, 'form'),
  }),

  events: {
    onValueChange: 'valuechange',
    onPlaceholderChange: 'placeholderchange',
    onFocusChange: 'focuschange',
  },

  rootProps: (api) => api.getRootProps(),
})
