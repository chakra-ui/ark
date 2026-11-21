import { createElement, X, ChevronsUpDown, Check } from 'lucide'

import '../../src/components/combobox/index.js'

import styles from 'styles/combobox.module.css'

const produce = [
  { value: 'apple', label: 'Apple', group: 'Fruits' },
  { value: 'banana', label: 'Banana', group: 'Fruits' },
  { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
  { value: 'broccoli', label: 'Broccoli', group: 'Vegetables' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-combobox class="${styles.Root}">
    <script type="application/json">${JSON.stringify(produce)}</script>
    <ark-combobox-label class="${styles.Label}">Favorite Fruit</ark-combobox-label>
    <ark-combobox-control class="${styles.Control}">
      <ark-combobox-input><input class="${styles.Input}" placeholder="e.g. Apple" /></ark-combobox-input>
      <div class="${styles.Indicators}">
        <ark-combobox-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-clear-trigger>
        <ark-combobox-trigger><button class="${styles.Trigger}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-trigger>
      </div>
    </ark-combobox-control>
    <ark-combobox-positioner class="${styles.Positioner}">
      <ark-combobox-content class="${styles.Content}">
        <ark-combobox-empty class="${styles.Empty}">No results found</ark-combobox-empty>
        <ark-combobox-list class="${styles.List}">
          <template data-group>
            <ark-combobox-item-group class="${styles.ItemGroup}">
              <ark-combobox-item-group-label class="${styles.ItemGroupLabel}"></ark-combobox-item-group-label>
            </ark-combobox-item-group>
          </template>
          <template>
            <ark-combobox-item class="${styles.Item}">
              <ark-combobox-item-text class="${styles.ItemText}"></ark-combobox-item-text>
              <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
            </ark-combobox-item>
          </template>
        </ark-combobox-list>
      </ark-combobox-content>
    </ark-combobox-positioner>
  </ark-combobox>`
}
