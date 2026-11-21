import { createElement, ChevronsUpDown, Check } from 'lucide'

import '../../src/components/select/index.js'

import styles from 'styles/select.module.css'

const root = (attrs: string, body: string, label = 'Framework') => `
  <ark-select class="${styles.Root}" ${attrs}>
    <ark-select-label class="${styles.Label}">${label}</ark-select-label>
    ${body}
  </ark-select>`

const clearText = `<ark-select-clear-trigger><button class="${styles.ClearTrigger}">Clear</button></ark-select-clear-trigger>`

const valueText = (placeholder: string) =>
  `<ark-select-value-text class="${styles.ValueText}" placeholder="${placeholder}"></ark-select-value-text>`

const indicator = `<ark-select-indicator class="${styles.Indicator}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</ark-select-indicator>`

const inlineControl = (placeholder: string, clear = clearText) => `
  <ark-select-control class="${styles.Control}">
    <ark-select-trigger><button class="${styles.Trigger}">${valueText(placeholder)}${indicator}</button></ark-select-trigger>
    ${clear}
  </ark-select-control>`

const popup = (list: string, { before = '', after = '', style = '' } = {}) => `
  <ark-select-positioner class="${styles.Positioner}">
    <ark-select-content class="${styles.Content}" ${style ? `style="${style}"` : ''}>
      ${before}<ark-select-list class="${styles.List}">${list}</ark-select-list>${after}
    </ark-select-content>
  </ark-select-positioner>`

const group = (label: string, items: string) => `
  <ark-select-item-group class="${styles.ItemGroup}" name="${label.toLowerCase()}">
    <ark-select-item-group-label class="${styles.ItemGroupLabel}">${label}</ark-select-item-group-label>
    ${items}
  </ark-select-item-group>`

const item = (value = '', label = '', disabled = false) => `
  <ark-select-item class="${styles.Item}" ${value ? `value="${value}"` : ''} ${disabled ? 'disabled' : ''}>
    <ark-select-item-text class="${styles.ItemText}">${label}</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
  </ark-select-item>`

const plainItems = (values: string[]) => values.map((value) => item(value, value)).join('')

export function mount(container: HTMLElement) {
  container.innerHTML = root(
    'fit-viewport placement="bottom-start" same-width',
    inlineControl('Select a Framework') +
      popup(group('Names', plainItems(Array.from({ length: 14 }, (_, i) => `Name ${i + 1}`))), {
        style: 'max-height: 200px',
      }),
  )
}
