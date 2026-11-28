import { createElement, ChevronLeft, ChevronRight } from 'lucide'

import styles from 'styles/date-picker.module.css'

import '@ark-ui/web/date-picker'

const icon = (node: typeof ChevronLeft) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-date-picker class="${styles.Root}" selection-mode="multiple" max-selected-dates="3" inline>
    <div class="${styles.Content}">
      <ark-date-picker-view view="day" class="${styles.View}">
        <ark-date-picker-view-control class="${styles.ViewControl}">
          <ark-date-picker-prev-trigger><button class="${styles.PrevTrigger}">${icon(ChevronLeft)}</button></ark-date-picker-prev-trigger>
          <ark-date-picker-range-text></ark-date-picker-range-text>
          <ark-date-picker-next-trigger><button class="${styles.NextTrigger}">${icon(ChevronRight)}</button></ark-date-picker-next-trigger>
        </ark-date-picker-view-control>
        <ark-date-picker-table class="${styles.Table}">
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
    </div>
  </ark-date-picker>`
}
