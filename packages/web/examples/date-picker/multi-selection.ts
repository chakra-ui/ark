import { createElement, Calendar, ChevronLeft, ChevronRight, X } from 'lucide'

import type { DateValue } from '@zag-js/date-picker'

import styles from 'styles/date-picker.module.css'

import '../../src/components/date-picker/index.js'

import button from 'styles/button.module.css'

const fragment = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host
}

const formatWithDay = (date: DateValue) =>
  date.toDate('UTC').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-date-picker class="${styles.Root}" selection-mode="multiple">
    <ark-date-picker-label class="${styles.Label}">Label</ark-date-picker-label>
    <ark-date-picker-control class="${styles.Control}"><div class="${styles.SelectedDates}"></div><ark-date-picker-trigger><button class="${styles.Trigger}">${createElement(Calendar, { 'aria-hidden': 'true' }).outerHTML}</button></ark-date-picker-trigger><ark-date-picker-clear-trigger><button class="${button.Root}">Clear</button></ark-date-picker-clear-trigger></ark-date-picker-control>
    
    
  <ark-date-picker-positioner class="${styles.Positioner}">
    <ark-date-picker-content class="${styles.Content}">
  <ark-date-picker-view view="day" class="${styles.View}">
    
  <ark-date-picker-view-control class="${styles.ViewControl}">
    <ark-date-picker-prev-trigger><button class="${styles.PrevTrigger}">${createElement(ChevronLeft, { 'aria-hidden': 'true' }).outerHTML}</button></ark-date-picker-prev-trigger>
    <ark-date-picker-view-trigger><button class="${styles.ViewTrigger}"><ark-date-picker-range-text></ark-date-picker-range-text></button></ark-date-picker-view-trigger>
    <ark-date-picker-next-trigger><button class="${styles.NextTrigger}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</button></ark-date-picker-next-trigger>
  </ark-date-picker-view-control>
    
  <ark-date-picker-table class="${styles.Table}" >
    <ark-date-picker-table-head>
      <ark-date-picker-table-row>
        <template><ark-date-picker-table-header class="${styles.TableHeader}"></ark-date-picker-table-header></template>
      </ark-date-picker-table-row>
    </ark-date-picker-table-head>
    <ark-date-picker-table-body>
      <template>
        <ark-date-picker-table-row>
          <template>
            <ark-date-picker-table-cell class="${styles.TableCell}">
              <ark-date-picker-table-cell-trigger class="${styles.TableCellTrigger}"></ark-date-picker-table-cell-trigger>
            </ark-date-picker-table-cell>
          </template>
        </ark-date-picker-table-row>
      </template>
    </ark-date-picker-table-body>
  </ark-date-picker-table>
    
  </ark-date-picker-view>
  <ark-date-picker-view view="month" class="${styles.View}">
    
  <ark-date-picker-view-control class="${styles.ViewControl}">
    <ark-date-picker-prev-trigger><button class="${styles.PrevTrigger}">${createElement(ChevronLeft, { 'aria-hidden': 'true' }).outerHTML}</button></ark-date-picker-prev-trigger>
    <ark-date-picker-view-trigger><button class="${styles.ViewTrigger}"><ark-date-picker-range-text></ark-date-picker-range-text></button></ark-date-picker-view-trigger>
    <ark-date-picker-next-trigger><button class="${styles.NextTrigger}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</button></ark-date-picker-next-trigger>
  </ark-date-picker-view-control>
    
  <ark-date-picker-table class="${styles.Table}" columns="4" format="short">
    <ark-date-picker-table-body>
      <template>
        <ark-date-picker-table-row>
          <template>
            <ark-date-picker-table-cell class="${styles.TableCell}">
              <ark-date-picker-table-cell-trigger class="${styles.MonthTableCellTrigger}"></ark-date-picker-table-cell-trigger>
            </ark-date-picker-table-cell>
          </template>
        </ark-date-picker-table-row>
      </template>
    </ark-date-picker-table-body>
  </ark-date-picker-table>
  </ark-date-picker-view>
  <ark-date-picker-view view="year" class="${styles.View}">
    
  <ark-date-picker-view-control class="${styles.ViewControl}">
    <ark-date-picker-prev-trigger><button class="${styles.PrevTrigger}">${createElement(ChevronLeft, { 'aria-hidden': 'true' }).outerHTML}</button></ark-date-picker-prev-trigger>
    <ark-date-picker-view-trigger><button class="${styles.ViewTrigger}"><ark-date-picker-range-text></ark-date-picker-range-text></button></ark-date-picker-view-trigger>
    <ark-date-picker-next-trigger><button class="${styles.NextTrigger}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</button></ark-date-picker-next-trigger>
  </ark-date-picker-view-control>
    
  <ark-date-picker-table class="${styles.Table}" columns="4">
    <ark-date-picker-table-body>
      <template>
        <ark-date-picker-table-row>
          <template>
            <ark-date-picker-table-cell class="${styles.TableCell}">
              <ark-date-picker-table-cell-trigger class="${styles.YearTableCellTrigger}"></ark-date-picker-table-cell-trigger>
            </ark-date-picker-table-cell>
          </template>
        </ark-date-picker-table-row>
      </template>
    </ark-date-picker-table-body>
  </ark-date-picker-table>
  </ark-date-picker-view></ark-date-picker-content>
  </ark-date-picker-positioner>
  </ark-date-picker>`
  const datePicker = root.querySelector('ark-date-picker')!
  const list = root.querySelector<HTMLElement>(`.${styles.SelectedDates}`)!
  const sync = (value: DateValue[]) => {
    list.replaceChildren()
    if (value.length === 0) {
      list.innerHTML = `<span class="${styles.SelectedDatesPlaceholder}">Select dates...</span>`
      return
    }
    value.forEach((date, index) => {
      const chip = fragment(
        `<span class="${styles.SelectedDate}">${formatWithDay(date)}<button class="${styles.SelectedDateRemove}" aria-label="Remove">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></span>`,
      ).firstElementChild!
      chip.querySelector('button')!.addEventListener('click', () => {
        datePicker.api?.setValue(value.filter((_, i) => i !== index))
      })
      list.append(chip)
    })
  }
  sync([])
  datePicker.addEventListener('valuechange', (event) => sync(event.detail.value))
}
