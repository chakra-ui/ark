import { CalendarDate, type DateValue } from '@internationalized/date'
import { createElement, Calendar, ChevronLeft, ChevronRight } from 'lucide'

import '@ark-ui/web/date-picker'

import button from 'styles/button.module.css'

import styles from 'styles/date-picker.module.css'

const parse = (value: string) => {
  const fullMatch = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/)
  if (fullMatch) {
    const [, day, month, year] = fullMatch.map(Number)
    try {
      return new CalendarDate(year + 2000, month, day)
    } catch {
      return undefined
    }
  }

  const partialMatch = value.match(/^(\d{1,2})\/(\d{1,2})$/)
  if (partialMatch) {
    const [, day, month] = partialMatch.map(Number)
    try {
      return new CalendarDate(new Date().getFullYear(), month, day)
    } catch {
      return undefined
    }
  }

  const dayMatch = value.match(/^(\d{1,2})$/)
  if (dayMatch) {
    const [, day] = dayMatch.map(Number)
    return new CalendarDate(new Date().getFullYear(), 1, day)
  }

  return undefined
}

const format = (date: DateValue) => {
  const day = date.day.toString().padStart(2, '0')
  const month = date.month.toString().padStart(2, '0')
  const year = (date.year % 100).toString().padStart(2, '0')
  return `${day}/${month}/${year}`
}

const attr = (name: string, value?: string | number | boolean) =>
  value === undefined || value === false ? '' : value === true ? name : `${name}="${value}"`

const icon = (node: typeof Calendar) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const viewControl = () => /* html */ `
  <ark-date-picker-view-control class="${styles.ViewControl}">
    <ark-date-picker-prev-trigger><button class="${styles.PrevTrigger}">${icon(ChevronLeft)}</button></ark-date-picker-prev-trigger>
    <ark-date-picker-view-trigger><button class="${styles.ViewTrigger}"><ark-date-picker-range-text></ark-date-picker-range-text></button></ark-date-picker-view-trigger>
    <ark-date-picker-next-trigger><button class="${styles.NextTrigger}">${icon(ChevronRight)}</button></ark-date-picker-next-trigger>
  </ark-date-picker-view-control>`

const tableBody = ({ triggerClass }: { triggerClass: string }) => /* html */ `
    <ark-date-picker-table-body>
      <template>
        <ark-date-picker-table-row>
          <template>
            <ark-date-picker-table-cell class="${styles.TableCell}">
              <ark-date-picker-table-cell-trigger class="${triggerClass}"></ark-date-picker-table-cell-trigger>
            </ark-date-picker-table-cell>
          </template>
        </ark-date-picker-table-row>
      </template>
    </ark-date-picker-table-body>`

interface GridTableProps {
  columns: number
  format?: 'short' | 'long'
  triggerClass: string
}

const gridTable = ({ columns, format, triggerClass }: GridTableProps) => /* html */ `
  <ark-date-picker-table class="${styles.Table}" ${attr('columns', columns)} ${attr('format', format)}>
    ${tableBody({ triggerClass })}
  </ark-date-picker-table>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-date-picker class="${styles.Root}" placeholder="dd/mm/yy">
    <ark-date-picker-label class="${styles.Label}">Label</ark-date-picker-label>
    <ark-date-picker-control class="${styles.Control}">
      <ark-date-picker-input><input class="${styles.Input}" /></ark-date-picker-input>
      <ark-date-picker-trigger><button class="${styles.Trigger}">${icon(Calendar)}</button></ark-date-picker-trigger>
      <ark-date-picker-clear-trigger><button class="${button.Root}">Clear</button></ark-date-picker-clear-trigger>
    </ark-date-picker-control>
    <ark-date-picker-positioner class="${styles.Positioner}">
      <ark-date-picker-content class="${styles.Content}">
        <ark-date-picker-view view="day" class="${styles.View}">
          ${viewControl()}
          <ark-date-picker-table class="${styles.Table}">
            <ark-date-picker-table-head>
              <ark-date-picker-table-row>
                <template><ark-date-picker-table-header class="${styles.TableHeader}"></ark-date-picker-table-header></template>
              </ark-date-picker-table-row>
            </ark-date-picker-table-head>
            ${tableBody({ triggerClass: styles.TableCellTrigger })}
          </ark-date-picker-table>
        </ark-date-picker-view>
        <ark-date-picker-view view="month" class="${styles.View}">
          ${viewControl()}
          ${gridTable({ columns: 4, format: 'short', triggerClass: styles.TableCellTrigger })}
        </ark-date-picker-view>
        <ark-date-picker-view view="year" class="${styles.View}">
          ${viewControl()}
          ${gridTable({ columns: 4, triggerClass: styles.TableCellTrigger })}
        </ark-date-picker-view>
      </ark-date-picker-content>
    </ark-date-picker-positioner>
  </ark-date-picker>`
  const datePicker = root.querySelector('ark-date-picker')!
  datePicker.format = format
  datePicker.parse = parse
}
