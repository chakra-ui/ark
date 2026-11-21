import { createElement, ChevronLeft, ChevronRight } from 'lucide'

import styles from 'styles/date-picker.module.css'

import '../../src/components/date-picker/index.js'

interface ViewOptions {
  gridTriggers?: boolean
  dayFooter?: string
}

const viewControl = (
  rangeText = `<ark-date-picker-view-trigger><button class="${styles.ViewTrigger}"><ark-date-picker-range-text></ark-date-picker-range-text></button></ark-date-picker-view-trigger>`,
) => `
  <ark-date-picker-view-control class="${styles.ViewControl}">
    <ark-date-picker-prev-trigger><button class="${styles.PrevTrigger}">${createElement(ChevronLeft, { 'aria-hidden': 'true' }).outerHTML}</button></ark-date-picker-prev-trigger>
    ${rangeText}
    <ark-date-picker-next-trigger><button class="${styles.NextTrigger}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</button></ark-date-picker-next-trigger>
  </ark-date-picker-view-control>`

const dayTable = (attrs = '') => `
  <ark-date-picker-table class="${styles.Table}" ${attrs}>
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
  </ark-date-picker-table>`

const gridTable = (attrs: string, triggerClass: string) => `
  <ark-date-picker-table class="${styles.Table}" ${attrs}>
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

const views = ({ gridTriggers = false, dayFooter = '' }: ViewOptions = {}) => `
  <ark-date-picker-view view="day" class="${styles.View}">
    ${viewControl()}
    ${dayTable()}
    ${dayFooter}
  </ark-date-picker-view>
  <ark-date-picker-view view="month" class="${styles.View}">
    ${viewControl()}
    ${gridTable('columns="4" format="short"', gridTriggers ? styles.MonthTableCellTrigger : styles.TableCellTrigger)}
  </ark-date-picker-view>
  <ark-date-picker-view view="year" class="${styles.View}">
    ${viewControl()}
    ${gridTable('columns="4"', gridTriggers ? styles.YearTableCellTrigger : styles.TableCellTrigger)}
  </ark-date-picker-view>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-date-picker class="${styles.Root}" inline>
    <div class="${styles.Content}">${views()}</div>
  </ark-date-picker>`
}
