import { createElement, Calendar, ChevronLeft, ChevronRight } from 'lucide'

import styles from 'styles/date-picker.module.css'

import '../../src/components/date-picker/index.js'

import button from 'styles/button.module.css'

const input = (index?: number) =>
  /* html */ `<ark-date-picker-input${index == null ? '' : ` index="${index}"`}><input class="${styles.Input}" /></ark-date-picker-input>`

const trigger = /* html */ `<ark-date-picker-trigger><button class="${styles.Trigger}">${createElement(Calendar, { 'aria-hidden': 'true' }).outerHTML}</button></ark-date-picker-trigger>`

const clearTrigger = /* html */ `<ark-date-picker-clear-trigger><button class="${button.Root}">Clear</button></ark-date-picker-clear-trigger>`

const control = (body = `${input()}${trigger}${clearTrigger}`) =>
  /* html */ `<ark-date-picker-control class="${styles.Control}">${body}</ark-date-picker-control>`

const content = (body: string) => /* html */ `
  <ark-date-picker-positioner class="${styles.Positioner}">
    <ark-date-picker-content class="${styles.Content}">${body}</ark-date-picker-content>
  </ark-date-picker-positioner>`

const viewControl = (
  rangeText = /* html */ `<ark-date-picker-view-trigger><button class="${styles.ViewTrigger}"><ark-date-picker-range-text></ark-date-picker-range-text></button></ark-date-picker-view-trigger>`,
) => /* html */ `
  <ark-date-picker-view-control class="${styles.ViewControl}">
    <ark-date-picker-prev-trigger><button class="${styles.PrevTrigger}">${createElement(ChevronLeft, { 'aria-hidden': 'true' }).outerHTML}</button></ark-date-picker-prev-trigger>
    ${rangeText}
    <ark-date-picker-next-trigger><button class="${styles.NextTrigger}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</button></ark-date-picker-next-trigger>
  </ark-date-picker-view-control>`

const dayTable = (attrs = '') => /* html */ `
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

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-date-picker class="${styles.Root}" num-of-months="2">
    <ark-date-picker-label class="${styles.Label}">Label</ark-date-picker-label>
    ${control()}
    ${content(/* html */ `
      ${viewControl(/* html */ `<ark-date-picker-range-text class="${styles.RangeText}"></ark-date-picker-range-text>`)}
      <div class="${styles.MultipleMonths}">
        ${dayTable()}
        ${dayTable('offset="1"')}
      </div>`)}
  </ark-date-picker>`
}
