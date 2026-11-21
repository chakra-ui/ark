import * as datePicker from '@zag-js/date-picker'
import { num, str } from '../../utils/attrs.js'

export const root = 'ark-date-picker'

type Api = datePicker.Api
type View = datePicker.DateView

export const dates = (el: Element, name: string) => {
  const value = el.getAttribute(name)
  return value ? datePicker.parse(value.split(',').map((item) => item.trim())) : undefined
}

export const date = (el: Element, name: string) => dates(el, name)?.[0]

export const viewOf = (el: Element) =>
  (el.closest<HTMLElement>('ark-date-picker-view')?.getAttribute('view') ?? 'day') as View

const tableIds = new WeakMap<Element, string>()
let uid = 0

export function tablePropsOf(el: Element): datePicker.TableProps {
  const table = el.closest('ark-date-picker-table')
  const view = viewOf(el)
  if (!table) return { view }
  let id = tableIds.get(table)
  if (!id) {
    id = table.id || `t${++uid}`
    tableIds.set(table, id)
  }
  return { view, id, columns: num(table, 'columns') }
}

const offsets = new WeakMap<Api, WeakMap<Element, datePicker.DateValueOffset>>()

/** The table's month offset (multiple months), computed once per render. */
export function offsetOf(api: Api, el: Element) {
  const table = el.closest('ark-date-picker-table')
  const months = table ? num(table, 'offset') : undefined
  if (!table || !months) return undefined
  let cache = offsets.get(api)
  if (!cache) {
    cache = new WeakMap()
    offsets.set(api, cache)
  }
  let offset = cache.get(table)
  if (!offset) {
    offset = api.getOffset({ months })
    cache.set(table, offset)
  }
  return offset
}

export type Row = datePicker.DateValue[] | datePicker.Cell[]

export function rowsOf(api: Api, body: Element): Row[] {
  const table = body.closest('ark-date-picker-table')
  const view = viewOf(body)
  const columns = (table && num(table, 'columns')) || undefined
  if (view === 'month') {
    return api.getMonthsGrid({ columns, format: table ? str<'short' | 'long'>(table, 'format') : undefined })
  }
  if (view === 'year') return api.getYearsGrid({ columns })
  return offsetOf(api, body)?.weeks ?? api.weeks
}

/** Item a stamped node renders: a weekday, a row, or a cell's date. */
export const items = new WeakMap<Element, unknown>()

export function cellOf(part: Element) {
  const cell = part.closest<HTMLElement>('ark-date-picker-table-cell')
  if (!cell) return undefined
  const view = viewOf(cell)
  const item = items.get(cell) as datePicker.DateValue | datePicker.Cell | undefined
  if (view === 'day') {
    const value = (item as datePicker.DateValue | undefined) ?? date(cell, 'value')
    return value ? { view, value, label: String(value.day) } : undefined
  }
  const value = (item as datePicker.Cell | undefined)?.value ?? num(cell, 'value')
  if (value == null) return undefined
  return { view, value, label: (item as datePicker.Cell | undefined)?.label ?? String(value) }
}

export const autoText = new WeakSet<HTMLElement>()
export const markAutoText = (el: HTMLElement) => {
  if (!el.firstChild) autoText.add(el)
}
