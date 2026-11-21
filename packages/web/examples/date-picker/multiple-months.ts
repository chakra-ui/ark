import { createElement, Calendar, ChevronLeft, ChevronRight } from 'lucide'

import styles from 'styles/date-picker.module.css'

import '../../src/components/date-picker/index.js'

import button from 'styles/button.module.css'

const attr = (name: string, value?: string | number | boolean) =>
  value === undefined || value === false ? '' : value === true ? name : `${name}="${value}"`

const icon = (node: typeof Calendar) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const dayTable = ({ offset }: { offset?: number } = {}) => /* html */ `
  <ark-date-picker-table class="${styles.Table}" ${attr('offset', offset)}>
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

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-date-picker class="${styles.Root}" num-of-months="2">
    <ark-date-picker-label class="${styles.Label}">Label</ark-date-picker-label>
    <ark-date-picker-control class="${styles.Control}">
      <ark-date-picker-input><input class="${styles.Input}" /></ark-date-picker-input>
      <ark-date-picker-trigger><button class="${styles.Trigger}">${icon(Calendar)}</button></ark-date-picker-trigger>
      <ark-date-picker-clear-trigger><button class="${button.Root}">Clear</button></ark-date-picker-clear-trigger>
    </ark-date-picker-control>
    <ark-date-picker-positioner class="${styles.Positioner}">
      <ark-date-picker-content class="${styles.Content}">
        <ark-date-picker-view-control class="${styles.ViewControl}">
          <ark-date-picker-prev-trigger><button class="${styles.PrevTrigger}">${icon(ChevronLeft)}</button></ark-date-picker-prev-trigger>
          <ark-date-picker-range-text class="${styles.RangeText}"></ark-date-picker-range-text>
          <ark-date-picker-next-trigger><button class="${styles.NextTrigger}">${icon(ChevronRight)}</button></ark-date-picker-next-trigger>
        </ark-date-picker-view-control>
        <div class="${styles.MultipleMonths}">${[dayTable(), dayTable({ offset: 1 })].join('')}</div>
      </ark-date-picker-content>
    </ark-date-picker-positioner>
  </ark-date-picker>`
}
