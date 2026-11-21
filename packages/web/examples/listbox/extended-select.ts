import { createElement, Check } from 'lucide'

import '../../src/components/listbox/index.js'

import styles from 'styles/listbox.module.css'

const listbox = (attrs: string, label: string, list: string, data = '') => `
  <ark-listbox class="${styles.Root}" ${attrs}>
    ${data}
    <ark-listbox-label class="${styles.Label}">${label}</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.List}">${list}</ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>`

const item = (value = '', label = '') => `
  <ark-listbox-item class="${styles.Item}" ${value ? `value="${value}"` : ''}>
    <ark-listbox-item-text class="${styles.ItemText}">${label}</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item>`

const options = (items: { value: string; label: string; disabled?: boolean }[]) =>
  items
    .map((it) =>
      item(it.value, it.label).replace('<ark-listbox-item ', `<ark-listbox-item ${it.disabled ? 'disabled ' : ''}`),
    )
    .join('')

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Preact', value: 'preact' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = listbox(
    'selection-mode="extended"',
    'Hold <kbd>⌘</kbd> or <kbd>Ctrl</kbd> to select multiple',
    options(frameworks),
  )
}
