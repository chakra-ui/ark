import { createElement, Calendar, ChevronLeft, ChevronRight } from 'lucide'

import styles from 'styles/date-picker.module.css'

import '../../src/components/date-picker/index.js'

import button from 'styles/button.module.css'

interface ViewOptions {
  gridTriggers?: boolean
  dayFooter?: string
}

interface Options extends ViewOptions {
  label?: string
  control?: string
  afterControl?: string
}

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

const gridTable = (attrs: string, triggerClass: string) => /* html */ `
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

const views = ({ gridTriggers = false, dayFooter = '' }: ViewOptions = {}) => /* html */ `
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

const datePickerMarkup = (
  attrs: string,
  { label = 'Label', control: ctrl = control(), afterControl = '', ...rest }: Options = {},
) => /* html */ `
  <ark-date-picker class="${styles.Root}" ${attrs}>
    <ark-date-picker-label class="${styles.Label}">${label}</ark-date-picker-label>
    ${ctrl}
    ${afterControl}
    ${content(views(rest))}
  </ark-date-picker>`

export function mount(root: HTMLElement) {
  root.innerHTML = datePickerMarkup('selection-mode="range"', {
    control: control(`${input(0)}${input(1)}${trigger}${clearTrigger}`),
    afterControl: /* html */ `<ark-date-picker-preset-trigger value="last7Days"><button class="${styles.PresetTrigger}">Last 7 days</button></ark-date-picker-preset-trigger>`,
  })
}
