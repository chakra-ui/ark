import { createElement, Check } from 'lucide'

import '../../src/components/listbox/index.js'

import styles from 'styles/listbox.module.css'

interface Item {
  value: string
  label: string
}

const item = ({ value, label }: Item) => /* html */ `
  <ark-listbox-item class="${styles.Item}" value="${value}">
    <ark-listbox-item-text class="${styles.ItemText}">${label}</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item>`

const frameworks: Item[] = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Preact', value: 'preact' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-listbox class="${styles.Root}" selection-mode="extended">
    <ark-listbox-label class="${styles.Label}">Hold <kbd>⌘</kbd> or <kbd>Ctrl</kbd> to select multiple</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.List}">${frameworks.map((framework) => item(framework)).join('')}</ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>`
}
