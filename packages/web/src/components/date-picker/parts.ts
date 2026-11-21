import type * as datePicker from '@zag-js/date-picker'
import { num, str } from '../../utils/attrs.js'
import { definePart, wrapped, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { repeat, templateOf } from '../../utils/repeat.js'
import { autoText, cellOf, dates, items, markAutoText, offsetOf, root, rowsOf, tablePropsOf, viewOf } from './shared.js'

type Api = datePicker.Api

definePart<Api>({
  tag: 'ark-date-picker-label',
  root,
  props: (api, el) => api.getLabelProps({ index: num(el, 'index') }),
})

definePart<Api>({ tag: 'ark-date-picker-control', root, props: (api) => api.getControlProps() })

definePart<Api>({
  tag: 'ark-date-picker-input',
  root,
  target: wrapped('input'),
  props: (api, el) =>
    api.getInputProps({ index: num(el, 'index'), fixOnBlur: el.getAttribute('fix-on-blur') !== 'false' }),
})

definePart<Api>({
  tag: 'ark-date-picker-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getTriggerProps(),
})

definePart<Api>({
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

definePart<Api>({
  tag: 'ark-date-picker-preset-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => {
    const value = str(el, 'value') ?? ''
    return api.getPresetTriggerProps({
      value: presets.has(value) ? (value as datePicker.DateRangePreset) : (dates(el, 'value') ?? []),
    })
  },
})

definePresencePart<Api>({
  tag: 'ark-date-picker-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

definePresencePart<Api>({ tag: 'ark-date-picker-content', root, props: (api) => api.getContentProps() })

definePart<Api>({
  tag: 'ark-date-picker-view',
  root,
  props: (api, el) => api.getViewProps({ view: viewOf(el) }),
})

definePart<Api>({
  tag: 'ark-date-picker-view-control',
  root,
  props: (api, el) => api.getViewControlProps({ view: viewOf(el) }),
})

definePart<Api>({
  tag: 'ark-date-picker-prev-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => api.getPreviousTriggerProps({ view: viewOf(el) }),
})

definePart<Api>({
  tag: 'ark-date-picker-next-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => api.getNextTriggerProps({ view: viewOf(el) }),
})

definePart<Api>({
  tag: 'ark-date-picker-view-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => api.getViewTriggerProps({ view: viewOf(el) }),
})

definePart<Api>({
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

definePart<Api>({
  tag: 'ark-date-picker-table',
  root,
  display: 'table',
  props: (api, el) => api.getTableProps(tablePropsOf(el)),
})

definePart<Api>({
  tag: 'ark-date-picker-table-head',
  root,
  display: 'table-header-group',
  props: (api, el) => api.getTableHeadProps(tablePropsOf(el)),
})

definePart<Api>({
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

definePart<Api>({
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

definePart<Api>({
  tag: 'ark-date-picker-table-header',
  root,
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

definePart<Api>({
  tag: 'ark-date-picker-table-cell',
  root,
  display: 'table-cell',
  props: (api, el) => cellProps(api, el, false),
})

definePart<Api>({
  tag: 'ark-date-picker-table-cell-trigger',
  root,
  setup: markAutoText,
  props: (api, el) => cellProps(api, el, true),
  render: (_, el) => {
    const cell = cellOf(el)
    if (cell && autoText.has(el)) el.textContent = cell.label
  },
})
