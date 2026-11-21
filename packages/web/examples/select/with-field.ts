import { createElement, ChevronsUpDown, Check } from 'lucide'

import '../../src/components/select/index.js'
import '../../src/components/field/index.js'

import field from 'styles/field.module.css'

import styles from 'styles/select.module.css'

const root = (attrs: string, body: string, label = 'Framework') => /* html */ `
  <ark-select class="${styles.Root}" ${attrs}>
    <ark-select-label class="${styles.Label}">${label}</ark-select-label>
    ${body}
  </ark-select>`

const clearText = /* html */ `<ark-select-clear-trigger><button class="${styles.ClearTrigger}">Clear</button></ark-select-clear-trigger>`

const valueText = (placeholder: string) =>
  /* html */ `<ark-select-value-text class="${styles.ValueText}" placeholder="${placeholder}"></ark-select-value-text>`

const indicator = /* html */ `<ark-select-indicator class="${styles.Indicator}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</ark-select-indicator>`

const inlineControl = (placeholder: string, clear = clearText) => /* html */ `
  <ark-select-control class="${styles.Control}">
    <ark-select-trigger><button class="${styles.Trigger}">${valueText(placeholder)}${indicator}</button></ark-select-trigger>
    ${clear}
  </ark-select-control>`

const popup = (list: string, { before = '', after = '', style = '' } = {}) => /* html */ `
  <ark-select-positioner class="${styles.Positioner}">
    <ark-select-content class="${styles.Content}" ${style ? `style="${style}"` : ''}>
      ${before}<ark-select-list class="${styles.List}">${list}</ark-select-list>${after}
    </ark-select-content>
  </ark-select-positioner>`

const item = (value = '', label = '', disabled = false) => /* html */ `
  <ark-select-item class="${styles.Item}" ${value ? `value="${value}"` : ''} ${disabled ? 'disabled' : ''}>
    <ark-select-item-text class="${styles.ItemText}">${label}</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
  </ark-select-item>`

const plainItems = (values: string[]) => values.map((value) => item(value, value)).join('')

const names = ['React', 'Solid', 'Vue', 'Svelte']

export function mount(container: HTMLElement) {
  container.innerHTML = /* html */ `
  <ark-field class="${field.Root}">
    ${root('', inlineControl('Select a Framework', '') + popup(plainItems(names)), 'Label')}
    <ark-field-helper-text class="${field.HelperText}">Additional Info</ark-field-helper-text>
  </ark-field>`
}
