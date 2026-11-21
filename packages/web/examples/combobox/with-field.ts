import { createElement, X, ChevronsUpDown, Check } from 'lucide'

import '../../src/components/combobox/index.js'

import field from 'styles/field.module.css'

import styles from 'styles/combobox.module.css'

const combobox = (
  label: string,
  placeholder: string,
  list: string,
  { attrs = '', data = '', clear = true, empty = false } = {},
) => /* html */ `
  <ark-combobox class="${styles.Root}" ${attrs}>
    ${data}
    <ark-combobox-label class="${styles.Label}">${label}</ark-combobox-label>
    <ark-combobox-control class="${styles.Control}">
      <ark-combobox-input><input class="${styles.Input}" placeholder="${placeholder}" /></ark-combobox-input>
      <div class="${styles.Indicators}">
        ${clear ? /* html */ `<ark-combobox-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-clear-trigger>` : ''}
        <ark-combobox-trigger><button class="${styles.Trigger}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-trigger>
      </div>
    </ark-combobox-control>
    <ark-combobox-positioner class="${styles.Positioner}">
      <ark-combobox-content class="${styles.Content}">
        ${empty ? /* html */ `<ark-combobox-empty><div class="${styles.Empty}">No results found</div></ark-combobox-empty>` : ''}
        <ark-combobox-list class="${styles.List}">${list}</ark-combobox-list>
      </ark-combobox-content>
    </ark-combobox-positioner>
  </ark-combobox>`

const item = (value = '', label = '') => /* html */ `
  <ark-combobox-item class="${styles.Item}" ${value ? `value="${value}"` : ''}>
    <ark-combobox-item-text class="${styles.ItemText}">${label}</ark-combobox-item-text>
    <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
  </ark-combobox-item>`

const options = (items: { value: string; label: string }[]) => items.map((it) => item(it.value, it.label)).join('')

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${field.Root}">
    ${combobox(
      'Department',
      'e.g. Engineering',
      options([
        { label: 'Engineering', value: 'engineering' },
        { label: 'Design', value: 'design' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Sales', value: 'sales' },
        { label: 'Human Resources', value: 'hr' },
        { label: 'Finance', value: 'finance' },
      ]),
    )}
    <span class="${field.HelperText}">Select your primary department</span>
  </div>`
}
