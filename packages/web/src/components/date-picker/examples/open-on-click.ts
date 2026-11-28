import { createElement, ChevronLeft, ChevronRight } from 'lucide'

import '@ark-ui/web/date-picker'

import styles from 'styles/date-picker.module.css'

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
  <ark-date-picker class="${styles.Root}" open-on-click>
    <ark-date-picker-label class="${styles.Label}">Label</ark-date-picker-label>
    <ark-date-picker-control class="${styles.Control}">
      <ark-date-picker-input><input class="${styles.Input}" /></ark-date-picker-input>
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
}
