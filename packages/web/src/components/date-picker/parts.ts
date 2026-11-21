import type * as datePicker from '@zag-js/date-picker'
import { num, str } from '../../utils/attrs.js'
import { definePart, wrapped, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { repeat, templateOf } from '../../utils/repeat.js'
import { autoText, cellOf, dates, items, markAutoText, offsetOf, root, rowsOf, tablePropsOf, viewOf } from './shared.js'

type Api = datePicker.Api

export const DatePickerLabel = definePart<Api>({
  tag: 'ark-date-picker-label',
  root,
  attributes: ['index'],
  props: (api, el) => api.getLabelProps({ index: num(el, 'index') }),
})

export const DatePickerControl = definePart<Api>({
  tag: 'ark-date-picker-control',
  root,
  props: (api) => api.getControlProps(),
})

const inputPropsOf = (el: HTMLElement): datePicker.InputProps => ({
  index: num(el, 'index'),
  fixOnBlur: el.getAttribute('fix-on-blur') !== 'false',
})

export const DatePickerInput = definePart<Api, datePicker.InputState>({
  tag: 'ark-date-picker-input',
  root,
  attributes: ['index', 'fix-on-blur'],
  target: wrapped('input'),
  props: (api, el) => api.getInputProps(inputPropsOf(el)),
  state: (api, el) => api.getInputState(inputPropsOf(el)),
})

export const DatePickerTrigger = definePart<Api, datePicker.TriggerState>({
  tag: 'ark-date-picker-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getTriggerProps(),
  state: (api) => api.getTriggerState(),
})

export const DatePickerClearTrigger = definePart<Api>({
  tag: 'ark-date-picker-clear-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getClearTriggerProps(),
})

const presets = new Set([
  'thisWeek',
  'lastWeek',
  'thisMonth',
  'lastMonth',
  'thisQuarter',
  'lastQuarter',
  'thisYear',
  'lastYear',
  'last3Days',
  'last7Days',
  'last14Days',
  'last30Days',
  'last90Days',
])

export const DatePickerPresetTrigger = definePart<Api>({
  tag: 'ark-date-picker-preset-trigger',
  root,
  attributes: ['value'],
  target: wrappedButton,
  props: (api, el) => {
    const value = str(el, 'value') ?? ''
    return api.getPresetTriggerProps({
      value: presets.has(value) ? (value as datePicker.DateRangePreset) : (dates(el, 'value') ?? []),
    })
  },
})

export const DatePickerPositioner = definePresencePart<Api>({
  tag: 'ark-date-picker-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

export const DatePickerContent = definePresencePart<Api, datePicker.ContentState>({
  tag: 'ark-date-picker-content',
  root,
  props: (api) => api.getContentProps(),
  state: (api) => api.getContentState(),
})

export const DatePickerView = definePart<Api>({
  tag: 'ark-date-picker-view',
  root,
  attributes: ['view'],
  props: (api, el) => api.getViewProps({ view: viewOf(el) }),
})

export const DatePickerViewControl = definePart<Api>({
  tag: 'ark-date-picker-view-control',
  root,
  props: (api, el) => api.getViewControlProps({ view: viewOf(el) }),
})

export const DatePickerPrevTrigger = definePart<Api>({
  tag: 'ark-date-picker-prev-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => api.getPreviousTriggerProps({ view: viewOf(el) }),
})

export const DatePickerNextTrigger = definePart<Api>({
  tag: 'ark-date-picker-next-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => api.getNextTriggerProps({ view: viewOf(el) }),
})

export const DatePickerViewTrigger = definePart<Api>({
  tag: 'ark-date-picker-view-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => api.getViewTriggerProps({ view: viewOf(el) }),
})

export const DatePickerRangeText = definePart<Api>({
  tag: 'ark-date-picker-range-text',
  root,
  display: 'inline',
  setup: markAutoText,
  props: (api) => api.getRangeTextProps(),
  render: (api, el) => {
    if (!autoText.has(el)) return
    const { start, end } = offsetOf(api, el)?.visibleRangeText ?? api.visibleRangeText
    el.textContent = [...new Set([start, end])].filter(Boolean).join(' - ')
  },
})

export const DatePickerTable = definePart<Api>({
  tag: 'ark-date-picker-table',
  root,
  attributes: ['columns', 'offset', 'format'],
  display: 'table',
  props: (api, el) => api.getTableProps(tablePropsOf(el)),
})

export const DatePickerTableHead = definePart<Api>({
  tag: 'ark-date-picker-table-head',
  root,
  display: 'table-header-group',
  props: (api, el) => api.getTableHeadProps(tablePropsOf(el)),
})

export const DatePickerTableBody = definePart<Api>({
  tag: 'ark-date-picker-table-body',
  root,
  display: 'table-row-group',
  props: (api, el) => ({ role: 'rowgroup', ...api.getTableBodyProps(tablePropsOf(el)) }),
  render: (api, el) => {
    const template = templateOf(el)
    if (template)
      repeat(
        template,
        rowsOf(api, el),
        (_, i) => String(i),
        (node, row) => items.set(node, row),
      )
  },
})

export const DatePickerTableRow = definePart<Api>({
  tag: 'ark-date-picker-table-row',
  root,
  display: 'table-row',
  props: (api, el) => ({ role: 'row', ...api.getTableRowProps(tablePropsOf(el)) }),
  render: (api, el) => {
    const template = templateOf(el)
    if (!template) return
    const cells = el.closest('ark-date-picker-table-head') ? api.weekDays : (items.get(el) as unknown[] | undefined)
    repeat(
      template,
      cells ?? [],
      (_, i) => String(i),
      (node, cell) => items.set(node, cell),
    )
  },
})

export const DatePickerTableHeader = definePart<Api>({
  tag: 'ark-date-picker-table-header',
  root,
  attributes: ['format'],
  display: 'table-cell',
  setup: markAutoText,
  props: (api, el) => ({ role: 'columnheader', ...api.getTableHeaderProps(tablePropsOf(el)) }),
  render: (_, el) => {
    const weekDay = items.get(el) as datePicker.WeekDay | undefined
    if (weekDay && autoText.has(el)) el.textContent = weekDay[str<'short'>(el, 'format') ?? 'short']
  },
})

const cellProps = (api: Api, el: HTMLElement, trigger: boolean) => {
  const cell = cellOf(el)
  if (!cell) return {}
  if (cell.view === 'day') {
    const props = { value: cell.value, visibleRange: offsetOf(api, el)?.visibleRange }
    return trigger ? api.getDayTableCellTriggerProps(props) : api.getDayTableCellProps(props)
  }
  const props = { value: cell.value }
  if (cell.view === 'month')
    return trigger ? api.getMonthTableCellTriggerProps(props) : api.getMonthTableCellProps(props)
  return trigger ? api.getYearTableCellTriggerProps(props) : api.getYearTableCellProps(props)
}

const cellStateOf = (api: Api, el: HTMLElement) => {
  const cell = cellOf(el)
  if (!cell) return undefined
  if (cell.view === 'day') {
    return api.getDayTableCellState({ value: cell.value, visibleRange: offsetOf(api, el)?.visibleRange })
  }
  const props = { value: cell.value }
  return cell.view === 'month' ? api.getMonthTableCellState(props) : api.getYearTableCellState(props)
}

type CellState = datePicker.DayTableCellState | datePicker.TableCellState | undefined

export const DatePickerTableCell = definePart<Api, CellState>({
  tag: 'ark-date-picker-table-cell',
  root,
  attributes: ['value'],
  display: 'table-cell',
  props: (api, el) => cellProps(api, el, false),
  state: (api, el) => cellStateOf(api, el),
})

export const DatePickerTableCellTrigger = definePart<Api, CellState>({
  tag: 'ark-date-picker-table-cell-trigger',
  root,
  setup: markAutoText,
  props: (api, el) => cellProps(api, el, true),
  state: (api, el) => cellStateOf(api, el),
  render: (_, el) => {
    const cell = cellOf(el)
    if (cell && autoText.has(el)) el.textContent = cell.label
  },
})
