import { createElement, ChevronLeft, ChevronRight } from 'lucide'

import styles from 'styles/date-picker.module.css'

import '../../src/components/date-picker/index.js'

const attr = (name: string, value?: string | number | boolean) =>
  value === undefined || value === false ? '' : value === true ? name : `${name}="${value}"`

const icon = (node: typeof ChevronLeft) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

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

const dayTable = ({ offset }: { offset?: number } = {}) => /* html */ `
  <ark-date-picker-table class="${styles.Table}" ${attr('offset', offset)}>
    <ark-date-picker-table-head>
      <ark-date-picker-table-row>
        <template><ark-date-picker-table-header class="${styles.TableHeader}"></ark-date-picker-table-header></template>
      </ark-date-picker-table-row>
    </ark-date-picker-table-head>
    ${tableBody({ triggerClass: styles.TableCellTrigger })}
  </ark-date-picker-table>`

interface GridTableProps {
  columns: number
  format?: 'short' | 'long'
  triggerClass: string
}

const gridTable = ({ columns, format, triggerClass }: GridTableProps) => /* html */ `
  <ark-date-picker-table class="${styles.Table}" ${attr('columns', columns)} ${attr('format', format)}>
    ${tableBody({ triggerClass })}
  </ark-date-picker-table>`

const views = ({ gridTriggers = false }: { gridTriggers?: boolean } = {}) => /* html */ `
  <ark-date-picker-view view="day" class="${styles.View}">
    ${viewControl()}
    ${dayTable()}
  </ark-date-picker-view>
  <ark-date-picker-view view="month" class="${styles.View}">
    ${viewControl()}
    ${gridTable({
      columns: 4,
      format: 'short',
      triggerClass: gridTriggers ? styles.MonthTableCellTrigger : styles.TableCellTrigger,
    })}
  </ark-date-picker-view>
  <ark-date-picker-view view="year" class="${styles.View}">
    ${viewControl()}
    ${gridTable({ columns: 4, triggerClass: gridTriggers ? styles.YearTableCellTrigger : styles.TableCellTrigger })}
  </ark-date-picker-view>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-date-picker class="${styles.Root}" inline>
    <div class="${styles.Content}">${views()}</div>
  </ark-date-picker>`
}
