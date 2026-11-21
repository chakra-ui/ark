import { createElement, X, ChevronsUpDown, Check } from 'lucide'

import '../../src/components/combobox/index.js'
import '../../src/components/field/index.js'

import field from 'styles/field.module.css'

import styles from 'styles/combobox.module.css'

interface Item {
  value: string
  label: string
}

const item = ({ value, label }: Item) => /* html */ `
  <ark-combobox-item class="${styles.Item}" value="${value}">
    <ark-combobox-item-text class="${styles.ItemText}">${label}</ark-combobox-item-text>
    <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
  </ark-combobox-item>`

const departments: Item[] = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Human Resources', value: 'hr' },
  { label: 'Finance', value: 'finance' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-field class="${field.Root}">
    <ark-combobox class="${styles.Root}">
      <ark-combobox-label class="${styles.Label}">Department</ark-combobox-label>
      <ark-combobox-control class="${styles.Control}">
        <ark-combobox-input><input class="${styles.Input}" placeholder="e.g. Engineering" /></ark-combobox-input>
        <div class="${styles.Indicators}">
          <ark-combobox-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-clear-trigger>
          <ark-combobox-trigger><button class="${styles.Trigger}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-trigger>
        </div>
      </ark-combobox-control>
      <ark-combobox-positioner class="${styles.Positioner}">
        <ark-combobox-content class="${styles.Content}">
          <ark-combobox-list class="${styles.List}">${departments.map((department) => item(department)).join('')}</ark-combobox-list>
        </ark-combobox-content>
      </ark-combobox-positioner>
    </ark-combobox>
    <ark-field-helper-text class="${field.HelperText}">Select your primary department</ark-field-helper-text>
  </ark-field>`
}
