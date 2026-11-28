import { CalendarDate, type DateValue } from '@internationalized/date'
import { createElement, Calendar, ChevronLeft, ChevronRight } from 'lucide'

import '@ark-ui/web/date-picker'

import button from 'styles/button.module.css'

import styles from 'styles/date-picker.module.css'

const format = (date: DateValue) => {
  const month = date.month.toString().padStart(2, '0')
  const year = date.year.toString()
  return `${month}/${year}`
}

const parse = (value: string) => {
  const match = value.match(/^(\d{1,2})\/(\d{4})$/)
  if (match) {
    const [, month, year] = match.map(Number)
    return new CalendarDate(year, month, 1)
  }
}

const icon = (node: typeof Calendar) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const viewControl = () => /* html */ `
  <ark-date-picker-view-control class="${styles.ViewControl}">
    <ark-date-picker-prev-trigger><button class="${styles.PrevTrigger}">${icon(ChevronLeft)}</button></ark-date-picker-prev-trigger>
    <ark-date-picker-view-trigger><button class="${styles.ViewTrigger}"><ark-date-picker-range-text></ark-date-picker-range-text></button></ark-date-picker-view-trigger>
    <ark-date-picker-next-trigger><button class="${styles.NextTrigger}">${icon(ChevronRight)}</button></ark-date-picker-next-trigger>
  </ark-date-picker-view-control>`

const gridTable = ({ format, triggerClass }: { format?: 'short'; triggerClass: string }) => /* html */ `
  <ark-date-picker-table class="${styles.Table}" columns="4" ${format ? `format="${format}"` : ''}>
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
    </ark-date-picker-table-body>
  </ark-date-picker-table>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-date-picker class="${styles.Root}" selection-mode="range" default-view="month" min-view="month" placeholder="mm/yyyy">
    <ark-date-picker-label class="${styles.Label}">Label</ark-date-picker-label>
    <ark-date-picker-control class="${styles.Control}">
      <ark-date-picker-input index="0"><input class="${styles.Input}" /></ark-date-picker-input>
      <ark-date-picker-input index="1"><input class="${styles.Input}" /></ark-date-picker-input>
      <ark-date-picker-trigger><button class="${styles.Trigger}">${icon(Calendar)}</button></ark-date-picker-trigger>
      <ark-date-picker-clear-trigger><button class="${button.Root}">Clear</button></ark-date-picker-clear-trigger>
    </ark-date-picker-control>
    <ark-date-picker-positioner class="${styles.Positioner}">
      <ark-date-picker-content class="${styles.Content}">
        <ark-date-picker-view view="month" class="${styles.View}">
          ${viewControl()}
          ${gridTable({ format: 'short', triggerClass: styles.MonthTableCellTrigger })}
        </ark-date-picker-view>
        <ark-date-picker-view view="year" class="${styles.View}">
          ${viewControl()}
          ${gridTable({ triggerClass: styles.YearTableCellTrigger })}
        </ark-date-picker-view>
      </ark-date-picker-content>
    </ark-date-picker-positioner>
  </ark-date-picker>`
  const datePicker = root.querySelector('ark-date-picker')!
  datePicker.format = format
  datePicker.parse = parse
}
